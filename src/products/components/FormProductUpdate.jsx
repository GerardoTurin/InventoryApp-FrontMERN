import { useNavigate, useParams } from "react-router-dom";
import useProductStore from "../hooks/useProductStore";
import { useEffect, useState } from "react";
import { Box, Button, CircularProgress, Grid, Paper, TextField, Typography } from "@mui/material";
import { toast } from "react-toastify";
import { styled } from '@mui/material/styles';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { productFormFormats, productFormModules } from "../../util/descriptionForm";



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




const FormProductUpdate = ({ product }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [previewFile, setPreviewFile] = useState(null);
    const [image, setImage] = useState('');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);
    const { startUpdateProduct, startGetProducts } = useProductStore();
    const [productData, setProductData] = useState({
        product: {
            name: '',
            sku: '',
            category: '',
            quantity: '',
            price: '',
        },
    });


    useEffect(() => {
        if (product) {
            setProductData(product);
        }
    }, [product]);


    // actualizamos el description con el valor que viene del producto
    useEffect(() => {
        if (productData.product?.description) {
            setDescription(productData.product?.description);
        }
    }, [productData.product?.description]);


    // Actualizamos el IMAGEN con el valor que viene del producto
    useEffect(() => {
        if (productData.product?.image) {
            setImage(productData.product?.image);
            setPreviewFile(productData.product?.image.filePath);
        }
    }, [productData.product?.image]);



    const { name, category, quantity, price } = productData.product;

    const onInputChange = (evt) => {
        const { name, value } = evt.target;
        setProductData({
            product: {
                ...productData.product,
                [name]: value,
            },
        });
    };


    const updateDescriptionChange = (value) => {
        if (value) {
            setDescription(value);
            setProductData({
                product: {
                    ...productData.product,
                    description: value,
                },
            });
        }
    };




    const handleImageUpdate = (evt) => {
        const file = evt.target.files[0];
        if (file) {
            setImage(file);
            setPreviewFile(URL.createObjectURL(file));
        }

        
        const reader = new FileReader();
        reader.onloadend = () => {
            setPreviewFile(reader.result);
        };
        reader.readAsDataURL(file);


    };





    const handleUpdateSubmit = async (evt) => {
        evt.preventDefault();

        //image
        const newformData = new FormData();
        newformData.append('name', name);
        newformData.append('category', category);
        newformData.append('quantity', quantity);
        newformData.append('price', price);
        newformData.append('description', description);
        if ( !image ) {
            newformData.append('image', productData.product?.image);
        } else {
            newformData.append('image', image);
        }

        setLoading(true);

        try {
            await startUpdateProduct(id, newformData);
            await startGetProducts();
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
                        onSubmit={handleUpdateSubmit}
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
                            <label htmlFor="image">
                                <Typography variant="body1" color="text.secondary">
                                    Imagen *
                                </Typography>
                                <VisuallyHiddenInput
                                    id="image"
                                    name="image"
                                    type="file"
                                    accept="image/*"
                                    onChange={(evt) => handleImageUpdate(evt)}
                                />
                                <Button
                                    variant="contained"
                                    component="span"
                                    startIcon={<CloudUploadIcon />}
                                    sx={{ mt: 2 }}
                                >
                                    {image ? 'Cambiar Imagen' : 'Seleccionar Imagen'}
                                </Button>
                            </label>
                            {
                                productData.product?.image && previewFile ? (
                                    <img
                                        src={previewFile}
                                        alt={productData.product?.name}
                                        style={{ height: '100px', borderRadius: '5px' }}
                                    />
                                ) : (
                                    <AddPhotoAlternateIcon
                                        sx={{ height: '100px', borderRadius: '5px' }}
                                    />
                                )
                            }

                        </Box>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="name"
                            label="Name"
                            name="name"
                            value={productData.product?.name}
                            onChange={onInputChange}
                            InputLabelProps={{
                                shrink: productData.product?.name ? true : undefined,
                            }}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="category"
                            label="Categoría"
                            name="category"
                            value={productData.product?.category}
                            onChange={onInputChange}
                            InputLabelProps={{
                                shrink: productData.product?.category ? true : undefined,
                            }}
                        />
                        <TextField
                            margin="normal"
                            fullWidth
                            id="sku"
                            label="SKU"
                            name="sku"
                            autoComplete="sku"
                            value={productData.product?.sku}
                            onChange={onInputChange}
                            disabled
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="quantity"
                            label="Cantidad"
                            name="quantity"
                            autoComplete="quantity"
                            value={productData.product?.quantity}
                            onChange={onInputChange}
                            InputLabelProps={{
                                shrink: productData.product?.quantity ? true : undefined,
                            }}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="price"
                            label="Precio"
                            name="price"
                            value={productData.product?.price}
                            onChange={onInputChange}
                            InputLabelProps={{
                                shrink: productData.product?.price ? true : undefined,
                            }}
                        />
                        <label htmlFor="description">
                            <Typography variant="body1" color="text.secondary" sx={{ my: 1 }}>
                                Descripción *
                            </Typography>
                            <ReactQuill
                                id="description"
                                name="description"
                                value={productData.product?.description}
                                onChange={(value) => updateDescriptionChange(value)}
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
                            disabled={loading}
                        >
                            {loading ? <CircularProgress /> : 'Update Product'}
                        </Button>
                    </Box>
                </Grid>
        </Paper>
    )
};

export default FormProductUpdate;