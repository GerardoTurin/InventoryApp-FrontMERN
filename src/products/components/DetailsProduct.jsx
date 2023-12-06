import { Box, Modal, Typography, Paper, Grid, CardMedia, Divider } from "@mui/material";

const DetailsProduct = ({ open, handleClose, productSelected }) => {
    if(!productSelected) return null;
    const { product } = productSelected;
    const { name, description, price, sku, quantity, category, image, createdAt, updatedAt } = product;

    return (
        <Modal open={ open } onClose={ handleClose }>
            <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', boxShadow: 24 }}>
                <Paper elevation={3} sx={{ p: 3}}>
                    <Grid container spacing={2} sx={{ width: 1000, height: '100%' }}>
                        {image && (
                            <Grid item xs={12} sm={6} sx={{ width: 600, height: 500 }}>
                                <CardMedia
                                    component="img"
                                    image={image.filePath}
                                    alt={name}
                                    sx={{ borderRadius: 2, height: '100%', width: '100%' }}
                                />
                            </Grid>
                        )}
                        <Grid item xs={12} sm={6} sx={{ width: 600, height: 500, overflow: 'auto' }}>
                            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                                Available Product:
                            </Typography>
                            <Typography style={{ color: quantity > 0 ? 'green' : 'red' }} variant="h6">
                                { quantity > 0 ? 'In Stock' : 'Out of Stock' }
                            </Typography>

                            <Divider style={{ marginTop: 5, marginBottom: 5 }} />
                            
                            <Typography variant="h6" sx={{mt: 1, fontWeight: 'bold' }}>
                                Name:
                            </Typography>
                            <Typography>
                                { name }
                            </Typography>
                            <Typography variant="h6" sx={{ mt: 1, fontWeight: 'bold' }}>
                                Category:
                            </Typography>
                            <Typography>
                                { category }
                            </Typography>
                            <Typography variant="h6" sx={{ mt: 1, fontWeight: 'bold' }}>
                                Price:
                            </Typography>
                            <Typography>
                                ${ price }
                            </Typography>
                            <Typography variant="h6" sx={{ mt: 1, fontWeight: 'bold' }}>
                                SKU:
                            </Typography>
                            <Typography>
                                { sku }
                            </Typography>
                            <Typography variant="h6" sx={{ mt: 1, fontWeight: 'bold' }}>
                                Quantity in Stock:
                            </Typography>
                            <Typography style={{ color: quantity >= 5 ? 'green' : 'red' }} variant="h6">
                                { quantity }
                            </Typography>
                            <Typography variant="h6" sx={{ mt: 1, fontWeight: 'bold' }}>
                                Total Value in Stock:
                            </Typography>
                            <Typography>
                                ${ price * quantity }
                            </Typography>
                            <Divider style={{ marginTop: 5, marginBottom: 5 }} />
                            <Typography variant="h6" sx={{ mt: 1, fontWeight: 'bold' }}>
                                Description:
                            </Typography>
                            <div dangerouslySetInnerHTML={{ __html: description }}></div>

                            <Divider style={{ marginTop: 5, marginBottom: 5 }} />

                            <Box sx={{ display: 'flex', flexDirection: 'column'}}>
                                <Typography variant="overline">
                                    Created At: { createdAt.toLocaleString('en-US') }
                                </Typography>
                                <Typography variant="overline">
                                    Updated At: { updatedAt.toLocaleString('en-US') }
                                </Typography>
                            </Box>
                        </Grid>
                    </Grid>
                </Paper>
            </Box>
        </Modal>
    )
};

export default DetailsProduct;
