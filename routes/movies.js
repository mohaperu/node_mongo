import express from 'express';
import {
    createConnection,
    getMovies,
    getUserById,
    createMovies,
    updateUserById,
    deleteUserById
} from "../helper.js";
import { auth } from "../token middleware/auth.js";

const router = express.Router();

// 1. import router
// 2. use the router (replace app with router)
// 3. export router & import in index.js (use in index.js)
// 4. replace paths

router.get('/', async (request, response) => {

    const client = await createConnection();
    const users = await getMovies(client);
    response.send(users);
})

// router.get("/:id", async (request, response) => {

//     //to get the user id
//     const id = request.params.id;

//     const client = await createConnection();
//     const users = await getUserById(client, id);
//     response.send(users);
// });

//create
router.post('/', async (request, response) => {

    const client = await createConnection();
    const addMovies = request.body;

    const result = await createMovies(client, addMovies)
    response.send(result);
})

// //update - id, new data
// router.patch('/:id', async (request, response) => {

//     //to get the user id
//     const id = request.params.id;

//     const client = await createConnection();
//     const newData = request.body;

//     const users = await updateUserById(client, id, newData);
//     response.send(users);
// })

// //delete
// router.delete('/:id', async (request, response) => {

//     //to get the user id
//     const id = request.params.id;

//     const client = await createConnection();
//     const users = await deleteUserById(client, id);
//     response.send(users);
// })

export const moviesRouter = router;