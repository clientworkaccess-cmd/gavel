import { useState, useRef, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import Sidebar from "../components/common/Sidebar";
import { useAuth } from "./context/AuthContext";
import Footer from "@/components/common/Footer";
import { FaGavel } from "react-icons/fa";
import { IoChevronForward } from 'react-icons/io5';

const Layout = () => {
  const { role } = useAuth();
  const [collapsed, setCollapsed] = useState(false);
  const [chatOpen, setChatOpen] = useState(false)
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

  useEffect(() => {
    const handleMessage = (event) => {
      if (event.data.type === "CHAT_CLOSED") {
        setChatOpen(false);
      }
    };

    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

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
          className="h-screen overflow-auto inset-0 bg-background bg-[radial-gradient(circle_at_top_center,#0B1138,transparent_70%)]"
        >
          <Navbar />
          <Outlet />
          <Footer />
        </div>
      )
      }
      {role !== "admin" && <div className="fixed bottom-4 right-6">
        <div className='pointer-events-auto cursor-pointer flex flex-row-reverse items-center group relative'>
          <div className={`fixed bottom-0 right-2 transition-all duration-800
    ${chatOpen
              ? "w-[calc(100vw-28px)] h-[600px] max-h-[80vh] sm:w-[380px] sm:h-[650px] opacity-100 scale-100 translate-y-0 pointer-events-auto"
              : "w-0 h-0 opacity-0 pointer-events-none scale-90 translate-y-8 absolute -z-10 "
            }
               `}>
            <iframe
              src={import.meta.env.VITE_CHATBOT_URL}
              className="w-full h-full"
            />
          </div>
          {/* TOGGLE BUTTON */}

          {!chatOpen && (
            <>
              <div className="absolute top-0 right-2 z-10">
                <span className="flex h-3 w-3 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75 top-0"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                </span>
              </div>

              <div
                onClick={() => setChatOpen(true)}
                className='-ml-2 shadow-[0_8px_30px_rgb(0,0,0,0.3)] transition-all duration-300 transform hover:scale-105 active:scale-95 rounded-full'>
                <FaGavel className='w-18 h-18 bg-[#0B1138] hover:bg-[#070a1f] text-blue-600 rounded-full hover:ring-1 hover:ring-green-500 p-4' />
              </div>
            </>
          )}
          {/* CHAT LABEL */}
          {!chatOpen && (
            <div
              className="
        flex items-center gap-2 font-medium text-sm text-gray-300 p-3 
        rounded-l-full px-6 bg-[#070a1f]
        absolute right-16 -z-10
        opacity-0 translate-x-3
        transition-all duration-800
        group-hover:opacity-100 group-hover:translate-x-0
      "
            >
              Chat
            </div>
          )}
        </div>
      </div>}
    </div >
  );
};

export default Layout;
