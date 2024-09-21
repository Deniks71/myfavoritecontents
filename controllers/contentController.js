import connection from "../database/conexao.js";

export async function insertContent(req,res) {
    //Take the User ID
    const id = req.params.id;
    //Take the data that the user wants to store in their list.
    const {title,description} = req.body;

    if(!title){
        return res.status(422).json({msg: 'O Titulo é obrigatório!'});
    };

    if(!description){
        return res.status(422).json({msg: 'A descrição é obrigatória!'})
    }
    //Array to insert values in the database
    const content = [id,title,description];

    try{
        const insertContentSql = "INSERT INTO contents (`iduser`, `title`, `description`) VALUES (?, ?, ?);"

        const [result,fields] = await connection.execute(insertContentSql,content);

        console.log(result,fields)

        return res.status(201).json({msg: "Content registrado", userId: id, titulo: title, Descrição: description});
        
    } catch(err){
        return res.status(400).json({msg: `Houve um erro. Segue erro: ${err}.`})
    }
} 