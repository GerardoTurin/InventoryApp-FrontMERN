import { Navigate, Route } from "react-router-dom";
import useAuthStore from "../hooks/useAuthStore";

const PublicRoute = ({ children, ...props }) => {
    const { status } = useAuthStore();
    
    return status !== 'autenticado' 
        ? <Route {...props}>{children}</Route> 
        : <Navigate to="/layout/dashboard" />;
};


export default PublicRoute;