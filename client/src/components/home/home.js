import React, {useState, useEffect} from "react";
import { useDispatch } from 'react-redux';
import { getPosts } from '../../actions/posts';
import Posts from '../posts/posts';
import Form from '../form/form';
import {Grid, Grow} from '@material-ui/core';
import {Container} from '@material-ui/core';



const Home = () => {
    const dispatch = useDispatch();
    const [currentId, setCurrentId] = useState(0);
  
    // Dispatch actions
    useEffect(() => {
      dispatch(getPosts());
    }, [currentId, dispatch])

    return (
        <Grow in>
        <Container>
          <Grid container justifyContent = "space-between" alignItems = "stretch" >
            {/* Form component */}
            <Grid item xs = {12} sm = {4}> 
              <Form currentId={currentId} setCurrentId={setCurrentId} />
            </Grid>
            {/* Posts */}
            <Grid item xs = {12} sm = {7}> 
              <Posts setCurrentId = {setCurrentId}/>
            </Grid>
          </Grid>  
        </Container>
      </Grow>
    )
};

export default Home;