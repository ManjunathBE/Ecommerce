import React from "react";
import { Route, Switch } from "react-router-dom";
import {Cart} from "./Cart";
import {History} from "./History";
import {Notification} from "./Notification";
import {SelectView} from "./SelectView";
import {UserProfile} from "./UserProfile/UserProfile";
import {AddUserProfile} from "./UserProfile/AddUserProfile";
import { Dashboard } from "./Dashboard/Dashboard";
import { ProductsDashboard } from "./Dashboard/ProductsDashboard";
import {Login} from './Login';
import PrivateRoute from './PrivateRoute';
import {VerifyOtp} from './VerifyOtp'
import {HistoricOrderDetails} from './HistoricOrderDetails'
import {Unauthorised} from './Unauthorised'
import {Suggestion} from './Suggestion'
import {Payment} from './Payment'


export const Routes = () => (

  <div>
    <Switch>

      <PrivateRoute exact path="/" component={Dashboard} />
      <PrivateRoute path="/Cart" component={Cart} />
      <PrivateRoute path="/History" component={History} />
      <PrivateRoute path="/Notification" component={Notification} />
      <PrivateRoute path="/Select View" component={SelectView} />
      <PrivateRoute path="/UserProfile" component={UserProfile} />
      <PrivateRoute path="/AddUserProfile" component={AddUserProfile} />
      <PrivateRoute path ="/OrderDetails" component={HistoricOrderDetails} />
      <PrivateRoute path ="/Payment" component={Payment} />
      
      <PrivateRoute path ="/noauth" component={Unauthorised} />
      <PrivateRoute path ="/Feedback" component={Suggestion} />
      <Route path="/verifyotp" component={VerifyOtp} />
      
      <Route path="/login" component={Login} />
      <PrivateRoute        
        path="/:productId"
        component={(props) => <ProductsDashboard {...props} />}
      />
    </Switch>
  </div>
);
