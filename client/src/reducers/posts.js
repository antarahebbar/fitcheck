// Reducer -- given a state and action, return udpated state
import { FETCH_ALL, CREATE, DELETE, UPDATE } from "../constants/actions";
export default (posts = [], action) => {
    switch (action.type) {
        case FETCH_ALL: 
            return action.payload;
        case CREATE:
            return [...posts, action.payload];
        case UPDATE:
            // Map over posts array, change and return
            return posts.map((post) => (post._id === action.payload._id ? action.payload : post));
        case DELETE:
            return posts.filter((post) => post._id !== action.payload);
         default:
            return posts;
    }
}