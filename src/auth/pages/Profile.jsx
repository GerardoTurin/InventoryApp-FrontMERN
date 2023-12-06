import {  Box, Typography, useMediaQuery } from "@mui/material";
import FormProfileUser from "../components/FormProfileUser";

const Profile = () => {
    const isTablet = useMediaQuery("(min-width: 768px)");
    return (
        <Box 
            sx={{ 
                display: 'flex', 
                alignItems: 'center',
                justifyContent: 'center', 
                flexDirection: 'column',
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
                    }}>
                <Typography 
                    variant={ isTablet ? "h2" : "h4" } 
                    color="text.secondary" 
                    align="left">
                    Profile
                </Typography>
                <FormProfileUser />
            </Box>
        </Box>
    )
}

export default Profile;