import { Box, Button, Container, Typography, CircularProgress, Avatar } from "@mui/material";
import HowToRegIcon from '@mui/icons-material/HowToReg';
import useAuthStore from "../hooks/useAuthStore";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ConfirmUser = () => {

    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [isConfirmed, setIsConfirmed] = useState(false);
    const { startConfirmAccount } = useAuthStore();
    const { confirmToken } = useParams();



    const handleConfirm = async (evt) => {
        evt.preventDefault();

        try {
            setLoading(true);
            startConfirmAccount( confirmToken );
            setIsConfirmed(true);
            navigate('/layout/dashboard');
            
        } catch (error) {
            console.log(error);
            setIsConfirmed(false);

        } finally {
            setLoading(false);
        }
    };




    return (
        <Container component="main" sx={{ display:"flex", justifyContent:"center", alignItems:"center" }}>
            <Box 
                sx={{ 
                    marginTop: 10,
                    border: '1px solid #ccc', 
                    borderRadius: '5px', 
                    padding: '20px', 
                    display:"flex", 
                    flexDirection:"column", 
                    alignItems: 'center',  }}
                component="form"
                onSubmit={ handleConfirm }
            >
                <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
                    <HowToRegIcon />
                </Avatar>
                <Typography variant="h5" component="h2" gutterBottom>
                    Confirma tu cuenta y comienza a usar la aplicación...
                </Typography>

                <Button 
                    type="submit"
                    variant="contained" 
                    color="primary" 
                    disabled={ isConfirmed || loading }
                >
                    { loading ? <CircularProgress color="inherit" size={ 20 } /> : 
                        !isConfirmed ? 'Confirmar cuenta' : 'Cuenta confirmada '
                    }	
                </Button>
            </Box>
        </Container>
    )
};

export default ConfirmUser;