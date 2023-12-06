import { Navigate } from "react-router-dom";

const PrivateRoute = ({ element }) => {
    const { status } = useAuthStore();

    /* if (status === 'checking') {
        return (
            <Box sx={{ width: '100%' }}>
                <LinearProgress />
            </Box>
        );
    } */

    if (status === 'authenticated') {
        return element;
    }

    // Redirige al inicio de sesión si el usuario no está autenticado
    return <Navigate to="/login" />;
};


export default PrivateRoute;
