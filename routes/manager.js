// const express = require('express');// type commom
import express from 'express';//latest for type module
import {
    genPassword,
    createConnection,
    getManagers,
    createManager
} from "../helper.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';



// Routers - will helps organize into different files based on route
const router = express.Router();

// 1. import router
// 2. use the router (replace app with router)
// 3. export router & import in index.js (use in index.js)
// 4. replace paths

//bcrypt
router.get('/', async (request, response) => {

    const client = await createConnection();
    const managers = await getManagers(client);
    response.send(managers);
})

//signup-bcrypt
router.post('/signup', async (request, response) => {

    const client = await createConnection();
    const { username, password } = request.body;

    const hashedPassword = await genPassword(password)

    const result = await createManager(client, username, hashedPassword)
    response.send(result);
})

//login-bcrypt
router.post('/login', async (request, response) => {

    const client = await createConnection();
    const { username, password } = request.body;

    const result = await client
        .db("users")
        .collection("managers")
        .findOne({ username: username });
    console.log(result);
    //to check db password and password or not
    const storedDbpassword = result.password;
    //it will return a boolean
    const isPasswordMatch = await bcrypt.compare(password, storedDbpassword);
    if (isPasswordMatch) {
        //to issue token
        const token = jwt.sign({ id: result._id }, process.env.SECRET_KEY)//because of the key the token is showing the random thing
        response.send({ message: "Successfull login", token: token });
    } else {
        response.send({ message: "Invalid login" });
    }

})




export const managerRouter = router;