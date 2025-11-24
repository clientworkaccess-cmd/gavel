import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
    Mail, Phone, MapPin, Linkedin, CheckCircle2,
    XCircle, Clock, HelpCircle, ChevronRight
} from "lucide-react";
import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// --------------------------
// 🔥 DUMMY INTERVIEW DATA
// --------------------------
const demoInterview = {
    _id: "demo123",
    jobName: "Frontend Developer",
    recommendation: "Highly Recommended",
    reviewStatus: "approved",
    keyInsights1: "Strong technical foundation",
    keyInsights2: "Excellent communication",
    keyInsights3: "Adaptable and quick learner",
    keyInsights4: "Great cultural fit",
    summary: [
        "The candidate demonstrates strong frontend fundamentals.",
        "Shows excellent problem-solving and debugging strategies.",
        "Professional attitude and confident responses."
    ],
    scores: {
        overallFit: 85,
        communication: 90,
        knowledge: 82,
        attitude: 88
    },
    candidateId: {
        name: "John Doe",
        email: "john@example.com",
        phoneNumber: "+1 234 567 890",
        address: "San Francisco, CA",
        linkedinProfile: "https://linkedin.com/in/johndoe",
        skills: ["React", "JavaScript", "Node.js", "Tailwind", "Git"]
    },
    transcript: [
        { role: "assistant", content: "Welcome! Can you introduce yourself?" },
        { role: "user", content: "My name is John Doe, and I’m a frontend developer." },
        { role: "assistant", content: "Great! Tell me about your experience with React." },
        { role: "user", content: "I have 3 years of experience building React applications." }
    ]
};

// ---------------------------
// 🔥 STATUS CONFIG
// ---------------------------
const getStatusConfig = (status) => {
    switch (status) {
        case "approved": return { color: "bg-green-500", label: "Approved", icon: CheckCircle2 };
        case "reject": return { color: "bg-red-500", label: "Rejected", icon: XCircle };
        case "pending": return { color: "bg-yellow-500", label: "Pending", icon: Clock };
        default: return { color: "bg-blue-500", label: "Maybe", icon: HelpCircle };
    }
};

