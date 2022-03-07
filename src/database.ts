import dotenv from 'dotenv';
import {Pool} from 'pg';

dotenv.config();

const {
    POSTGRES_HOST,
    POSTGRES_USER,
    POSTGRES_DB,
    POSTGRES_TEST_DB,
    POSTGRES_PASSWORD,
    ENV
} = process.env;

let Client: Pool;

if(ENV === 'test'){
    Client = new Pool({
        host: POSTGRES_HOST,
        user: POSTGRES_USER,
        database: POSTGRES_TEST_DB,
        password: POSTGRES_PASSWORD
    })
}else{
    Client = new Pool({
        host: POSTGRES_HOST,
        user: POSTGRES_USER,
        database: POSTGRES_DB,
        password: POSTGRES_PASSWORD
    })   
}

export default Client;