import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import postRoutes from './routes/posts.js';
import userRoutes from './routes/users.js';

const App = express();

// Express middleware
App.use(bodyParser.json({limit : '30mb', extended: true}));
App.use(bodyParser.urlencoded({limit : '30mb', extended: true}));
App.use(cors());

// Routes 
App.use('/posts', postRoutes);
App.use('/users', userRoutes);
App.get('/', (req, res) => {
    res.send('App succesfully running on server side.');
})

// Set up port and Mongo DB connection
const CONNECTION_URL = 'mongodb+srv://antarahebbar:Juno0710@cluster0.wheixvf.mongodb.net';
const PORT = process.env.PORT || 4000;


// Connect mongoDB, send to port if successful, otherwise log error
mongoose.connect(CONNECTION_URL || 'mongodb+srv://antarahebbar:Juno0710@cluster0.wheixvf.mongodb.net', { 
    useNewUrlParser : true, 
    useUnifiedTopology: true })
    .then(() => App.listen(PORT, () => console.log(`Server running on dynamic port ${PORT}.`)))
    .catch((error) => console.log(`Error message: ${error.message}`));


// Test DB connection
const db = mongoose.connection;
db.once('open', () => console.log(`Connected to MongoDB`));