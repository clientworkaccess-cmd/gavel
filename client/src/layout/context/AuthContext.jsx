import { createContext, useContext, useState, useEffect } from "react";
import { getReq } from "../../axios/axios";
import API_ENDPOINTS from "../../config/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [role, setRole] = useState("");
    const [userId, setUserId] = useState("");
    const [user, setUser] = useState("");
    const [loading, setLoading] = useState(true);

    const checkSession = async () => {
        try {
            const res = await getReq(API_ENDPOINTS.DASHBOARD);
            if (res?.user?.role) {
                setUser(res.user);
                setRole(res.user.role);
                setUserId(res.user._id);
            }
        } catch (error) {
            console.error("Session check failed:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        checkSession();
    }, [role]);

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