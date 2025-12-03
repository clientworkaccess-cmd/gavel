import { createContext, useContext, useState, useEffect, useRef } from "react";
import { getReq } from "../../axios/axios";
import API_ENDPOINTS from "../../config/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [role, setRole] = useState("");
    const [userId, setUserId] = useState("");
    const [user, setUser] = useState("");
    const [loading, setLoading] = useState(true);
    const refreshIntervalRef = useRef(null);

    const checkSession = async () => {
        try {
            await getReq(API_ENDPOINTS.REFRESH_TOKEN);
            const res = await getReq(API_ENDPOINTS.DASHBOARD);
            if (res?.user?.role) {
                setUser(res.user);
                setRole(res.user.role);
                setUserId(res.user._id);
                setupAutoRefresh();
            } else {
                clearUser();
            }
        } catch (error) {
            console.error("Session check failed:", error);
            clearUser();
        } finally {
            setLoading(false);
        }
    };

    const clearUser = () => {
        setUser("");
        setRole("");
        setUserId("");
        clearAutoRefresh();
    };

    const setupAutoRefresh = () => {
        clearAutoRefresh();
        refreshIntervalRef.current = setInterval(async () => {
            await getReq(API_ENDPOINTS.REFRESH_TOKEN);
        }, 14 * 60 * 1000);
    };

    const clearAutoRefresh = () => {
        if (refreshIntervalRef.current) {
            clearInterval(refreshIntervalRef.current);
            refreshIntervalRef.current = null;
        }
    };
    useEffect(() => {
        const handleVisibilityChange = () => {
            if (document.visibilityState === 'visible' && user) {
                checkSession();
            }
        };

        document.addEventListener('visibilitychange', handleVisibilityChange);

        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    }, [user]);
    useEffect(() => {
        checkSession();
        return () => {
            clearAutoRefresh();
        };
    }, []);

    return (
        <AuthContext.Provider
            value={{
                role,
                setRole,
                userId,
                setUserId,
                user,
                setUser,
                checkSession
            }}
        >
            {loading ? (
                <div className="flex items-center justify-center h-screen">
                    <div className="loader"></div>
                </div>
            ) : (
                <>{children}</>
            )}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);