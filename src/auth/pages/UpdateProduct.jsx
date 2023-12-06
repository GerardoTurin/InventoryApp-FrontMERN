import { Typography, Box, useMediaQuery } from "@mui/material";
import FormProductUpdate from "../../products/components/FormProductUpdate";
import { useEffect, useState } from "react";
import useProductStore from "../../products/hooks/useProductStore";
import { useParams } from "react-router-dom";


const UpdateProduct = () => {
    const isTablet = useMediaQuery("(min-width: 768px)");
    const [product, setProduct] = useState(null);
    const { startGetProductById } = useProductStore();
    const { id } = useParams();

    useEffect(() => {
        const fetchProduct = async () => {
            const product = await startGetProductById(id);
            setProduct(product);
            //console.log(product);
        };
        fetchProduct();
    }, []);

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
                    color="text.secondary">
                    Update Product
                </Typography>
                <FormProductUpdate product={product}/>
            </Box>
        </Box>
    )
};

export default UpdateProduct;
