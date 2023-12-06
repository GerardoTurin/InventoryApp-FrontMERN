import { Box, Link, Typography } from "@mui/material";


const Copyright = (props) => {
    return (
        <Box 
            sx={{  
                width: '100%',
                paddingTop: '10vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                }}>
            <Typography variant="body2" color="text.secondary" {...props} style={{textAlign: 'center'}}>
                {'© '}
                {'Inventario App '}
                {new Date().getFullYear()}
                <br />
                {'All rights reserved.'}
            </Typography>
        </Box>
    );
}

export default Copyright;