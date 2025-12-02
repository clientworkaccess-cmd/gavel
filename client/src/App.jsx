import { BrowserRouter as Router } from "react-router-dom"
import AppRoutes from "./routes";
import { useEffect } from "react";
import { getReq } from "./axios/axios";
import API_ENDPOINTS from "./config/api";




const App = () => {

    useEffect(() => {
        const refreshToken = async () => {
            await getReq(API_ENDPOINTS.REFRESH_TOKEN)
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