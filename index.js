// const express = require('express');// type commom
import express from 'express';//latest for type module
import { MongoClient } from "mongodb"
import dotenv from "dotenv"
const app = express();

dotenv.config();
const PORT = process.env.PORT;

//Tell expresswhat format data you are going to get - json, xml, text
//middleware - gatekeeper
//all the request  - body - will be converted to JSON
app.use(express.json()); //inbuild middleware

console.log(process.env)
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

app.get('/', (request, response) => {
    response.send("hello all");
})

app.get("/users/:id", async (request, response) => {
    console.log(request.params);
    //to get the user id
    const id = request.params.id;
    const client = await createConnection();
    const users = await client
        .db("users")
        .collection("people")
        .findOne({ id: id })
    console.log(users);
    response.send(users);
});

//find
app.get('/users', async (request, response) => {
    // //array destructring
    // const { color, ageGt } = request.query;

    const client = await createConnection();
    const users = await client
        .db("users")
        .collection("people")
        .find({})
        .toArray();

    console.log(users);
    response.send(users);

})
//create
app.post('/users', async (request, response) => {

    const client = await createConnection();
    const addUsers = request.body;

    const result = await client
        .db("users")
        .collection("people")
        .insertMany(addUsers)

    console.log(addUsers, result);
    response.send(result);

})

//delete
app.delete('/users/:id', async (request, response) => {

    console.log(request.params);
    //to get the user id
    const id = request.params.id;
    const client = await createConnection();
    const users = await client
        .db("users")
        .collection("people")
        .deleteOne({ id: id })
    console.log(users);
    response.send(users);

})


//update - id, new data
app.patch('/users/:id', async (request, response) => {

    console.log(request.params);
    //to get the user id
    const id = request.params.id;

    const client = await createConnection();
    const newData = request.body;
    console.log(id, request.body);

    const users = await client
        .db("users")
        .collection("people")
        .updateOne({ id: id }, {$set: newData} );

    console.log(users);
    response.send(users);

})

// app.get('/users', (request, response) => {
//     //array destructring
//     //const color = request.query.color
//     const { color, ageGt } = request.query
//     console.log(request.query, color, ageGt);

//     //color and age is not there return users
//     if (!color && !ageGt) {
//         response.send(users);

//     } else if (color && !ageGt) {
//         response.send(users.filter((user) => user.color === color));
//     } else if (!color && ageGt) {
//         response.send(users.filter((user) => user.age >= ageGt));
//     } else {
//         response.send(users.filter((user) => user.color === color && user.age >= ageGt));
//     }

// })


//start the server
app.listen(PORT, () => console.log("The server is startes in ", PORT))