import express from 'express';
import {
    createConnection,
    getUsers,
    getUserById,
    createUsers,
    updateUserById,
    deleteUserById
} from "../helper.js";
import {auth} from "../token middleware/auth.js";

const router = express.Router();

// 1. import router
// 2. use the router (replace app with router)
// 3. export router & import in index.js (use in index.js)
// 4. replace paths

router.get('/',auth, async (request, response) => {

    const client = await createConnection();
    const users = await getUsers(client);
    response.send(users);
})

router.get("/:id", auth, async (request, response) => {

    //to get the user id
    const id = request.params.id;

    const client = await createConnection();
    const users = await getUserById(client, id);
    response.send(users);
});

//create
router.post('/', auth, async (request, response) => {

    const client = await createConnection();
    const addUsers = request.body;

    const result = await createUsers(client, addUsers)
    response.send(result);
})

//update - id, new data
router.patch('/:id', auth, async (request, response) => {

    //to get the user id
    const id = request.params.id;

    const client = await createConnection();
    const newData = request.body;

    const users = await updateUserById(client, id, newData);
    response.send(users);
})

//delete
router.delete('/:id', auth, async (request, response) => {

    //to get the user id
    const id = request.params.id;

    const client = await createConnection();
    const users = await deleteUserById(client, id);
    response.send(users);
})

export const usersRouter = router;