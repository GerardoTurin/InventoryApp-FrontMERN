import { Box, Button, Typography } from '@mui/material';
import useAuthStore from '../hooks/useAuthStore';

const ConfirmLogoutToast = ({ closeToast }) => {
    const { startLogout } = useAuthStore();

    const handleYesClick = () => {
        startLogout();
        closeToast();
    };

    const handleNoClick = () => {
        closeToast();
    };

    return (
        <Box>
            <Typography variant="h6">
                ¿Are you sure you want to logout?
            </Typography>
            <Box display="flex" justifyContent="flex-end" gap={2} mt={2}>
                <Button variant="contained" color="primary" onClick={ () => { handleYesClick() } }>
                    Yes
                </Button>
                <Button variant="contained" color="error" onClick={ () => { handleNoClick() } }>
                    No
                </Button>
            </Box>
        </Box>
    )
};

export default ConfirmLogoutToast;
