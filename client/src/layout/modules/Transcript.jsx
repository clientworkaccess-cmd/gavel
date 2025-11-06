/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { toast, ToastContainer } from "react-toastify";
import { deletReq, getReq } from "@/axios/axios";
import API_ENDPOINTS from "@/config/api";
import { useAuth } from "../context/AuthContext";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const Transcript = () => {
    const { userId, user, role } = useAuth();
    const [dataRows, setDataRows] = useState([])
    const [filterdData, setFilteredData] = useState([])
    const [searchValue, setSearchValue] = useState("")
    const [showDelete, setShowDelete] = useState(false)
    const [interviewId, setInterviewId] = useState(null)
    const navigate = useNavigate()

    // 🔹 Fetch Data
    const fetchDashboardData = async () => {
        try {
            if (role === "admin") {
                const res = await getReq(API_ENDPOINTS.INTERVIEW);
                if (res) {
                    setDataRows(res.interviews || []);
                }
            } else if (role === "candidate") {
                const res = await getReq(`${API_ENDPOINTS.INTERVIEW}/${userId}`);
                if (res) {
                    setDataRows(res.interviews || []);
                }
            } else {
                const res = await getReq(API_ENDPOINTS.INTERVIEW);

                if (res) {
                    const interview = res.interviews.filter(item => item.position.company === user.company[0])
                    setDataRows(interview);
                }
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to load dashboard data");
        }
    };

    useEffect(() => {
        fetchDashboardData();
    }, [role]);

    useEffect(() => {
        if (!searchValue.trim()) {
            setFilteredData(dataRows);
            return;
        }

        const search = searchValue.toLowerCase();
        const filtered = dataRows.filter(
            (row) =>
                row?.email?.toLowerCase().includes(search) ||
                row?.position?.name?.toLowerCase().includes(search) ||
                row?.position?.positionDescription?.toLowerCase().includes(search) ||
                row?.reviewStatus?.toLowerCase().includes(search)
        );

        setFilteredData(filtered);
    }, [searchValue, dataRows]);

    const handleDelete = async () => {
        await deletReq(`${API_ENDPOINTS.INTERVIEW}/${interviewId}`)
        setShowDelete(false)
        await fetchDashboardData()
    }

    const columns = [
        "Candidate",
        "Position",
        "Interview Data & Time",
        "Review Status",
    ]


    return (
        <div className="p-8 pt-4 bg-gray-50 min-h-screen space-y-8">
            <ToastContainer />
            {/* Table Section */}
            <Card className="mt-6">
                <CardHeader className="flex flex-wrap justify-between gap-4 items-center w-full">
                    <h3 className="text-xl font-semibold">
                        {role === "candidate" ? "All Applications" : "All Interviews"}
                    </h3>
                    <Input className="w-60" placeholder="Search something...." value={searchValue} onChange={(e) => setSearchValue(e.target.value)}></Input>
                </CardHeader>
                <CardContent>
                    <div className="overflow-auto">
                        <Table>
                            <TableHeader>
                                <TableRow >
                                    {columns.map((col, ind) => (
                                        <TableHead key={ind} >{col}</TableHead>
                                    ))}
                                    <TableHead className={role === "admin" && "text-center"}>Action</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {dataRows.length === 0 ? (
                                    <TableRow>
                                        <TableCell
                                            colSpan={columns.length}
                                            className="text-center text-gray-500 py-6"
                                        >
                                            No records found
                                        </TableCell>
                                    </TableRow>
                                ) : filterdData.length > 0 ? (
                                    filterdData?.map((row, idx) => (
                                        <TableRow key={idx}>
                                            <TableCell>{row?.email}</TableCell>
                                            <TableCell>{row?.position?.name}</TableCell>
                                            <TableCell>{new Date(row?.createdAt).toLocaleString()}</TableCell>
                                            <TableCell>{row?.reviewStatus}</TableCell>
                                            <TableCell className={role === "admin" && "flex gap-2 items-center justify-center"}>
                                                <Button variant="outline" onClick={() => navigate(role === "candidate" ? `/candidate/interview-detail/${row._id}` : role === "admin" ? `/admin/interview-detail/${row._id}` : `/client/interview-detail/${row._id}`)}>
                                                    View Details
                                                </Button>
                                                {role === "admin" && <Button variant="destructive" onClick={() => { setShowDelete(true); setInterviewId(row._id) }}>
                                                    Delete
                                                </Button>}
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    dataRows?.map((row, idx) => (
                                        <TableRow key={idx}>
                                            <TableCell>{row?.email}</TableCell>
                                            <TableCell>{row?.position?.name}</TableCell>
                                            <TableCell>{new Date(row?.createdAt).toLocaleString()}</TableCell>
                                            <TableCell>{row?.reviewStatus}</TableCell>
                                            <TableCell className={role === "admin" && "flex gap-2 items-center justify-center"}>
                                                <Button variant="outline" onClick={() => navigate(role === "candidate" ? `/candidate/interview-detail/${row._id}` : role === "admin" ? `/admin/interview-detail/${row._id}` : `/client/interview-detail/${row._id}`)}>
                                                    View Details
                                                </Button>
                                                {role === "admin" && <Button variant="destructive" onClick={() => { setShowDelete(true); setInterviewId(row._id) }}>
                                                    Delete
                                                </Button>}
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>

            <Dialog open={showDelete} onOpenChange={setShowDelete}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Confirm Delete</DialogTitle>
                    </DialogHeader>
                    <p className="text-sm text-gray-600">
                        Are you sure you want to delete?
                    </p>
                    <DialogFooter className="flex justify-end gap-2 mt-4">
                        <Button variant="destructive" onClick={handleDelete}>
                            Yes, Delete
                        </Button>
                        <Button variant="outline" onClick={() => setShowDelete(false)}>
                            Cancel
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div >
    );
};

export default Transcript;
