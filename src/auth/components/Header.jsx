import { Avatar, Badge, Box, Button, Typography, styled } from '@mui/material';
import React from 'react';
import useAuthStore from '../hooks/useAuthStore';
import { toast } from 'react-toastify';
import ConfirmLogoutToast from './ConfirmLogout';


const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        backgroundColor: '#44b700',
        color: '#44b700',
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
        '&::after': {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            animation: 'ripple 1.2s infinite ease-in-out',
            border: '1px solid currentColor',
            content: '""',
        },
    },
    '@keyframes ripple': {
        '0%': {
            transform: 'scale(.8)',
            opacity: 1,
        },
        '100%': {
            transform: 'scale(2.4)',
            opacity: 0,
        },
    },
}));




const Header = () => {

    const { user } = useAuthStore();
    const { name, photo } = user;

    const logout = () => {
        toast(<ConfirmLogoutToast />, {
            position: "top-center",
            autoClose: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            toastId: "confirmLogout"
        });
    };

    return (
        <Box p={2} width="100%">
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="h6">
                    <span>Welcome, </span>
                    <span style={{ color: 'red' }}>{ name }</span>
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <StyledBadge
                        overlap="circular"
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                        variant="dot">
                        <Avatar alt={ name } src={ photo } />
                    </StyledBadge>
                    <Button variant="contained" color="error" onClick={logout}>
                        Logout
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};

export default Header;
