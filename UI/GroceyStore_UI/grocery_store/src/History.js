import React, { Component, Link } from "react";
import Header from './Header'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import axios from 'axios';

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

export default function History() {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  let [transactionData, setTransactionData] = React.useState('')

  const fetchData = React.useCallback(() => {
    axios({
      "method": "GET",
      "url": "https://grocerystorebackend20200828043724.azurewebsites.net/Transaction",
      "headers": {
        "content-type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*"
      }, "params": {
        "UserId": 1
      }
    })
      .then((response) => {
        setTransactionData(response.data)
        console.log("tnx data", response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  React.useEffect(() => {
    fetchData()
  }, [fetchData])


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper className={classes.root}>
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
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell
                        numeric component="a" href="/Notification"
                        key={column.id} align={column.align}>
                        {column.format && typeof value === 'number' ? column.format(value) : value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
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
  );
}
