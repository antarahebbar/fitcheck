import React, {useState, useEffect} from "react";
import FileBase from 'react-file-base64';
import { useSelector } from "react-redux";
import useStyles from './styles';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import { useDispatch } from "react-redux";

import { createPost, updatePost } from "../../actions/posts";


const Form = ({ currentId, setCurrentId }) => {
    const classes = useStyles();

    // Loop over posts and find the one with the currentId
    const post = useSelector((state) => (currentId ? state.posts.find((message) => message._id === currentId) : null));


    // Populate value of the form if it exists, runs when post value changes from nothing to the post
    useEffect(() => {
        if (post) {
            setPostData(post);
        } 
      
    }, [post]);

    const [postData, setPostData] = useState({
        creator: '', 
        title : '', 
        message : '',
        tags: '', 
        selectedFile : ''
    });

    const dispatch = useDispatch(); // allows us to dispatch actions

    const handleSubmit = (e) => {
        
        if (currentId === 0) {
            // Action is dispatched when we click submit
            dispatch(createPost(postData));
            clearForm();
        } else {
            e.preventDefault();
        
            // Action is dispatched when we click submit
            dispatch(updatePost(currentId, postData));
            clearForm();
        }

   
    }

    const clearForm = () => {
        setCurrentId(null);
        setPostData(  {creator: '', 
        title : '', 
        message : '',
        tags: '', 
        selectedFile : ''});
    }


    return (
        <Paper className = {classes.paper}>
            <form autoComplete = "off" noValidate className = {`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                <Typography variant = "h6">{
                currentId ? `Editing` : 'Create'} a FitCheck</Typography>
                <TextField 
                name = "creator" variant = "outlined" label = "Post Creator" fullWidth
                
                // store post info in the postData state, each object key is a text field
                value = {postData.creator} 
                
                // Spread postdata, set creator to the event property
                onChange = {(e) => setPostData({ ...postData, creator: e.target.value })}></TextField>
                <TextField name = "title" variant = "outlined" label = "Title" fullWidth value = {postData.title} onChange = {(e) => setPostData({ ...postData, title: e.target.value })}></TextField>
                <TextField name = "message" variant = "outlined" label = "Message" fullWidth value = {postData.message} onChange = {(e) => setPostData({ ...postData, message: e.target.value })}></TextField>
                <TextField name = "tags" variant = "outlined" label = "Tags" fullWidth value = {postData.tags} onChange = {(e) => setPostData({ ...postData, tags: e.target.value.split(',') })}></TextField>
                
                <div className={classes.fileInput}>
                    <FileBase type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} />
                </div>
                
                <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
                <Button variant="contained" color="secondary" size="small" onClick = {clearForm} fullWidth>Clear</Button>


            </form>
        </Paper>
    );
}

export default Form;