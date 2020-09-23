import React, { Component } from "react"
import { Header } from './Header'
import { useStore } from "./Store";
import { Table, TableContainer, TableBody, TableCell, TableHead, TableRow, Checkbox, Paper } from '@material-ui/core'
import { lighten, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    paper: {
        width: '100%',
        marginBottom: theme.spacing(2),
    }
}));

const TableHeaders = [
    { id: 'Product', numeric: false, disablePadding: true, label: 'Product' },
    { id: 'Weight', numeric: true, disablePadding: false, label: 'Weight' },
    { id: 'Untis', numeric: true, disablePadding: false, label: 'Units' },
    { id: 'Price', numeric: true, disablePadding: false, label: 'Price' },

];

function EnhancedTableHead(props) {
    const { classes, onSelectAllClick, numSelected, rowCount, onRequestSort } = props;


    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                    <Checkbox
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{ 'aria-label': 'select all desserts' }}
                    />
                </TableCell>
                {TableHeaders.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'default'}
                    >
                        {headCell.label}


                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}
export const Cart = (props) => {
    const classes = useStyles();
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('calories');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const { cart, setCart } = useStore();
    console.log(cart, 'cart in cart')

    const CartItems = () => {
        return (cart.map((cart) =>
            <li key={cart.itemNumber}>
                {cart.productName} {cart.weight}gms {cart.units} {cart.price}
            </li>))
    }

    const handleClick = (event, name) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected = [];
    
        if (selectedIndex === -1) {
          newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
          newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
          newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
          newSelected = newSelected.concat(
            selected.slice(0, selectedIndex),
            selected.slice(selectedIndex + 1),
          );
        }
    
        setSelected(newSelected);
      };
    
    const handleSelectAllClick = () => {

    }
    const isSelected = (name) => selected.indexOf(name) !== -1;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, cart.length - page * rowsPerPage);
    console.log(cart, 'dfsdfsdf')
    return (
        <div>
            <Header title={(props.location.pathname).substring(1)} history={props.history} />
            

            <Paper className={classes.paper}>
                <TableContainer>
                    <Table>
                        <EnhancedTableHead
                            classes={classes}
                            numSelected={selected.length}
                            onSelectAllClick={handleSelectAllClick}
                            cartCount={cart.length}
                        />
                        <TableBody>
                            {cart.map((cart, index) => {
                                    const isItemSelected = isSelected(cart.productName);
                                    const labelId = `enhanced-table-checkbox-${index}`;

                                    return (
                                        <TableRow
                                            hover
                                            onClick={(event) => handleClick(event, cart.productName)}
                                            role="checkbox"
                                            aria-checked={isItemSelected}
                                            tabIndex={-1}
                                            key={cart.productName}
                                            selected={isItemSelected}
                                        >
                                            <TableCell padding="checkbox">
                                                <Checkbox
                                                    checked={isItemSelected}
                                                    inputProps={{ 'aria-labelledby': labelId }}
                                                />
                                            </TableCell>
                                            <TableCell component="th" id={labelId} scope="row" padding="none">
                                            {cart.productName}
                                            </TableCell>
                                           
                                            <TableCell align="right">{cart.weight}</TableCell>
                                            <TableCell align="right">{cart.units}</TableCell>
                                            <TableCell align="right">{cart.price}</TableCell>
                                        </TableRow>
                                    );
                                })}
                            {emptyRows > 0 && (
                                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                                    <TableCell colSpan={6}> Cart is empty</TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>


            </Paper>

        </div>
    )
}
