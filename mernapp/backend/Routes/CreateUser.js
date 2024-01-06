const express = require('express');
const router = express.Router();
const User = require('../models/User')
const { body, validationResult } = require('express-validator');

const bcrypt = require("bcryptjs");
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
            res.json({ success: true });

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
            return res.json({ success: true });

        } catch (error) {
            console.log("error", error);
            res.json({ success: false });

        }

    })

module.exports = router;