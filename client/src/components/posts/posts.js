import React from "react";
import Post from "./post/post";
import useStyles from './styles.js';
import { useSelector } from "react-redux";

import {Grid, CircularProgress} from '@material-ui/core';

const Posts = ({setCurrentId}) => {
    const classes = useStyles();
    const posts = useSelector((state) => state.posts); 
    
    return (
        
        // If no posts, show circular progress, otherwise Grid
        !posts.length ? <CircularProgress /> : (
            <Grid className = {classes.container} container alignItems = "stretch" spacing = {3}>
                {posts.map((post) => (
                    <Grid key = {post._id} item xs = {12} sm = {6}>
                        <Post post = {post} setCurrentId = {setCurrentId} />
                    </Grid>
                ))}
            </Grid>
        )
            
    );
}

export default Posts;