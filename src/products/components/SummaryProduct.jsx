import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import CategoryIcon from '@mui/icons-material/Category';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import { Box, Grid, Typography, useMediaQuery } from '@mui/material';
import CardInfo from './CardInfo';
import { useEffect, useState } from 'react';
import useProductStore from '../hooks/useProductStore';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';


const SummaryProduct = () => {
    const isTablet = useMediaQuery("(min-width: 768px)");
    const {
            totalValue, 
            totalCategories, 
            totalLowStock, 
            totalProducts, 
            startGetProducts 
                            } = useProductStore();
    

    useEffect(() => {
        startGetProducts();
    }, []);




    return (
        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Typography 
                variant={ isTablet ? "h2" : "h4" } 
                color="text.secondary">
                Inventory Stats
            </Typography>
            
            <Grid container item xs={12} alignItems="center" justifyContent="center" spacing={2}>
                <Grid container item sm={6} lg={12} spacing={2}>
                    <Grid container item lg={6} style={{ marginBottom: 20 }}>
                        <CardInfo
                            title="Total Products"
                            count={ totalProducts || 0}
                            icon={<ShoppingCartIcon sx={{ fontSize: 50 }} />}
                            bgColor={'#ff9800'}
                        />
                    </Grid>
                    <Grid container item lg={6} style={{ marginBottom: 20 }}>
                        <CardInfo
                            title="Total Store Value"
                            count={`$ ${parseFloat(totalValue).toFixed(2)}`}
                            icon={<MonetizationOnIcon sx={{ fontSize: 50 }} />}
                            bgColor={'#2196f3'}
                        />
                    </Grid>
                </Grid>

                <Grid container item sm={6} lg={12} spacing={2}>
                    <Grid container item lg={6} style={{ marginBottom: 20 }}>
                        <CardInfo
                            title="ALL Categories"
                            count={totalCategories || 0}
                            icon={<CategoryIcon sx={{ fontSize: 50 }} />}
                            bgColor={'#4caf50'}
                        />
                    </Grid>

                    <Grid container item lg={6} style={{ marginBottom: 20 }}>
                        <CardInfo
                            title="Out of Stock"
                            count={totalLowStock || 0}
                            icon={<RemoveShoppingCartIcon sx={{ fontSize: 50 }} />}
                            bgColor={'#f44336'}
                        />
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    )
};

export default SummaryProduct;