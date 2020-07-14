import React from 'react';
import { Link } from 'react-router-dom';

import Login from '../HOC/login/Login'
import routes from '../constants/routes.json';
import classes from './home.css'

export default function Home() {
  return (
    <Login>
      <div data-tid="container">
        <h1>Welcome</h1>
        <Link style={{marginTop: "30px"}} className={classes.mybtn} to={routes.STORE_LOGIN}>Let's start!</Link>
      </div>
    </Login>
  );
}
