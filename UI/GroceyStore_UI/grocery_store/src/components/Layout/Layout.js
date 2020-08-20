import React from 'react';
import AuxComponent from '../../hoc/AuxComponent';
import classes from './Layout.module.css';

const layout = (props) => (
  <AuxComponent>
    <div>Toolbar SideDrawer Backdrop</div>
    <main className={classes.Content}>{props.children}</main>
  </AuxComponent>
);

export default layout;
