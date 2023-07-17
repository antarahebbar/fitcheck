import './App.css';
import React, { useState, useEffect } from 'react';
import {Container, AppBar, Typography, Grow, Grid} from '@material-ui/core'

import Posts from './components/posts/posts';
import Form from './components/form/form';
import fitcheck from './images/fitcheck.png';
import useStyles from './styles.js';

import { useDispatch } from 'react-redux'; // allows use to dispatch action
import { getPosts } from './actions/posts';

// Stopped at 1:05, ready to fix cors issues in the server side

const App = () => {
  // Material UI Styles
  const classes = useStyles();
  const dispatch = useDispatch();


  // Ids
  const [currentId, setCurrentId] = useState(0);

  // Dispatch actions
  useEffect(() => {
    dispatch(getPosts());
  }, [currentId, dispatch])

  return (
    <Container maxwidth = "lg">
      <AppBar className = {classes.appBar} position = "static" color = "inherit">
        <Typography className = {classes.heading} variant = "h2" align = "center">FitCheck</Typography>
        <img className = {classes.img} src = {fitcheck} alt = "fitcheck" height = "80" />
      </AppBar>
      <Grow in>
        <Container>
          <Grid container className = {classes.mainContainer} justifyContent = "space-between" alignItems = "stretch" >
            {/* Sizing */}
            <Grid item xs = {12} sm = {7}> 
              <Posts setCurrentId = {setCurrentId}/>
            </Grid>

            <Grid item xs = {12} sm = {4}> 
              <Form currentId={currentId} setCurrentId={setCurrentId} />
            </Grid>
          </Grid>  
        </Container>
      </Grow>
    </Container>
  );
}


export default App;
