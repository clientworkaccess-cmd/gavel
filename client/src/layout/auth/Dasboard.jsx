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
import { Progress } from "@/components/ui/progress";
import { CheckCircle, Clock, Briefcase, TrendingUp } from "lucide-react";
import { toast } from "react-toastify";
import { getReq } from "@/axios/axios";
import API_ENDPOINTS from "@/config/api";
import { useAuth } from "../context/AuthContext";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import Interview from "../modules/Interviews";

const Dashboard = () => {
  const { userId, user, role } = useAuth();
  const [loading, setLoading] = useState(true);
  const [dataRows, setDataRows] = useState([]);
  const [stats, setStats] = useState({
    completed: 0,
    pending: 0,
    total: 0,
    reject: 0,
  });

  const navigate = useNavigate();

  // 🔹 Fetch Dashboard Data
  const fetchDashboardData = async () => {
    setLoading(true);
    let res;
    let comp;

    if (role === "candidate" && userId) {
      res = await getReq(`${API_ENDPOINTS.INTERVIEW}/${userId}`);
    } else {
      res = await getReq(API_ENDPOINTS.INTERVIEW);
      comp = await getReq(API_ENDPOINTS.COMPANY)
    }

    if (!res || !res.interviews) {
      toast.info("No interviews found");
      return;
    }

    const companyPos = comp?.find((item) => item.members.some((m) => m.role === role));
    const found = companyPos?.positions.map(p => p.name)

    const interviews =
      role === "candidate"
        ? res.interviews
        : res.interviews.filter(i => found.includes(i.jobName))

    setDataRows(interviews);

    const total = interviews.length;
    const completed = interviews.filter((i) => i.reviewStatus === "approved").length;
    const pending = interviews.filter((i) => i.reviewStatus === "pending").length;
    const reject = interviews.filter((i) => i.reviewStatus === "reject").length;

    setStats({ total, completed, pending, reject });
    setLoading(false);
  };

  useEffect(() => {
    if (loading && role && userId) fetchDashboardData();
  }, [loading, role, userId]);

  const columns = ["Candidate", "Position", "Interview Date & Time", "Status", "Action"];

  const cardData = [
    {
      title: "Completed",
      value: stats.completed,
      icon: <CheckCircle className="w-6 h-6 " />,
      color: "from-green-500 to-emerald-600",
    },
    {
      title: "Pending",
      value: stats.pending,
      icon: <Clock className="w-6 h-6" />,
      color: "from-yellow-400 to-orange-500",
    },
    {
      title: "Total",
      value: stats.total,
      icon: <Briefcase className="w-6 h-6" />,
      color: "from-indigo-500 to-purple-600",
    },
    {
      title: "Rejected",
      value: stats.reject,
      icon: <TrendingUp className="w-6 h-6" />,
      color: "from-red-400 to-pink-500",
    },
  ];

  if (loading) {
    return <div className="min-h-screen w-full flex justify-center items-center">
      <div className="loader"></div>
    </div>
  }

  if (role === "candidate" && stats.total === 0) {
    return <Interview />
  }

  return (
    <div className="p-8 pt-4 min-h-screen space-y-8">
      {/* Header */}
      <div className="bg-linear-to-r from-blue-500 via-indigo-600 to-purple-600 text-foreground rounded-xl p-8 shadow">
        <h1 className="text-3xl font-bold">
          Welcome Back, {user?.name} 👋
        </h1>
        <p className=" mt-1">
          Overview of your{" "}
          {role === "candidate" ? "applications" : "interviews"}.
        </p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cardData.map((card, i) => (
          <Card
            key={i}
            className="text-foreground shadow-md hover:shadow-lg transition-transform duration-800 hover:scale-105 bg-transparent"
          >
            <CardContent className="p-4 flex items-center gap-4">
              <div className={`bg-gradient-to-r ${card.color} p-3 rounded-full`}>{card.icon}</div>
              <div className="flex-1">
                <p className="text-sm opacity-80">{card.title}</p>
                <h3 className="text-3xl font-bold">{card.value}</h3>
                <Progress
                  value={(card.value / (stats.total || 1)) * 100}
                  className="mt-2 bg-foreground/60"
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Table Section */}
      <Card className="mt-6 shadow-sm bg-transparent">
        <CardHeader>
          <h3 className="text-xl font-semibold">
            {role === "candidate"
              ? "Recent Applications"
              : "Recent Interviews"}{" "}
            ({stats.total})
          </h3>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="p-6 text-center text-gray-400 animate-pulse">
              Loading dashboard data...
            </div>
          ) : (
            <div className="overflow-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    {columns.map((col, ind) => (
                      <TableHead key={ind}>{col}</TableHead>
                    ))}
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
                  ) : (
                    dataRows.slice(0, 6).map((row, idx) => (
                      <TableRow key={idx}>
                        <TableCell>{row.candidate}</TableCell>
                        <TableCell>{row.jobName || "N/A"}</TableCell>
                        <TableCell>
                          {new Date(row.createdAt).toLocaleString()}
                        </TableCell>
                        <TableCell>
                          <span
                            className={`capitalize font-medium ${row.reviewStatus === "approved"
                              ? "text-green-600"
                              : row.reviewStatus === "pending" || row.reviewStatus === "maybe"
                                ? "text-yellow-600"
                                : "text-red-600"
                              }`}
                          >
                            {row.reviewStatus}
                          </span>
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="outline"
                            onClick={() =>
                              navigate(
                                role === "candidate"
                                  ? `/candidate/interview-detail/${row._id}`
                                  : `/client/interview-detail/${row._id}`
                              )
                            }
                          >
                            View Details
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}



export default Dashboard;
