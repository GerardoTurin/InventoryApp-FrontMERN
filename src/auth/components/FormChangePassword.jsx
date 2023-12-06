import { Avatar, Box, Grid, Paper, TextField } from "@mui/material";
import { useState } from "react";
import useForm from "../hooks/useForm";
import { toast } from "react-toastify";
import SendIcon from '@mui/icons-material/Send';
import PasswordIcon from '@mui/icons-material/Password';
import LoadingButton from '@mui/lab/LoadingButton';
import useAuthStore from "../hooks/useAuthStore";

const changePasswordFields = {
    oldPassword: '',
    newPassword: '',
    confirmNewPassword: '',
};

const FormChangePassword =  () => {
    const [loading, setLoading] = useState(false);
    const { startChangePassword } = useAuthStore();
    const { oldPassword ,newPassword, confirmNewPassword, onInputChange, onResetForm } = useForm( changePasswordFields );


    const changePassword = async (evt) => {
        evt.preventDefault();

        // Validar campos vacios
        if ( oldPassword.trim().length === 0 || newPassword.trim().length === 0 || confirmNewPassword.trim().length === 0 ) {
            toast.error('All fields are required');
            return;
        };


        // Validar que la nueva contraseña tenga al menos 6 caracteres
        if ( newPassword.trim().length < 6 ) {
            toast.error('The password must be at least 6 characters');
            return;
        };

        // Validar que las contraseñas coincidan
        if ( newPassword !== confirmNewPassword ) {
            toast.error('Passwords do not match');
            return;
        };


        setLoading(true);
        

        try {
            await startChangePassword({ oldPassword, newPassword });
            onResetForm();

        } catch (error) {
            console.log(error);

        } finally {
            setLoading(false);
        };

    };


    return (
        <Paper
            elevation={ 3 }
            sx={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
            }}>
                <Grid 
                    container
                    item
                    xs={8} 
                    sx={{ 
                        display: 'flex', 
                        justifyContent: 'center', 
                        alignItems: 'center', 
                        flexDirection: 'column',
                        width: '100%',
                        marginTop: '5vh', 
                        marginBottom: '5vh' 
                        }}>
                    <Avatar sx={{ bgcolor: 'primary.main' }}>
                        <PasswordIcon />
                    </Avatar>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexDirection: 'column',
                            width: '100%',
                        }}
                        component="form" 
                        onSubmit={ changePassword }
                        noValidate
                        >
                        <TextField
                            required
                            fullWidth
                            name="oldPassword"
                            label="Current Password"
                            type="password"
                            id="oldPassword"
                            margin="normal"
                            variant="outlined"
                            value={ oldPassword }
                            onChange={ onInputChange }
                        />

                        <TextField
                            required
                            fullWidth
                            name="newPassword"
                            label="New Password"
                            type="password"
                            id="newPassword"
                            margin="normal"
                            variant="outlined"
                            value={ newPassword }
                            onChange={ onInputChange }
                        />

                        <TextField
                            required
                            fullWidth
                            name="confirmNewPassword"
                            label="Confirm New Password"
                            type="password"
                            id="confirmNewPassword"
                            margin="normal"
                            variant="outlined"
                            value={ confirmNewPassword }
                            onChange={ onInputChange }
                        />

                        <LoadingButton
                            size="medium"
                            endIcon={<SendIcon />}
                            loading={loading}
                            loadingPosition="end"
                            variant="contained"
                            type="submit"
                            sx={{ mt: 2 }}>
                            Send
                        </LoadingButton>
                    </Box>
                    </Grid>

        </Paper>
    )
};

export default FormChangePassword;