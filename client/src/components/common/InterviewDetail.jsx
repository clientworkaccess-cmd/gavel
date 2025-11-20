import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getReq, putReq } from "@/axios/axios";
import API_ENDPOINTS from "@/config/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ToastContainer } from "react-toastify";
import {
    User, Mail, MapPin, BookOpen, MoveLeft, Phone,
    Linkedin, DollarSign, ChevronRight, Calendar,
    CheckCircle2, XCircle, HelpCircle, Download, Share2,
    Clock, TrendingUp, Award, Briefcase, FileText,
    Star, BarChart3, Users, Target, MessageSquare
} from "lucide-react";
import { useAuth } from "@/layout/context/AuthContext";

const InterviewDetail = () => {
    const { id } = useParams();
    const { role } = useAuth();
    const [interview, setInterview] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('overview');
    const navigate = useNavigate();

    const handleNavigate = () => {
        if (role === "admin") navigate("/admin/transcripts");
        else if (role === "candidate") navigate("/candidate/transcript");
        else navigate("/client/transcript");
    };

    const fetchData = async () => {
        try {
            const res = await getReq(API_ENDPOINTS.INTERVIEW);
            const found = res?.interviews?.find((item) => item._id === id);
            setInterview(found || null);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [id]);

    const handleUpdateStatus = async (status) => {
        await putReq(`${API_ENDPOINTS.INTERVIEW}/${id}`, { reviewStatus: status });
        fetchData();
    };

    const formatDate = (dateString) => {
        try {
            return new Date(dateString).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
            });
        } catch {
            return "—";
        }
    };

    // Helper for status colors
    const getStatusConfig = (status) => {
        switch (status) {
            case "approved": return { color: "bg-green-500 hover:bg-green-500 border-green-200", label: "Approved", icon: CheckCircle2 };
            case "reject": return { color: "bg-red-700 hover:bg-red-700 border-red-200", label: "Rejected", icon: XCircle };
            case "pending": return { color: "bg-blue-500 hover:bg-blue-500 border-blue-200", label: "Pending Review", icon: Clock };
            default: return { color: "bg-amber-600 hover:bg-amber-600 border-slate-200", label: status, icon: HelpCircle };
        }
    };

    // Enhanced Progress Bar Component
    const ProgressBar = ({ value, colorClass, label }) => (
        <div className="space-y-2">
            <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-slate-700">{label}</span>
                <span className="text-sm font-bold text-slate-900">{value}/100</span>
            </div>
            <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden">
                <div
                    className={`h-full rounded-full ${colorClass} transition-all duration-1000 ease-out`}
                    style={{ width: `${value}%` }}
                ></div>
            </div>
        </div>
    );

    // Enhanced Score Circle Component
    const ScoreCircle = ({ score, label, color }) => {
        const circumference = 2 * Math.PI * 70;
        const strokeDashoffset = circumference - (circumference * score) / 100;

        return (
            <div className="flex flex-col items-center">
                <div className="relative w-36 h-36">
                    <svg className="w-full h-full transform -rotate-90">
                        <circle
                            cx="72"
                            cy="72"
                            r="70"
                            stroke="currentColor"
                            strokeWidth="8"
                            fill="transparent"
                            className="text-slate-100"
                        />
                        <circle
                            cx="72"
                            cy="72"
                            r="68"
                            stroke="currentColor"
                            strokeWidth="6"
                            fill="transparent"
                            strokeDasharray={circumference}
                            strokeDashoffset={strokeDashoffset}
                            className={`${color} transition-all duration-1000 ease-out`}
                            strokeLinecap="round"
                        />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                            <span className="text-3xl font-bold text-slate-900">{score}</span>
                        </div>
                    </div>
                </div>
                <span className="text-sm font-medium text-slate-700 mt-2">{label}</span>
            </div>
        );
    };

    if (loading)
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
                <div className="relative">
                    <div className="w-16 h-16 border-4 border-primary/20 rounded-full"></div>
                    <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin absolute top-0"></div>
                </div>
                <p className="mt-6 text-slate-600 font-medium">Loading Interview Data...</p>
            </div>
        );

    if (!interview)
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
                <div className="text-center max-w-md mx-auto p-8 bg-white rounded-2xl shadow-lg">
                    <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <FileText className="w-8 h-8 text-slate-400" />
                    </div>
                    <h2 className="text-2xl font-semibold text-slate-900 mb-2">Interview Not Found</h2>
                    <p className="text-slate-600 mb-6">The interview you're looking for doesn't exist or has been removed.</p>
                    <Button onClick={handleNavigate} className="bg-primary hover:bg-primary/90">
                        Return to Dashboard
                    </Button>
                </div>
            </div>
        );
    const tabList = role !== "candidate" ? ['overview', 'scores', 'insights', 'transcript'] : ['overview', 'transcript']

    const statusConfig = getStatusConfig(interview.reviewStatus);
    const StatusIcon = statusConfig.icon;
