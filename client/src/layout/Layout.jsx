import { useState, useRef, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import Sidebar from "../components/common/Sidebar";
import { useAuth } from "./context/AuthContext";
import Footer from "@/components/common/Footer";

const Layout = () => {
  const { role } = useAuth();
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const mainRef = useRef(null);

  // Reset scroll on route change
  useEffect(() => {
    if (mainRef.current) {
      mainRef.current.scrollTop = 0;
    }
    // Also reset window scroll just in case
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div>
      {role ? (
        <div className="bg-background bg-[radial-gradient(circle_at_top_center,#0B1138,transparent_70%)]">
          {/* Sidebar */}
          <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
          {/* Main Content */}
          <main
            ref={mainRef}
            className={`flex-1 transition-all duration-300 overflow-auto h-screen ${collapsed ? "ml-12" : "ml-54"}`}
          >
            <div className="p-4 md:p-6 min-h-screen">
              <Outlet />
            </div>
          </main>
        </div>
      ) : (
        <div
          ref={mainRef}
          className="relative h-screen overflow-auto inset-0 bg-background bg-[radial-gradient(circle_at_top_center,#0B1138,transparent_70%)]"
        >
          <Navbar />
          <Outlet />
          <Footer />
        </div>
      )}
    </div>
  );
};

export default Layout;
