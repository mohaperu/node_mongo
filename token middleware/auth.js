import jwt from "jsonwebtoken";

//check all the request for valid
//custom middleware

export const auth = (request, response, next) => {


    try {
        const token = request.header('x-auth-token');
        console.log(token);
        //verify token
        jwt.verify(token, process.env.SECRET_KEY)
        next();
    } catch (err) {
        response.status(401);
        response.send({ error: err.message })
    }
}