import { BrowserRouter as Router } from "react-router-dom"
import AppRoutes from "./routes";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
}


const App = () => {

    return (
        <Router>
            <ScrollToTop />
            <AppRoutes />
        </Router>
    );
};

export default App;