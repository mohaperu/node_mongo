// const express = require('express');// type commom
import express from 'express';//latest for type module
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import { managerRouter } from './routes/manager.js';
import { usersRouter } from './routes/users.js';
import { moviesRouter } from './routes/movies.js';

const app = express();

//by importing the dotenv to use
dotenv.config();

//PORT is stored in .gitignore file
const PORT = process.env.PORT;

//Tell express what format data you are going to get - json, xml, text
//middleware - gatekeeper
//all the request  - body - will be converted to JSON
app.use(express.json()); //inbuild middleware


//To know the env files is uploaded or not
//console.log(process.env);

app.get('/', (request, response) => {
    response.send("hello all");
})

app.use("/managers", managerRouter);
app.use("/users", usersRouter);
app.use("/movies", moviesRouter);



//start the server
app.listen(PORT, () => console.log("The Server is starts in ", PORT))

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
