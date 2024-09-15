import express from 'express';
import connection from './database/conexao.js';

const app = express();

app.use(express.json());


//ROTAS
app.post('/myfavcontent/register', createUser);


//Funçao para criar usuario
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

    try {
        const usuario = [email,name,password];

        const sql = "INSERT INTO usuarios (`email`, `name`, `password`) VALUES (?, ?, ?);"

        const [result,fields] = await connection.execute(sql,usuario);
        console.log(result);
        console.log(fields)
        return res.status(201).json({msg: "Usuario registrado"});

        // await connection.query(sql,usuario, (err,result) => {
        //     if(err){
        //         return res.status(400).json({msg: `Houve um erro. Segue erro: ${err}.`});
        //     } else {
        //         return res.status(201).json(result);
        //     }
        // })
    } catch(err){
        return res.status(400).json({msg: `Houve um erro. Segue erro: ${err}.`});
    }
}

export default app;
