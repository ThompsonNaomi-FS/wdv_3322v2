const { connect, disconnect, findUser, saveUser } =  require('./__mocks__/db');
// const { findUser, saveUser } = require('../db/db');
const User = require('../api/model/user');
const mongoose = require('mongoose');


beforeEach(async () => {
    await connect();
});

describe( "Testing creating/saving a user and finding a user", () => {
    test("save user", async () => {
        const newUser = new User({
            _id: mongoose.Types.ObjectId(),
            firstName: "Naomi", 
            lastName: "Thompson",
            address: "255 N 5th St",
            city: "Ulysses",
            state: "NE",
            zip: "68669",
            email: "nameowmi@outlook.com",
            password: "password"
        });

        expect(user).toEqual(expect.objectContaining({
            firstName: "Naomi",
            lastName: "Thompson",
            address: "255 N 5th St",
            city: "Ulysses",
            state: "NE",
            zip: 68669,
            email: "nameowmi@outlook.com",
            password: "password"
        }));
        // expect(response.status).toEqual(200);
    });

    test("find user", () => {
        const result = findUser({email: "nameowmi@outlook.com"});
        expect(result).toEqual(expect.objectContaining({
            firstName: "Naomi",
            lastName: "Thompson",
            address: "255 N 5th St",
            city: "Ulysses",
            state: "NE",
            zip: 68669,
            email: "nameowmi@outlook.com",
            password: "password"
        }));
        // expect(response.status).toEqual(200);
    });
});

afterEach(async () => {
    await disconnect();
});