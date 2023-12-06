import { IconButton, Toolbar, Tooltip, Typography,  alpha } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import UpdateIcon from '@mui/icons-material/Update';
import VisibilityIcon from '@mui/icons-material/Visibility';
import SearchProduct from "./SearchProduct";
import useProductStore from "../hooks/useProductStore";
import ConfirmDeleteProduct from "./ConfirmDeleteProduct";
import { useState } from "react";
import DetailsProduct from "./DetailsProduct";
import { useNavigate } from "react-router-dom";



const TableToolbar = ({ value, onChange, numSelected, onDeleteProduct, loading, setLoading, idSelected, setIdSelected }) => {
    const navigate = useNavigate();
    const { startGetProductById } = useProductStore();
    const [open, setOpen] = useState(false);
    const [viewOpen, setViewOpen] = useState(false);
    const [ productSelected, setProductSelected ] = useState(null);
    

    const handleDelete = () => {
            setOpen(true);
    };

    const handleYesClick = async () => {
        
        try {
            setLoading(true);
            await onDeleteProduct();
            setOpen(false);

        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const handleNoClick = () => {
        setOpen(false);
    };

    const handleClose = () => {
        setOpen(false);
    };



    // View Prodtuct Detail
    const handleView = async () => {
    
        try {
            const product = await startGetProductById(idSelected);
            setProductSelected(product);
            setViewOpen(true);
        } catch (error) {
            console.log(error);
        }
    };

    const handleViewClose = () => {
        setViewOpen(false);
    };




    const handleUpdate = async () => {
        const product = await startGetProductById(idSelected);
        setIdSelected(product);
        navigate(`/layout/update-product/${idSelected}`);   // Navegamos a la ruta de actualización
    };


    return (
        <Toolbar
            sx={{
                pl: { sm: 2 },
                pr: { xs: 1, sm: 1 },
                ...(numSelected > 0 && {
                    bgcolor: (theme) =>
                        alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
                }),
            }}
        >
            {numSelected > 0 ? (
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    color="inherit"
                    variant="subtitle1"
                    component="div"
                >
                    {numSelected} selected
                </Typography>
            ) : (
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    variant="h6"
                    id="tableTitle"
                    component="div"
                >
                    Inventory
                </Typography>
            )}

            {numSelected > 0 ? (
                <>
                    {numSelected === 1 && (
                        <Tooltip title="View" onClick={ handleView }>
                            <IconButton>
                                <VisibilityIcon color="primary" />
                            </IconButton>
                        </Tooltip>
                    )}
                    {numSelected === 1 && (
                        <Tooltip title="Update" onClick={ handleUpdate }>
                            <IconButton>
                                <UpdateIcon color="success" />
                            </IconButton>
                        </Tooltip>
                    )}
                    <Tooltip title="Delete" onClick={ handleDelete }>
                        <IconButton>
                            <DeleteIcon color="error" />
                        </IconButton>
                    </Tooltip>
                </>
            ) : (
                    <SearchProduct value={value} onChange={onChange} />
            )}
            <ConfirmDeleteProduct 
                open={open} 
                handleClose={ handleClose } 
                handleYesClick={ handleYesClick }
                handleNoClick={ handleNoClick }
                loading={ loading }                
                />
            <DetailsProduct 
                open={ viewOpen }
                handleClose={ handleViewClose }
                productSelected={ productSelected } />
        </Toolbar>
    );
};


export default TableToolbar;