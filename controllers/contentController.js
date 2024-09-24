import connection from "../database/conexao.js";

//Create a content to add in the database
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
};

export async function showContents(req,res){
    //Take the User ID
    const userId = req.params.id

    try{
        //Query to search in the database everything in the contents table from a user
        const showContentsSql = "SELECT * FROM contents WHERE iduser = ?;"
        const [contentsFromDb] = await connection.execute(showContentsSql,[userId]);

        if(!contentsFromDb[0]){
            return res.status(422).json({msg:"Conteudos não cadastrados."})
        };

        //Returns the result of the query.
        return res.status(200).json({conteudos: contentsFromDb});

    } catch(err){
        return res.status(400).json({msg: `Houve um erro. Segue erro: ${err}.`})
    }
};

export async function deleteContent(req,res) {
    const id = req.params.id;
    const contentId = req.params.contentId;

    const queryDelete = "DELETE FROM contents WHERE idcontent=? AND iduser=?;"

    try{
        const [deletedContent] = await connection.execute(queryDelete, [contentId,id]);

        console.log(deletedContent);

        return res.status(200).json({msg: "Content Deletado"})

    } catch(err){
        return res.status(400).json({msg: `Houve um erro. Segue erro: ${err}.`})
    }
}