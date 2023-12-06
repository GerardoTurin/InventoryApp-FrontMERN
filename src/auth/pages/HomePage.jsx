import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button, Container, Grid, Paper, Box } from "@mui/material";
import LogoDevIcon from '@mui/icons-material/LogoDev';
import heroImg from "../../assets/inv-img.png";
import NumberText from "../components/NumberText";
import useAuthStore from "../hooks/useAuthStore";

const HomePage = () => {

    const { status  } = useAuthStore();

    return (
        <Box sx={{ bgcolor: 'primary.main', color: 'primary.contrastText', height: "100vh" }}>
            <AppBar position="static" elevation={0}>
                <Toolbar style={{ display: "flex", justifyContent: "space-between", gap: "1rem" }}>
                    <LogoDevIcon />
                    <Typography variant="h6" style={{ flex: 1 }}>
                        Inventory & Stock Management Solution
                    </Typography>
                    {
                        status === 'active' 
                            ? (
                                <Button variant="contained" color="info" component={ Link } to="/layout/dashboard">
                                    Dashboard
                                </Button>
                            ) : (
                                <Box sx={{ display: "flex", gap: "1rem" }}>
                                    <Button variant="contained" color="info" component={ Link } to="/register">
                                        Register
                                    </Button>
                                    <Button variant="outlined" color="secondary" component={ Link } to="/login">
                                        Login
                                    </Button>
                                </Box>
                            ) 
                    }
                </Toolbar>
            </AppBar>
            {/* HERO SECTION */}
            <Container>
                <Grid container spacing={4} alignItems="center">
                    <Grid item xs={12} sm={6}>
                        <Box elevation={3} className="hero-text" sx={{ p: 4, bgcolor: 'primary.main', color: 'primary.contrastText' }}>
                            <Typography variant="h4" gutterBottom>
                                Inventory & Stock Management Solution
                            </Typography>
                            <Typography variant="body1" paragraph>
                                Inventory system to control and manage products in the warehouse in real time and integrated to make it easier to develop your business.
                            </Typography>
                            <Button variant="contained" color="secondary" component={Link} to="/dashboard">
                                Free Trial 1 Month
                            </Button>
                            <Box sx={{ display: "flex", gap: "1rem", mt: 2 }}>
                                <NumberText num="14K" text="Brand Owners" />
                                <NumberText num="23K" text="Active Users" />
                                <NumberText num="500+" text="Partners" />
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <div className="hero-image">
                            <img src={heroImg} alt="Inventory" width="100%" />
                        </div>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default HomePage;
