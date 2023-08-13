import React, {useState, useEffect} from "react";
import { Link, useHistory, useLocation} from 'react-router-dom';
import {AppBar, Avatar, Button, Typography, Toolbar} from '@material-ui/core'
import useStyles from './styles';
import fitcheck from '../../images/fitcheck.png';
import { useDispatch } from "react-redux";
import { LOGOUT } from "../../constants/actions";
import decode from 'jwt-decode';

const Navbar = () => {
    const classes = useStyles();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();


    useEffect((logOut, user) => {
        const token = user?.token;

        if (token){
            const decodedtoken = decode(token);

            if (decodedtoken.exp * 1000 < new Date().getTime()) logOut();
        }
        setUser(JSON.parse(localStorage.getItem('profile')));
    }, [location]);

    const logOut = () => {
        dispatch({ type : LOGOUT});
        history.push('/');
        setUser(null);
    };

    return (
        <AppBar className = {classes.appBar} position = "static" color = "inherit">
            <div className = {classes.brandContainer}>
                <Typography component = {Link} to = '/' className = {classes.heading} variant = "h3" align = "center">FitCheck</Typography>
                <img className = {classes.img} src = {fitcheck} alt = "fitcheck" height = "80" />
            </div>
            <Toolbar className = {classes.toolbar} sm = "12">
                {user?.result ? (
                    <div className = {classes.profile}>
                        <Avatar className = {classes.purple} 
                        alt = {user?.result.name} 
                        src = {user?.result.imageUrl}>{user.result?.name.charAt(0)}</Avatar>
                        <Typography className = {classes.userName} variant = "h6"> {user.result?.name}</Typography>
                        <Button variant = "contained" className = {classes.logout} color = "secondary" onClick = {logOut} justifyContent = "flex-start" >Log Out</Button>
                    </div>
                ) : (
                    <Button component = {Link} to = '/auth' variant = "contained" color = "primary">Sign In</Button>
                )}
            </Toolbar>
      </AppBar>
    )
};

export default Navbar;