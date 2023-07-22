// Define a growable file structure for the backend
import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name: {type : String, required: true},
    email: {type : String, required: true},
    password: {type : String, required: true},
    id: {type : String}
});

const UserModel = mongoose.model('User', userSchema);
export default UserModel;