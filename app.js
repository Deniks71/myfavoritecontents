import express from 'express';
import { createUser, loginUser } from './controllers/UserController.js';


const app = express();
app.use(express.json());


//Routes
//Rout to create the user
app.post('/myfavcontent/register', createUser);

//Login
app.post('/myfavcontent/login', loginUser);





export default app;
