/* eslint-disable no-unused-vars */
import { useEffect, useMemo, useState } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Bar, Line, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  ArcElement,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Users, Briefcase, Building2, UserCheck, UserCog, TrendingUp } from "lucide-react";
import API_ENDPOINTS from "../../config/api";
import { getReq } from "../../axios/axios";

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, ArcElement, PointElement, Tooltip, Legend);

/* Helper Components */
const StatCard = ({ title, value, Icon, color }) => (
  <Card className="p-4 flex items-center gap-4 hover:shadow-md transition">
    <div
      className={`w-12 h-12 rounded-full flex items-center justify-center`}
      style={{ backgroundColor: `${color}15`, color }}
    >
      <Icon className="w-6 h-6" />
    </div>
    <div>
      <p className="text-sm text-muted-foreground">{title}</p>
      <h3 className="text-2xl font-bold">{value}</h3>
    </div>
  </Card>
);

const lastNMonths = (n = 6) => {
  const res = [];
  const now = new Date();
  for (let i = n - 1; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    res.push(d.toLocaleString("default", { month: "short" }));
  }
  return res;
};

const bucketByMonth = (items = [], monthsLabels = []) => {
  const counts = Array(monthsLabels.length).fill(0);
  const now = new Date();
  const map = {};
  monthsLabels.forEach((label, idx) => {
    const date = new Date(now.getFullYear(), now.getMonth() - (monthsLabels.length - 1 - idx), 1);
    map[`${date.getFullYear()}-${date.getMonth()}`] = idx;
  });

  for (const it of items) {
    const d = it?.createdAt ? new Date(it.createdAt) : null;
    if (!d || isNaN(d.getTime())) continue;
    const key = `${d.getFullYear()}-${d.getMonth()}`;
    if (key in map) counts[map[key]]++;
  }
  return counts;
};

const roleDistribution = (users = []) => {
  const map = { candidate: 0, client: 0, admin: 0 };
  users.forEach((u) => {
    const r = (u.role || "").toLowerCase();
    if (map[r] !== undefined) map[r]++;
  });
  return [map.candidate, map.admin , map.client,];
};

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [newCandidates, setNewCandidates] = useState([])
  const [companies, setCompanies] = useState([]);
  const [positions, setPositions] = useState([]);
  const [interviews, setInterviews] = useState([]);

  useEffect(() => {
    const fetchAll = async () => {
      const [uRes, cRes, pRes, iRes] = await Promise.all([
        getReq(API_ENDPOINTS.USERS),
        getReq(API_ENDPOINTS.COMPANY),
        getReq(API_ENDPOINTS.POSITION),
        getReq(API_ENDPOINTS.INTERVIEW),
      ]);

      setUsers(uRes?.users || uRes || []);
      setNewCandidates(uRes?.users.filter(item => item.role === "candidate") || [])
      setCompanies(cRes?.companies || cRes || []);
      setPositions(pRes?.positions || pRes || []);
      setInterviews(iRes?.interviews || iRes || []);
    };
    fetchAll();
  }, []);

  const months = useMemo(() => lastNMonths(6), []);
  const monthlyUsers = useMemo(() => bucketByMonth(newCandidates, months), [newCandidates, months]);
  const monthlyInterview = useMemo(() => bucketByMonth(interviews , months),[interviews, months]);

  const roleDist = useMemo(() => roleDistribution(users), [users]);
  const clientsCount = users.filter(u => u.role !== "admin" && u.role !== "candidate").length;
  const candidatesCount = users.filter(u => u.role === "candidate").length;

  const monthlyUsersData = {
    labels: months,
    datasets: [{ label: "New Candidates", data: monthlyUsers, backgroundColor: "#6366f1" }],
  };
  const interviewLineData = {
    labels: months,
    datasets: [{ label: "Interview", data: monthlyInterview, borderColor: "#06b6d4", tension: 0.4 }],
  };
  const uniqueRoles = Array.from(
    new Map(users.map((item) => [item.role, item])).values()
  );

  const roleData = {
    labels: uniqueRoles.map(item => item.role) ,
    datasets: [{ data: roleDist, backgroundColor: ["#6366f1", "#06b6d4", "#22c55e"] }],
  };

  console.log(users);
  

  return (
    <div className=" p-6 space-y-8">
      {/* Header */}
      <div className="bg-linear-to-br from-secondary via-indigo-600/80 to-purple-600/70 text-white rounded-xl p-8 shadow">
        <h1 className="text-3xl font-bold mb-1">Welcome back, Admin 👋</h1>
        <p className="opacity-90">Here’s your overview of users, companies, and performance.</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 2xl:gap-8">
        <Link to="/admin/candidates"><StatCard title="Candidates" value={candidatesCount} Icon={Users} color="#f97316" /></Link>
        <Link to="/admin/positions"><StatCard title="Positions" value={positions.length} Icon={Briefcase} color="#7c3aed" /></Link>
        <Link to="/admin/companies"><StatCard title="Companies" value={companies.length} Icon={Building2} color="#3b82f6" /></Link>
        <Link to="/admin/clients"><StatCard title="Clients" value={clientsCount} Icon={UserCheck} color="#16a34a" /></Link>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <h3 className="font-semibold text-lg">Monthly New Candidates</h3>
              <Badge variant="secondary">Live</Badge>
            </div>
          </CardHeader>
          <CardContent className="h-64">
            <Bar data={monthlyUsersData} options={{ responsive: true, maintainAspectRatio: false }} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <h3 className="font-semibold text-lg">Interview Trend</h3>
              <Badge variant="secondary" className="animate-pulse bg-green-600">Live</Badge>
            </div>
          </CardHeader>
          <CardContent className="h-64">
            <Line data={interviewLineData} options={{ responsive: true, maintainAspectRatio: false }} />
          </CardContent>
        </Card>
      </div>

      {/* Role distribution */}
      <Card>
        <CardHeader>
          <h3 className="font-semibold text-lg">Roles Distribution</h3>
        </CardHeader>
        <CardContent className="flex flex-col md:flex-row gap-6 items-center">
          <div className="w-60 h-60">
            <Doughnut data={roleData} options={{ maintainAspectRatio: false }} />
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-2">Breakdown of user roles across the platform.</p>
            <ul className="space-y-1">
              <li><span className="text-cyan-600 font-semibold">Clients:</span> {clientsCount}</li>
              <li><span className="text-indigo-500 font-semibold">Candidates:</span> {candidatesCount}</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
