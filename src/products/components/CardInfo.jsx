import { Box } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';


const CardInfo = ({bgColor,title, count, icon}) => {
    return (
        <Card sx={{ width: '100%', backgroundColor: bgColor, boxShadow: '1px 3px 10px 0px rgba(0,0,0,0.75)' }}>
            <CardContent 
                sx={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center', 
                    }}>
                <Box sx={{ color: 'white' }}>
                    {icon}
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
                    <Typography variant='h5' color="white">
                        {title}
                    </Typography>
                    <Typography variant="h5" component="div" color="white">
                        {count}
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    )
};

export default CardInfo;