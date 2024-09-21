import express from 'express';
import { createUser, loginUser, getDataFromUser } from './controllers/UserController.js';
import { checkToken } from './controllers/authController.js';



const app = express();
app.use(express.json());


//Routes
//Rout to create the user
app.post('/myfavcontent/register', createUser);

//Login
app.post('/myfavcontent/login', loginUser);

//Private Route
app.get('/myfavcontent/user/:id', checkToken, getDataFromUser);





export default app;
