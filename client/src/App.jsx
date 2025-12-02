import { BrowserRouter as Router, useNavigate } from "react-router-dom"
import AppRoutes from "./routes";
import { useEffect } from "react";
import { getReq } from "./axios/axios";
import API_ENDPOINTS from "./config/api";



const App = () => {

    const navigate = useNavigate()


    useEffect(() => {
        const refreshToken = async () => {
           const res = await getReq(API_ENDPOINTS.REFRESH_TOKEN)
           if (res.message === "No refresh token provided") {
            navigate("/login")
           }
        }
        refreshToken()
    }, [])

    return (
        <Router>
            <AppRoutes />
        </Router>
    );
};

export default App;