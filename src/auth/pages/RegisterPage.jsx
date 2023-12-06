import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Copyright from '../components/Copyright';
import { Link } from 'react-router-dom';
import useAuthStore from '../hooks/useAuthStore';
import useForm from '../hooks/useForm';
import { toast } from 'react-toastify';
import { CircularProgress } from '@mui/material';
import { useEffect, useState } from 'react';



const RegisterFormFields = {
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
};



const RegisterPage = () => {
    
    const [loading, setLoading] = useState(false);
    const { name, email, password, confirmPassword, onInputChange, onResetForm } = useForm( RegisterFormFields );
    const { startRegister, validateEmail, errorMenssage } = useAuthStore();


    const handleSubmit = async (evt) => {
        evt.preventDefault();

        // Validar campos vacios
        if ( name.trim().length === 0 || email.trim().length === 0 || password.trim().length === 0 || confirmPassword.trim().length === 0 ) {
            toast.error('Todos los campos son obligatorios');
            return;
        }

        if ( name.trim().length < 2 ) {
            toast.error('El nombre debe tener al menos 2 caracteres');
            return;
        };

        if ( !validateEmail(email) ) {
            toast.error('El email no es válido');
            return;
        };

        if ( password.trim().length < 6 ) {
            toast.error('La contraseña debe tener al menos 6 caracteres');
            return;
        }

        if ( password !== confirmPassword ) {
            toast.error('Las contraseñas deben ser iguales');
            return;
        };

            setLoading(true);
            await startRegister({ email, password, name });
            onResetForm();
            setLoading(false);
    };

    useEffect(() => {
        if ( errorMenssage !== null ) {
            toast.error(`Error de registro: ${ errorMenssage }`);
        }
    }, [errorMenssage]);


    return (
            <Container 
                component="main" 
                maxWidth="xs" 
                sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', height: '100vh' }}>
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
                        <HowToRegIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="name"
                                    name="name"
                                    required
                                    fullWidth
                                    id="name"
                                    label="Name"
                                    autoFocus
                                    value={ name }
                                    onChange={ onInputChange }
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email"
                                    name="email"
                                    autoComplete="email"
                                    value={ email }
                                    onChange={ onInputChange }
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    value={ password }
                                    onChange={ onInputChange }
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="confirmPassword"
                                    label="Confirm Password"
                                    type="password"
                                    id="confirmPassword"
                                    value={ confirmPassword }
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
                            { loading ? <CircularProgress /> : 'Sign Up' }
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link component={ Link } to="/login" variant="body2">
                                    Already have an account? Sign in
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

export default RegisterPage;