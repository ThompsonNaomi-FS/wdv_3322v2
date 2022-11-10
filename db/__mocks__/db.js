const connect = async() => {
    console.log("Mocked connection")
};
const disconnect = async() => {
    console.log("Mocked disconnect")
};

const users = [];

const saveUser = (obj) => {
    users.push(obj);
};

const findUser = (obj) => {
    const match = users.find(e => e.email == obj.email);
    return match;
};

module.exports = { connect, disconnect, findUser, saveUser };