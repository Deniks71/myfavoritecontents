import express from 'express';
import { createUser } from './controllers/UserController.js';


const app = express();
app.use(express.json());


//Routes
app.post('/myfavcontent/register', createUser);




export default app;
