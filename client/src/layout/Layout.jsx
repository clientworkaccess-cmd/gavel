import { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import Sidebar from "../components/common/Sidebar";
import { useAuth } from "./context/AuthContext";
import Footer from "@/components/common/Footer";

const Layout = () => {
    const { role } = useAuth();
    const [collapsed, setCollapsed] = useState(false);

    return (
        <div>
            {role ? (
                <div>
                    {/* Sidebar */}
                    <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

                    {/* Main Content */}
                    <main
                        className={`flex-1 transition-all duration-300 ${collapsed ? "ml-12" : "ml-54"
                            }`}
                    >
                        <div className="p-4 md:p-6 min-h-screen bg-gray-50">
                            <Outlet />
                        </div>
                    </main>
                </div>
            ) : (
                <div className="relative h-screen overflow-auto inset-0 bg-secondary/8 bg-[radial-gradient(circle_at_center,_#ffff,_transparent_60%)] md:px-16">
                    {/* Public Navbar */}
                    <Navbar />
                    <Outlet />
                    <Footer />
                </div>
            )
            }
        </div >
    );
};

export default Layout;
