import React, {useState} from "react";
import {Avatar, Button, Paper, Grid, Typography, Container} from '@material-ui/core';
import useStyles from './styles';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin } from "@react-oauth/google";
import jwt_decode from 'jwt-decode';
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useDispatch } from "react-redux";
import Input from './input';
import {signIn, signUp} from '../../actions/auth';


const Auth = () => {
    const classes = useStyles();
    
    const [showPassword, setShowPass] = useState(false);
    const [isSignedUp, setSignedUp] = useState(false);
    const [formData, setFormData] = useState({firstName: '', lastName: '', email: '', password: '', confirmPassword: ''});
    const dispatch = useDispatch();
    const history = useHistory();

    const handleSubmit = (e) => {
        
        // Prevent default refreshing
        e.preventDefault();

        if (isSignedUp) {
            dispatch(signUp(formData, history));
        } else {
            dispatch(signIn(formData, history));
        }
        // 
        
    };

    const handleChange = (e) => {
        
        setFormData({ ...formData, [e.target.name]: e.target.value });

    }
    

    const handleShowPassword = () => setShowPass
        ((prevShowPass) => !prevShowPass);
    
    const swtichMode = () => {
        setSignedUp(!isSignedUp);
        setShowPass(false);
    }

    const googleSuccess = async (res) => {
        const token = res?.credential;

        const result = jwt_decode(res.credential);

        try {
            dispatch({ type : 'AUTH', data : {result, token}});
            
            history.push('/');
        } catch(error) {
            console.log(error);
        }
    }

    const googleFailure = (error) => {
        console.log(error);
        console.log('Google Sign In was unsuccessful. Try again.');
    }
  
    return (
       <Container component = "main" maxWidth = "xs">
        <Paper className = {classes.paper} elevation = {3}> 
            <Avatar className= {classes.avatar}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography variant = "h5">
                { isSignedUp ? 'Sign Up' : 'Sign In' }
            </Typography>
            <form className = {classes.form} onSubmit = {handleSubmit}>
                <Grid container spacing = {2}>
                    { isSignedUp && (
                            <>
                                <Input name = "firstName" label = "First Name" handleChange = {handleChange} autofocus half />
                                <Input name = "lastName" label = "Last Name" handleChange = {handleChange} half />
                                
                            </>
                    )}
                <Input name = "email" label = "Email Address" handleChange = {handleChange} type = "email" />
                <Input name = "password" label = "Password" handleChange = {handleChange} type = {showPassword ? "text" : "password"} handleShowPassword={ handleShowPassword} />
                { isSignedUp && <Input name = "confirmPassword" label = "Repeat Password" handleChange = {handleChange} type = "password"></Input>}
                </Grid>
                <Button type = "submit" fullWidth variant = "contained" color = "primary" className = {classes.submit}>{isSignedUp ? 'Sign Up' : 'Sign In'}</Button>
                <GoogleOAuthProvider clientId = "499478512654-olbmiutj023b6fgelosf2ujt2ruekoio.apps.googleusercontent.com">
                    <GoogleLogin onSuccess={googleSuccess} onError={googleFailure}/>
                </GoogleOAuthProvider>
                <Grid container justify-content = "flex-end">
                        <Grid item>
                            <Button onClick={swtichMode}>
                                {isSignedUp ? 'Already have an account? Sign In.' : "Don't have an account? Sign Up"}
                            </Button>
                        </Grid>
                </Grid>
            </form>
        </Paper>
       </Container>
    );
};

export default Auth;