// No variables in newest node, add type in package-json
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import postRoutes from './routes/posts.js';
import userRoutes from './routes/users.js';
import dotenv from 'dotenv';

const App = express();
dotenv.config();

// Express middleware
App.use(bodyParser.json({limit : '30mb', extended: true}));
App.use(bodyParser.urlencoded({limit : '30mb', extended: true}));
App.use(cors());

// Routes 
App.use('/posts', postRoutes);
App.use('/users', userRoutes);

// Set up port and Mongo DB connection
const PORT = process.env.PORT;

// Connect mongoDB, send to port if successful, otherwise log error
mongoose.connect(process.env.CONNECTION_URL, { 
    useNewUrlParser : true, 
    useUnifiedTopology: true })
    .then(() => App.listen(PORT, () => console.log(`Server running on port ${PORT}`)))
    .catch((error) => console.log(`Error message: ${error.message}`));


// Test DB connection
const db = mongoose.connection;
db.once('open', () => console.log(`Connected to MongoDB`));