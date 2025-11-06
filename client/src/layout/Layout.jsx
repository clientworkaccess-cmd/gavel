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
                <div className="relative h-screen overflow-auto inset-0 bg-secondary/10 bg-[radial-gradient(circle_at_center,_#ffff,_transparent_60%)] md:px-16">
                    <div className="fixed -top-20 -left-20 w-72 h-72 bg-secondary/15 blur-3xl rounded-full"></div>
                    <div className="fixed bottom-0 right-0 w-80 h-80 bg-secondary/15 blur-3xl rounded-full"></div>
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
