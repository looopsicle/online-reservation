import mysql from 'mysql2';

let pool: mysql.Pool;

async function getDB(): Promise<mysql.Pool>
{
    if(!pool)
    {
        pool = mysql.createPool({
            host: process.env.DB_HOST || 'localhost',
            user: process.env.DB_USER || 'root',
            password: process.env.DB_PASSWORD || '',
            database: process.env.DB_NAME || 'test',
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0,
        });
    }

    return pool;
}

export default getDB;
