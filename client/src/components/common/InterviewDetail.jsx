import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getReq, putReq } from "@/axios/axios";
import API_ENDPOINTS from "@/config/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ToastContainer } from "react-toastify";
import { Mail, MapPin, MoveLeft, Phone, Linkedin, ChevronRight, CheckCircle2, XCircle, HelpCircle, Clock, FileText, BriefcaseBusiness, FileTextIcon, FolderKanban } from "lucide-react";
import { useAuth } from "@/layout/context/AuthContext";
import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import AiRecomandationSection from "./AiRecomandationSection";


const dummyCompany = {
    name: "Commercial Real Estate Attorney",
    address: "123 Main St, Springfield, USA",
    website: "https://www.creattorney.com",
    industry: "Legal Services",
}

const InterviewDetail = ({ dummyData }) => {
    const { id } = useParams();
    const { role } = useAuth();
    const [interview, setInterview] = useState(null);
    const [loading, setLoading] = useState(true);
    const [company, setCompany] = useState()
    const [activeTab, setActiveTab] = useState('overview');
    const [skillsLength, setSkillsLength] = useState(4);
    const navigate = useNavigate();

    const handleNavigate = () => {
        if (role === "admin") navigate("/admin/transcripts");
        else if (role === "candidate") navigate("/candidate/transcript");
        else navigate("/client/transcript");
        if (dummyData) {
            navigate('/');
        }
    };

    const fetchData = async () => {
        try {
            const res = await getReq(API_ENDPOINTS.INTERVIEW);
            const found = res?.interviews?.find((item) => item._id === id);
            const comp = await getReq(API_ENDPOINTS.COMPANY)
            const singleComp = comp?.find((item) => item.positions.some((p) => p.name === found.jobName))
            setInterview(found || dummyData || null);
            setCompany(singleComp || dummyCompany);
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

    const getStatusConfig = (status) => {
        switch (status) {
            case "approved": return { color: "bg-[#1eb108]", label: "Approved", icon: CheckCircle2 };
            case "reject": return { color: "bg-red-500", label: "Rejected", icon: XCircle };
            case "pending": return { color: "bg-yellow-700", label: "Pending", icon: Clock };
            default: return { color: "bg-yellow-700", label: "Maybe", icon: HelpCircle };
        }
    };

    const ProgressBar = ({ value, colorClass, label }) => (
        <div>
            <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium text-muted-foreground">{label}</span>
                <span className="text-sm font-bold text-foreground">{value}/100</span>
            </div>
            <div className="h-2 w-full bg-muted rounded-full">
                <motion.div
                    className={`h-full rounded-full ${colorClass}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${value}%` }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                />
            </div>
        </div>
    );

    if (loading)
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-background">
                <div className="w-16 h-16 border-4 border-primary/20 rounded-full border-t-primary animate-spin"></div>
                <p className="mt-4 text-muted-foreground">Loading Report...</p>
            </div>
        );

    if (!interview)
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-background">
                <div className="text-center p-8">
                    <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <h2 className="text-2xl font-semibold text-foreground mb-2">Interview Not Found</h2>
                    <p className="text-muted-foreground mb-6">This interview report could not be located.</p>
                    <Button variant="outline" onClick={handleNavigate}>Return to Dashboard</Button>
                </div>
            </div>
        );

    const statusConfig = getStatusConfig(interview.reviewStatus);
    const StatusIcon = statusConfig.icon;
    const tabList = role !== "candidate" ? ['overview', 'scores', 'insights', 'transcript'] : ['overview', 'transcript'];


    return (
        <div className="min-h-screen text-foreground sm:px-4 overflow-y-auto">
            <ToastContainer theme="dark" />
            <header className="sticky top-0 z-40 backdrop-blur-lg border-b border-border ">
                <div className="container mx-auto px-4 h-16 flex items-center  justify-between">
                    <div className="flex items-center  gap-4">
                        <Button variant="ghost" size="icon" onClick={handleNavigate}>
                            <MoveLeft className="w-4 h-5" />
                        </Button>
                        <div>
                            <h1 className="text-lg font-semibold">Interview Report</h1>
                            <p className="text-xs text-muted-foreground">{interview.candidateId.name} for {interview.jobName}</p>
                        </div>
                    </div>
                </div>
            </header>

            <div className={`container mx-auto sm:px-4 py-8 ${dummyData && "py-4"}`}>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {/* Left Sidebar */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        className="space-y-7"
                    >
                        <Card className="pt-0 bg-transparent max-w-200">
                            <CardHeader className={`h-3 ${statusConfig.color} rounded-t-2xl`}>
                            </CardHeader>
                            <CardContent className="p-6 text-center">
                                <Avatar className="w-24 h-24 mx-auto mb-4 border-4 border-primary/50">
                                    <AvatarImage src={`/assets/images/${interview.candidateId.name.split(' ')[0]}.jpeg`} alt={interview.candidateId.name} />
                                    <AvatarFallback>{interview.candidateId.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                </Avatar>
                                <h2 className="text-2xl font-bold">{interview.candidateId.name}</h2>
                                <p className="text-muted-foreground">{interview.jobName}</p>
                                <div className="mt-4">
                                    <Badge variant="secondary" className={`text-sm ${statusConfig.color} text-white`}>
                                        <StatusIcon className="w-4 h-4 mr-2" />
                                        {statusConfig.label}
                                    </Badge>
                                </div>
                            </CardContent>
                            <Separator />
                            <CardContent className="p-6 space-y-4 text-sm">
                                <div className="flex items-center "><Mail className="w-4 h-4 mr-3 text-muted-foreground" /> {interview.candidateId.email}</div>
                                <div className="flex items-center "><Phone className="w-4 h-4 mr-3 text-muted-foreground" /> {interview.candidateId.phoneNumber}</div>
                                <div className="flex items-center "><MapPin className="w-4 h-4 mr-3 text-muted-foreground" /> {interview.candidateId.address || "Not specified"}</div>
                                <div className="flex items-center "><Linkedin className="w-4 h-4 mr-3 text-muted-foreground" /> <a href={interview.candidateId.linkedinProfile} className="text-primary hover:underline">{interview.candidateId.linkedinProfile ? "LinkedIn Profile" : "Not specified"}</a></div>
                            </CardContent>
                        </Card>
                        <Card className="pt-0 bg-transparent">
                            <CardContent className="p-6 pb-2 space-y-2">
                                <h2 className="text-2xl font-bold">Job Details</h2>
                            </CardContent>
                            <Separator />
                            <CardContent className="px-6 text-sm space-y-4">
                                <ul className="space-y-2">
                                    <li className="text-muted-foreground flex gap-2 items-center flex-wrap">Company: <span className="font-bold">{company.name}</span></li>
                                    <li className="text-muted-foreground flex gap-2 items-center flex-wrap">Website: <a className="font-bold" href={company.website} target="_blank">{company.website}</a></li>
                                    <li className="text-muted-foreground flex gap-2 items-center flex-wrap">Industry: <span className="font-bold">{company.industry}</span></li>
                                    <li className="text-muted-foreground flex gap-2 items-center flex-wrap">Location: <span className="font-bold">{company.address}</span></li>
                                </ul>
                                <Separator />
                                <ul className="space-y-2">
                                    <li className="text-muted-foreground flex gap-2 items-center flex-wrap">Job Title: <span className="font-bold">{interview.jobName}</span></li>
                                    <li className="text-muted-foreground flex gap-2 items-center flex-wrap">Job Category: <span className="font-bold ">{interview.category.charAt(0).toUpperCase() + interview.category.slice(1)}</span></li>
                                </ul>
                            </CardContent>
                        </Card>

                        <p className="text-muted-foreground flex gap-2 items-center text-sm pl-6">Interview Date: {""}{new Date(interview.createdAt).toLocaleDateString()}</p>

                        {role === "admin" && (
                            <Card className="bg-transparent">
                                <CardHeader>
                                    <CardTitle>Decision</CardTitle>
                                </CardHeader>
                                <CardContent className="flex flex-col space-y-2">
                                    <Button onClick={() => handleUpdateStatus("approved")} variant={interview.reviewStatus === "approved" ? "default" : "outline"} className="w-full justify-start bg-[#1eb108] hover:bg-[#179404]">
                                        <CheckCircle2 className="w-4 h-4 mr-2" /> Approve
                                    </Button>
                                    <Button onClick={() => handleUpdateStatus("reject")} variant={interview.reviewStatus === "reject" ? "default" : "outline"} className="w-full justify-start bg-[#e7080860] hover:bg-red-600">
                                        <XCircle className="w-4 h-4 mr-2" /> Reject
                                    </Button>
                                    <Button onClick={() => handleUpdateStatus("maybe")} variant={interview.reviewStatus === "maybe" ? "default" : "outline"} className="w-full justify-start bg-yellow-700 hover:bg-yellow-500">
                                        <HelpCircle className="w-4 h-4 mr-2" /> Maybe
                                    </Button>
                                </CardContent>
                            </Card>
                        )}
                    </motion.div>

                    {/* Right Content */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="xl:col-span-2"
                    >
                        <div className="border-b border-border space-y-4">
                            {tabList.map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`px-4 py-2 text-sm font-medium transition-colors relative ${activeTab === tab ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`}
                                >
                                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                                    {activeTab === tab && <motion.div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" layoutId="underline" />}
                                </button>
                            ))}
                        </div>

                        <div className="py-8">
                            {activeTab === 'overview' && (
                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-7">
                                   {role !== "candidate" && <AiRecomandationSection score={interview.scores.overallFit} analysis={interview.recommendation}/>}
                                    {/* <Card className="bg-transparent">
                                        <CardHeader><CardTitle>AI Recommendation</CardTitle></CardHeader>
                                        <CardContent>
                                            <p className="text-3xl font-bold text-primary mb-2">{interview.recommendation}</p>
                                            <p className="text-muted-foreground">Based on Interview analysis.</p>
                                        </CardContent>
                                    </Card> */}
                                    <Card className="bg-transparent">
                                        <CardHeader><CardTitle>Candidate Skills</CardTitle></CardHeader>
                                        <CardContent className="flex flex-wrap gap-2">
                                            {interview.candidateId.skills.length > 0 ?
                                                <>
                                                    {interview.candidateId.skills.slice(0, skillsLength).map(skill => <Badge key={skill} variant="secondary">{skill}</Badge>)}
                                                    {interview.candidateId.skills.length > 4 && <Badge variant="outline" className="cursor-pointer" onClick={() => setSkillsLength(prev => prev === interview.candidateId.skills.length ? 4 : interview.candidateId.skills.length)}>
                                                        {skillsLength === interview.candidateId.skills.length ? "Show Less" : "Show More"}
                                                    </Badge>}
                                                </>
                                                : <p className="text-muted-foreground text-sm">Not specified.</p>
                                            }
                                        </CardContent>
                                    </Card>
                                    <Card className="bg-transparent">
                                        <CardHeader><CardTitle>Expected Salary</CardTitle></CardHeader>
                                        <CardContent className="text-[#1eb108]">
                                            {interview.expectedSalary || "Not specified"}
                                        </CardContent>
                                    </Card>
                                    <Card className={`bg-transparent overflow-hidden pb-0  ${role === "candidate" && "md:mt-59"}`}>
                                            <CardContent className="px-6 pb-2">
                                                <h2 className="text-2xl font-bold">Job Description</h2>
                                            </CardContent>
                                            <Separator />
                                            <div className="relative h-[20vh] px-4 overflow-y-auto">
                                                <p className="text-sm whitespace-pre-wrap pr-2">
                                                    {interview.jobDescription}
                                                </p>

                                                <div className="pointer-events-none sticky bottom-0 left-0 right-0 h-6 z-10 bg-gradient-to-t from-background to-[#000000a6]"></div>
                                            </div>
                                    </Card>
                                </motion.div>
                            )}

                            {activeTab === 'scores' && role !== "candidate" && (
                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                                    <Card className="bg-transparent">
                                        <CardHeader><CardTitle>Over All</CardTitle></CardHeader>
                                        <CardContent className="space-y-6">
                                            <ProgressBar value={interview.scores.overallFit} label="Fit Score" colorClass="bg-blue-500" />
                                        </CardContent>
                                    </Card>
                                    <Card className="bg-transparent">
                                        <CardHeader><CardTitle>Detailed Score Breakdown</CardTitle></CardHeader>
                                        <CardContent className="space-y-6">
                                            <ProgressBar value={interview.scores.communication} label="Communication" colorClass="bg-indigo-500" />
                                            <ProgressBar value={interview.scores.knowledge} label="Technical Knowledge" colorClass="bg-violet-500" />
                                            <ProgressBar value={interview.scores.attitude} label="Professional Attitude" colorClass="bg-fuchsia-500" />
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            )}

                            {activeTab === 'insights' && role !== "candidate" && (
                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={`grid grid-cols-1 ${interview?.goodkeyInsights.length > 0 && interview?.badkeyInsights.length > 0 && "md:grid-cols-2"} gap-8`}>
                                    {interview?.goodkeyInsights.length > 0 &&
                                        <Card className="bg-[#1eb108] w-full">
                                            <CardContent>
                                                <ul className="space-y-3">
                                                    {interview?.goodkeyInsights?.map((insight, idx) => (
                                                        <li key={idx} className="flex items-start gap-3"><ChevronRight className="w-5 h-5 text-foreground mt-0.5 shrink-0" />{insight}</li>
                                                    ))}
                                                </ul>
                                            </CardContent>
                                        </Card>}
                                    {interview?.badkeyInsights.length > 0 &&
                                        <Card className="bg-[#e7080860] w-full">
                                            <CardContent>
                                                <ul className="space-y-3">
                                                    {interview?.badkeyInsights?.map((insight, idx) => (
                                                        <li key={idx} className="flex items-start gap-3"><ChevronRight className="w-5 h-5 text-foreground mt-0.5 shrink-0" />{insight}</li>
                                                    ))}
                                                </ul>
                                            </CardContent>
                                        </Card>}
                                    <Card className="md:col-span-2 bg-transparent">
                                        <CardHeader><CardTitle>Executive Summary</CardTitle></CardHeader>
                                        <CardContent className="space-y-4 text-muted-foreground">
                                            {interview.summary.map((item, idx) => <p key={idx}>{item}</p>)}
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            )}

                            {activeTab === 'transcript' && (
                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                    <Card className="pb-0 bg-transparent">
                                        <CardHeader className="border-b"><CardTitle>Interview Transcript</CardTitle></CardHeader>
                                        <CardContent className="space-y-6 max-h-200 overflow-y-auto px-2 py-4 sm:p-4 rounded-lg">
                                            {interview.transcript.map((msg, idx) => (
                                                msg.content && msg.role !== 'tool' && <div key={idx} className={`flex gap-4 ${msg.role === 'user' ? 'justify-end' : ''}`}>
                                                    {msg.role !== 'user' && <Avatar><AvatarFallback>AI</AvatarFallback></Avatar>}
                                                    <div className={`max-w-[70%] p-3 sm:p-4 rounded-lg ${msg.role === 'user' ? 'bg-secondary/40 text-primary-foreground' : 'border bg-[#dbcaca18]'}`}>
                                                        {msg.content}
                                                    </div>
                                                    {msg.role === 'user' && <Avatar><AvatarFallback>{interview.candidateId.name.split(' ').map(n => n[0]).join('')}</AvatarFallback></Avatar>}
                                                </div>
                                            ))}
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            )}
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default InterviewDetail;