import { Box, Divider } from "@mui/material";
import TableProducts from "../components/TableProducts";


const ProductList = () => {

    return (
        <Box 
            sx={{ 
                width: '100%'
                }}>
            <Divider style={{ margin: 30 }} />
            <TableProducts />
        </Box>
    )
};

export default ProductList;