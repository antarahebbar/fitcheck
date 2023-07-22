import './App.css';
import React from 'react';
import {Container} from '@material-ui/core';
import { BrowserRouter, Switch, Route } from 'react-router-dom/cjs/react-router-dom.min';



import Navbar from './components/nav/nav';
import Home from './components/home/home';
import Auth from './components/auth/auth';

// Stopped at 1:05, ready to fix cors issues in the server side

const App = () => {
  return (
    <BrowserRouter>
        <Container maxwidth = "lg">
          <Navbar />
          <Switch>
            <Route path = "/" exact component = {Home}></Route>
            <Route path = "/auth" exact component = {Auth}></Route>
          </Switch>
      </Container>
    </BrowserRouter>
  );
}


export default App;
