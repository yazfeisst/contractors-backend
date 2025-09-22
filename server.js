//imports

//node package imports
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

// route imports
const entryRoutes = require('./routes/entry')


//set variable of app to run express method
const app = express();

//set port
const port = 4000;

//allow cross origin

app.use(cors({ 
    origin: 'https://contractors-frontend.vercel.app',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'], 
    credentials: true
}));

//use json with express
app.use(express.json());

//log out the path and method of each request
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

//attach routes to the app
app.use('/api/entries/', entryRoutes);


//home route for backend
app.get('/', (req, res) => {
    res.send('Express Server Running');
});

//listen to changes
app.listen(port, () => {
    console.log(`Express Server running on http://localhost:${port}`)
});

app.use('/public', express.static('public'));

//MONGO CONNECTION
//mongo username and password
const mongoUsername = process.env.MONGODB_USERNAME
const mongoPassword = process.env.MONGODB_PASSWORD

//mongo uri
const mongoURI = `mongodb+srv://${mongoUsername}:${mongoPassword}@cluster0.p3cmelg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`


//connect to mongo
mongoose.connect(mongoURI)
    .then(() => {
        console.log('Connected to MongoDB Atlas');
    })
    .catch((err) => {
        console.log('Error connection to MongoDB Atlas');
    });