// ------------------------------
// 🔥 DEMO COMPONENT START
// ------------------------------
const InterviewDetailDemo = () => {
    const [activeTab, setActiveTab] = useState("overview");
    const interview = demoInterview;
    const statusConfig = getStatusConfig(interview.reviewStatus);
    const StatusIcon = statusConfig.icon;

    const ProgressBar = ({ value, label, color }) => (
        <div>
            <div className="flex justify-between mb-1">
                <span>{label}</span>
                <span className="font-semibold">{value}/100</span>
            </div>
            <div className="h-2 bg-muted w-full rounded-full">
                <motion.div
                    className={`h-full rounded-full ${color}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${value}%` }}
                    transition={{ duration: 0.8 }}
                />
            </div>
        </div>
    );

    return (
        <div className="container mx-auto px-4 py-10 ">
            <h1 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Interview Report</h1>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 border p-2 rounded-2xl shadow-lg shadow-secondary hover:scale-105 transition-all duration-800 cursor-pointer">

                {/* LEFT SIDEBAR */}
                <div className="lg:col-span-4">
                    <Card className="pt-0 h-full">
                        <CardHeader className={`h-3 ${statusConfig.color} rounded-t-lg`} />

                        <CardContent className="text-center py-6">
                            <Avatar className="w-24 h-24 mx-auto mb-4">
                                <AvatarImage src="/assets/images/John.jpeg" />
                                <AvatarFallback>JD</AvatarFallback>
                            </Avatar>

                            <h2 className="text-2xl font-bold">{interview.candidateId.name}</h2>
                            <p className="text-muted-foreground">{interview.jobName}</p>

                            <Badge className={`mt-4 ${statusConfig.color} text-white`}>
                                <StatusIcon className="w-4 h-4 mr-1" />
                                {statusConfig.label}
                            </Badge>
                        </CardContent>

                        <Separator />

                        <CardContent className="text-sm flex gap-x-12 space-y-4 flex-wrap justify-center">
                            <div className="space-y-4 ">
                                <div className="flex items-center"><Mail className="w-4 mr-2" /> {interview.candidateId.email}</div>
                                <div className="flex items-center"><Phone className="w-4 mr-2" /> {interview.candidateId.phoneNumber}</div>
                            </div>
                            <div className="space-y-4 ">
                                <div className="flex items-center"><MapPin className="w-4 mr-2" /> {interview.candidateId.address}</div>
                                <div className="flex items-center"><Linkedin className="w-4 mr-2" />
                                    <a href={interview.candidateId.linkedinProfile} className="text-primary">LinkedIn</a>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* RIGHT SIDE CONTENT */}
                <div className="lg:col-span-8">

                    {/* TABS */}
                    <div className="border-b flex gap-4">
                        {["overview", "scores", "insights", "transcript"].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-3 py-2 text-sm font-medium ${activeTab === tab ? "text-primary border-b-2 border-primary" : "text-muted-foreground"
                                    }`}
                            >
                                {tab.toUpperCase()}
                            </button>
                        ))}
                    </div>

                    {/* TAB CONTENTS */}
                    <div className="mt-6">

                        {/* OVERVIEW */}
                        {activeTab === "overview" && (
                            <div className="space-y-6">
                                <Card>
                                    <CardHeader><CardTitle> AI Recommendation</CardTitle></CardHeader>
                                    <CardContent>
                                        <p className="text-3xl font-bold text-primary flex gap-2 items-center"><p className="w-5 h-5 bg-green-500 rounded-full"></p>{interview.recommendation}</p>
                                        <p className="text-muted-foreground mt-2">Based on Interview analysis.</p>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardHeader><CardTitle>Skills</CardTitle></CardHeader>
                                    <CardContent className="flex gap-2 flex-wrap">
                                        {interview.candidateId.skills.map(skill => (
                                            <Badge key={skill} variant="secondary">{skill}</Badge>
                                        ))}
                                    </CardContent>
                                </Card>
                            </div>
                        )}

                        {/* SCORES */}
                        {activeTab === "scores" && (
                            <div className="space-y-6">
                                <Card>
                                    <CardHeader><CardTitle>Overall Fit</CardTitle></CardHeader>
                                    <CardContent>
                                        <ProgressBar value={interview.scores.overallFit} label="Fit Score" color="bg-blue-500" />
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardHeader><CardTitle>Detailed Breakdown</CardTitle></CardHeader>
                                    <CardContent className="space-y-6">
                                        <ProgressBar value={interview.scores.communication} label="Communication" color="bg-indigo-500" />
                                        <ProgressBar value={interview.scores.knowledge} label="Technical Knowledge" color="bg-purple-500" />
                                        <ProgressBar value={interview.scores.attitude} label="Attitude" color="bg-pink-500" />
                                    </CardContent>
                                </Card>
                            </div>
                        )}

                        {/* INSIGHTS */}
                        {activeTab === "insights" && (
                            <div className="flex flex-col gap-6">
                                <div className="flex gap-4 justify-between flex-col sm:flex-row">
                                    <div className="border p-4 w-full rounded-lg">
                                        {[interview.keyInsights1, interview.keyInsights2].map((i, idx) => (
                                            <div key={idx} className="flex items-start gap-3 space-y-2">
                                                <ChevronRight className="w-5 h-5 mt-1" />
                                                <p>{i}</p>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="border p-4 w-full rounded-lg">
                                        {[interview.keyInsights3, interview.keyInsights4].map((i, idx) => (
                                            <div key={idx} className="flex items-start gap-3 space-y-2">
                                                <ChevronRight className="w-5 h-5 mt-1" />
                                                <p>{i}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <Card>
                                    <CardHeader><CardTitle>Summary</CardTitle></CardHeader>
                                    <CardContent className="space-y-4 text-muted-foreground">
                                        {interview.summary.map((s, idx) => <p key={idx}>{s}</p>)}
                                    </CardContent>
                                </Card>
                            </div>
                        )}

                        {/* TRANSCRIPT */}
                        {activeTab === "transcript" && (
                            <Card className="p-5 max-h-[60vh] overflow-y-auto">
                                {interview.transcript.map((msg, idx) => (
                                    <div key={idx} className={`flex gap-4 mb-4 ${msg.role === "user" ? "justify-end" : ""}`}>
                                        {msg.role !== "user" && <Avatar><AvatarFallback>AI</AvatarFallback></Avatar>}
                                        <div className={`max-w-[70%] p-3 rounded-lg ${msg.role === "user" ? "bg-secondary" : "bg-muted"}`}>
                                            {msg.content}
                                        </div>
                                        {msg.role === "user" && <Avatar><AvatarFallback>JD</AvatarFallback></Avatar>}
                                    </div>
                                ))}
                            </Card>
                        )}

                    </div>
                </div>
            </div>
        </div>
    );
};

export default InterviewDetailDemo;
