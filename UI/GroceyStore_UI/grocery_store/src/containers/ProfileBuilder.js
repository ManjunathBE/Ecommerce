import React, { Component } from 'react';
import AuxComponent from '../hoc/AuxComponent';
import UserProfile from '../components/UserProfile/UserProfile';
import uuid from 'uuid';

class ProfileBuilder extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userObj: {
        userName: 'Meredith Grey',
        email: 'grey@email.com',
        primaryContact: '9008581234',

        address: [
          {
            key: uuid.v4(),
            id: uuid.v4(),
            isDefault: 'true',
            recipientName: 'ShriRam',
            doorNo_Apartment: '2C, Samruddhi Bright Homes',
            streetNo: '1st Main,2nd Cross, Force Avenue',
            locality: 'Brookefield, Kundalahalli',
            city: 'Bangalore',
            pincode: '560037',
            recipientContact: '9008512345',
            landmark: 'Near Ryan School',
          },
          {
            id: uuid.v4(),
            key: uuid.v4(),
            isDefault: 'false',
            recipientName: 'Hari',
            doorNo_Apartment: '1, Rohan Apartments',
            streetNo: 'Ryan International School Road',
            locality: 'Brookefield, Kundalahalli',
            city: 'Bangalore',
            pincode: '560037',
            recipientContact: '9008512346',
            landmark: 'Opp to Ryan School',
          },
        ],
      },
    };
  }

  addAddressHandler = (addressItem) => {
    let existingObject = this.state.userObj;

    existingObject.address = existingObject.address.concat(addressItem);
    console.log(existingObject);

    this.setState((prevState) => ({
      userObj: existingObject,
    }));
  };

  render() {
    ////Return JSX code
    return (
      <AuxComponent>
        <UserProfile
          profile={this.state.userObj}
          addAddress={this.addAddressHandler}
        />
      </AuxComponent>
    );
  }
}

export default ProfileBuilder;
