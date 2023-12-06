import { Modal, Button, Box, Typography, CircularProgress } from "@mui/material";

const ConfirmDeleteProduct = ({ open, handleYesClick, handleNoClick, handleClose, loading }) => {

    return (
        <Modal open={ open } onClose={ handleClose }>
            <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    ¿Are you sure you want to delete this product?
                </Typography>
                <Button onClick={ handleYesClick } disabled={ loading }>
                    { loading ? <CircularProgress /> : 'Yes' }
                </Button>
                <Button onClick={ handleNoClick } disabled={ loading }>
                    No
                </Button>
            </Box>
        </Modal>
    )
};

export default ConfirmDeleteProduct;