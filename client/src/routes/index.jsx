import { useRoutes } from "react-router-dom";
import EmailVerification from "../layout/auth/EmailVerification";
import ForgotPassword from "../layout/auth/ForgotPassword";
import LoginForm from "../layout/auth/Login";
import ResetPassword from "../layout/auth/ResetPassword";
import SignupForm from "../layout/auth/Signup";
import Layout from "../layout/Layout";
import About from "../layout/pages/About";
import Contact from "../layout/pages/Contact";
import Help from "../layout/pages/Help";
import Landing from "../layout/pages/Landing";
import Pricing from "../layout/pages/Pricing";
import Dashboard from "../layout/auth/Dasboard";
import NotFound from "../layout/pages/NotFound";
import AdminDashboard from "../layout/auth/AdminDashboard";
import Data from "../layout/modules/Users";
import Company from "../layout/modules/Company";
import Position from "../layout/modules/Positions";
import { useAuth } from "../layout/context/AuthContext";
import Profile from "@/layout/modules/Profile";
import Interview from "@/layout/modules/Interviews";
import Transcript from "@/layout/modules/Transcript";
import InterviewDetail from "@/components/common/InterviewDetail";
import ContactAdmin from "@/components/common/ContactAdmin";


const AppRoutes = () => {
    const { role } = useAuth();

    let routes;

    if (role === "admin") {
        routes = [
            {
                path: "/",
                element: <Layout />,
                children: [
                    { path: "/", element: <AdminDashboard /> },
                    { path: "/admin/clients", element: <Data /> },
                    { path: "/admin/candidates", element: <Data /> },
                    { path: "/admin/admins", element: <Data /> },
                    { path: "/admin/companies", element: <Company /> },
                    { path: "/admin/positions", element: <Position /> },
                    { path: "/admin/transcripts", element: <Transcript /> },
                    { path: "/admin/interview-detail/:id", element: <InterviewDetail /> },
                    { path: "/admin/profile", element: <Profile /> },
                    { path: "/login", element: <LoginForm /> },
                    { path: "/signup", element: <SignupForm /> },
                ],
            },
            {
                path: "*",
                element: <NotFound />
            },
        ];
    } else if (role) {
        routes = [
            {
                path: "/",
                element: <Layout />,
                children: [
                    { path: "/", element: <Dashboard /> },
                    { path: "/profile", element: <Profile /> },
                    { path: "/candidate/interview", element: <Interview /> },
                    { path: "/candidate/transcript", element: <Transcript /> },
                    { path: "/client/transcript", element: <Transcript /> },
                    { path: "/client/interview-detail/:id", element: <InterviewDetail /> },
                    { path: "/candidate/interview-detail/:id", element: <InterviewDetail /> },
                    { path: "/client/contact-admin", element: <ContactAdmin /> },
                    { path: "/login", element: <LoginForm /> },
                    { path: "/signup", element: <SignupForm /> },
                ],
            },
            {
                path: "*",
                element: <NotFound />
            },
        ];
    } else {
        routes = [
            {
                path: "/",
                element: <Layout />,
                children: [
                    { path: "/", element: <Landing /> },
                    { path: "/about", element: <About /> },
                    { path: "/help", element: <Help /> },
                    { path: "/pricing", element: <Pricing /> },
                    { path: "/contact", element: <Contact /> },
                ],
            },
            { path: "/login", element: <LoginForm /> },
            { path: "/signup", element: <SignupForm /> },
            { path: "/email-verification/:token", element: <EmailVerification /> },
            { path: "/forgot-password", element: <ForgotPassword /> },
            { path: "/reset-password/:token", element: <ResetPassword /> },
            { path: "*", element: <NotFound /> },
        ];
    }

    const element = useRoutes(routes);
    return element;
};

export default AppRoutes;
