import path from 'path'
import dotenv from 'dotenv';

dotenv.config({ path: path.join(__dirname, '..', '..', '.env') });

const SERVER_PORT = Number(process.env.SERVER_PORT); 

// # database
const DB_HOST = process.env.DB_HOST; 
const DB_PORT = process.env.DB_PORT; 
const DB_USERNAME = process.env.DB_USERNAME; 
const DB_PASSWORD = process.env.DB_PASSWORD; 
const DB_NAME = process.env.DB_NAME; 
const DB_LOGGING_LEVEL = process.env.DB_LOGGING_LEVEL.split(','); 

// # token
const TOKEN_SECRET = process.env.TOKEN_SECRET; 
const TOKEN_EXPIRATION = process.env.TOKEN_EXPIRATION; 

export {
    SERVER_PORT,
    DB_HOST,
    DB_PORT,
    DB_USERNAME,
    DB_PASSWORD,
    DB_NAME,
    DB_LOGGING_LEVEL,
    TOKEN_SECRET,
    TOKEN_EXPIRATION,
}