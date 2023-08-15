import axios from 'axios';

const api = axios.create({ baseURL : 'https://fitcheck-fa5fc3616e23.herokuapp.com/' });

api.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')){
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
    }

    return req;
})

export const fetchPosts = () => api.get('/posts');
export const createPost = (newPost) => api.post('/posts', newPost);
export const updatePost = (id, updatedPost) => api.patch(`/posts/${id}`, updatedPost);
export const deletePost = (id) => api.delete(`/posts/${id}`);
export const likePost = (id) => api.patch(`/posts/${id}/likePost`);

export const signIn = (formData) => api.post('/users/signIn', formData);
export const signUp = (formData) => api.post('/users/signUp', formData);