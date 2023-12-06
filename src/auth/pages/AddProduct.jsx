import { Typography, Box, useMediaQuery } from "@mui/material";
import FormProduct from "../../products/components/FormProduct";

const AddProduct = () => {
    const isTablet = useMediaQuery("(min-width: 768px)");
    return (
        <Box
            sx={{ 
                display: 'flex', 
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                width: '100%',
                
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
                    Add Product
                </Typography>
                <FormProduct />
            </Box>
        </Box>
    )
};

export default AddProduct;
