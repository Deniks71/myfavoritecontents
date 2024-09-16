import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import connection from './database/conexao.js';

const app = express();
app.use(express.json());


//Routes
app.post('/myfavcontent/register', createUser);


//Func to creat user
async function createUser(req,res){
    const {name,email,password,confirmpassword} = req.body;

    if(!email) {
        return res.status(422).json({msg: 'O email é obrigatório!'})
    }

    if(!name) {
        return res.status(422).json({msg: 'O nome é obrigatório!'})
    }
    
    if(!password) {
        return res.status(422).json({msg: 'A senha é obrigatória!'})
    }
    if(password !== confirmpassword) {
        return res.status(422).json({msg: 'As Senhas nao conferem!'})
    }

    //Creating passwordHash
    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password,salt);

    try {
        const usuario = [email,name,passwordHash];
        //Check if User Exist by searching for their email in the database.

        const sql = "INSERT INTO usuarios (`email`, `name`, `password`) VALUES (?, ?, ?);"

        const [result,fields] = await connection.execute(sql,usuario);
        console.log(result);
        console.log(fields)
        return res.status(201).json({msg: "Usuario registrado"});

    } catch(err){
        return res.status(400).json({msg: `Houve um erro. Segue erro: ${err}.`});
    }
}

export default app;
