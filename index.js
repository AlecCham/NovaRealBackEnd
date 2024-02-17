// Import necessary modules
let express = require('express');
let app = express();
let allroutes = require('./routes/AllRoutes');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require("dotenv");

// Initialize dotenv to use environment variables
dotenv.config();

// Enable JSON parsing for incoming requests
app.use(express.json());

// Define CORS policy for cross-origin requests
let corspolicy = {
    origin: process.env.FrontendURL
}
app.use(cors(corspolicy));

// Middleware to log the timestamp of incoming requests
app.use((req, res, next) => {
    console.log("Request received at " + (new Date()).toISOString());
    next();
});

// Function to connect to the database
let db = async () => { 
    try { 
        console.log(process.env.DBURI);
        await mongoose.connect(process.env.DBURI);
        console.log("Connected to database");
    } catch(err) {
        console.log('Error connecting to the database');
        console.error(err);
    }
};

// Execute database connection
db();

// Use allroutes for handling requests
app.use('/', allroutes);

// Start the server on port 4000
app.listen(4000, () => { 
    console.log("Backend server listening at port 4000")
});
