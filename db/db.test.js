const { connect, disconnect, findUser, saveUser } = require('../db/db');
const User = require('../api/model/user');
const mongoose = require('mongoose');

jest.mock("./db");

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

        const user = await saveUser(newUser);

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
        // expect(user).toHaveProperty('_id');
    });

    test("find user", async () => {
        const user = await findUser({email: "nameowmi@outlook.com"});
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
        // expect(user).toHaveProperty('_id');
    });
});

afterEach(async () => {
    await disconnect();
});