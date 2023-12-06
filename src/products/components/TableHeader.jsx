import { visuallyHidden } from '@mui/utils';
import TableHead from '@mui/material/TableHead';
import TableSortLabel from '@mui/material/TableSortLabel';
import { Box, Checkbox, TableCell, TableRow } from '@mui/material';

const headCells = [
    {
        id: 'name',
        item: false,
        disablePadding: true,
        label: 'Name',
    },
    {
        id: 'category',
        item: true,
        disablePadding: false,
        label: 'Category',
    },
    {
        id: 'price',
        item: true,
        disablePadding: false,
        label: 'Price',
    },
    {
        id: 'quantity',
        item: true,
        disablePadding: false,
        label: 'Quantity',
    },
    {
        id: 'value',
        item: true,
        disablePadding: false,
        label: 'Value',
    },
];

const TableHeader = ({ onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort }) => {
    
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                    <Checkbox
                        color="primary"
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{
                            'aria-label': 'select all desserts',
                        }}
                    />
                </TableCell>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.item ? 'right' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
};


export default TableHeader;