import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config({
    path : "./.env"
})

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  ssl: {
    rejectUnauthorized: false,
  }
});

connection.connect((err) => {
    if(err){
        throw err;
    }
    console.log("DB is connected successfully");

    const createTableQuery = `
    CREATE TABLE IF NOT EXISTS schools (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      address VARCHAR(255) NOT NULL,
      latitude FLOAT NOT NULL,
      longitude FLOAT NOT NULL
    )
  `;

  connection.query(createTableQuery, (err) => {
    if (err) throw err;
    console.log("Schools table is ready");
  });
    
})

export default connection;