import React from "react";
import { Route, Switch } from "react-router-dom";
import Cart from "./Cart";
import History from "./History";
import Notification from "./Notification";
import SelectView from "./SelectView";
import UserProfile from "./UserProfile";
import { Dashboard } from "./Dashboard/Dashboard";
import { ProductsDashboard } from "./Dashboard/ProductsDashboard";

export const Routes = () => (
  <div>
    <Switch>
      <Route exact path="/" component={Dashboard} />
      <Route
        exact
        path="/:productsId"
        render={(props) => <ProductsDashboard {...props} />}
      />
      <Route path="/Cart" component={Cart} />
      <Route path="/History" component={History} />
      <Route path="/Notification" component={Notification} />
      <Route path="/Select View" component={SelectView} />
      <Route path="/User Profile" component={UserProfile} />
    </Switch>
  </div>
);
