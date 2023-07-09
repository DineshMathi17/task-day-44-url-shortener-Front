import React from 'react'
import './App.css';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css"

import { Route } from 'react-router-dom';
import { Login } from './component/login';
import { Signup } from './component/signup';
import { Welcomepage } from './component/welcome';
import { Forgot } from './component/forgotpass';
import { Reset } from './component/resetpassword';
import { UrlShortener } from './url/urlDashboard';
import { TableList } from './url/urlList';
import EmailVerify from './component/verifyemail';

function App() {
  return (
    <div className="App">
      <Route exact path='/'>
        <Welcomepage/>
      </Route>
      <Route exact path='/login'>
        <Login/>
      </Route>
      <Route path='/signup'>
        <Signup/>
      </Route>
      <Route path='/:id/verify/:token/'>
        <EmailVerify/>
      </Route>
      <Route path='/forgotpassword'>
        <Forgot/>
      </Route>
      <Route path='/resetpassword/:id/:token'>
        <Reset/>
      </Route>
      <Route path='/url/short'>
        <UrlShortener/>
      </Route>
      <Route path='/url/list'>
        <TableList/>
      </Route>
    </div>
  );
}

export default App;
