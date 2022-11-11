const mongoose = require('mongoose');
require('dotenv').config();
const user = require('../api/model/user');

const connect = async (err) => {
    await mongoose.connect(process.env.mongoDBURL)
            console.log("MongoDB connection established.");
};

const findUser = async (data) => { return await user.findOne(data).exec() };

const saveUser = async (user) => { return await user.save(user) };

const disconnect = async () => {
    await mongoose.connection.close();
};

module.exports = {
    connect, 
    disconnect,
    findUser,
    saveUser,
};