import React, { Component, Link, useEffect } from "react";
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
import {Dialog, DialogContent, DialogTitle} from '@material-ui/core';
import Button from "@material-ui/core/Button"


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

function createData(date, time, status) {
  return { date, time, status };
}

const rows = [
  createData('07-07-2020', '1:00 PM', 'Delivered'),
  createData('09-07-2020', '2:00 PM', 'Our for Delivery'),
  createData('11-07-2020', '3:00 PM', 'Delivered'),
  createData('13-07-2020', '4:00 PM', 'Delivered'),
  createData('15-07-2020', '5:00 PM', 'Delivered'),
  createData('17-07-2020', '6:00 PM', 'Our for Delivery'),
  createData('19-07-2020', '7:00 PM', 'Delivered'),
  createData('21-07-2020', '8:00 PM', 'Delivered'),
  createData('22-07-2020', '9:00 PM', 'Delivered'),

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
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [transactions, setTransactions] = React.useState([]);
  const userId = 1
  const [Dialogview, setDialogView]=React.useState(false)
  const [selectedRow, setSelectedRow]=React.useState([])


  useEffect(() => {
    fetchTransactions()
  }, [])

  const fetchTransactions = () => {

    fetch('https://localhost:44360/Transaction?userId=' + userId,)
      .then(result => {
        if (result.status === 404) {
          console.log('result is 404')
        } else if (result.status !== 200) {
          console.log('result is not 200')
        } else {
          result.json().then(body => {
            console.log(body, 'trans')
            setTransactions(body)
          });
        }
      })
      .catch(error => {
        console.log("error from server", JSON.stringify(error, Object.getOwnPropertyNames(error)));
      });
  }

const handleClick=(tran)=>{
  console.log('in method')
  setSelectedRow(tran)
setDialogView(true)
}
  

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const HistoricOrder =(props)=>  {
    var tran = props.transaction
    const Headers =[
      { id: 'Product', numeric: false, disablePadding: true, label: 'Product Name' },
      { id: 'Price', numeric: true, disablePadding: true, label: 'Price' },
      { id: 'Weight', numeric: true, disablePadding: true, label: 'Weight' },
      { id: 'Units', numeric: true, disablePadding: true, label: 'Units' },
     ]
    //setView(false)
        const handleClose=()=>{
    setDialogView(false)
        }
        console.log(tran, 'tran in order')
        debugger
        return (
          <Dialog onClose={handleClose} open={Dialogview}>
            <DialogTitle>
             
            </DialogTitle>
            <DialogContent>
              
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
                {tran.orderedProducts.map((p) => {
    
                  return (
                    <TableRow>
                      <TableCell>{p.productName}</TableCell>
                  <TableCell>{p.price}</TableCell>
                  <TableCell>{p.weight}</TableCell>
                  <TableCell>{p.units}</TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </TableContainer>
          <Button>Reorder</Button>
          </DialogContent>
          </Dialog>
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
              var transactionDateTime = new Date(column.transactionDateTime)
              var transactionDate = transactionDateTime.toLocaleDateString()
              var transactionTime = transactionDateTime.toLocaleTimeString()
                 
                return (
                <TableRow hover role="checkbox" tabIndex={-1} onClick={()=>handleClick(column)}>

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
                      {column.status}
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
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
    {Dialogview? <HistoricOrder transaction={selectedRow}/>:null}
    </div>
  );
}