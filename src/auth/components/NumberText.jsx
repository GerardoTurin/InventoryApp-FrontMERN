import { Typography, Box } from "@mui/material";

const NumberText = ({ num, text }) => {
    return (
        <Box className="--mr">
            <Typography variant="h3" sx={{ color: "#fff" }}>
                {num}
            </Typography>
            <Typography variant="body1" sx={{ color: "#fff" }}>
                {text}
            </Typography>
        </Box>
    );
};

export default NumberText;
