const mongoose = require('mongoose');

const connect = async () => {
    await mongoose.connect("mongodb://localhost:27017/wdv3322")
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