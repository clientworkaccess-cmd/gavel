import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getReq, putReq } from "@/axios/axios";
import API_ENDPOINTS from "@/config/api";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ToastContainer } from "react-toastify";
import { User, Mail, MapPin, BookOpen, MoveLeft, Phone, Linkedin, DollarSign } from "lucide-react";
import { useAuth } from "@/layout/context/AuthContext";

const InterviewDetail = () => {
    const { id } = useParams();
    const { role } = useAuth();
    const [interview, setInterview] = useState(null);
    const [loading, setLoading] = useState(true);
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
                month: "short",
                day: "numeric",
            });
        } catch {
            return "—";
        }
    };

    const getBadgeVariant = (status) => {
        switch (status) {
            case "pending":
                return "secondary";
            case "reject":
                return "destructive";
            case "approved":
            case "success":
                return "success";
            default:
                return "outline";
        }
    };

    if (loading)
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="loader"></div>
            </div>
        );

    if (!interview)
        return (
            <div className="flex items-center justify-center min-h-screen text-gray-600">
                No interview data found.
            </div>
        );

    return (
        <div className="px-6 py-6 text-gray-800 space-y-2">
            <ToastContainer />
            <MoveLeft
                className="absolute -top-0.5 text-secondary/40 cursor-pointer"
                onClick={handleNavigate}
            />

            {/* Candidate Info */}
            <div className="flex flex-col sm:flex-row justify-between items-start gap-6 p-6 border rounded-2xl">

                {/* Left Section: Avatar & Basic Info */}
                <div className="flex gap-6 items-center flex-wrap">
                    {/* Avatar */}
                    <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center">
                        <User className="w-12 h-12 text-gray-500" />
                    </div>

                    {/* Candidate Details */}
                    <div className="flex flex-col gap-3">
                        {/* Name */}
                        <h1 className="text-2xl font-bold">{interview.candidateId.name.toUpperCase()}</h1>

                        {/* Qualification & Email */}
                        <div className="flex flex-wrap gap-6 text-gray-500">
                            <p className="flex items-center gap-1">
                                <BookOpen className="h-4 w-4" /> {interview.candidateId.qualification}
                            </p>
                            <p className="flex items-center gap-1">
                                <Mail className="h-4 w-4" /> {interview.candidateId.email}
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-6 text-gray-500">
                            <a href={interview.candidateId.linkedinProfile} target="_blank" className="flex items-center gap-1">
                                <Linkedin className="h-4 w-4" /> {interview.candidateId.linkedinProfile} </a>
                            {interview.expectedSalary && role !== "candidate" && <p className="flex items-center gap-1">
                                <DollarSign className="h-4 w-4" /> {interview.expectedSalary}
                            </p>}
                        </div>

                        {/* Phone & Address */}
                        <div className="flex flex-wrap gap-6 text-gray-500">
                            <p className="flex items-center gap-1">
                                <Phone className="h-4 w-4" /> {interview.candidateId.phoneNumber}
                            </p>
                            <p className="flex items-center gap-1">
                                <MapPin className="h-4 w-4" /> {interview.candidateId.address}
                            </p>
                        </div>

                        {/* Skills */}
                        {interview.candidateId.skills.length > 0 && (
                            <ul className="flex flex-wrap gap-2 mt-2">
                                {interview.candidateId.skills.map((skill) => (
                                    <li
                                        key={skill}
                                        className="text-sm px-3 py-1 rounded-lg bg-gray-100 font-medium"
                                    >
                                        {skill.trim()}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>

                {/* Right Section: Scores & Recommendation */}
                {role !== "candidate" && <div className="flex flex-col items-center justify-center gap-2 p-4 bg-gray-100 min-w-[150px] rounded-2xl">
                    <p className="text-sm font-medium text-blue-700">Overall Fit</p>
                    <h2 className="text-3xl font-bold text-gray-800">
                        {interview.scores.overallFit}%
                    </h2>
                    <p className="text-red-600 font-semibold text-center">{interview.recommendation}</p>
                </div>}

            </div>


            {/* Scores & Recommendation */}
            {role !== "candidate" && <div className="p-5 mb-6 rounded-xl border flex justify-around flex-wrap items-center text-center gap-2">
                <div className="rounded-2xl p-4 bg-gray-100">
                    <p className="text-lg font-medium text-blue-700">Communication</p>
                    <h2 className="text-5xl font-bold text-gray-800">
                        {interview.scores.communication}%
                    </h2>
                </div>
                <div className="rounded-2xl p-4 px-8 bg-gray-100">
                    <p className="text-lg font-medium text-blue-700">Knowledge</p>
                    <h2 className="text-5xl font-bold text-gray-800">
                        {interview.scores.knowledge}%
                    </h2>
                </div>
                <div className="rounded-2xl p-4 px-8 bg-gray-100">
                    <p className="text-lg font-medium text-blue-700">Attitude</p>
                    <h2 className="text-5xl font-bold text-gray-800">
                        {interview.scores.attitude}%
                    </h2>
                </div>

            </div>}

            {/* Admin Action Buttons */}
            {role === "admin" && (
                <div className="flex gap-3 mb-6 justify-end">
                    <Button
                        variant="outline"
                        onClick={() => handleUpdateStatus("approved")}
                        disabled={interview.reviewStatus === "approved"}
                    >
                        Approve
                    </Button>
                    <Button
                        variant="destructive"
                        onClick={() => handleUpdateStatus("reject")}
                        disabled={interview.reviewStatus === "reject"}
                    >
                        Reject
                    </Button>
                    <Button
                        variant="default"
                        onClick={() => handleUpdateStatus("maybe")}
                        disabled={interview.reviewStatus === "maybe"}
                    >
                        Maybe
                    </Button>
                </div>
            )}

            {/* Job & Role Info */}
            <div className="p-5 mb-6 shadow-md rounded-xl border space-y-4">
                <h3 className="text-lg font-bold mb-3">JOB & ROLE INFO</h3>
                <div className="flex gap-4 items-center justify-between flex-wrap">
                    <p className="flex flex-col ">
                        <span className="font-medium mb-1 ">Position</span> {interview.jobName}
                    </p>
                    <p className="flex flex-col ">
                        <span className="font-medium mb-1">Category</span> {interview.category}
                    </p>
                    <p className="flex flex-col ">
                        <span className="font-medium mb-1">Review Status</span>{" "}
                        <Badge variant={getBadgeVariant(interview.reviewStatus)}>
                            {interview.reviewStatus}
                        </Badge>
                    </p>
                </div>
                <p className="flex flex-col">
                    <span className="font-medium ">Job Description</span> {interview.jobDescription}
                </p>
            </div>
            {/* Key Insights */}
            {role !== "candidate" && <div className="p-5 mb-6 shadow-md rounded-xl border ">
                <h3 className="text-lg font-semibold mb-3">Key Insights</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                    <li>{interview.keyInsights1}</li>
                    <li>{interview.keyInsights2}</li>
                    <li>{interview.keyInsights3}</li>
                    <li>{interview.keyInsights4}</li>
                </ul>
            </div>}

            {/* Summary */}
            {role !== "candidate" && <Card className="p-5 mb-6 shadow-md rounded-xl border bg-gray-50">
                <h3 className="text-lg font-semibold mb-3">Summary</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                    {interview.summary.map((item, idx) => (
                        <li key={idx}>{item}</li>
                    ))}
                </ul>
            </Card>}

            {/* Transcript */}
            <Card className="p-5 mb-6 shadow-md rounded-xl border bg-gray-50">
                <h3 className="text-lg font-semibold mb-3">Transcript</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                    {interview.transcript.map((msg, idx) => (
                        <li key={idx}>
                            <span className="capitalize font-medium">{msg.role}:</span> {msg.content}
                        </li>
                    ))}
                </ul>
            </Card>

            {/* Footer */}
            <div className="text-right mt-6 text-sm text-gray-500">
                Evaluated on: {formatDate(interview.evaluatedAt)}
            </div>
        </div>
    );
};

export default InterviewDetail;
