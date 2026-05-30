import { createBrowserRouter } from "react-router";
import Login from "../features/auth/pages/Login";
import Register from "../features/auth/pages/Register";
import Dashboard from "../features/chat/pages/Dashboard";
import Profile from "../features/auth/pages/Profile";
import Protected from "../features/auth/components/Protected";
import { Navigate } from "react-router";
import CreateSellerAgent from "../features/agents/pages/CreateSellerAgent";
import AgentSuccess from "../features/agents/pages/AgentSuccess";
import PublicAgentPage from "../features/agents/pages/PublicAgentPage";
import ComingSoon from "../features/agents/pages/ComingSoon";

export const router = createBrowserRouter([
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/register",
        element: <Register />
    },
    {
        path: "/",
        element: <Protected><Dashboard /></Protected>
    },
    {
        path: "/profile",
        element: <Protected><Profile /></Protected>
    },
    {
        path: "/agents/seller",
        element: <Protected><CreateSellerAgent /></Protected>
    },
    {
        path: "/agents/seller/success",
        element: <Protected><AgentSuccess /></Protected>
    },
    {
        path: "/agents/appointment",
        element: <Protected><ComingSoon /></Protected>
    },
    {
        path: "/agents/customer-support",
        element: <Protected><ComingSoon /></Protected>
    },
    {
        path: "/agent/:slug",
        element: <PublicAgentPage />
    },
    {
        path: "/dashboard",
        element: <Navigate to="/" replace />
    }
])