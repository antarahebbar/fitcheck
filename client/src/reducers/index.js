import { combineReducers } from "redux";
import posts from './posts';
import auth from './auth';

// Export reducer defined in posts
export default combineReducers({ posts, auth });