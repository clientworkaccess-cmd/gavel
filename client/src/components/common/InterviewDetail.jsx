/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getReq, putReq } from "@/axios/axios";
import API_ENDPOINTS from "@/config/api";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Loader2 } from "lucide-react";
import { Button } from "../ui/button";
import { useAuth } from "@/layout/context/AuthContext";
import { ToastContainer } from "react-toastify";

const InterviewDetail = () => {
    const { id } = useParams();
    const { role } = useAuth()
    const [interview, setInterview] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        try {
            const res = await getReq(API_ENDPOINTS.INTERVIEW);
            const found = res?.interviews?.find((item) => item._id === id);
            setInterview(found);
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
        await putReq(`${API_ENDPOINTS.INTERVIEW}/${id}`, { reviewStatus: status })
        fetchData()
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <Loader2 className="w-6 h-6 animate-spin text-gray-500" />
            </div>
        );
    }

    if (!interview) {
        return (
            <div className="flex items-center justify-center min-h-[60vh] text-gray-600">
                No interview data found.
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto mt-8 px-4">
            <ToastContainer />
            <Card className="shadow-md border border-gray-100 rounded-2xl">
                <CardHeader>
                    <CardTitle className="text-2xl font-semibold text-gray-800 flex flex-wrap gap-4 items-center justify-between">
                        Interview Details
                        {role === "admin" && <span className="flex flex-wrap gap-2 items-center">
                            <Button variant="outline" className="text-xs p-2" onClick={() => handleUpdateStatus("approved")} disabled={interview.reviewStatus === "approved"}>Approved</Button>
                            <Button variant="destructive" className="text-xs p-2" onClick={() => handleUpdateStatus("reject")} disabled={interview.reviewStatus === "reject"}>Rejected</Button>
                        </span>}
                    </CardTitle>
                </CardHeader>

                <CardContent className="space-y-6">
                    {/* Candidate Information */}
                    <section>
                        <h2 className="text-lg font-semibold mb-2 text-gray-700">
                            Candidate Information
                        </h2>
                        <Separator className="mb-3" />
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div>
                                <p className="text-sm text-gray-500">Name</p>
                                <p className="font-medium">{interview.name}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Email</p>
                                <p className="font-medium">{interview.email}</p>
                            </div>
                            <div className="sm:text-center">
                                <p className="text-sm text-gray-500">Review Status</p>
                                <Badge
                                    variant={
                                        interview.reviewStatus === "pending"
                                            ? "secondary text-white"
                                            : interview.reviewStatus === "reject" 
                                            ? "destructive"
                                            : "success"
                                    }
                                >
                                    {interview.reviewStatus}
                                </Badge>
                            </div>
                            <div className="sm:col-span-3">
                                <p className="text-sm text-gray-500">Candidate ID</p>
                                <p className="font-mono text-sm text-gray-700">
                                    {interview.candidateId}
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Position Information */}
                    <section>
                        <h2 className="text-lg font-semibold mb-2 text-gray-700">
                            Position Information
                        </h2>
                        <Separator className="mb-3" />
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div>
                                <p className="text-sm text-gray-500">Category</p>
                                <p className="font-medium">{interview.position?.category}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Company ID</p>
                                <p className="font-mono text-sm text-gray-700">
                                    {interview.position?.company}
                                </p>
                            </div>
                            <div className="sm:text-center">
                                <p className="text-sm text-gray-500">Status</p>
                                <Badge
                                    variant={
                                        interview.position?.status === "open"
                                            ? "outline"
                                            : "destructive"
                                    }
                                >
                                    {interview.position?.status}
                                </Badge>
                            </div>
                            <div className="sm:col-span-3">
                                <p className="text-sm text-gray-500">Description</p>
                                <p className="font-medium">
                                    {interview.position?.positionDescription}
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Interview Metadata */}
                    <section>
                        <h2 className="text-lg font-semibold mb-2 text-gray-700">
                            Interview Metadata
                        </h2>
                        <Separator className="mb-3" />
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div>
                                <p className="text-sm text-gray-500">Interview ID</p>
                                <p className="font-mono text-sm text-gray-700">
                                    {interview.interviewID}
                                </p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Status</p>
                                <Badge variant="outline">{interview.status}</Badge>
                            </div>
                            <div className="sm:text-center">
                                <p className="text-sm text-gray-500">Submitted Date</p>
                                <p className="font-medium">
                                    {new Date(interview.createdAt).toLocaleDateString()}
                                </p>
                            </div>
                        </div>
                    </section>

                    {interview.summary && (
                        <section>
                            <h2 className="text-lg font-semibold mb-2 text-gray-700">
                                Summary
                            </h2>
                            <Separator className="mb-3" />
                            <p className="bg-gray-50 p-3 rounded-lg text-sm text-gray-700">
                                {interview.summary}
                            </p>
                        </section>
                    )}

                    {/* Transcript Section */}
                    {interview.transcript && (
                        <section>
                            <h2 className="text-lg font-semibold mb-2 text-gray-700">
                                Transcript
                            </h2>
                            <Separator className="mb-3" />
                            <p className="bg-gray-50 p-3 rounded-lg text-sm text-gray-700">
                                {interview.transcript}
                            </p>
                        </section>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};

export default InterviewDetail;
