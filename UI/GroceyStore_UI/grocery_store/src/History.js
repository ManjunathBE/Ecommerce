import React, { useEffect, useState } from "react";
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
import { Dialog, DialogContent, DialogTitle, Switch, Typography, Grid, Hidden, Container } from '@material-ui/core';
import Button from "@material-ui/core/Button"
import { useStore } from "./Store";
import { Label } from "@material-ui/icons";
import { HistoricOrderDetails } from './HistoricOrderDetails'
import Footer from './Footer'
import { MenuPane } from './MenuPane'
import FlashMessage from 'react-flash-message'

const columns = [
  { id: 'orderId', label: 'Order NO', minWidth: 130 },
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

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    width: '100%',

  },
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {

    [theme.breakpoints.down('md')]: {
      padding: '0px'
    }
  },
  tableContainer: {
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(3),
      marginLeft: theme.spacing(3),
      marginRight: theme.spacing(3),
      textAlign: 'center'
    }
  },
  tableHeaderData: {
    fontWeight: 'Bold',
    textAlign: 'center'
  },
}));



export function History(props) {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [transactions, setTransactions] = useState([]);
  const [Dialogview, setDialogView] = useState(false)
  const [selectedRowId, setSelectedRowId] = useState([])
  const { cartStore, setCartStore, userStore } = useStore();
  const { history } = props;
  const [warningDialog, setWarningDialog] = useState(false)
  const [showToggleSwitch, setShowToggleSwitch] = useState(false)
  const [showFinishOrderFlash,setShowFinishOrderFlash] = useState(false)




  useEffect(() => {
    fetchTransactions()

  }, [])

  const fetchTransactions = () => {
    console.log(userStore)
    const userId = userStore.user.UserId
    console.log(JSON.stringify({
      uniqueid: userId
    }), 'herfe herer')

    fetch('https://testapi.slrorganicfarms.com/cart/getOrderDetailsByUserId', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': window.localStorage.token
      },
      body: JSON.stringify({
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

  const handleOrderClick = (tran) => {
    console.log(tran.OrderStatus, 'order status in history')
    setSelectedRowId(tran.Id)
    setDialogView(true)
    history.push({
      pathname: "/OrderDetails",
      state: { orderId: tran.Id, orderStatus: tran.OrderStatus }
    })
  }


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleFinishOrder =()=>{
    setShowFinishOrderFlash(true)
  }



  // const HistoricOrder = (props) => {
  //   var tranId = props.orderId
  //   var orderedProducts = tran.orderedProducts
  //   const Headers = [
  //     { id: 'Product', numeric: false, disablePadding: true, label: 'Product Name' },
  //     { id: 'Price', numeric: true, disablePadding: true, label: 'Price' },
  //     { id: 'Quantity', numeric: true, disablePadding: true, label: 'Quantity' },
  //     { id: 'Units', numeric: true, disablePadding: true, label: 'Units' },
  //   ]

  //   const handleEditOrReorder = (e) => {
  //     e.preventDefault()

  //     console.log(cartStore.cart.length, 'cart in edit')
  //     if (cartStore.cart.length !== 0) {
  //       setWarningDialog(true)
  //     }
  //     else {
  //       orderedProducts.map((item) => setCartStore({ item, type: 'AddFromHistory' }))
  //       history.push(`/cart`)
  //     }
  //   }

  //   const handleWarningDialogClose = () => {
  //     setWarningDialog(false)
  //   }

  //   const handleProceedToCart = () => {
  //     orderedProducts.map((item) => setCartStore({ item, type: 'AddFromHistory' }))
  //     history.push(`/cart`)
  //   }

  //   const handleClose = () => {
  //     setDialogView(false)
  //   }


  //   const showActionButtons = () => {
  //     if (tran.status === 'Executed') {
  //       setShowToggleSwitch(true)
  //       return (<Button onClick={handleEditOrReorder}>Reorder</Button>)
  //     }
  //     else if (tran.status === 'Ordered') {
  //       setShowToggleSwitch(false)
  //       return (<Button onClick={handleEditOrReorder}>Edit</Button>)
  //     }
  //     else if (tran.status === 'Processed') {

  //       setShowToggleSwitch(false)
  //       return (<React.Fragment><Button>Missing</Button>
  //         <Button>Return</Button>
  //         <Button>Confirm received products</Button></React.Fragment>)
  //     }
  //   }



  //   console.log(showToggleSwitch, 'switch')
  //   return (
  //     <div>

  //       <Dialog onClose={handleClose} open={Dialogview}>
  //         <DialogTitle>

  //         </DialogTitle>
  //         <DialogContent>



  //           <TableContainer>
  //             <Table>
  //               <TableHead>
  //                 <TableRow>
  //                   {Headers.map((headCell) => (
  //                     <TableCell
  //                       key={headCell.id}
  //                       align={headCell.numeric ? 'right' : 'left'}
  //                       padding={headCell.disablePadding ? 'none' : 'default'}
  //                     >
  //                       {headCell.label}
  //                     </TableCell>
  //                   ))}
  //                 </TableRow>

  //               </TableHead>
  //               <TableBody>
  //                 {isToggleOn ?
  //                   tran.orderedProducts.map((p) => {

  //                     return (
  //                       <TableRow>
  //                         <TableCell>{p.productName}</TableCell>
  //                         <TableCell>{p.processedPrice}</TableCell>
  //                         <TableCell>{p.processedQuantity}</TableCell>
  //                         <TableCell>{p.unit}</TableCell>
  //                       </TableRow>
  //                     )
  //                   })

  //                   :

  //                   tran.orderedProducts.map((p) => {

  //                     return (
  //                       <TableRow>
  //                         <TableCell>{p.productName}</TableCell>
  //                         <TableCell>{p.price}</TableCell>
  //                         <TableCell>{p.quantity}</TableCell>
  //                         <TableCell>{p.unit}</TableCell>
  //                       </TableRow>
  //                     )
  //                   })}
  //               </TableBody>
  //             </Table>
  //           </TableContainer>
  //           {showActionButtons()}
  //         </DialogContent>
  //       </Dialog>


  //       <Dialog onClose={handleWarningDialogClose} open={warningDialog}>
  //         <DialogTitle>

  //         </DialogTitle>
  //         <DialogContent>
  //           The items in your cart will be deleted
  //        <Button varaint="contained" color="primary" onClick={handleProceedToCart}>Proceed</Button>
  //         </DialogContent>
  //       </Dialog>
  //     </div>

  //   )
  // }



  return (<div className={classes.root}>
    {/* <Header title={(props.location.pathname).substring(1)} history={props.history} /> */}
    {/* <Paper className={classes.root}> */}

    {/* <Hidden smDown>
          <MenuPane history={history} />
        </Hidden> */}
    {/* <main className={classes.content}> */}
    {props.location.state?
              <div >
                <FlashMessage duration={5000} >
                  <div className='flashStyling text-center' style={{color:'success.main'}}>
                  Thanks for shopping with us, we look forward to serving you again...
                        </div>
                </FlashMessage>
              </div> : ""}
    <Container maxWidth="lg" className={classes.container}>
      <TableContainer className={classes.tableContainer}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead >
            <TableRow>
              {columns.map((column) => (
                <TableCell className={classes.tableHeaderData}
                  key={column.id}
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
                <TableRow style={{cursor:'pointer'}}hover role="checkbox" tabIndex={-1} onClick={() => handleOrderClick(column)}>

                  {/* const value = row[column.transactionId]; */}

                  <React.Fragment>
                    <TableCell
                      align='center'>
                      {column.Id}
                    </TableCell>
                    <TableCell
                      align='center'>
                      {transactionDate}
                    </TableCell>
                    <TableCell
                      align='center'>
                      {transactionTime}
                    </TableCell>
                    <TableCell
                      align='center'>
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
      {/* <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={transactions.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      /> */}
    </Container>
    {/* </main> */}
    <Hidden mdUp >
      <Footer history={history} />
    </Hidden>
    {/* </Paper> */}
    {Dialogview ? <HistoricOrderDetails orderId={selectedRowId} finishOrder={()=>handleFinishOrder()}/> : null}


  </div>
  );
}