require('dotenv').config()

const dbConfig = {
    host : process.env.DATABASE_HOST,
    user : process.env.DATABASE_USER,
    password : process.env.DATABASE_PASSWORD,
    database : process.env.DATABASE_DB
}

const PORT = process.env.PORT;

const defaultFilesConfig = {
    MAX_FILES : 5,
    MAX_SIZE : 5 * 1024 * 1024
}

module.exports = {
    dbConfig,
    PORT,
    defaultFilesConfig
}