import React from 'react';
import classes from './Address.module.css';
// This component handles the individual Address Entity listed in the user profile
const Address = (props) => {
  return (
    <div className={classes.Address}>
      {/* 1. Recipient Name */}
      <div className={classes.RecipientName}>{props.address.recipientName}</div>
      {/* 2. Door No */}
      <div className={classes.DoorNumApartment}>
        {props.address.doorNo_Apartment}
      </div>
      {/* 3. Street Name */}
      <div className={classes.StreetNo}>{props.address.streetNo}</div>
      {/* 4. Locality */}
      <div className={classes.Locality}>{props.address.locality}</div>
      {/* 5. City */}
      <div className={classes.City}>{props.address.city}</div>
      {/* 6. Pin code */}
      <div className={classes.Pincode}>{props.address.pincode}</div>
      {/* 7 Landmark*/}
      <div className={classes.Landmark}>
        Landmark : {props.address.landmark}
      </div>
      {/* 8. Recipient Contact Number */}
      <div className={classes.RecipientContact}>
        {props.address.recipientContact}
      </div>
    </div>
  );
};

export default Address;
