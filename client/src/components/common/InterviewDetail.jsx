/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getReq, putReq } from "@/axios/axios";
import API_ENDPOINTS from "@/config/api";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ToastContainer } from "react-toastify";
import {
    User,
    Mail,
    Building2,
    Briefcase,
    FileCheck2,
    FileText,
    MoveLeft,
    MapPin,
    BookOpen,
    SquarePlus,
} from "lucide-react";
import { useAuth } from "@/layout/context/AuthContext";

const InterviewDetail = () => {
    const { id } = useParams();
    const { role } = useAuth();
    const [interview, setInterview] = useState(null);
    const [companyName, setCompanyName] = useState("");
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate()

    const handleNavigate = () => {
        if (role === "admin") {
            navigate("/admin/transcripts")
        } else if (role === "candidate") {
            navigate("/candidate/transcript")
        } else {
            navigate("/client/transcript")
        }
    }

    const fetchData = async () => {
        try {
            const res = await getReq(API_ENDPOINTS.INTERVIEW);
            const company = await getReq(API_ENDPOINTS.COMPANIES_NAMES);
            const found = res?.interviews?.find((item) => item._id === id);
            setInterview(found);
            setCompanyName(company.filter((item) => item._id === found.position.company));
        } catch (err) {
            console.error("Error fetching interview:", err);
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

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="loader"></div>
            </div>
        );
    }
    console.log(interview);

    if (!interview) {
        return (
            <div className="flex items-center justify-center min-h-screen text-gray-600">
                No interview data found.
            </div>
        );
    }

    return (
        <div className="px-6 py-6 text-gray-800">
            <ToastContainer />
            <MoveLeft className="absolute -top-0.5 text-secondary/40" onClick={handleNavigate} />
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b pb-4 mb-6">
                <div className="flex items-center gap-4 flex-wrap">
                    <div className="w-20 h-20 rounded-full bg-gray-200 overflow-hidden flex items-center justify-center">
                        <User className="w-10 h-10 text-gray-500" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold">{interview?.name}</h1>
                        <p className="flex items-center gap-1"><BookOpen className="h-4 w-4" /> {interview?.candidateId?.qualification}</p>
                        <div className="flex flex-wrap gap-2 mt-2 text-sm text-gray-500">
                            <span className="flex items-center gap-1">
                                <Mail className="h-4 w-4" /> {interview?.email}
                            </span>
                            <span className="flex items-center gap-1">
                                <MapPin className="h-4 w-4" />{" "}
                                {interview?.candidateId?.address}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Score */}
                {role !== "candidate" && <div className="bg-linear-to-br from-blue-100 to-blue-50 border border-blue-200 rounded-xl px-6 py-4 text-center shadow-sm">
                    <p className="text-sm font-medium text-blue-700">Overall Fit Score</p>
                    <h2 className="text-3xl font-bold text-blue-800">89%</h2>
                    <p className="text-green-600 text-sm font-semibold">Excellent Match</p>
                </div>}
            </div>

            {/* Status Buttons */}
            {role === "admin" && (
                <div className="flex justify-end gap-3 mb-6">
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
                </div>
            )}

            {/* Metrics Section */}
            {role !== "candidate" && <> <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                <Card className="p-5 border border-gray-200 bg-white shadow-sm hover:shadow-md transition">
                    <p className="text-gray-500 text-sm mb-1">Communication</p>
                    <h2 className="text-2xl font-bold text-gray-800">94%</h2>
                    <p className="text-green-500 text-xs">+10% from avg</p>
                </Card>

                <Card className="p-5 border border-gray-200 bg-white shadow-sm hover:shadow-md transition">
                    <p className="text-gray-500 text-sm mb-1">Technical Skills</p>
                    <h2 className="text-2xl font-bold text-gray-800">85%</h2>
                    <p className="text-blue-500 text-xs">+2% from avg</p>
                </Card>

                <Card className="p-5 border border-gray-200 bg-white shadow-sm hover:shadow-md transition">
                    <p className="text-gray-500 text-sm mb-1">Cultural Fit</p>
                    <h2 className="text-2xl font-bold text-gray-800">88%</h2>
                    <p className="text-green-500 text-xs">+5% from avg</p>
                </Card>
            </div>

                {/* Leadership & Prediction */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <Card className="p-5 bg-linear-to-br from-indigo-50 to-white border border-indigo-100">
                        <h3 className="text-lg font-semibold mb-2 text-indigo-700">
                            Leadership Style
                        </h3>
                        <p className="text-sm text-gray-700">
                            Servant leader with focus on team empowerment and development.
                            Demonstrates high emotional intelligence and conflict resolution
                            skills.
                        </p>
                        <div className="flex gap-2 mt-3">
                            <Badge className="bg-blue-100 text-blue-700">Collaborative</Badge>
                            <Badge className="bg-purple-100 text-purple-700">Empathetic</Badge>
                        </div>
                    </Card>

                    <Card className="p-5 bg-linear-to-br from-green-50 to-white border border-green-100">
                        <h3 className="text-lg font-semibold mb-2 text-green-700">
                            Performance Prediction
                        </h3>
                        <p className="text-sm text-gray-700">
                            Projected 6-month performance: <strong>91% success probability.</strong>{" "}
                            Strong retention likelihood based on trajectory analysis.
                        </p>
                        <div className="flex gap-2 mt-3">
                            <Badge className="bg-green-100 text-green-700">High Retention</Badge>
                            <Badge className="bg-blue-100 text-blue-700">Fast Ramp-Up</Badge>
                        </div>
                    </Card>
                </div>
            </>}

            {/* Position Info */}
            <Card className="p-5 border border-gray-200 bg-white shadow-sm mb-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                    Position Information
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 text-sm">
                    <div>
                        <p className="text-gray-500 flex items-center gap-1 mb-1">
                            <SquarePlus className="h-4 w-4 text-gray-400" /> Job Title
                        </p>
                        <p className="font-medium">{interview.position.name}</p>
                    </div>
                    <div>
                        <p className="text-gray-500 flex items-center gap-1 mb-1">
                            <Building2 className="h-4 w-4 text-gray-400" /> Company
                        </p>
                        <p className="font-medium">{companyName?.[0]?.name || "N/A"}</p>
                    </div>
                    <div>
                        <p className="text-gray-500 flex items-center gap-1 mb-1">
                            <Briefcase className="h-4 w-4 text-gray-400" /> Category
                        </p>
                        <p className="font-medium">{interview.position.category}</p>
                    </div>
                    <div>
                        <p className="text-gray-500 flex items-center gap-1 mb-1">
                            <FileCheck2 className="h-4 w-4 text-gray-400" /> Review Status
                        </p>
                        <Badge variant={getBadgeVariant(interview.reviewStatus)}>
                            {interview.reviewStatus}
                        </Badge>
                    </div>
                </div>

                <Separator className="my-4" />

                <p className="text-gray-500 flex items-center gap-1 mb-2">
                    <FileText className="h-4 w-4 text-gray-400" /> Job Description
                </p>
                <p className="text-sm text-gray-700">
                    {interview.position.positionDescription}
                </p>
            </Card>

            {/* Summary + Transcript */}
            {interview.summary && (
                <Card className="p-5 mb-6 border border-gray-200 bg-gray-50 shadow-sm">
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">Summary</h3>
                    <p className="text-sm text-gray-700 whitespace-pre-line">
                        {interview.summary}
                    </p>
                </Card>
            )}

            {interview.transcript && (
                <Card className="p-5 mb-6 border border-gray-200 bg-gray-50 shadow-sm">
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">Transcript</h3>
                    <p className="text-sm text-gray-700 whitespace-pre-line">
                        {interview.transcript}
                    </p>
                </Card>
            )}

            {/* Key Strengths / Areas */}
            {role !== "candidate" && <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <Card className="p-5 bg-linear-to-br from-green-50 to-white border border-green-100">
                    <h3 className="text-lg font-semibold text-green-700 mb-2">
                        Key Strengths
                    </h3>
                    <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                        <li>98% occupancy achievement with 4.8-star rating</li>
                        <li>60% reduction in complaint resolution time</li>
                        <li>Strong internal promotions & low turnover</li>
                    </ul>
                </Card>

                <Card className="p-5 bg-linear-to-br from-yellow-50 to-white border border-yellow-100">
                    <h3 className="text-lg font-semibold text-yellow-700 mb-2">
                        Areas to Explore
                    </h3>
                    <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                        <li>Experience primarily in luxury segment</li>
                        <li>May need orientation to different market tiers</li>
                        <li>Expand multi-property management experience</li>
                    </ul>
                </Card>
            </div>}

            {/* Footer Date */}
            <div className="text-right mt-6 text-sm text-gray-500">
                Created on: {formatDate(interview.createdAt)}
            </div>
        </div>
    );
};

export default InterviewDetail;
