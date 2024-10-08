import express from 'express';
import cors from 'cors';
import { createUser, loginUser } from './controllers/UserController.js';
import { checkToken } from './controllers/authController.js';
import { deleteContent, insertContent, showContents, updateContent } from './controllers/contentController.js';

const app = express();
app.use(cors());
app.use(express.json());


//Routes
//Rout to create the user
app.post('/myfavcontent/register', createUser);

//Login
app.post('/myfavcontent/login', loginUser);

//Show user contents Route
app.get('/myfavcontent/user/:id', checkToken, showContents);

//Insert content
app.post('/myfavcontent/user/:id/insertContent', checkToken, insertContent);

app.delete('/myfavcontent/user/:id/delete/:contentId', checkToken, deleteContent)

app.put('/myfavcontent/user/:id/update/:contentId', checkToken,updateContent);




export default app;
