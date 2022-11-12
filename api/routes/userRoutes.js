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
        } else {
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                if(err){
                    res.status(500).json({ message: err.message });
                } else {
                    user.password = hash;
                    res.status(200).json({ message: `User with email of ${req.body.email} created successfully!` });
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
                }
            });
        }
    })
});

router.post('/login', (req, res) => {
    const email = req.body.email;
    const firstName = req.body.firstName;
    const password = req.body.password;
    const id = req.body.id;

    findUser({email: req.body.email})
    .then(result => {
        if(!result){
            res.status(401).json({
                message: "That email address is not in our system! Please sign up and try again."
            });
        } else {
            bcrypt.compare(password, user.password, (err, result) => {
                if(err) return res.status(501).json({ message: err.message });
                if(result){
                    const token = jwt.sign({email: email, firstName:firstName, id:id }, process.env.jwt_key);
                    res.status(200).json({ 
                        message: "Authorization Successful!",
                        email: email,
                        firstName: firstName,
                        token: token
                    });
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
    // findUser({email: req.body.email})
    res.status(200).json({ message: req.userData })
}); 

module.exports = router;