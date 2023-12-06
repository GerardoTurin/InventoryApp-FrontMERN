import { useEffect, useState } from "react";
import { Box, Button, CircularProgress, Grid, Paper, TextField, Typography } from "@mui/material";
import { toast } from "react-toastify";
import { styled } from '@mui/material/styles';
import 'react-quill/dist/quill.snow.css';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import PersonIcon from '@mui/icons-material/Person';
import useAuthStore from "../hooks/useAuthStore";


const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});



const ProductFormFields = {
    name: '',
    phone:''
};


const FormProfileUser = () => {
    const [previewFile, setPreviewFile] = useState(null);
    const [image, setImage] = useState('');
    const [loading, setLoading] = useState(false);
    const { user, startUpdateUser, startGetUserById } = useAuthStore();
    const [isUpdateClicked, setIsUpdateClicked] = useState(false);
    const [form , setForm] = useState(ProductFormFields);
    
    const { email, uid } = user;

    useEffect(() => {
        const getUser = async () => {
            try {
                const user = await startGetUserById(uid);
                setForm(user);
            } catch (error) {
                toast.error(error.message);
            }
        };
        getUser();
    }, []);

    const { name, phone, photo } = form;



    // actualiza la imagen de perfil
    useEffect(() => {
        if (photo) {
            setPreviewFile(photo);
        }
    }, [photo]);



    const onInputChange = ({ target }) => {
        const { name, value } = target;

        setForm(form => ({
            ...form,
            [name]: value
        }));
    };
    
    
    const handleUpdateClick = () => {
        setIsUpdateClicked(true);
    };


    // Agrega esta función para manejar la carga de la imagen
    const handleImageChange = (evt) => {
        
        const file = evt.target.files[0];
        if (!file) {
            setImage('');
            setPreviewFile(photo);
            return;
        }

        setImage(file);
        setPreviewFile(URL.createObjectURL(file));
    };



    const handleSubmit = async (evt) => {
        evt.preventDefault();
        setLoading(true);
        
        let imgData;
        // Primer paso: subir la imagen a Cloudinary
        if (image) {
            const formData = new FormData();
            formData.append('file', image);
            formData.append('upload_preset', 'inventarioAppProfile');
            formData.append('cloud_name', 'gera-turin');

            const resp = await fetch('https://api.cloudinary.com/v1_1/gera-turin/image/upload', {
                method: 'POST',
                body: formData
            });

            imgData = await resp.json();
        } 

        // guardar los datos del usuario actualizados
        const userUpdated = {
            ...form,
            photo: imgData?.secure_url || photo
        };


        try {
            await startUpdateUser(userUpdated);
            setIsUpdateClicked(false);

        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };
    


    return (
            <Paper
                elevation={3}
                sx={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                <Grid
                    xs={8} 
                    sx={{ 
                        display: 'flex', 
                        justifyContent: 'center', 
                        alignItems: 'center', 
                        width: '100%',
                        marginTop: '5vh', 
                        marginBottom: '5vh',
                        }}>
                    <Box 
                        component="form" 
                        onSubmit={ handleSubmit }
                        noValidate
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            width: '80%',
                            gap: 2,
                        }}>
                        
                        <Grid 
                            item 
                            xs={12}  
                            sx={{ 
                                width: '100%', 
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                                }}>
                                {/* Si hay photon mostrarla, sino mostrar el icono de usuario */}
                            { photo ? (
                                <img
                                    src={ image ? previewFile : photo }
                                    alt={ name }
                                    style={{ width: 200, height: 230, borderRadius: '50%' }}
                                />
                            ) : (
                                <PersonIcon sx={{ width: 200, height: 230, }} />
                            )}
                            <label htmlFor="image">
                                <Button
                                    variant="contained"
                                    component="span"
                                    startIcon={<CloudUploadIcon />}
                                    sx={{ display: isUpdateClicked ? 'flex' : 'none', my: 2, borderRadius: 1 }}
                                >
                                    <VisuallyHiddenInput
                                        id="image"
                                        name="image"
                                        label="Imagen"
                                        type="file"
                                        accept="image/*"
                                        onChange={ (evt) => handleImageChange(evt) }
                                    />
                                    { image ? 'Update Image' : 'Select Image'}
                                </Button>
                            </label>
                        </Grid>
                        <Grid 
                            item 
                            xs={12} 
                            sx={{ 
                                width: '100%',
                                height: '100%',
                                overflow: 'auto' 
                                }}>

                            <TextField
                                margin="normal"
                                type="text"
                                required
                                fullWidth
                                id="name"
                                label="Nombre"
                                name="name"
                                autoComplete="name"
                                autoFocus
                                value={ name }
                                disabled={ !isUpdateClicked }
                                onChange={ onInputChange }
                                />
                            <TextField
                                margin="normal"
                                type="text"
                                fullWidth
                                id="email"
                                label="Email"
                                name="email"
                                value={ email }
                                autoComplete="email"
                                disabled
                            />
                            <TextField
                                margin="normal"
                                type="text"
                                required
                                fullWidth
                                id="phone"
                                label="Phone"
                                name="phone"
                                value={ phone }
                                autoComplete="phone"
                                onChange={ onInputChange }
                                disabled={ !isUpdateClicked }
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ display: isUpdateClicked ? 'block' : 'none', my: 2 }}
                                disabled={ loading }
                            >
                                { loading ? <CircularProgress /> : 'Confirm'}
                            </Button>
                            <Button
                                type="button"
                                fullWidth
                                variant="contained"
                                sx={{ display: isUpdateClicked ? 'none' : 'block', my: 2 }}
                                onClick={ handleUpdateClick }
                                >
                                Update User
                            </Button>
                        </Grid>
                    </Box>
                </Grid>
            </Paper>
    )
};

export default FormProfileUser;