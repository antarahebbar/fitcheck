import { FETCH_ALL, CREATE, DELETE, UPDATE } from '../constants/actions';
import * as api from '../api';

// Action Creators (functions that return actions, which have a type and paylod)
// To make async, we use the dispatch function to return
export const getPosts = () => async (dispatch) => {
    
    try {
        // Get all the posts
        const { data } = await api.fetchPosts();

        const action = { type: FETCH_ALL, payload : data}
        dispatch(action);

    } catch(error)
    {
        console.log(error.message);
    }
   
}

export const createPost = (post) => async (dispatch) => {
    
    try {
        // Make a post api req to backend server
        const { data } = await api.createPost(post);

        const action = { type: CREATE, payload : data}
        dispatch(action);

    } catch(error)
    {
        console.log(`Error message: ${error.message}`);
    }
   
}

export const updatePost = (id, post) => async (dispatch) => {
    try {
      const { data } = await api.updatePost(id, post);
  
      dispatch({ type: UPDATE, payload: data });
    } catch (error) {
      console.log(error);
    }
  };

export const deletePost = (id) => async (dispatch) => {
    try {
        await api.deletePost(id);
    
        dispatch({ type: DELETE, payload: id });
    } catch (error) {
        console.log(error);
    }
};

export const likePost = (id) => async (dispatch) => {
    try {
        const { data } = await api.likePost(id);
    
        dispatch({ type: UPDATE, payload: data });
    } catch (error) {
        console.log(error);
    }
};
  