import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LoginIcon from '@mui/icons-material/Login';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Copyright from '../components/Copyright';
import { Link, useNavigate } from 'react-router-dom';
import useForm from '../hooks/useForm';
import useAuthStore from '../hooks/useAuthStore';
import { useState } from 'react';
import { CircularProgress } from '@mui/material';
import { toast } from 'react-toastify';



const LoginFormFields = {
    email: '',
    password: '',
};




const LoginPage = () => {

    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const { email, password, onInputChange, onResetForm } = useForm( LoginFormFields );
    const { startLogin, validateEmail } = useAuthStore();


    const handleSubmit = (evt) => {
        evt.preventDefault();

        // Validar campos vacios
        if ( email.trim().length === 0 || password.trim().length === 0 ) {
            toast.error('Ambos campos son obligatorios');
            return;
        }

        if ( !validateEmail(email) ) {
            toast.error('El email no es válido');
            return;
        }

        setLoading(true);

        try {
            startLogin({ email, password });
            onResetForm();
            navigate('/layout/dashboard');

        } catch (error) {

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
                height: '100vh'
                }}>
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
                    <LoginIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <Box component="form" onSubmit={ handleSubmit } noValidate sx={{ mt: 3 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        value={email}
                        onChange={onInputChange}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        value={password}
                        onChange={onInputChange}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2, py: 1 }}
                        disabled={loading}
                    >
                        { loading ? <CircularProgress /> : 'Sign In' }
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link component={Link} to="/forgot-password" variant="body2">
                                Forgot password?
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link component={Link} to="/register" variant="body2">
                                Don't have an account? Sign Up
                            </Link>
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



export default LoginPage;