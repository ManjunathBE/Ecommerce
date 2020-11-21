import React from "react";
import { Route, Switch } from "react-router-dom";
import {Cart} from "./Cart";
import {History} from "./History";
import {Notification} from "./Notification";
import {SelectView} from "./SelectView";
import {UserProfile} from "./UserProfile/UserProfile";
import {EditUserProfile} from "./UserProfile/EditUserProfile";
import {AddUserProfile} from "./UserProfile/AddUserProfile";
import { Dashboard } from "./Dashboard/Dashboard";
import { ProductsDashboard } from "./Dashboard/ProductsDashboard";
import {Login} from './Login';
import PrivateRoute from './PrivateRoute';


export const Routes = () => (

  <div>
    <Switch>

      <PrivateRoute exact path="/" component={Dashboard} />
      <PrivateRoute path="/Cart" component={Cart} />
      <PrivateRoute path="/History" component={History} />
      <PrivateRoute path="/Notification" component={Notification} />
      <PrivateRoute path="/Select View" component={SelectView} />
      <PrivateRoute path="/UserProfile" component={UserProfile} />
      <PrivateRoute path="/Edit User Profile" component={EditUserProfile} />
      <PrivateRoute path="/AddUserProfile" component={AddUserProfile} />
      <Route path="/login" component={Login} />
      <PrivateRoute        
        path="/:productName"
        component={(props) => <ProductsDashboard {...props} />}
      />
    </Switch>
  </div>
);
