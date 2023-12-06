import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Avatar, Box, Button, CircularProgress, Container, Grid, TextField, Typography } from "@mui/material";
import EmailIcon from '@mui/icons-material/Email';
import Copyright from "../components/Copyright";
import useAuthStore from "../hooks/useAuthStore";
import useForm from "../hooks/useForm";


const forgotFormField = {
    email: "",
};


const ForgotPasswordPage = () => {

    const [loading, setLoading] = useState(false);
    const { forgotPassword ,validateEmail } = useAuthStore();
    const {email, onInputChange, onResetForm} = useForm(forgotFormField);

    const handleForgot = async (e) => {
        e.preventDefault();
        if (!email) {
            return toast.error("Por favor ingrese un email");
        }

        if (!validateEmail(email)) {
            return toast.error("El email no es válido");
        }

        setLoading(true);
        try {
            await forgotPassword(email);
            onResetForm();
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }

    };


    return (
        <Container 
            component="main" 
            maxWidth="xs" 
            sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center',
                justifyContent: 'space-between',
                height: '100vh' }}>
            <Box
                sx={{
                    marginTop: 10,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
                    <EmailIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Forgot Password
                </Typography>
                <Box component="form" onSubmit={ handleForgot } noValidate sx={{ mt: 3 }}>
                    <TextField
                        type="email"
                        placeholder="Email"
                        required
                        name="email"
                        value={ email }
                        onChange={ onInputChange }
                        fullWidth
                    />
                    
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2, py: 1 }}
                        disabled={loading}
                    >
                        { loading ? <CircularProgress /> : 'Get Reset Email' }
                    </Button>
                    <Grid container justifyContent="space-between">
                        <Grid item>
                            <Link to="/login">Login</Link>
                        </Grid>
                        <Grid item>
                            <Link to="/">Home</Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
            <Grid item xs={12} sx={{ marginBottom: '2vh' }}>
                <Copyright />
            </Grid>
        </Container>
    );
};



export default ForgotPasswordPage;