console.log(interview);

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
            <ToastContainer />

            {/* Enhanced Top Navigation Bar */}
            <header className="min-[479px]:sticky top-0 z-30 w-full px-6 ">
                <div className="flex flex-col lg:flex-row gap-4 items-center justify-between w-full px-3 py-4 shadow-lg bg-white/80 backdrop-blur-md border-b rounded-lg border-slate-200">
                    <div className="flex items-center gap-4 w-full">
                        <Button variant="ghost" size="icon" onClick={handleNavigate} className="hover:bg-slate-100 rounded-full">
                            <MoveLeft className="w-5 h-5 text-slate-600" />
                        </Button>
                        <div className="flex flex-col">
                            <h1 className="text-lg font-semibold text-slate-900">Interview Analysis</h1>
                            <div className="flex items-center gap-2 text-xs text-slate-500 flex-wrap">
                                <span>Candidates</span>
                                <ChevronRight className="w-3 h-3" />
                                <span>{interview.candidateId.name}</span>
                            </div>
                        </div>
                    </div>

                    {role === "admin" && (
                        <div className="flex items-center gap-2 min-[470px]:justify-end w-full flex-wrap">
                            <div className="hidden sm:flex items-center gap-2 mr-4 border-r border-slate-200 pr-4">
                                <span className="text-sm text-slate-500">Decision:</span>
                            </div>
                            <Button
                                size="sm"
                                variant={interview.reviewStatus === "approved" ? "default" : "outline"}
                                className={interview.reviewStatus === "approved" ? "bg-green-500 hover:bg-green-500" : "hover:text-green-500 hover:border-green-200"}
                                onClick={() => handleUpdateStatus("approved")}
                            >
                                <CheckCircle2 className="w-4 h-4 mr-2" /> Approve
                            </Button>
                            <Button
                                size="sm"
                                variant={interview.reviewStatus === "reject" ? "default" : "outline"}
                                className={interview.reviewStatus === "reject" ? "bg-red-700 hover:bg-red-700" : "hover:text-red-700 hover:border-red-200"}
                                onClick={() => handleUpdateStatus("reject")}
                            >
                                <XCircle className="w-4 h-4 mr-2" /> Reject
                            </Button>
                            <Button
                                size="sm"
                                variant={interview.reviewStatus === "maybe" ? "default" : "outline"}
                                className={interview.reviewStatus === "maybe" ? "bg-amber-600 hover:bg-amber-600" : "hover:text-amber-600 hover:border-amber-200"}
                                onClick={() => handleUpdateStatus("maybe")}
                            >
                                <HelpCircle className="w-4 h-4 mr-2" /> Maybe
                            </Button>
                        </div>
                    )}
                </div>
            </header>

            {/* Tab Navigation */}
            <div className="container mx-auto px-6 pt-6">
                <div className="flex space-x-1 border-b border-slate-200">
                    {tabList.map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${activeTab === tab
                                ? 'text-primary border-primary'
                                : 'text-slate-500 border-transparent hover:text-slate-700'
                                }`}
                        >
                            {tab.charAt(0).toUpperCase() + tab.slice(1)}
                        </button>
                    ))}
                </div>
            </div>

            <main className="container mx-auto px-6 py-8">
                {/* Overview Tab */}
                {activeTab === 'overview' && (
                    <div className="space-y-8 animate-fadeIn">
                        {/* Section 1: Candidate & Role Overview */}
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

                            {/* Candidate Card */}
                            <Card className="lg:col-span-8 border-slate-200 shadow-lg overflow-hidden pt-0">
                                <div className={`${statusConfig.color} p-6`}>
                                    <div className="flex items-center gap-6 flex-wrap">
                                        <div className="w-20 h-20 rounded-full bg-white p-1 shadow-lg">
                                            <div className="w-full h-full bg-slate-100 rounded-full flex items-center justify-center text-slate-400">
                                                <User className="w-10 h-10" />
                                            </div>
                                        </div>
                                        <div className="text-white">
                                            <h2 className="text-2xl font-bold">{interview.candidateId.name}</h2>
                                            <p className="flex items-center gap-2 text-sm opacity-90">
                                                <MapPin className="w-4 h-4" /> {interview.candidateId.address}
                                            </p>
                                        </div>
                                        <div className="ml-auto">
                                            <Badge className={`${statusConfig.color} font-medium`}>
                                                <StatusIcon className="w-3 h-3 mr-1" />
                                                {statusConfig.label}
                                            </Badge>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-8">
                                        <div className="space-y-6">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
                                                    <Mail className="w-5 h-5" />
                                                </div>
                                                <div>
                                                    <p className="text-xs text-slate-500 font-medium uppercase">Email</p>
                                                    <p className="font-medium text-slate-900">{interview.candidateId.email}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center text-green-600">
                                                    <Phone className="w-5 h-5" />
                                                </div>
                                                <div>
                                                    <p className="text-xs text-slate-500 font-medium uppercase">Phone</p>
                                                    <p className="font-medium text-slate-900">{interview.candidateId.phoneNumber}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="space-y-6">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center text-purple-600">
                                                    <BookOpen className="w-5 h-5" />
                                                </div>
                                                <div>
                                                    <p className="text-xs text-slate-500 font-medium uppercase">Qualification</p>
                                                    <p className="font-medium text-slate-900">{interview.candidateId.qualification}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600">
                                                    <Linkedin className="w-5 h-5" />
                                                </div>
                                                <div>
                                                    <p className="text-xs text-slate-500 font-medium uppercase">Social</p>
                                                    <a href={interview.candidateId.linkedinProfile} target="_blank" className="text-blue-600 hover:underline font-medium truncate block max-w-[200px]">
                                                        LinkedIn Profile
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {interview.candidateId.skills.length > 0 && (
                                        <div className="mt-8">
                                            <p className="text-xs text-slate-500 font-medium uppercase mb-3">Skills Detected</p>
                                            <div className="flex flex-wrap gap-2">
                                                {interview.candidateId.skills.map((skill) => (
                                                    <Badge key={skill} variant="secondary" className="px-3 py-1 bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200">
                                                        {skill.trim()}
                                                    </Badge>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </Card>

                            {/* Job Details Sidebar */}
                            <Card className="lg:col-span-4 border-slate-200 shadow-lg h-full pt-0">
                                <CardHeader className="bg-gradient-to-r from-slate-50 to-slate-100 border-b p-8 pb-0">
                                    <CardTitle className="text-lg font-bold text-slate-800 flex items-center gap-2">
                                        <Briefcase className="w-5 h-5" />
                                        Target Role
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div>
                                        <p className="text-xs text-slate-500 font-medium uppercase mb-1">Position</p>
                                        <h3 className="text-2xl font-bold text-slate-900">{interview.jobName}</h3>
                                        <p className="text-sm text-slate-600 mt-1">{interview.category}</p>
                                    </div>

                                    <Separator />

                                    {interview.expectedSalary && role !== "candidate" && (
                                        <>
                                            <div className="flex justify-between items-center">
                                                <div>
                                                    <p className="text-xs text-slate-500 font-medium uppercase mb-1">Expected Salary</p>
                                                    <p className="font-medium text-slate-800 flex items-center text-lg">
                                                        <DollarSign className="w-4 h-4 mr-1 text-green-600" />
                                                        {interview.expectedSalary}
                                                    </p>
                                                </div>

                                            </div>

                                            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-5 rounded-lg border border-blue-100">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <TrendingUp className="w-5 h-5 text-blue-600" />
                                                    <p className="text-xs text-blue-700 font-bold uppercase">AI Recommendation</p>
                                                </div>
                                                <p className="text-xl font-bold text-blue-900">{interview.recommendation}</p>
                                            </div>
                                        </>
                                    )}
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                )}

                {/* Scores Tab */}
                {activeTab === 'scores' && role !== "candidate" && (
                    <div className="space-y-8 animate-fadeIn">
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                            <ScoreCircle
                                score={interview.scores.overallFit}
                                label="Overall Match"
                                color="text-blue-600"
                            />
                            <ScoreCircle
                                score={interview.scores.communication}
                                label="Communication"
                                color="text-indigo-600"
                            />
                            <ScoreCircle
                                score={interview.scores.knowledge}
                                label="Technical Knowledge"
                                color="text-violet-600"
                            />
                            <ScoreCircle
                                score={interview.scores.attitude}
                                label="Professional Attitude"
                                color="text-fuchsia-600"
                            />
                        </div>

                        <Card className="border-slate-200 shadow-lg pt-0">
                            <CardHeader className="bg-gradient-to-r from-slate-50 to-slate-100 border-b p-4 pb-0">
                                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                                    <BarChart3 className="w-5 h-5" />
                                    Detailed Competency Breakdown
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="pt-6 space-y-6">
                                <ProgressBar
                                    value={interview.scores.communication}
                                    colorClass="bg-indigo-500"
                                    label="Communication Skills"
                                />
                                <ProgressBar
                                    value={interview.scores.knowledge}
                                    colorClass="bg-violet-500"
                                    label="Technical Knowledge"
                                />
                                <ProgressBar
                                    value={interview.scores.attitude}
                                    colorClass="bg-fuchsia-500"
                                    label="Professional Attitude"
                                />
                            </CardContent>
                        </Card>
                    </div>
                )}

                {/* Insights Tab */}
                {activeTab === 'insights' && role !== "candidate" && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-fadeIn">
                        <Card className="border-slate-200 shadow-xl pt-0">
                            <CardHeader className="bg-gradient-to-r from-green-50 to-green-100 border-b border-green-200 p-4 pb-0">
                                <CardTitle className="text-green-900 text-base flex items-center gap-2">
                                    <Award className="w-5 h-5" />
                                    Key Strengths & Insights
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="pt-6">
                                <ul className="space-y-4">
                                    {[interview.keyInsights1, interview.keyInsights2, interview.keyInsights3, interview.keyInsights4].map((insight, idx) => (
                                        insight && (
                                            <li key={idx} className="flex items-start gap-3 text-sm text-slate-700 leading-relaxed">
                                                <span className="mt-1.5 w-2 h-2 rounded-full bg-emerald-500 flex-shrink-0"></span>
                                                {insight}
                                            </li>
                                        )
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>

                        <Card className="border-slate-200 shadow-xl pt-0">
                            <CardHeader className="bg-gradient-to-r from-slate-50 to-slate-100 border-b border-slate-200 p-4 pb-0 ">
                                <CardTitle className="text-slate-800 text-base flex items-center gap-2">
                                    <FileText className="w-5 h-5" />
                                    Executive Summary
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="pt-6">
                                <div className="space-y-4">
                                    {interview.summary.map((item, idx) => (
                                        <p key={idx} className="text-sm text-slate-600 leading-relaxed border-l-2 border-slate-300 pl-4">
                                            {item}
                                        </p>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                )}

                {/* Transcript Tab */}
                {activeTab === 'transcript' && (
                    <Card className="border-slate-200 shadow-lg animate-fadeIn pt-0">
                        <CardHeader className="bg-gradient-to-r from-slate-50 to-slate-100 border-b border-slate-200 p-4 pb-0">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                <div>
                                    <CardTitle className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                                        <MessageSquare className="w-5 h-5" />
                                        Interview Transcript
                                    </CardTitle>
                                    <p className="text-sm text-slate-500 mt-1">Verbatim record of the evaluation session</p>
                                </div>
                                {/* <div className="flex gap-2">
                                    <Button variant="outline" size="sm" className="flex items-center gap-2">
                                        <Download className="w-4 h-4" />
                                        Export
                                    </Button>
                                    <Button variant="outline" size="sm" className="flex items-center gap-2">
                                        <Share2 className="w-4 h-4" />
                                        Share
                                    </Button>
                                </div> */}
                            </div>
                        </CardHeader>
                        <CardContent className="bg-slate-50/30 p-0">
                            <div className="max-h-[600px] overflow-y-auto p-6 space-y-6">
                                {interview.transcript.map((msg, idx) => {
                                    const isCandidate = msg.role === 'user';
                                    return (
                                        <div key={idx} className={`flex gap-4 ${isCandidate ? 'justify-end' : 'justify-start'}`}>
                                            {!isCandidate && (
                                                <div className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center text-white text-sm font-bold shrink-0">
                                                    AI
                                                </div>
                                            )}

                                            <div className={`max-w-[80%] ${isCandidate ? 'items-end' : 'items-start'} flex flex-col`}>
                                                <span className="text-xs uppercase tracking-wider text-slate-400 mb-1 px-1">
                                                    {msg.role}
                                                </span>
                                                <div className={`p-4 rounded-2xl text-sm leading-relaxed shadow-sm ${isCandidate
                                                    ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-tr-none'
                                                    : 'bg-white border border-slate-200 text-slate-700 rounded-tl-none'
                                                    }`}>
                                                    {msg.content}
                                                </div>
                                            </div>

                                            {isCandidate && (
                                                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 text-sm font-bold shrink-0">
                                                    {interview.candidateId.name.charAt(0)}
                                                </div>
                                            )}
                                        </div>
                                    )
                                })}
                            </div>
                        </CardContent>
                    </Card>
                )}
            </main>

            <style jsx>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fadeIn {
                    animation: fadeIn 0.5s ease-out;
                }
            `}</style>
        </div>
    );
};

export default InterviewDetail;