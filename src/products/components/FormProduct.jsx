import { useNavigate } from "react-router-dom";
import useForm from "../../auth/hooks/useForm";
import useProductStore from "../hooks/useProductStore";
import { useState } from "react";
import { Box, Button, CircularProgress, Grid, Paper, TextField, Typography } from "@mui/material";
import { toast } from "react-toastify";
import { styled } from '@mui/material/styles';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import{ productFormFormats, productFormModules } from "../../util/descriptionForm";



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
    sku: '',
    category: '',
    quantity: '',
    price: '',
};


const FormProduct = () => {
    const navigate = useNavigate();
    const [previewFile, setPreviewFile] = useState(null);
    const [image, setImage] = useState('');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);
    const { name, category, quantity, price, onInputChange, onResetForm } = useForm(ProductFormFields);
    const { startCreateProduct } = useProductStore();


    const handleDescriptionChange = (value) => {
        setDescription(value);
    };



    // Agrega esta función para manejar la carga de la imagen
    const handleImageChange = (evt) => {
        const file = evt.target.files[0];
        if (!file) {
            setImage('');
            setPreviewFile(null);
            return;
        }

        setImage(file);
        setPreviewFile(URL.createObjectURL(file));
    };


    const generateSKU = (category) => {
        const letter = category.slice(0, 3).toUpperCase();  // Tomamos las primeras 3 letras de la categoría
        const number = Date.now()

        const sku = `${letter}-${number}`;  // Generamos el SKU
        return sku;
    };



    const handleSubmit = async (evt) => {
        evt.preventDefault();

        // Validar campos vacios
        if (!name || !category || !quantity || !price || !description) {
            toast.error('Todos los campos son obligatorios');
            return;
        }

        //Sku
        const sku = generateSKU(category);
        
        //image
        const formData = new FormData();
        formData.append('image', image);
        formData.append('name', name);
        formData.append('sku', sku);
        formData.append('category', category);
        formData.append('quantity', quantity);
        formData.append('price', price);
        formData.append('description', description);
        
        setLoading(true);

        try {
            await startCreateProduct(formData);
            onResetForm();
            navigate('/layout/dashboard');

        } catch (error) {
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
                container 
                item 
                xs={8} 
                sx={{ 
                    display: 'flex', 
                    justifyContent: 'center', 
                    alignItems: 'center', 
                    width: '100%',
                    marginTop: '5vh', 
                    marginBottom: '5vh' 
                    }}>
                <Box 
                    component="form" 
                    onSubmit={ handleSubmit } 
                    noValidate >
                    <Box
                        sx={{
                            border: '1px dashed grey',
                            borderRadius: '5px',
                            padding: '10px',
                            marginBottom: '10px',
                            display: 'flex',
                            gap: '20px',
                            justifyContent: 'space-between',
                        }}>
                        <label htmlFor="img">
                            <Typography variant="body1" color="text.secondary">
                                Image *
                            </Typography>
                            <VisuallyHiddenInput 
                                id="img"
                                name="image"
                                type="file"
                                accept="image/*"
                                onChange={ (evt) => handleImageChange(evt) }
                            />
                            <Button
                                variant="contained"
                                component="span"
                                startIcon={<CloudUploadIcon />}
                                sx={{ mt: 2 }}
                            >
                                { image ? 'Cambiar Imagen' : 'Seleccionar Imagen'}
                            </Button>
                        </label>
                        { previewFile && (
                            <img
                                src={previewFile}
                                alt="Preview"
                                style={{ height: '100px', borderRadius: '5px' }}
                            />
                        )}
                        { !previewFile && (
                                <AddPhotoAlternateIcon sx={{ fontSize: 100, color: 'grey.300' }} />
                        )}
                    </Box>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="name"
                        label="Name"
                        name="name"
                        autoComplete="name"
                        autoFocus
                        value={name}
                        onChange={onInputChange}/>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="category"
                        label="Category"
                        name="category"
                        autoComplete="category"
                        value={category}
                        onChange={onInputChange}/>
                    <TextField
                        margin="normal"
                        fullWidth
                        id="sku"
                        label="SKU"
                        name="sku"
                        autoComplete="sku"
                        value={generateSKU(category)}
                        onChange={onInputChange}
                        disabled/>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="quantity"
                        label="Quantity"
                        name="quantity"
                        autoComplete="quantity"
                        value={quantity}
                        onChange={onInputChange}/>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="price"
                        label="Price"
                        name="price"
                        autoComplete="price"
                        value={price}
                        onChange={onInputChange}/>
                    <label htmlFor="description">
                        <Typography variant="body1" color="text.secondary" sx={{ my: 1 }}>
                            Descripción *
                        </Typography>
                        <ReactQuill
                            id="description"
                            name="description"
                            value={description}
                            onChange={ (value) => handleDescriptionChange(value) }
                            modules={productFormModules}
                            formats={productFormFormats}
                            style={{ height: '200px', marginBottom: '10px' }}
                        />
                    </label>

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 10 }}
                        disabled={ loading }
                    >
                        { loading ? <CircularProgress /> : 'Crear Producto'}
                    </Button>
                </Box>
            </Grid>
        </Paper>
    )
};

export default FormProduct;