import { Box } from "@mui/material";
import ProductList from "../../products/pages/ProductList";
import SummaryProduct from "../../products/components/SummaryProduct";

const Dashboard = () => {

    return (
        <Box 
            sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                flexDirection: 'column',
                width: '100%',
                //height: '100vh',
                //marginTop: '30vh',
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
                    <SummaryProduct />
                    <ProductList />
                </Box>
        </Box>
    )
}

export default Dashboard;