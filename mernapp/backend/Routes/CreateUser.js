const express = require('express');
const router = express.Router();
const User = require('../models/User')
const { body, validationResult } = require('express-validator');
const axios = require('axios')

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const SecretKey = "EndToEndMyFoodjeet12@277001#2002"
router.post("/createuser", [
    body('email', 'Please enter a valid Email').isEmail(),
    body('name', 'Name Length should be atleast 5 Characters Long').isLength({ min: 5 }),
    body('password', 'Invalid password').isLength({ min: 5 })], async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const salt = await bcrypt.genSalt(10);
        let securePassword = await bcrypt.hash(req.body.password, salt);

        try {
            await User.create({
                name: req.body.name,
                location: req.body.location,
                email: req.body.email,
                password: securePassword,

            })
            res.json({ success: true});

        } catch (error) {
            console.log("error", error);
            res.json({ success: false });

        }

    })


router.post("/login", [
    body('email', 'Please enter a valid Email').isEmail(),
    body('password', 'Invalid password').isLength({ min: 5 })], async (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        let email = req.body.email;
        try {
            let userData = await User.findOne({ email })
            if (!userData) {
                return res.status(400).json({ errors: "Try with Correct Email" });
            }
            const isCorrectPassword = await bcrypt.compare(req.body.password, userData.password);   // returns true or false
            if (!isCorrectPassword) {
                return res.status(400).json({ errors: "Try with Correct Password" });
            }
            const jwtData = {
                user: {
                    id: userData.id
                }
            }
            const authToken = jwt.sign(jwtData, SecretKey);
            return res.json({ success: true ,authToken:authToken});

        } catch (error) {
            console.log("error", error);
            res.json({ success: false });

        }

    })

    router.post('/getlocation', async (req, res) => {
        try {
            let lat = req.body.latlong.lat
            let long = req.body.latlong.long
            console.log(lat, long)
            let location = await axios
                .get("https://api.opencagedata.com/geocode/v1/json?q=" + lat + "+" + long + "&key=8c2041ca54f140a5a3feca870d14cc1a")
                .then(async res => {
                    // console.log(`statusCode: ${res.status}`)
                    console.log(res.data.results)
                    // let response = stringify(res)
                    // response = await JSON.parse(response)
                    let response = res.data.results[0].components;
                    console.log(response)
                    let { village, county, state_district, state, postcode } = response
                    return String(village + "," + county + "," + state_district + "," + state + "\n" + postcode)
                })
                .catch(error => {
                    console.error(error)
                })
            res.send({ location })
    
        } catch (error) {
            console.error(error.message)
            res.send("Server Error")
    
        }
    })

module.exports = router;