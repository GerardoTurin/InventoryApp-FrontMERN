import { Box, Typography, useMediaQuery } from "@mui/material";
import FormChangePassword from "../components/FormChangePassword";




const ChangePassword = () => {
    const isTablet = useMediaQuery("(min-width: 768px)");
    return (
        <Box 
            sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                justifyContent: 'center',
                alignItems: 'center', 
                width: '100%', 
                //height: '100vh', 
                }}>
            
            <Box
                component='main' 
                sx={{ 
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    marginTop: '10vh',
                    gap: 2,         
                    }}
                >
                <Typography 
                    variant={ isTablet ? "h2" : "h4" } 
                    color="text.secondary" 
                    align="left">
                    Change Password
                </Typography>
                <FormChangePassword />
                </Box>
        </Box>
    )
};

export default ChangePassword;