import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import LockResetIcon from '@mui/icons-material/LockReset';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoDevIcon from '@mui/icons-material/LogoDev';
import { useState } from 'react';
import Header from '../components/Header';
import Copyright from '../components/Copyright';
import { Link, Outlet } from 'react-router-dom';
import { Collapse, Grid } from '@mui/material';
import useSessionExpire from '../hooks/useSessionExpire';
import useLayout from '../hooks/useLayout';



const LayoutPage = () => {

    const theme = useTheme();
    const [open, setOpen] = useState(true);
    const [expanded, setExpanded] = useState(false);
    const { AppBar, Drawer, DrawerHeader } = useLayout();

    useSessionExpire('/');


    const handleExpandToggle = () => {
        setExpanded(!expanded);
    };

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };


    return (
        <Box sx={{ display: 'flex', minHeight: '100vh' }}>
            <AppBar position="fixed" open={open} color='primary'>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{
                            marginRight: 5,
                            ...(open && { display: 'none' }),
                        }}>
                        <MenuIcon />
                    </IconButton>
                    <Header />
                </Toolbar>
            </AppBar>
            <Drawer variant="permanent" open={open}>
                <DrawerHeader>
                    <Link
                        to='/layout/dashboard'
                        style={{
                            textDecoration: 'none',
                            width: open ? '100%' : 'auto',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: 5
                        }}>
                        <LogoDevIcon
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                height: '60px',
                                width: '100%',
                                color: 'primary.main',
                            }}/>
                    </Link>
                    <IconButton onClick={ handleDrawerClose }>
                        {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                    </IconButton>
                </DrawerHeader>
                <List>
                    <ListItemButton>
                        <Link
                            to='/layout/dashboard'
                            style={{
                                textDecoration: 'none',
                                width: open ? '100%' : 'auto',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                            <ListItemIcon >
                                <DashboardIcon />
                            </ListItemIcon>
                            <ListItemText primary="Dashboard" />
                        </Link>
                    </ListItemButton>
                    <ListItemButton>
                        <Link
                            to='/layout/add-product'
                            style={{
                                textDecoration: 'none',
                                width: open ? '100%' : 'auto',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                            <ListItemIcon>
                                <AddPhotoAlternateIcon />
                            </ListItemIcon>
                            <ListItemText primary="Add Product" />
                        </Link>
                    </ListItemButton>
                    <ListItemButton onClick={handleExpandToggle}>
                        <ListItemIcon>
                            <AdminPanelSettingsIcon />
                        </ListItemIcon>
                        <ListItemText primary="Account" />
                        {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                    </ListItemButton>
                    <Collapse in={expanded} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItemButton sx={{ pl: 4 }}>
                                <Link
                                    to='/layout/profile'
                                    style={{
                                        textDecoration: 'none',
                                        width: open ? '100%' : 'auto',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}>
                                    <ListItemIcon>
                                        <AccountCircleIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Profie" />
                                </Link>
                            </ListItemButton>
                            <ListItemButton sx={{ pl: 4 }}>
                                <Link
                                    to='/layout/change-password'
                                    style={{
                                        textDecoration: 'none',
                                        width: open ? '100%' : 'auto',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}>
                                    <ListItemIcon>
                                        <LockResetIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Change Password" />
                                </Link>
                            </ListItemButton>
                        </List>
                    </Collapse>
                    <Divider />
                    <ListItemButton>
                        <Link
                            to='/layout/support'
                            style={{
                                textDecoration: 'none',
                                width: open ? '100%' : 'auto',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                            <ListItemIcon>
                                <ContactSupportIcon />
                            </ListItemIcon>
                            <ListItemText primary="Contact" />
                        </Link>
                    </ListItemButton>
                </List>
            </Drawer>
            <Grid
                component="main"
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%',
                    flexGrow: 1,
                    padding: theme => theme.spacing(3),
                }}>
                <Grid item xs={12} >
                    <Outlet />
                </Grid>
                <Grid item xs={12} sx={{ marginTop: '2vh' }}>
                    <Copyright />
                </Grid>
            </Grid>
        </Box>
    );
};


export default LayoutPage;