/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Home,
  BarChart,
  Building,
  FileText,
  Wrench,
  User,
  CreditCard,
  Menu,
  LogOut,
  Briefcase,
  Users,
} from "lucide-react";
import { useAuth } from "../../layout/context/AuthContext";
import { getReq, postReq } from "../../axios/axios";
import { API_ENDPOINTS } from "../../config/api";
import { FaWpforms } from "react-icons/fa";

const Sidebar = ({ collapsed, setCollapsed }) => {
  const [showLogout, setShowLogout] = useState(false);
  const [links, setLinks] = useState([])
  const navigate = useNavigate();
  const location = useLocation();
  const { role, setRole, checkSession, user , interviews} = useAuth();

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 900);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 900);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (isMobile) setCollapsed(true);
  }, [isMobile]);

  useEffect(() => {
    if (role === "admin") {
      setLinks([
        { to: "/", label: "Dashboard", icon: Home },
        { to: "/admin/clients", label: "Clients", icon: BarChart },
        { to: "/admin/companies", label: "Companies", icon: Building },
        { to: "/admin/candidates", label: "Candidates", icon: CreditCard },
        { to: "/admin/positions", label: "Positions", icon: Wrench },
        { to: "/admin/transcripts", label: "Interviews", icon: FileText },
        { to: "/admin/admins", label: "Admins", icon: Users },
      ]);
    } else if (role === "candidate") {
      if (interviews?.length !== 0) {
        setLinks([
          { to: "/", label: "Dashboard", icon: Home },
          { to: "/candidate/interview", label: "Interview", icon: Briefcase },
          { to: "/candidate/transcript", label: "Transcript", icon: FileText },
        ]);
      } else {
        setLinks([
          { to: "/candidate/interview", label: "Interview", icon: Briefcase },
          { to: "/candidate/transcript", label: "Transcript", icon: FileText },
        ]);
      }
    } else {
      setLinks([
        { to: "/", label: "Dashboard", icon: Home },
        { to: "/client/transcript", label: "Transcript", icon: FileText },
        { to: "/client/contact-admin", label: "Contact Admin", icon: FaWpforms },
      ]);
    }
  }, [role , interviews]);


  const settingsLinks = [
    {
      to:
        role === "admin"
          ? "/admin/profile"
          : "/profile",
      label: "Profile",
      icon: User,
    },
  ];

  const handleLogout = async () => {
    await postReq(API_ENDPOINTS.LOGOUT);
    checkSession()
    setRole("");
    navigate("/");
    setShowLogout(false);
  };

  const renderLink = (link) => {
    const isActive = location.pathname === link.to;
    const Icon = link.icon;
    return (
      <Link
        key={link.to}
        to={link.to}
        onClick={() => isMobile && setCollapsed(true)}
        className={`flex items-center gap-3 px-4 py-2 rounded-md text-sm font-medium transition-colors ${isActive
          ? "bg-foreground/90 text-secondary"
          : "text-foreground hover:bg-foreground hover:text-blue-600"
          }`}
      >
        <Icon className="w-5 h-5" />
        {!collapsed && <span>{link.label}</span>}
      </Link>
    );
  };

  const sidebarContent = (
    <div className="min-h-screen flex flex-col h-full text-foreground border-r border-foreground/20 overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-foreground/20">
        {!collapsed && (
          <h2 className="text-lg font-bold text-secondary">
            {role === "admin" ? "Admin Portal" : role === "candidate" ? "Candidate Portal" : "Client Portal"}
          </h2>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
        >
          <Menu className="h-5 w-5" />
        </Button>
      </div>

      {/* Links */}
      <ScrollArea className="flex-1 px-2 py-4 space-y-2">
        {links.map(renderLink)}
        <div className="border-t my-3" />
        {settingsLinks.map(renderLink)}
      </ScrollArea>

      {/* Logout */}
      <div className="p-4 border-t border-foreground/20">
        <Button
          variant="outline"
          className="w-full flex items-center gap-2 text-red-600 border-red-200 hover:bg-red-700"
          onClick={() => setShowLogout(true)}
        >
          <LogOut className="w-5 h-5" />
          {!collapsed && "Logout"}
        </Button>
      </div>
    </div>
  );

  return (
    <aside
      className={`min-h-screen overflow-y-auto fixed top-0 left-0 transition-all duration-300 ${collapsed ? "w-20" : "w-64"
        }`}
    >
      {sidebarContent}
      {/* Logout Dialog */}
      <Dialog open={showLogout} onOpenChange={setShowLogout}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Confirm Logout</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-foreground/50">
            Are you sure you want to log out?
          </p>
          <DialogFooter className="flex justify-end gap-2 mt-4">
            <Button variant="destructive" onClick={handleLogout}>
              Yes, Logout
            </Button>
            <Button variant="outline" onClick={() => setShowLogout(false)}>
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </aside>
  );
};

export default Sidebar;
