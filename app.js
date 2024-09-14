import express from 'express';

const app = express();

app.use(express.json());

app.get('/',(req,res) => {
    res.status(200).json({msg: 'funcionando'})

})
app.listen(3000, () => {
    console.log('Server rodando na porta 3000');
});
