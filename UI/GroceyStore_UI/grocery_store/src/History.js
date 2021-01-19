import React, { Component, Link, useEffect, useState } from "react";
import { Header } from './Header'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import { Dialog, DialogContent, DialogTitle, Switch, Typography, Grid } from '@material-ui/core';
import Button from "@material-ui/core/Button"
import { useStore } from "./Store";
import { Label } from "@material-ui/icons";

const columns = [
  { id: 'date', label: 'Date', minWidth: 130 },
  { id: 'time', label: 'Time', minWidth: 130 },
  {
    id: 'status',
    label: 'Status',
    minWidth: 130,
    //align: 'right',
    //format: (value) => value.toLocaleString('en-US'),
  },
];

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
});



export function History(props) {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [transactions, setTransactions] = useState([]);
  const [Dialogview, setDialogView] = useState(false)
  const [selectedRow, setSelectedRow] = useState([])
  const { cartStore, setCartStore, userStore } = useStore();
  const { history } = props;
  const [warningDialog, setWarningDialog] = useState(false)
  const [showToggleSwitch, setShowToggleSwitch] = useState(false)
  const [isToggleOn, setIsToggleOn] = useState(false)



  useEffect(() => {
    fetchTransactions()
  }, [])

  const fetchTransactions = () => {
    console.log(userStore)
 const userId = userStore.user.UserId
    console.log( JSON.stringify( {
      uniqueid: userId
    }),'herfe herer')

    fetch('http://167.71.235.9:3024/cart/getOrderDetailsByUserId',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': window.localStorage.token
      },
      body: JSON.stringify( {
        uniqueid: userId
      })
    })
      .then(result => {
        if (result.status === 404) {
          console.log('result is 404')
        } else if (result.status !== 200) {
          console.log('result is not 200')
        } else {
          result.json().then(body => {
            if (body.success !== true) {
              console.log('request failed', body)
            } else {
            setTransactions(body.data)
            }
          });
        }
      })
      .catch(error => {
        console.log("error from server", JSON.stringify(error, Object.getOwnPropertyNames(error)));
      });
  }

  const handleClick = (tran) => {
    console.log('in method')

    //uncomment after changes from backend
    // setSelectedRow(tran)
    // setDialogView(true)
  }


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };



  const HistoricOrder = (props) => {
    var tran = props.transaction
    var orderedProducts = tran.orderedProducts
    const Headers = [
      { id: 'Product', numeric: false, disablePadding: true, label: 'Product Name' },
      { id: 'Price', numeric: true, disablePadding: true, label: 'Price' },
      { id: 'Quantity', numeric: true, disablePadding: true, label: 'Quantity' },
      { id: 'Units', numeric: true, disablePadding: true, label: 'Units' },
    ]

    const handleEditOrReorder = (e) => {
      e.preventDefault()

      console.log(cartStore.cart.length, 'cart in edit')
      if (cartStore.cart.length !== 0) {
        setWarningDialog(true)
      }
      else {
        orderedProducts.map((item) => setCartStore({ item, type: 'AddFromHistory' }))
        history.push(`/cart`)
      }
    }

    const handleWarningDialogClose = () => {
      setWarningDialog(false)
    }

    const handleProceedToCart = () => {
      orderedProducts.map((item) => setCartStore({ item, type: 'AddFromHistory' }))
      history.push(`/cart`)
    }

    const handleClose = () => {
      setDialogView(false)
    }
    console.log(tran, 'tran in order')

    const showActionButtons = () => {
      if (tran.status === 'Executed') {
        setShowToggleSwitch(true)
        return (<Button onClick={handleEditOrReorder}>Reorder</Button>)
      }
      else if (tran.status === 'Ordered') {
        setShowToggleSwitch(false)
        return (<Button onClick={handleEditOrReorder}>Edit</Button>)
      }
      else if (tran.status === 'Processed') {

        setShowToggleSwitch(false)
        return (<React.Fragment><Button>Missing</Button>
          <Button>Return</Button>
          <Button>Confirm received products</Button></React.Fragment>)
      }
    }

    const handleSwitchChange = (event) => {
      setIsToggleOn(event.target.checked)
    }

    console.log(showToggleSwitch, 'switch')
    return (
      <div>

        <Dialog onClose={handleClose} open={Dialogview}>
          <DialogTitle>

          </DialogTitle>
          <DialogContent>

            {showToggleSwitch ?
              <Grid container direction='row' >
                <Grid xs={3}>
                  <Typography>Ordered</Typography></Grid>
                <Grid xs={3}><Switch onChange={handleSwitchChange} checked={isToggleOn} /></Grid>
                <Grid xs={3}><Typography>Supplied</Typography></Grid>
              </Grid> : ""}

            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    {Headers.map((headCell) => (
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
                <TableBody>
                  {isToggleOn ?
                    tran.orderedProducts.map((p) => {

                      return (
                        <TableRow>
                          <TableCell>{p.productName}</TableCell>
                          <TableCell>{p.processedPrice}</TableCell>
                          <TableCell>{p.processedQuantity}</TableCell>
                          <TableCell>{p.unit}</TableCell>
                        </TableRow>
                      )
                    })

                    :
                    
                    tran.orderedProducts.map((p) => {

                      return (
                        <TableRow>
                          <TableCell>{p.productName}</TableCell>
                          <TableCell>{p.price}</TableCell>
                          <TableCell>{p.quantity}</TableCell>
                          <TableCell>{p.unit}</TableCell>
                        </TableRow>
                      )
                    })}
                </TableBody>
              </Table>
            </TableContainer>
            {showActionButtons()}
          </DialogContent>
        </Dialog>


        <Dialog onClose={handleWarningDialogClose} open={warningDialog}>
          <DialogTitle>

          </DialogTitle>
          <DialogContent>
            The items in your cart will be deleted
         <Button varaint="contained" color="primary" onClick={handleProceedToCart}>Proceed</Button>
          </DialogContent>
        </Dialog>
      </div>

    )
  }



  return (<div>
    <Paper className={classes.root}>
      <Header title={(props.location.pathname).substring(1)} history={props.history} />
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {/* {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => { */}
            {transactions.map((column) => {
              var transactionDateTime = new Date(column.OrderDateAndTime)
              var transactionDate = transactionDateTime.toLocaleDateString()
              var transactionTime = transactionDateTime.toLocaleTimeString()

              return (
                <TableRow hover role="checkbox" tabIndex={-1} onClick={() => handleClick(column)}>

                  {/* const value = row[column.transactionId]; */}

                  <React.Fragment>
                    <TableCell
                      // onClick={historicOrder(column)}
                      align={column.align}>
                      {/* {column.format && typeof value === 'number' ? column.format(value) : value} */}
                      {transactionDate}
                    </TableCell>
                    <TableCell
                      // onClick={historicOrder(column)}
                      align={column.align}>
                      {/* {column.format && typeof value === 'number' ? column.format(value) : value} */}
                      {transactionTime}
                    </TableCell>
                    <TableCell
                      // onClick={historicOrder(column)}
                      align={column.align}>
                      {/* {column.format && typeof value === 'number' ? column.format(value) : value} */}
                      {column.OrderStatus}
                    </TableCell>
                  </React.Fragment>



                </TableRow>
              );
            })}

            {/* })} */}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={transactions.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
    {Dialogview ? <HistoricOrder transaction={selectedRow} /> : null}


  </div>
  );
}