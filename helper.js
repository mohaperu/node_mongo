import { MongoClient } from "mongodb";
import bcrypt from "bcrypt"

 async function getMovies(client) {
    return await client
        .db("users")
        .collection("movies")
        .find({})
        .toArray();
}

async function createMovies(client, addMovies) {
    return await client
        .db("users")
        .collection("movies")
        .insertMany(addMovies);
}

async function createUsers(client, addUsers) {
    return await client
        .db("users")
        .collection("people")
        .insertMany(addUsers);
}

async function updateUserById(client, id, newData) {
    return await client
        .db("users")
        .collection("people")
        .updateOne({ id: id }, { $set: newData });
}

async function deleteUserById(client, id) {
    return await client
        .db("users")
        .collection("people")
        .deleteOne({ id: id });
}

async function getUserById(client, id) {
    return await client
        .db("users")
        .collection("people")
        .findOne({ id: id });
}

async function createManager(client, username, hashedPassword) {
    return await client
        .db("users")
        .collection("managers")
        .insertOne({ username: username, password: hashedPassword });
}

async function getManagers(client){
    return await client
    .db("users")
    .collection("managers")
    .find({})
    .toArray();
}

async function genPassword(password) {
    //signup password will changed to hash by adding salt
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}

//Globally
//MongoConnection-atlas
async function createConnection() {

    //const MONGO_URL = "mongodb://localhost/users";
    const MONGO_URL = process.env.MONGO_URL;
    const client = new MongoClient(MONGO_URL);

    //this will take time because it will return promise so we are using = async await
    await client.connect();
    console.log("successfully connected");

    //insert data globaly to get
    // const insertdata = await client.db("users").collection("people").insertMany(users);

    return client;
}


export{
    getMovies as getUsers,
    createUsers,
    updateUserById,
    deleteUserById,
    getUserById,
    createManager,
    getManagers,
    genPassword,
    createConnection,
    createMovies,
    getMovies
}
