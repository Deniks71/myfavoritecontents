import express from 'express';
import { createUser, loginUser } from './controllers/UserController.js';
import { checkToken } from './controllers/authController.js';
import { insertContent, showContents } from './controllers/contentController.js';

const app = express();
app.use(express.json());


//Routes
//Rout to create the user
app.post('/myfavcontent/register', createUser);

//Login
app.post('/myfavcontent/login', loginUser);

//Private Route
app.get('/myfavcontent/user/:id', checkToken, showContents);

//Insert content
app.post('/myfavcontent/user/:id/insertContent', checkToken, insertContent);





export default app;
