import { Avatar, Box, Card, Divider, Grid, List, ListItem, ListItemAvatar, ListItemText, Paper, TextField, Typography } from "@mui/material";
import useForm from "../hooks/useForm";
import useAuthStore from "../hooks/useAuthStore";
import PhoneIcon from '@mui/icons-material/Phone';
import MailIcon from '@mui/icons-material/Mail';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SendIcon from '@mui/icons-material/Send';
import LoadingButton from '@mui/lab/LoadingButton';
import { useState } from "react";



const formFields = {
    subject: '',
    message: '',
};

const FormContact = () => {

    const { startContact } = useAuthStore();
    const {subject, message, onInputChange, onResetForm} = useForm(formFields);
    const [loading, setLoading] = useState(false);

    const sendEmail = async (evt) => {
        setLoading(true);
        evt.preventDefault();
        const data = { subject, message };
        
        try {
            await startContact(data);
            onResetForm();
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Paper 
            sx={{ 
                width:'100%', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center' }}>
            <Grid
                sx={{ 
                    display: 'flex',
                    gap: 2,
                    width: '100%',
                    marginTop: '5vh', 
                    marginBottom: '5vh', 
                    padding: 2,
                    }}>
                <Box
                    component='form' 
                    onSubmit={ sendEmail }
                    sx={{ 
                        display: 'flex', 
                        flexDirection: 'column',
                        alignItems: 'center', 
                        gap: 2,  
                        width: '100%' }}>
                    <TextField 
                        label="Subject" 
                        variant="filled"
                        name="subject"
                        value={ subject }
                        onChange={ onInputChange }
                        fullWidth   
                        />
                    <TextField
                        label="Message"
                        multiline
                        rows={4}
                        variant="filled"
                        name="message"
                        value={ message }
                        onChange={ onInputChange }
                        fullWidth
                        />
                    <LoadingButton
                        size="small"
                        type="submit"
                        endIcon={<SendIcon />}
                        loading={loading}
                        loadingPosition="end"
                        variant="contained"
                        >
                        Send
                    </LoadingButton>
                </Box>
                <Card 
                    sx={{ 
                        width: '100%', 
                        display: 'flex', 
                        justifyContent: 'center', 
                        flexDirection: 'column', 
                        gap: 2, 
                        padding: 2, 
                        backgroundColor: 'primary.main'
                        }}>
                    <Typography variant="h5" color="white" align="left">
                        Contact
                    </Typography>
                    <Typography variant="body1" color="white" align="left">
                        Fill the form or contact us via other channels listed below
                    </Typography>

                    <List
                        sx={{
                            width: '100%',
                            maxWidth: 360,
                            bgcolor: 'inherit',
                            color: 'white',
                        }}
                        >
                        <ListItem>
                            <ListItemAvatar>
                            <Avatar>
                                <PhoneIcon />
                            </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary="0385 123 456" secondary="Phone" secondaryTypographyProps={{ style: { color: '#e0e0e0' } }}/>
                        </ListItem>
                        <Divider variant="inset" component="li" sx={{ bgcolor: 'white' }}/>
                        <ListItem>
                            <ListItemAvatar>
                            <Avatar>
                                <MailIcon />
                            </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary="@inventoryapp.com" secondary="Email" secondaryTypographyProps={{ style: { color: '#e0e0e0' } }}/>
                        </ListItem>
                        <Divider variant="inset" component="li" sx={{ bgcolor: 'white' }}/>
                        <ListItem>
                            <ListItemAvatar>
                            <Avatar>
                                <LocationOnIcon />
                            </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary="Los Angeles, CA" secondary="Address" secondaryTypographyProps={{ style: { color: '#e0e0e0' } }} />
                        </ListItem>
                    </List>
                </Card>
            </Grid>

        </Paper>
    )
};

export default FormContact;