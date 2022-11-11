const connect = async() => {
    console.log("Mocked connection.")
};

const disconnect = async() => {
    console.log("Mocked disconnect.")
};

const saveUser = async (user) => {
    console.log('Mocked save');
    return await Promise.resolve({
        firstName: "Naomi", 
        lastName: "Thompson",
        address: "255 N 5th St",
        city: "Ulysses",
        state: "NE",
        zip: 68669,
        email: "nameowmi@outlook.com",
        password: "password"
    });
};

const findUser = async (user) => {
    return await Promise.resolve({
        firstName: "Naomi", 
        lastName: "Thompson",
        address: "255 N 5th St",
        city: "Ulysses",
        state: "NE",
        zip: 68669,
        email: "nameowmi@outlook.com",
        password: "password"
    });
};

module.exports = { connect, disconnect, findUser, saveUser };