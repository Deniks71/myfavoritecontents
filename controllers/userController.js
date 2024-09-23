import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import connection from "../database/conexao.js";


export async function createUser(req,res){
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
        //Checking in the database if the email assigned already exits
        const checkEmailSql = "SELECT email FROM usuarios WHERE email = ?"

        //If the email already exists, the system has to reject this action.
        const [emailExists] = await connection.execute(checkEmailSql,[email])
        //mysql returns an object inside of an array, thats why i put the index 0, to show only the value that i want.
        if(emailExists[0]){
            return res.status(422).json({msg:"Email ja cadastrado, por favor insira outro Email."})
        }

        //Creating passwordHash
        const salt = await bcrypt.genSalt(12);
        const passwordHash = await bcrypt.hash(password,salt);
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
};

export async function loginUser(req,res){
    const {email, password} = req.body;

    if(!email) {
        return res.status(422).json({msg: 'O email é obrigatório!'})
    }

    if(!password) {
        return res.status(422).json({msg: 'A senha é obrigatória!'})
    }

    try {
        //Checking in the database if the email assigned already exits
        const checkEmailSql = "SELECT * FROM usuarios WHERE email = ?"
        const [emailExists] = await connection.execute(checkEmailSql,[email])
        //mysql returns an object inside of an array, thats why i put the index 0, to show only the value that i want.
        console.log(emailExists[0].idusuarios)

        //Check if the user is in the database already
        if(!emailExists[0]){
            return res.status(422).json({msg:"Usuario nao encontrado."})
        };

        const checkPassword = await bcrypt.compare(password,emailExists[0].password)

        console.log(checkPassword)
        //Check if password matches
        if(!checkPassword){
            return res.status(422).json({msg:"Senha inválida."})
        };
        //const token = jwt.sign({email: emailExists[0].email}, process.env.SECRET)
        const token = jwt.sign(
            { id: emailExists[0].idusuarios, email: emailExists[0].email }, 
            process.env.SECRET, 
        );

        res.status(200).header('Authorization', `Bearer ${token}`).json({msg: 'Login realizado com sucesso.', id: emailExists[0].idusuarios, email: emailExists[0].email, token: token});
    }catch(err){
        return res.status(400).json({msg: `Houve um erro. Segue erro: ${err}.`});
    }

};


