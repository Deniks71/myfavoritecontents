import express from 'express';
import { createUser, loginUser,checkToken, getDataFromUser } from './controllers/UserController.js';


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
