import React, { useState } from 'react';
import classes from './AddAddress.module.css';
import uuid from 'uuid';

////Add Address Dialog component
const AddAddr = (props) => {
  const defaultAddressItem = {
    id: uuid.v4(),
    key: uuid.v4(),
    isDefault: 'false',
    recipientName: '',
    doorNo_Apartment: '',
    streetNo: '',
    locality: '',
    city: '',
    pincode: '',
    recipientContact: '',
    landmark: '',
  };
  ////State variables
  const [addressItem, setAddressItem] = useState(defaultAddressItem);

  return (
    <div>
      <div className={classes.Wrapper}>
        <div className={classes.Title}>Add Delivery Address</div>
        <div className={classes.Form}>
          <div className={classes.InputField}>
            <label>Name</label>
            <input
              type="text"
              className={classes.input}
              value={addressItem.recipientName}
              onChange={(e) =>
                setAddressItem({
                  ...addressItem,
                  recipientName: e.target.value,
                })
              }
            />
          </div>
          <div className={classes.InputField}>
            <label>DoorNo/Apartment</label>
            <input
              type="text"
              className={classes.input}
              value={addressItem.doorNo_Apartment}
              onChange={(e) =>
                setAddressItem({
                  ...addressItem,
                  doorNo_Apartment: e.target.value,
                })
              }
            />
          </div>
          <div className={classes.InputField}>
            <label>Street</label>
            <input
              type="text"
              className={classes.input}
              value={addressItem.streetNo}
              onChange={(e) =>
                setAddressItem({ ...addressItem, streetNo: e.target.value })
              }
            />
          </div>
          <div className={classes.InputField}>
            <label>Locality</label>
            <input
              type="text"
              className={classes.input}
              value={addressItem.locality}
              onChange={(e) =>
                setAddressItem({ ...addressItem, locality: e.target.value })
              }
            />
          </div>
          <div className={classes.InputField}>
            <label>City</label>
            <input
              type="text"
              className={classes.input}
              value={addressItem.city}
              onChange={(e) =>
                setAddressItem({ ...addressItem, city: e.target.value })
              }
            />
          </div>
          <div className={classes.InputField}>
            <label>Zipcode</label>
            <input
              type="text"
              className={classes.input}
              value={addressItem.pincode}
              onChange={(e) =>
                setAddressItem({ ...addressItem, pincode: e.target.value })
              }
            />
          </div>
          <div className={classes.InputField}>
            <label>Contact Number</label>
            <input
              type="text"
              className={classes.input}
              value={addressItem.recipientContact}
              onChange={(e) =>
                setAddressItem({
                  ...addressItem,
                  recipientContact: e.target.value,
                })
              }
            />
          </div>
          <div className={classes.InputField}>
            <label>Landmark</label>
            <input
              type="text"
              className={classes.input}
              value={addressItem.landmark}
              onChange={(e) =>
                setAddressItem({ ...addressItem, landmark: e.target.value })
              }
            />
          </div>

          <div className={classes.InputField}>
            <input
              type="submit"
              value="Add Address"
              className={classes.SubmitButton}
              onClick={() => props.addAddress(addressItem)}
            />
          </div>
          <div className={classes.InputField}>
            <button
              className={classes.CancelButton}
              onClick={() => props.cancelDialog()}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddAddr;
