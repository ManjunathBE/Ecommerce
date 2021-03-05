import React, { useState, useEffect } from "react";
import {
  Table, TableContainer, TableBody, TableCell, TableHead, TableRow, Paper, Typography,
  Tooltip, Hidden, Container, Grid, Dialog,
  DialogTitle,
  DialogContent, Button
} from '@material-ui/core'
import { useStore } from "./Store";
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import firebase from "firebase";

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    width: '100%',
    flexGrow: 1,
    overflow: 'auto',
    flexDirection: 'column'
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  
}))

export const Payment = () => {
  const [paymentData, setPaymentData] = useState([]);
  const { cartStore, setCartStore, userStore } = useStore();
  const [distributorConfirmStatus, setDistributorConfirmStatus] = useState('white')
  const [userConfirmStatus, setuserConfirmStatus] = useState('white')
  const [showPaymentUploadDialog, setShowPaymentUploadDialog] = useState(false)
  const [selectedPaymentRecord, setSelectedPaymentRecord] = useState({})
  const [paymentType, setPaymentType] = useState();
  const classes = useStyles();
  const [selectedPaymentProof, setSelectedPaymentProof] = useState(null)

  useEffect(() => {
    fetchPaymentDetails()
  }, [])

  const fetchPaymentDetails = () => {
    const payload = {
      "UserId": userStore.user.UserId
    }

    fetch('https://testapi.slrorganicfarms.com/cart/getCompletedOrdersByUserId',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': window.localStorage.token
        },
        body: JSON.stringify(payload)
      })
      .then(result => {
        console.log(result, 'result ')
        if (result.status === 404) {
          console.log('result is 404')

        } else if (result.status !== 200) {
          console.log('result is not 200')

        } else {
          result.json().then(body => {
            if (body.success !== true) {
              console.log('request failed', body)

            } else {
              console.log(body, 'response')
              setPaymentData(body.data)

              SetColor()
            }

          });
        }
      })
      .catch(error => {
        console.log("error from server", JSON.stringify(error, Object.getOwnPropertyNames(error)));
      });
  }
  console.log(paymentData, 'payment data')

  const SetColor = () => {
    var Email;
    paymentData.map((x, index) =>
      setPaymentData[index](Email = 'red')


    )
  }
  const Headers = [
    { id: 'Date', numeric: false, disablePadding: true, label: 'Date' },
    { id: 'BillNo', numeric: true, disablePadding: true, label: 'Bill Num.' },
    { id: 'Amount', numeric: true, disablePadding: true, label: 'Amount' },
    { id: 'Crate', numeric: true, disablePadding: true, label: 'Crates Missing' },
  ];

  const handlePaymentClick = (item) => {
    setSelectedPaymentRecord(item)
    setShowPaymentUploadDialog(true)
  }

  const handlePaymentTypeChange = (event) => {
    setPaymentType(event.target.value)
  }

  const handleImageUpload = (event) => {
    setSelectedPaymentProof(event.target.files[0], 'taget')

  }
  const handleSubmit = () => {

    const uploadTask = firebase.storage().ref(`/images/${selectedPaymentProof.name}`).put(selectedPaymentProof)
    uploadTask.on("state_changed", console.log, console.error, () => {
      firebase
      .storage()
        .ref("images")
        .child(selectedPaymentProof.name)
        .getDownloadURL()
        .then((url) => {
          setSelectedPaymentProof(null);
          //setURL(url);
          console.log(url,'url from firebase')
        });
    });
   
   
   
   
   
    // const formData = new FormData()
    // formData.append('image', selectedPaymentProof)

    // fetch('https://testapi.slrorganicfarms.com/upload', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'multipart/form-data',
    //     'x-access-token': window.localStorage.token
    //   },
    //   body: FormData
      
    // })
  }

  return (
    <div className={classes.root}>
      <Container>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                {Headers.map(x =>
                  <TableCell>
                    {x.label}
                  </TableCell>)
                }
                {/* <Hidden mdDown>
                  <TableCell colSpan={2} > Status</TableCell>
                </Hidden> */}

              </TableRow>

            </TableHead>
            <TableBody>

              {paymentData.map((x) =>
                <React.Fragment>
                  <TableRow style={{backgroundColor: x.IsConfirmed ? 'lightgreen': x.IsUserConfirmed? 'lightcyan':""}}  onClick={() => handlePaymentClick(x)}>
                    <TableCell>{x.OrderDateAndTime}</TableCell>
                    <TableCell>{x.BillNum}</TableCell>
                    <TableCell>{x.OrderCost}</TableCell>
                    <TableCell>{x.Crates}</TableCell>
                    {/* <TableCell style={{ backgroundColor: x.IsUserConfirmed ? 'green' : '' }}>{x.IsUserConfirmed ? 'Confirmed' : 'Yet to Confirm'}</TableCell>
                    <TableCell style={{ backgroundColor: x.IsConfirmed ? 'green' : '' }}>{x.IsConfirmed ? 'Confirmed' : 'Yet to Confirm'}</TableCell> */}
                  </TableRow>
                </React.Fragment>

              )}



            </TableBody>
          </Table>

        </TableContainer>


      </Container>
      <Dialog open={showPaymentUploadDialog}>
        <DialogTitle className={classes.root}>
          Bill Number : {selectedPaymentRecord.BillNum}
          <IconButton className={classes.closeButton} aria-label="close" onClick={() => setShowPaymentUploadDialog(false)}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          Payment Type
           <FormControl className={classes.formControl}>

            <Select
              id="demo-simple-select"
              value={paymentType}
              onChange={handlePaymentTypeChange}
            >
              <MenuItem value={10}>Cash</MenuItem>
              <MenuItem value={20}>Account transfer</MenuItem>
            </Select>


          </FormControl>
          <br />

          {/* <input
              accept="image/*"
              className={classes.input}
              hidden
              id="raised-button-file"
              multiple
              type="file"
              onChange={handleImageUpload}
            />
            <label htmlFor="raised-button-file">
              <Button variant="raised" component="span" className={classes.button}>
                Upload
  </Button>
            </label> */}

          <input
            accept="image/jpeg"
            className={classes.input}
            id="faceImage"
            type="file"
            onChange={handleImageUpload}
          />

          <label htmlFor="paymentProof">
            <IconButton
              className={classes.faceImage}
              color="primary"
              aria-label="upload picture"
              component="span"
            >
              {/* <PhotoCamera fontSize="large" /> */}
            </IconButton>
          </label>


          <Button onClick={ handleSubmit} color="primary">
            Save
      </Button>
        </DialogContent>

      </Dialog>

    </div>
  )
}