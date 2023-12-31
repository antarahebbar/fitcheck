import mongoose from "mongoose";

// Growable file structure for the backend for posts
const postSchema = mongoose.Schema({
    title: String,
    message : String,
    name: String,
    creator: String,
    tags: [String],
    selectedFile : String,
    likes : {
        type: [String],
        default: []
    },
    createdAt: {
        type: Date,
        default : new Date()
    },
});

const PostMessage = mongoose.model('PostMessage', postSchema);
export default PostMessage;