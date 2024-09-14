import express from 'express';

const app = express();

app.use(express.json());

app.get('/', (req,res) => {
    res.status(200).json({msg:'Bem vindo'});
});

app.get('/myfavcontent/register',(req,res) => {
    const {name,email,password,confirmpassword} = req.body

    if(!name) {
        return res.status(422).json({msg: 'O nome é obrigatório!'})
    }
    if(!email) {
        return res.status(422).json({msg: 'O email é obrigatório!'})
    }
    if(!password) {
        return res.status(422).json({msg: 'A senha é obrigatória!'})
    }
    if(password !== confirmpassword) {
        return res.status(422).json({msg: 'As Senhas nao conferem!'})
    }

})

export default app;
