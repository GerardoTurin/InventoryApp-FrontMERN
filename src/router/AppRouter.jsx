import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "../auth/pages/HomePage";
import LoginPage from "../auth/pages/LoginPage";
import RegisterPage from "../auth/pages/RegisterPage";
import ForgotPasswordPage from "../auth/pages/ForgotPasswordPage";
import ResetPasswordPage from "../auth/pages/ResetPasswordPage";
import LayoutPage from "../auth/pages/LayoutPage";
import Dashboard from "../auth/pages/Dashboard";
import AddProduct from "../auth/pages/AddProduct";
import Profile from "../auth/pages/Profile";
import Support from "../auth/pages/Support";
import ConfirmUser from "../auth/pages/ConfirmUser";
import useAuthStore from "../auth/hooks/useAuthStore";
import { Box, LinearProgress, Typography } from "@mui/material";
import UpdateProduct from "../auth/pages/UpdateProduct";
import ChangePassword from "../auth/pages/ChangePassword";
import { useEffect } from "react";


const AppRouter = () => {

    const { accountActive, status } = useAuthStore();

    useEffect(() => {
        const activeAccount = async () => {
            await accountActive();
        }

        activeAccount();
    }, []);
    


    if (status === 'registrado') {
        return (
            <Box sx={{ width: '100%' }}>
                <Typography variant="h6" align="center">
                    We send an email to confirm your account, forget this window...
                </Typography>
            </Box>
        );
    
    }

    if (status === 'checking') {
        return (
            <Box sx={{ width: '100%' }}>
                <LinearProgress />
                <Typography variant="h6" align="center">
                    Checking your account...
                </Typography>
            </Box>
        );
    }


    



    return (
        <Routes>
            {
                status === 'no-registrado' && !document.cookie.includes('token') ? (
                    <>
                        <Route path="/" element={<HomePage />} />
                        <Route path="login" element={<LoginPage />} />
                        <Route path="register" element={<RegisterPage />} />
                        <Route path="forgot-password" element={<ForgotPasswordPage />} />
                        <Route path="reset-password/:resetToken" element={<ResetPasswordPage />} />
                        <Route path="register/confirm/:confirmToken" element={<ConfirmUser />} />
                        <Route path="*" element={<Navigate to="/" />} />
                    </>
                ) :  (
                    <>
                        <Route path="/layout" element={<LayoutPage />}>
                            <Route path="dashboard" element={<Dashboard />}/>
                            <Route path="add-product" element={<AddProduct />}/>
                            <Route path="update-product/:id" element={<UpdateProduct />}/>
                            <Route path="profile" element={<Profile />}/>
                            <Route path="change-password" element={<ChangePassword />}/>
                            <Route path="support" element={<Support />}/>
                        </Route>
                        <Route path="*" element={<Navigate to="layout/dashboard" />} />
                    </>
                ) 
            }
                </Routes>
            );
        };

export default AppRouter;