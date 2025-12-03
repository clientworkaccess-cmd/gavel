import { createContext, useContext, useState, useEffect } from "react";
import { getReq } from "../../axios/axios";
import API_ENDPOINTS from "../../config/api";
import App from "@/App";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [role, setRole] = useState("");
    const [userId, setUserId] = useState("")
    const [user, setUser] = useState("")
    const [loading, setLoading] = useState(true);
    const [interviews, setInterviews] = useState([])

    const checkSession = async () => {
        const res = await getReq(API_ENDPOINTS.DASHBOARD);
        if (res?.user?.role) {
            setLoading(false);
            setUser(res?.user)
            setRole(res.user.role)
            setUserId(res?.user?._id)
        } else {
            setUser("")
            setRole("")
            setUserId("")
            setLoading(false);
        };
    };
    
    const getInterviews = async () => {
        const res = await getReq(API_ENDPOINTS.INTERVIEW)
        const found = res?.interviews?.find((item) => item.candidateId._id === user._id);
        setInterviews(found || [])
    }

    useEffect(() => {
       getInterviews();
    }, [interviews]);
    useEffect(() => {
        checkSession();
    }, []);

    return (
        <AuthContext.Provider value={{ role, setRole, userId, setUserId, user, setUser, checkSession, interviews }}>
            {loading ?
                <div className="flex items-center justify-center h-screen">
                    <div className="loader"></div>
                </div>
                :
                <>
                    {children}
                </>
            }
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
