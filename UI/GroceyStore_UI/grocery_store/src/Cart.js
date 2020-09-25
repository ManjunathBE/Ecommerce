import React, { Component } from "react"
import { Header } from './Header'
import { useStore } from "./Store";
import { Table, TableContainer, TableBody, TableCell, TableHead, TableRow, Checkbox, Paper, Toolbar, Typography, Tooltip } from '@material-ui/core'
import { lighten, makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import FilterListIcon from '@material-ui/icons/FilterList';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    paper: {
        width: '100%',
        marginBottom: theme.spacing(2),
    }, visuallyHidden: {
        border: 0,
        clip: 'rect(0 0 0 0)',
        height: 1,
        margin: -1,
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        top: 20,
        width: 1,
      },
}));

const TableHeaders = [
    { id: 'Product', numeric: false, disablePadding: true, label: 'Product' },
    { id: 'Weight', numeric: true, disablePadding: false, label: 'Weight' },
    { id: 'Untis', numeric: true, disablePadding: false, label: 'Units' },
    { id: 'Price', numeric: true, disablePadding: false, label: 'Price' },

];

function EnhancedTableHead(props) {
    const { classes, onSelectAllClick, numSelected, cartCount } = props;

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                    <Checkbox
                        indeterminate={numSelected > 0 && numSelected < cartCount}
                        checked={cartCount > 0 && numSelected === cartCount}
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


EnhancedTableHead.propTypes = {
    classes: PropTypes.object.isRequired,
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    cartCount: PropTypes.number.isRequired,
  };
  
  const useToolbarStyles = makeStyles((theme) => ({
    root: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(1),
    },
    highlight:
      theme.palette.type === 'light'
        ? {
            color: theme.palette.secondary.main,
            backgroundColor: lighten(theme.palette.secondary.light, 0.85),
          }
        : {
            color: theme.palette.text.primary,
            backgroundColor: theme.palette.secondary.dark,
          },
    title: {
      flex: '1 1 100%',
    },
  }));
  
  const EnhancedTableToolbar = (props) => {
    const classes = useToolbarStyles();
    const { numSelected } = props;
  
    return (
      <Toolbar
        className={clsx(classes.root, {
          [classes.highlight]: numSelected > 0,
        })}
      >
        {numSelected > 0 ? (
          <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
            {numSelected} selected
          </Typography>
        ):"" }
  
        {numSelected > 0 ? (
          <Tooltip title="Delete">
            <IconButton aria-label="delete">
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        ) :""}
      </Toolbar>
    );
  };
  
  EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
  };


export const Cart = (props) => {
    const classes = useStyles();
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('calories');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const { cart, setCart } = useStore();

    const CartItems = () => {
        return (cart.map((cart) =>
            <li key={cart.itemNumber}>
                {cart.productName} {cart.weight}gms {cart.units} {cart.price}
            </li>))
    }

    const handleSelectAllClick = (event) => {
        debugger
        if (event.target.checked) {
          const newSelecteds = cart.map((n) => n.productName);
          setSelected(newSelecteds);
          return;
        }
        setSelected([]);
      };
    
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
    
      
    const isSelected = (name) => selected.indexOf(name) !== -1;
    const emptyRows = cart.length
    return (
        <div>
            <Header title={(props.location.pathname).substring(1)} history={props.history} />
            

            <Paper className={classes.paper}>
            <EnhancedTableToolbar numSelected={selected.length} />
                <TableContainer>
               { emptyRows? <Table>
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

                        </TableBody>
                    </Table> : "Cart is empty"}
                </TableContainer>


            </Paper>

        </div>
    )
}
