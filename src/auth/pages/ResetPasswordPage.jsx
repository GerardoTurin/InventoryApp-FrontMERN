import { Link, useNavigate, useParams } from "react-router-dom";
import { Avatar, Box, Button, CircularProgress, Container, Grid, TextField, Typography } from "@mui/material";
import PasswordIcon from '@mui/icons-material/Password';
import Copyright from "../components/Copyright";
import { useState } from "react";
import useForm from "../hooks/useForm";
import useAuthStore from "../hooks/useAuthStore";


const ResetPasswordFields = {
    newPassword: '',
    confirmNewPassword: '',
};


const ResetPasswordPage = () => {

    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const { newPassword, confirmNewPassword, onInputChange, onResetForm } = useForm( ResetPasswordFields );
    const { startResetPassword } = useAuthStore();
    const { resetToken } = useParams();


    const handleReset = (evt) => {
        evt.preventDefault();

        // Validar campos vacios
        if ( newPassword.trim().length === 0 || confirmNewPassword.trim().length === 0 ) {
            toast.error('Ambos campos son obligatorios');
            return;
        }


        if ( newPassword.trim().length < 6 ) {
            toast.error('La contraseña debe tener al menos 6 caracteres');
            return;
        }

        if ( newPassword !== confirmNewPassword ) {
            toast.error('Las contraseñas no coinciden');
            return;
        }

        setLoading(true);

        try {
            startResetPassword( resetToken, newPassword );
            onResetForm();
            navigate('/login');

        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container component="main" maxWidth="xs">
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
                    <PasswordIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Reset Password
                </Typography>
                <Box component="form" onSubmit={ handleReset } noValidate sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                name="newPassword"
                                label="newPassword"
                                type="password"
                                id="newPassword"
                                value={ newPassword }
                                onChange={ onInputChange }
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                name="confirmNewPassword"
                                label="Confirm New Password"
                                type="password"
                                id="confirmNewPassword"
                                value={ confirmNewPassword }
                                onChange={ onInputChange }
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2, py: 1 }}
                        disabled={ loading }
                    >
                        { loading ? <CircularProgress /> : 'Reset Password' }
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
            <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
    );
};






export default ResetPasswordPage;