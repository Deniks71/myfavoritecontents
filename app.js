import express from 'express';
import connection from './database/conexao.js';

const app = express();

app.use(express.json());


//ROTAS
app.post('/myfavcontent/register',(req,res) => {
    const creatingUser = createUser(req.body);
    res.json({msg:`${creatingUser}`});
    
});


//Funçao para criar usuario
async function createUser(request){
    const {name,email,password,confirmpassword} = request;

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
        const usuario = {
            email,
            name,
            password
        };
        const sql = "INSERT INTO usuarios set ?;"

        await connection.query(sql,usuario, (err,result) => {
            if(err){
                return err;
            } else {
                return result;
            }
        })
    } catch(err){
        console.log(err)
    }
}

export default app;
