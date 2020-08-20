import React, { useState } from 'react';
import classes from './UserProfile.module.css';
import Address from './Address/Address';
import AuxComponent from '../../hoc/AuxComponent';
import uuid from 'uuid';

import AddAddress from './AddAddress/AddAddress';
import Modal from 'react-modal';
import { FaMobileAlt } from 'react-icons/fa';
import { HiOutlineMail } from 'react-icons/hi';

const UserProfile = (props) => {
  // State variables
  const [modalIsOpen, setModalIsOpen] = useState(false);

  //// Address list - This holds the list of addresses already added by the user
  const addressList = props.profile.address.map((addressElement) => (
    <Address key={addressElement.key} address={addressElement}></Address>
  ));

  //addAddressHandler - Receives the address added by the user from AddAddress dialog and updates it
  const addAddressHandler = (addressItem) => {
    cancelDialogHandler();
    props.addAddress(addressItem);
  };

  ///To close Add Address dialog
  const cancelDialogHandler = () => {
    setModalIsOpen(false);
  };

  return (
    <AuxComponent>
      <div>
        {/* Add Address Dialog Modal */}
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={() => setModalIsOpen(false)}
          style={{
            overlay: {
              backgroundColor: 'gray',
            },
            content: {
              width: '50%',
            },
          }}
        >
          <AddAddress
            addAddress={addAddressHandler}
            cancelDialog={cancelDialogHandler}
          />
          <div>
            <button onClick={() => setModalIsOpen(false)}> Close Modal</button>
          </div>
        </Modal>
      </div>
      {/* User Profile Panel */}
      <div className={classes.UserProfile}>
        <div className={classes.Wrapper}>
          <div className={classes.Profile}>
            {/* 1. Profile Image */}
            <div className={classes.ProfileImage}>
              <div className={classes.Image}>
                <img src="/images/User1.jpg" alt="profile_pic" />
              </div>
              <div className={classes.Info}>
                {/* 2. Profile Display Name */}
                <p className={classes.DisplayName}>{props.profile.userName}</p>
                {/* 3. Primary Mobile number */}
                <div className={classes.PrimaryMobile}>
                  <FaMobileAlt color="white" size="1rem" />
                  {props.profile.primaryContact}
                </div>
                {/* 4. Primary Email */}
                <div className={classes.PrimaryEmail}>
                  <HiOutlineMail color="white" size="1rem" />
                  {props.profile.email}
                </div>
              </div>
            </div>
            {/* 5. Address Panel */}
            <div className={classes.AddressPanel}>
              {/* 6. Address Panel Banner */}
              <div className={classes.AddressBanner}>Address Details</div>
              {/* 7. Add Address Button */}
              <button onClick={() => setModalIsOpen(true)}> Add Address</button>
              <div className={classes.AddressSection}>
                <div>{addressList}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuxComponent>
  );
};

export default UserProfile;
