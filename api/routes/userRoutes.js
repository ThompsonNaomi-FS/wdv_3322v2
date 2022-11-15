const express = require('express');
const User = require('../model/user');
const { default: mongoose } = require("mongoose");
const router = express.Router();
const { findUser, saveUser } = require('../../db/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const checkAuth = require('../../auth/checkAuth');

const user = {};

router.use(express.json());

router.post('/signup', (req,res) => {
    findUser({email: req.body.email})
    .then(result => {
        if(result){
            res.status(409).json({
                message: "That email address is already in use! Please try logging in."
            });
        } else if (!req.body.firstName || !req.body.lastName || !req.body.address || !req.body.city || !req.body.state || !req.body.zip || !req.body.email || !req.body.password){
            res.status(409).json({
                message: 'Please make sure all fields are filled out.'
            });
        } else {
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                if(err){
                    res.status(500).json({ message: err.message });
                } else {
                    user.password = hash;
                    const newUser = new User({
                        _id: mongoose.Types.ObjectId(),
                        firstName: req.body.firstName, 
                        lastName: req.body.lastName,
                        address: req.body.address,
                        city: req.body.city,
                        state: req.body.state,
                        zip: req.body.zip,
                        email: req.body.email,
                        password: hash
                    })
                    saveUser(newUser)
                    .then(result => {
                        if(!result){
                            res.status(401).json({
                                message: "Signup failed. Please try again."
                            })
                        } else {
                            res.status(200).json({ 
                                message: `User with email of ${newUser.email} created successfully!`,
                                email: newUser.email,
                                id: newUser._id
                            })
                        }
                    });
                }
            });
        }
    })
});

router.post('/login', (req, res) => {
    const password = req.body.password;

    findUser({email: req.body.email})
    .then(result => {
        if(!result){
            res.status(401).json({
                message: "That email address is not in our system! Please sign up and try again."
            });
        } else {
            const profile = {result};
            bcrypt.compare(password, user.password, (err, result) => {
                if(err) return res.status(501).json({ message: err.message });
                if(result){
                    const token = jwt.sign({email: profile.result.email, firstName: profile.result.firstName, lastName: profile.result.lastName, id: profile.result._id }, process.env.jwt_key);
                    res.status(200).json({ 
                        message: `Authorization Successful! Logged in as ${profile.result.firstName} `,
                        token: token
                    });
                    console.log(token)
                } else {
                    res.status(401).json({ 
                        message: "Authorization Failed!"
                });
                }
            });
        }
    })
});

router.get('/profile', checkAuth, (req, res, next) => {
    res.status(200).json({ message: req.userData })
}); 

module.exports = router;