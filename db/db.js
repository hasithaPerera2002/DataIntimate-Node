import env from "dotenv";
env.config();
// Connect to SQL database
import mysql from "mysql2";
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) {
    console.log(err);
    console.log("MySQL Connection Failed...");
    process.exit(1); //exit the process if there is an error
  } else {
    console.log("MySQL Connected...");
  }
});

export default db;
