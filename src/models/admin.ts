import Client from '../database';
import {hashPassword, comparePassword} from '../utilities/passwordHashing';

export type Admin = {
    id: string,
    username: string,
    password: string
}

export class AdminStore {
    async create(a: Admin): Promise<{id: string, username: string}> {
        try{
            const conn = await Client.connect();
            const sql = 'INSERT INTO admin (id, username, password) VALUES ($1, $2, $3) RETURNING *';
            const hash = hashPassword(a.password);
            const result = await conn.query(sql, [a.id, a.username, hash]);
            const admin = result.rows[0];
    
            return {id: admin.id, username: admin.username};
        }catch(err){
            throw new Error(`Unable to create admin ${a.username}. Error: ${err}`);
        }
    }

    async authenticate(username: string, password: string): 
      Promise<{id: string, username: string}|null> {
        const conn = await Client.connect();
        const sql = 'SELECT id, password FROM admin WHERE username = ($1)';
        const result = await conn.query(sql, [username]);
        if(result.rows.length){
            const admin = result.rows[0];
            if (comparePassword(password, admin.password)) {
                return {id: admin.id, username: username};
            }
        }
        return null;
    }
}