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
import { Spinner } from './Spinner'
import NoImage from './Images/no_image.png'

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
  btnMargin: {
    marginRight: theme.spacing(2),
    marginTop: theme.spacing(2)
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

}))

export const Payment = () => {
  const [paymentData, setPaymentData] = useState([]);
  const { cartStore, setCartStore, userStore } = useStore();
  const [distributorConfirmStatus, setDistributorConfirmStatus] = useState('white')
  const [userConfirmStatus, setuserConfirmStatus] = useState('white')
  const [showPaymentUploadDialog, setShowPaymentUploadDialog] = useState(false)
  const [selectedPaymentRecord, setSelectedPaymentRecord] = useState({})
  const [paymentType, setPaymentType] = useState(null);
  const classes = useStyles();
  const [selectedPaymentProof, setSelectedPaymentProof] = useState(null)
  const [paymentURL, setPaymentURL] = useState()
  const [showSpinner, setShowSpinner] = useState(false)
  const [disableSaveBtn, setDisableSaveBtn] = useState(true)
  const [disableUploadBtn, setDisableUploadBtn] = useState(true)
  const paymentProofRef = React.useRef()
  const [imageSrc, setImageSrc] = useState();
  const [imagePreviewVisibility, setImagePreviewVisibility] = useState(false)
  const [showPaymentDetailsDialog, setShowPaymentDetailsDialog] = useState(false)

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


            }

          });
        }
      })
      .catch(error => {
        console.log("error from server", JSON.stringify(error, Object.getOwnPropertyNames(error)));
      });
  }
  console.log(paymentData, 'payment data')


  const Headers = [
    { id: 'Order', numeric: false, disablePadding: true, label: 'Order' },
    { id: 'Date', numeric: false, disablePadding: true, label: 'Date' },
    { id: 'BillNo', numeric: true, disablePadding: true, label: 'Bill No' },
    { id: 'Amount', numeric: true, disablePadding: true, label: 'Amount' },
    { id: 'Crate', numeric: true, disablePadding: true, label: 'Crates Missing' },
  ];

  const handlePaymentClick = (item) => {
    setSelectedPaymentRecord(item)
    if (item.IsUserConfirmed !== true) {
      setShowPaymentUploadDialog(true)
    }
    else {
      setShowPaymentDetailsDialog(true)
    }

  }

  const handlePaymentTypeChange = (event) => {
    setPaymentType(event.target.value)
  }

  const handleImageUpload = (event) => {
    setSelectedPaymentProof(event.target.files[0])
    setImageSrc(URL.createObjectURL(event.target.files[0]))
    setImagePreviewVisibility(true)
    setDisableUploadBtn(false)

  }

  const handleSubmit = () => {
    const payload = {
      Id: selectedPaymentRecord.Id,
      PaymentTypeId: paymentType,
      PaymentProofUrl: paymentURL
    }
    fetch('https://testapi.slrorganicfarms.com/cart/updateOrderPaymentType', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': window.localStorage.token
      },
      body: JSON.stringify(payload)
    })
      .then(result => {
        if (result.status === 200)
          result.json().then(body => {
            if (body.success === true) {
              handleClear()
              console.log(body, 'result from backend')
              setPaymentData(body.data)
              setShowPaymentUploadDialog(false)

            }
            else {
              //TODO: handle some error occured
            }
          })
      })
  }
  const handleUpload = async () => {
    setShowSpinner(true)
    const uploadTask = firebase.storage().ref(`/images/${selectedPaymentProof.name}`).put(selectedPaymentProof)
    uploadTask.on("state_changed", console.log, console.error, () => {
      firebase
        .storage()
        .ref("images")
        .child(selectedPaymentProof.name)
        .getDownloadURL()
        .then((url) => {
          setSelectedPaymentProof(null);
          setPaymentURL(url);
          console.log('am hererer')
          console.log(url, 'url from firebase')
          setShowSpinner(false)
          setDisableSaveBtn(false)
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

  const handlePaymentUploadDialogClose = () => {
    setShowPaymentUploadDialog(false)
    setDisableSaveBtn(true)
    setDisableUploadBtn(true)
    setImageSrc("")
    setImagePreviewVisibility(false)
  }
  const handlePaymentDetailsDialogClose = () => {
    setShowPaymentDetailsDialog(false)
  }

  const handleClear = () => {
    setSelectedPaymentProof("")
    paymentProofRef.current.value = ""
    setPaymentType(null)
    setDisableSaveBtn(true)
    setDisableUploadBtn(true)
    setImageSrc("")
    setImagePreviewVisibility(false)

  }

  return (
    <div className={classes.root}>
      <Container>
        {paymentData ?

          <TableContainer className={classes.tableContainer}>
            <Table >
              <TableHead>
                <TableRow >
                  {Headers.map(x =>
                    <TableCell align="center" className={classes.tableHeaderData}>
                      {x.label}
                    </TableCell>)
                  }
                  {/* <Hidden mdDown>
                  <TableCell colSpan={2} > Status</TableCell>
                </Hidden> */}

                </TableRow>

              </TableHead>
              <TableBody >

                {paymentData.map((x) => {
                  var paymentDateTime = new Date(x.OrderDateAndTime)
                  var paymentDate = paymentDateTime.toLocaleDateString()
                  var crateBgColor, textColor = ""
                  if (x.MissingCrates > 0) {
                    crateBgColor = 'Red'
                    textColor = 'white'
                  }
                  return (
                    <React.Fragment>
                      <TableRow style={{ cursor: 'pointer', backgroundColor: x.IsConfirmed ? 'lightgreen' : x.IsUserConfirmed ? 'skyblue' : "" }} hover onClick={() => handlePaymentClick(x)}>
                        <TableCell align="center">{x.Id}</TableCell>
                        <TableCell align="center">{paymentDate}</TableCell>
                        <TableCell align="center">{x.BillNum}</TableCell>
                        <TableCell align="center">{x.SuppliedAmt}</TableCell>
                        <TableCell align="center" ><div style={{ backgroundColor: crateBgColor, width: '25px', color: textColor }}> {x.MissingCrates}  </div></TableCell>
                        {/* <TableCell style={{ backgroundColor: x.IsUserConfirmed ? 'green' : '' }}>{x.IsUserConfirmed ? 'Confirmed' : 'Yet to Confirm'}</TableCell>
                    <TableCell style={{ backgroundColor: x.IsConfirmed ? 'green' : '' }}>{x.IsConfirmed ? 'Confirmed' : 'Yet to Confirm'}</TableCell> */}
                      </TableRow>
                    </React.Fragment>
                  )

                })}



              </TableBody>
            </Table>

          </TableContainer> : ""}

        <Spinner showSpinner={showSpinner} />
      </Container>
      <Dialog open={showPaymentUploadDialog}>
        <DialogTitle className={classes.root}>
          Bill Number : {selectedPaymentRecord.BillNum}
          <IconButton className={classes.closeButton} aria-label="close" onClick={handlePaymentUploadDialogClose}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Grid container>
            <Grid item>
              <Typography> Payment Type</Typography>
            </Grid>
            <Grid item>
              <FormControl className={classes.formControl}>

                <Select
                  id="demo-simple-select"
                  value={paymentType}
                  onChange={handlePaymentTypeChange}
                >
                  <MenuItem value={1}>Cash</MenuItem>
                  <MenuItem value={2}>Wallet</MenuItem>
                  <MenuItem value={3}>Online</MenuItem>
                </Select>


              </FormControl>
            </Grid>
          </Grid>
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
          <Grid container>
            <Grid item>
              <Typography>payment proof :</Typography>
            </Grid>
            <Grid item>
              <input
                accept="image/jpeg"
                className={classes.input}
                id="faceImage"
                name="paymentUpload"
                type="file"
                onChange={handleImageUpload}
                ref={paymentProofRef}
              />
            </Grid>
            <Grid item>
              {imagePreviewVisibility ? <img style={{ width: '150px', height: '150px' }} src={imageSrc} alt="payment_proof" /> :
                <img style={{ width: '150px', height: '150px' }} src={NoImage} alt="no-img" />}
            </Grid>

            {/* <label htmlFor="paymentProof"> */}
            <div className="positionCenter">
              <Button className={classes.btnMargin} variant="contained" color="primary" onClick={handleClear}>
                Clear
          </Button>
              <Button className={classes.btnMargin} component="span" disabled={disableUploadBtn} onClick={handleUpload} variant="contained" color="primary">
                Upload
              </Button>
              {/* </label> */}
              <Button className={classes.btnMargin} disabled={disableSaveBtn} variant="contained" color="primary" onClick={handleSubmit}>
                Submit
          </Button>
            </div>


            {/* <Grid>
             
            </Grid> */}
          </Grid>



        </DialogContent>

      </Dialog>

      <Dialog open={showPaymentDetailsDialog}>
        <DialogTitle>
          <IconButton className={classes.closeButton} aria-label="close" onClick={handlePaymentDetailsDialogClose}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Grid container>
            <Grid item md={6} xs={12}>
              <Typography>Bill No : {selectedPaymentRecord.BillNum} <br />
                  Payment Type : {selectedPaymentRecord.PaymentType} <br />
                  Amount : {selectedPaymentRecord.OrderCost}</Typography>

            </Grid>
            <Grid item md={6} xs={12}>
              <img style={{ width: '150px', height: '150px' }} src={selectedPaymentRecord.PaymentProofUrl} alt="payment_proof" />
            </Grid>
          </Grid>

        </DialogContent>

      </Dialog>
    </div>
  )
}
