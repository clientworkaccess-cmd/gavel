import { useEffect, useRef, useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Vapi from "@vapi-ai/web";
import { toast, ToastContainer } from "react-toastify";
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
    CardFooter,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
    Loader2,
    Mic,
    StopCircle,
    Info,
    CheckCircle2,
} from "lucide-react";
import { getReq, postReq } from "@/axios/axios";
import API_ENDPOINTS from "@/config/api";
import { useAuth } from "../context/AuthContext";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { FaGavel } from "react-icons/fa";


const Interview = () => {
    const { user, userId } = useAuth();
    const { email, name } = user || {};

    const [activeTab, setActiveTab] = useState("interview");
    const [loading, setLoading] = useState(false);
    const [interviewActive, setInterviewActive] = useState(false);
    const [interviewCompleted, setInterviewCompleted] = useState(false);
    const [positions, setPositions] = useState([]);
    const [selectedPosition, setSelectedPosition] = useState("");
    const [selectedLanguage, setSelectedLanguage] = useState("english")
    const [sendReportData, setSendReportData] = useState({})
    const [vapi, setVapi] = useState(null);
    const [transcript, setTranscript] = useState([]);

    const positionDescriptionRef = useRef("");
    const abortFetchRef = useRef(null);

    useEffect(() => {
        const vapiInstance = new Vapi(API_ENDPOINTS.VAPI_PUBLIC_KEY);
        setVapi(vapiInstance);

        vapiInstance.on('call-start', () => {
        });

        vapiInstance.on('call-end', () => {
        });

        vapiInstance.on('speech-start', () => {
        });

        vapiInstance.on('speech-end', () => {
        });

        vapiInstance.on("message", (message) => {
            setTranscript([...message.conversation])
        });


        vapiInstance.on('error', (error) => {
            console.error('Vapi error:', error);
        });

        return () => {
            vapiInstance?.stop();
        };
    }, []);

    // ✅ FIX: Reset position description whenever a new position is selected
    useEffect(() => {
        positionDescriptionRef.current = "";
    }, [selectedPosition]);

    const fetchPositions = useCallback(async () => {
        setLoading(true);
        try {
            if (abortFetchRef.current) abortFetchRef.current.abort();
            const controller = new AbortController();
            abortFetchRef.current = controller;

            const res = await getReq(API_ENDPOINTS.POSITION, {
                signal: controller.signal,
            });
            const data = res?.data ?? res ?? [];
            if (!Array.isArray(data)) {
                console.warn("Unexpected positions response shape:", data);
                setPositions([]);
            } else setPositions(data);
        } catch (err) {
            if (err.name === "AbortError") return;
            console.error("Failed to load positions:", err);
            toast.error("Failed to load positions");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchPositions();
        return () => {
            if (abortFetchRef.current) abortFetchRef.current.abort();
        };
    }, [fetchPositions]);

    function cleanAssistantPayload(raw) {
        const forbidden = ["id", "orgId", "createdAt", "updatedAt", "isServerUrlSecretSet"];

        const cleaned = {};
        for (const key in raw) {
            if (!forbidden.includes(key)) {
                cleaned[key] = raw[key];
            }
        }
        return cleaned;
    }

    const ASSISTANT_MAP = {
        hospitality: {
            english: API_ENDPOINTS.VAPI_ASSISTANT_HOSPITALITY_EN_KEY,
            spanish: API_ENDPOINTS.VAPI_ASSISTANT_HOSPITALITY_ES_KEY,
        },
        legal: {
            english: API_ENDPOINTS.VAPI_ASSISTANT_LEGAL_EN_KEY,
            spanish: API_ENDPOINTS.VAPI_ASSISTANT_LEGAL_ES_KEY,
        },
    };

    const getAssistant = (category, language) => {
        const cat = (category || "").toLowerCase();
        const lang = (language || "en").toLowerCase();


        if (!ASSISTANT_MAP[cat]) return null;
        return ASSISTANT_MAP[cat][lang] || null;
    };


    // handleBeginInterview updated
    const handleBeginInterview = async () => {
        positionDescriptionRef.current = "";

        if (!selectedPosition) {
            toast.error("Please select a position first");
            return;
        }
        if (!userId) {
            toast.error("User not authenticated");
            return;
        }

        setLoading(true);

        try {

            const found = positions.find(
                (p) => p._id === selectedPosition || p.id === selectedPosition
            );
            if (!found) {
                toast.error("Selected position not found");
                return;
            }
            setSendReportData(found)
            const checkRes = await getReq(
                `${API_ENDPOINTS.INTERVIEW_CHECK}?candidateId=${userId}&jobName=${found.name}`
            );
            if (checkRes?.alreadyApplied) {
                toast.warn(checkRes?.message)
                setSelectedPosition("");
                return
            }

            const assistantId = getAssistant(found.category, selectedLanguage);

            if (!assistantId) {
                toast.error("No assistant configured for this category/language");
                return;
            }

            positionDescriptionRef.current =
                found.positionDescription || found.description || "";

            const payload = {
                id: userId,
                email,
                firstName: name,
                positionId: found._id || found.id,
                positionName: found.name,
                positionDescription: positionDescriptionRef.current,
                category: found.category,
                companyName: found.company?.name || "",
                redFlag: found.redFlag || "",
                assistantId,
                language: selectedLanguage,
            };

            const webhookRes = await fetch(API_ENDPOINTS.WEBHOOK_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });


            const text = await webhookRes.text();
            let webhookJson = null;
            webhookJson = text ? JSON.parse(text) : null;

            if (!webhookRes.ok || !webhookJson) {
                toast.error("Interview setup failed");
                return;
            }

            if (interviewActive) {
                toast.info("Interview already active");
                return;
            }


            try {
                const cleanPayload = cleanAssistantPayload(webhookJson[0]);
                await vapi.start(assistantId, cleanPayload);

                setInterviewCompleted(false);
                toast.success("Interview started");
                setInterviewActive(true);
            } catch (err) {
                toast.error("Failed to start voice session");
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleStopInterview = async () => {
        setInterviewActive(false);
        await vapi?.stop()
        setSelectedPosition("");
        setLoading(true)

        const payload = {
            transcript: transcript?.slice(1),
            jobDescription: positionDescriptionRef.current,
            jobCategory: sendReportData?.category,
            candidateId: userId,
            redFlag: sendReportData?.redFlag,
            jobName: sendReportData.name
        }
        try {
            const webhookReport = await fetch(API_ENDPOINTS.WEBHOOK_REPORT_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });

            const text = await webhookReport.text()
            const webhookReportData = text ? JSON.parse(text) : null;

            if (webhookReportData) {
                webhookReportData[0].summary = JSON.parse(webhookReportData[0].summary);
                webhookReportData[0].transcript = JSON.parse(webhookReportData[0].transcript);
            }

            await postReq(API_ENDPOINTS.INTERVIEW, webhookReportData[0])
            setLoading(false)
            setInterviewCompleted(true);
            fetchPositions();
        } catch (err) {
            console.error("Error fetching/saving report:", err);
            toast.error("Interview ended but saving failed");
            setLoading(false)
        }
    };


    return (
        <div className="min-h-screen flex items-center justify-center p-6">
            <ToastContainer position="top-right" autoClose={3000} />
            <Card className="w-full max-w-4xl backdrop-blur-xl bg-transprent border border-foreground/60 pb-0 shadow-2xl rounded-3xl overflow-hidden">
                <CardHeader className="text-center py-8 border-b border-foreground">
                    <div className="flex flex-col items-center space-y-3">
                        <div className="h-16 w-16 rounded-full bg-foreground/70 flex items-center justify-center">
                            <FaGavel className="h-8 w-8 text-secondary" />
                        </div>
                        <CardTitle className="text-3xl font-semibold text-foreground/90">
                            Gavel AI Interview
                        </CardTitle>
                        <p className="text-sm text-foreground/50">
                            Hello, {name || "Candidate"} 👋 — Get ready for your smart
                            interview powered by AI
                        </p>
                    </div>
                </CardHeader>

                <CardContent className="px-6 py-8">
                    <Tabs value={activeTab} onValueChange={setActiveTab}>
                        <TabsList className="grid grid-cols-2 mb-6 bg-transparent rounded-full p-1 w-full border border-foreground/60">
                            <TabsTrigger
                                value="interview"
                                className="data-[state=active]:bg-foreground/80 data-[state=active]:text-secondary rounded-full transition-all"
                            >
                                Interview
                            </TabsTrigger>
                            <TabsTrigger
                                value="instructions"
                                className="data-[state=active]:bg-foreground/80 data-[state=active]:text-secondary rounded-full transition-all"
                            >
                                Instructions
                            </TabsTrigger>
                        </TabsList>

                        <AnimatePresence mode="wait">
                            {activeTab === "interview" ? (
                                <motion.div
                                    key="interview"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.4 }}
                                >
                                    <div className="flex flex-col items-center space-y-6">
                                        <div className="flex justify-between items-center px-4 w-full pb-4 gap-4 flex-col sm:flex-row">
                                            <div className="w-full max-w-sm">
                                                <label className="block text-sm font-medium text-foreground/50 mb-2">
                                                    Select a Position
                                                </label>
                                                <Select
                                                    value={selectedPosition}
                                                    onValueChange={setSelectedPosition}
                                                >
                                                    <SelectTrigger className="w-full border-foreground/60 backdrop-blur-sm">
                                                        <SelectValue
                                                            placeholder={
                                                                loading && !interviewActive
                                                                    ? "Saving Interview..." :
                                                                    loading
                                                                        ? "Loading interview..."
                                                                        : "Choose a position"
                                                            }
                                                        />
                                                    </SelectTrigger>
                                                    <SelectContent className="max-w-95 max-h-40">
                                                        {positions?.length > 0 ? (
                                                            positions.map((pos) =>
                                                                pos.status === "open" ? (
                                                                    <SelectItem
                                                                        key={pos._id || pos.id}
                                                                        value={pos._id || pos.id}
                                                                    >
                                                                        {pos.name} — {pos?.company?.name || "N/A"}
                                                                    </SelectItem>
                                                                ) : null
                                                            )
                                                        ) : (
                                                            <p className="text-center text-sm p-2 text-gray-500">
                                                                No positions available
                                                            </p>
                                                        )}
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            <div className="w-full max-w-sm">
                                                <label className="block text-sm font-medium text-foreground/50 mb-2">
                                                    Select a Language
                                                </label>
                                                <Select
                                                    value={selectedLanguage}
                                                    onValueChange={setSelectedLanguage}
                                                >
                                                    <SelectTrigger className="w-full border-foreground/60 backdrop-blur-sm">
                                                        <SelectValue placeholder="Choose a language" />
                                                    </SelectTrigger>
                                                    <SelectContent className="max-w-95 max-h-40">
                                                        <SelectItem value="english">
                                                            English
                                                        </SelectItem>
                                                        <SelectItem value="spanish">
                                                            Spanish
                                                        </SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        </div>
                                        {!interviewActive ? (
                                            <motion.button
                                                whileTap={{ scale: 0.95 }}
                                                onClick={handleBeginInterview}
                                                disabled={loading}
                                                className="relative h-24 w-24 flex items-center justify-center rounded-full bg-gradient-to-br from-secondary to-blue-700 text-white shadow-lg hover:shadow-blue-300/50 transition-all"
                                            >
                                                {loading ? (
                                                    <Loader2 className="h-8 w-8 animate-spin" />
                                                ) : (
                                                    <Mic className="h-10 w-10" />
                                                )}
                                            </motion.button>
                                        ) : (
                                            <motion.button
                                                whileTap={{ scale: 0.95 }}
                                                onClick={handleStopInterview}
                                                disabled={loading}
                                                className="relative h-24 w-24 flex items-center justify-center rounded-full bg-gradient-to-br from-red-600 to-red-700 text-white shadow-lg hover:shadow-red-300/50 transition-all animate-pulse"
                                            >
                                                {loading ? (
                                                    <Loader2 className="h-8 w-8 animate-spin" />
                                                ) : (
                                                    <StopCircle className="h-10 w-10" />
                                                )}
                                            </motion.button>
                                        )}

                                        {interviewActive && (
                                            <Alert className="border-foreground/60 bg-secondary/10 text-secondary">
                                                <Info className="h-4 w-4" />
                                                <AlertTitle>Interview in Progress</AlertTitle>
                                                <AlertDescription>
                                                    🎤 Speak clearly and answer naturally. The AI will
                                                    adapt to your tone and responses.
                                                </AlertDescription>
                                            </Alert>
                                        )}

                                        {interviewCompleted && (
                                            <Alert className="border-green-200 text-green-800">
                                                <CheckCircle2 className="h-4 w-4" />
                                                <AlertTitle>Interview Completed</AlertTitle>
                                                <AlertDescription>
                                                    ✅ Your interview has been successfully recorded and
                                                    submitted.
                                                </AlertDescription>
                                            </Alert>
                                        )}
                                    </div>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="instructions"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.4 }}
                                >
                                    <div className="space-y-4 text-sm text-foreground/50 leading-relaxed">
                                        <Alert className="bg-secondary/10 border-foreground/60 text-secondary">
                                            <Info className="h-4 w-4" />
                                            <AlertTitle>Before You Start</AlertTitle>
                                            <AlertDescription>
                                                Ensure your microphone is connected and working
                                                properly.
                                            </AlertDescription>
                                        </Alert>
                                        <ul className="list-disc pl-6 space-y-2">
                                            <li>Allow microphone access when prompted.</li>
                                            <li>Answer clearly and stay calm.</li>
                                            <li>Click the red button when you wish to end.</li>
                                            <li>Interview duration: ~3-5 minutes.</li>
                                        </ul>
                                        <div className="p-4 rounded-xl border border-foreground/60 text-xs text-foreground/50">
                                            <p className="font-medium mb-1">
                                                Technical Requirements:
                                            </p>
                                            <ul className="list-disc pl-4">
                                                <li>Stable internet connection</li>
                                                <li>Working microphone</li>
                                                <li>Quiet environment</li>
                                                <li>Chrome or Edge browser recommended</li>
                                            </ul>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </Tabs>
                </CardContent>

                <CardFooter className="text-xs text-foreground/40 border-t border-foreground py-4 text-center bg-secondary backdrop-blur-md">
                    Powered by{" "}
                    <span className="font-semibold">&nbsp;Gavel AI</span> •
                </CardFooter>
            </Card>
        </div>
    );
};

export default Interview;