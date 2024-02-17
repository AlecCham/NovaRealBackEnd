// Import necessary modules and initialize express router
let express = require("express");
const { housesModel, usersModel, enquiriesModel } = require("../models/allschemas");
let allroutes = express.Router();
const multer = require("multer");
const upload = multer();

// Root route - Welcome message - check deploy
allroutes.get('/', (req, res) => {
    console.log("Reached root");
    res.send("Welcome to the Nova Real Estate back end server");
});

// Fetch all houses - GET request
allroutes.get('/houses', async (req, res) => {
    console.log("Reached /houses");
    try {
        let houses = await housesModel.find({});
        res.send(houses);
    } catch (err) {
        console.log(err);
        res.status(500).send("Error while fetching houses");
    }
});

// User signup - POST request
allroutes.post('/signup', upload.none(), async (req, res) => {
    try {
        console.log(req.body);
        let newuser = new usersModel(req.body);
        let userFromDB = await newuser.save();
        console.log(userFromDB);
        res.send(userFromDB);
    } catch (err) {
        console.log("Error while adding user. Check if it is duplicate");
        console.log(err);
        res.status(500).send(err);
    }
});

// User login - POST request
allroutes.post('/login', upload.none(), async (req, res) => {
    try {
        console.log(req.body);
        let response = await usersModel.find({ email: req.body.email, password: req.body.password });
        console.log(response);
        res.send(response);
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});

// Add enquiry - POST request
allroutes.post('/addenquiry', upload.none(), async (req, res) => {
    try {
        console.log(req.body);
        let newEnquiry = new enquiriesModel(req.body);
        let enquirySavedFromDB = await newEnquiry.save();
        console.log(enquirySavedFromDB);
        res.send(enquirySavedFromDB);
    } catch (err) {
        console.log("Error while adding enquiry.");
        console.log(err);
        res.status(500).send(err);
    }
});

// Fetch all enquiries - GET request
allroutes.get('/enquiries', async (req, res) => {
    console.log("Reached /enquiries");
    try {
        let enquiries = await enquiriesModel.find({});
        res.send(enquiries);
    } catch (err) {
        console.log(err);
        res.status(500).send("Error while fetching enquiries");
    }
});

// Export the router for use in the application
module.exports = allroutes;
