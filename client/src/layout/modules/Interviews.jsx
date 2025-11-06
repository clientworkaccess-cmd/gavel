import { useEffect, useRef, useState, useCallback } from "react";
// eslint-disable-next-line no-unused-vars
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
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2, Mic, StopCircle, Info, CheckCircle2 } from "lucide-react";
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

const VAPI_PUBLIC_KEY = import.meta.env.VITE_VAPI_PUBLIC_KEY;
const WEBHOOK_URL = import.meta.env.VITE_WEBHOOK_URL;


const Interview = () => {
    const { user } = useAuth();
    const { _id: userId, email, name } = user || {};

    const [activeTab, setActiveTab] = useState("interview");
    const [loading, setLoading] = useState(false);
    const [interviewActive, setInterviewActive] = useState(false);
    const [interviewCompleted, setInterviewCompleted] = useState(false);
    const [positions, setPositions] = useState([]);
    const [selectedPosition, setSelectedPosition] = useState("");
    const [isApplied, setIsApplied] = useState(false);

    const vapiRef = useRef(null);
    const positionDescriptionRef = useRef("");
    const abortFetchRef = useRef(null);

    const fetchPositions = useCallback(async () => {
        setLoading(true);
        try {
            if (abortFetchRef.current) abortFetchRef.current.abort();
            const controller = new AbortController();
            abortFetchRef.current = controller;

            const res = await getReq(API_ENDPOINTS.POSITION, { signal: controller.signal });
            const data = res?.data ?? res ?? [];
            if (!Array.isArray(data)) {
                console.warn("Unexpected positions response shape:", data);
                setPositions([]);
            } else setPositions(data);
        } catch (err) {
            if (err.name === 'AbortError') return;
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

    const ensureVapi = useCallback(() => {
        if (!VAPI_PUBLIC_KEY) {
            toast.error("Vapi public key not configured");
            return null;
        }

        if (!vapiRef.current) {
            vapiRef.current = new Vapi(VAPI_PUBLIC_KEY);

            vapiRef.current.on("error", (err) => {
                console.error("Vapi error:", err);
                toast.error(err?.errorMsg || "Voice engine error");
                try {
                    vapiRef.current?.stop();
                } catch (e) {
                    console.warn("Failed to stop vapi on error:", e);
                }
                setInterviewActive(false);
            });

            try {
                vapiRef.current.on("ended", () => {
                    setInterviewActive(false);
                    setInterviewCompleted(true);
                });
            } catch (e) {
                console.log(e);

            }
        }

        return vapiRef.current;
    }, []);

    const handleBeginInterview = async () => {
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
            const checkRes = await getReq(`${API_ENDPOINTS.INTERVIEW_CHECK}?candidateId=${userId}&positionId=${selectedPosition}`);
            if (checkRes?.message) {
                toast.error(checkRes.message);
                return;
            }

            const found = positions.find((p) => p._id === selectedPosition || p.id === selectedPosition);
            if (!found) {
                toast.error("Selected position not found. Refresh and try again.");
                return;
            }

            positionDescriptionRef.current = found.positionDescription || found.description || "";

            const payload = {
                id: userId,
                email,
                firstName: name,
                positionId: found._id || found.id,
                positionName: found.name,
                positionDescription: positionDescriptionRef.current,
                companyName: found.company?.name || "",
            };

            const webhookRes = await fetch(WEBHOOK_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            const text = await webhookRes.text();
            let webhookJson = null;
            try {
                webhookJson = text ? JSON.parse(text) : null;
            } catch (e) {
                console.warn("Webhook returned non-json:", e);
            }

            if (!webhookRes.ok || !webhookJson) {
                console.error("Webhook failed:", webhookRes.status, text);
                toast.error("Interview setup failed (webhook error)");
                return;
            }

            const vapi = ensureVapi();
            if (!vapi) return;

            if (interviewActive) {
                toast.info("Interview already active");
                return;
            }

            try {
                vapi.start(webhookJson);
                setInterviewActive(true);
                setInterviewCompleted(false);
                toast.success("Interview started");
            } catch (err) {
                console.error("Failed to start vapi:", err);
                toast.error("Failed to start voice session");
            }
        } catch (err) {
            console.error(err);
            toast.error("Unable to start interview");
        } finally {
            setLoading(false);
        }
    };

    const handleStopInterview = async () => {
        if (!vapiRef.current) return;

        try {
            vapiRef.current.stop();
        } catch (err) {
            console.warn("vapi stop error:", err);
        }

        setInterviewActive(false);
        setInterviewCompleted(true);
        setSelectedPosition("");

        try {
            const response = await fetch(API_ENDPOINTS.VAPI_REPORT);
            const text = await response.text();
            const data = text ? JSON.parse(text) : null;

            if (!data || !data.report) {
                console.warn("No report returned from VAPI_REPORT:", data);
                return;
            }

            const body = {
                position: data.report.positionId,
                candidateId: data.report.candidateId,
                name: name || "",
                email: data.report.candidateEmail || email || "",
                interviewID: data.report.interviewID,
                positionDescription: positionDescriptionRef.current,
                positionId: data.report.positionId,
                summary: data.report.interviewSummary,
                transcript: data.report.interviewTranscript,
                status: data.status || "completed",
            };
            await postReq(API_ENDPOINTS.INTERVIEW, body);

            setIsApplied(true);
            fetchPositions();
        } catch (err) {
            console.error("Error fetching/saving report:", err);
            toast.error("Interview ended but saving failed");
        }
    };

    useEffect(() => {
        return () => {
            try {
                if (vapiRef.current) {
                    vapiRef.current.stop?.();
                    vapiRef.current = null;
                }
            } catch (e) {
                console.warn("Cleanup error:", e);
            }
        };
    }, []);

    return (
        <div className="w-full min-h-screen flex items-center justify-center p-6 bg-gray-50">
            <ToastContainer position="top-right" autoClose={3000} />

            <Card className="w-full max-w-5xl shadow-xl min-h-[80vh] overflow-y-auto border border-gray-200">
                <CardHeader className="text-center pb-2">
                    <CardTitle className="text-2xl font-semibold text-gray-800">AI-Powered Interview</CardTitle>
                    <p className="text-sm text-gray-500 mt-1">Smart, voice-based interview powered by AI.</p>
                </CardHeader>

                <CardContent>
                    <Tabs value={activeTab} onValueChange={setActiveTab}>
                        <TabsList className="grid grid-cols-2 w-full mb-4">
                            <TabsTrigger value="interview">Interview</TabsTrigger>
                            <TabsTrigger value="instructions">Instructions</TabsTrigger>
                        </TabsList>

                        <AnimatePresence mode="wait">
                            {activeTab === "interview" ? (
                                <motion.div key="interview" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}>
                                    <div className="mt-6 flex flex-col items-center">
                                        <div className="w-full max-w-sm mb-6">
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Select Position for start interview</label>

                                            <Select value={selectedPosition} onValueChange={setSelectedPosition}>
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder={loading ? "Loading positions..." : "Choose a position"} />
                                                </SelectTrigger>

                                                <SelectContent className="max-h-50 overflow-auto">
                                                    {positions?.length > 0 ? (
                                                        positions.map((pos) =>
                                                            pos.status === "open" ? (
                                                                <SelectItem key={pos._id || pos.id} value={pos._id || pos.id}>
                                                                    {pos.name} — {pos?.company?.name || "N/A"}
                                                                </SelectItem>
                                                            ) : null
                                                        )
                                                    ) : (
                                                        <p className="text-center text-sm p-2 text-gray-500">No positions available</p>
                                                    )}
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        <h3 className="text-lg font-medium text-gray-800 mb-2">Ready to start your AI interview?</h3>
                                        <p className="text-gray-500 text-sm mb-6">Click below to begin your session. Ensure your mic is enabled.</p>

                                        {!interviewActive ? (
                                            <Button size="lg" disabled={loading || isApplied} onClick={handleBeginInterview} className="bg-blue-600 hover:bg-blue-700 text-white px-8">
                                                {loading ? (
                                                    <>
                                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                        Starting Interview...
                                                    </>
                                                ) : (
                                                    <>
                                                        <Mic className="mr-2 h-4 w-4" />
                                                        Begin Interview
                                                    </>
                                                )}
                                            </Button>
                                        ) : (
                                            <Button size="lg" variant="destructive" onClick={handleStopInterview} className="px-8">
                                                <StopCircle className="mr-2 h-4 w-4" />
                                                Complete Interview
                                            </Button>
                                        )}

                                        {interviewActive && (
                                            <Alert className="mt-6 border-blue-200 bg-blue-50 text-blue-800">
                                                <Info className="h-4 w-4" />
                                                <AlertTitle>Interview in Progress</AlertTitle>
                                                <AlertDescription>🎤 Speak clearly and answer all questions. The AI will adapt to your responses.</AlertDescription>
                                            </Alert>
                                        )}

                                        {interviewCompleted && (
                                            <Alert className="mt-6 border-green-200 bg-green-50 text-green-800">
                                                <CheckCircle2 className="h-4 w-4" />
                                                <AlertTitle>Interview Completed</AlertTitle>
                                                <AlertDescription>✅ Your interview has been recorded and will be reviewed shortly.</AlertDescription>
                                            </Alert>
                                        )}
                                    </div>
                                </motion.div>
                            ) : (
                                <motion.div key="instructions" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}>
                                    <div className="mt-6 space-y-3 text-sm text-gray-700">
                                        <Alert className="bg-blue-50 border-blue-200 text-blue-700">
                                            <Info className="h-4 w-4" />
                                            <AlertTitle>Before You Start</AlertTitle>
                                            <AlertDescription>Please make sure your microphone is connected and working properly.</AlertDescription>
                                        </Alert>

                                        <ul className="list-disc pl-6 space-y-1">
                                            <li>Allow microphone access when prompted.</li>
                                            <li>Gavel AI will guide you through your interview.</li>
                                            <li>Speak clearly and wait for each question to complete.</li>
                                            <li>Once done, click "Complete Interview".</li>
                                        </ul>

                                        <div className="mt-4 p-3 rounded-lg border bg-gray-50 text-xs text-gray-600">
                                            <p className="font-medium mb-1">Technical Requirements:</p>
                                            <ul className="list-disc pl-4">
                                                <li>Stable internet connection</li>
                                                <li>Working microphone</li>
                                                <li>Quiet environment</li>
                                                <li>Use Chrome, Edge, or Firefox browser</li>
                                            </ul>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </Tabs>
                </CardContent>

                <CardFooter className="text-xs text-gray-500 text-center flex justify-center">Powered by Gavel AI • Vapi Voice Interface</CardFooter>
            </Card>
        </div>
    );
}



export default Interview
