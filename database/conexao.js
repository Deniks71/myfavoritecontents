import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

//Configurando .env
dotenv.config();  

// Create the connection to database
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        port: process.env.PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME
    
    });

console.log('Conexão estabelecida com sucesso.');

const [result] = await connection.execute('SELECT 1');
console.log('Teste de conexão:', result);