import Client from '../database';
import {hashPassword, comparePassword} from '../utilities/passwordHashing';

export type User = {
    id: string,
    first_name: string,
    last_name: string,
    email?: string | undefined,
    billing_address?: string | undefined,
    username: string,
    password: string
}

export class UserStore {
    async index(): Promise<User[]> {
        try{
            const conn = await Client.connect();
            const sql = 'SELECT * FROM users';
            const result = await conn.query(sql);
            const users = result.rows;
            conn.release();

            return users;
        }catch(err){
            throw new Error(`Cannot get users: ${err}`)
        }
    }

    async show(id: string): Promise<User> {
        try{
            const conn = await Client.connect();
            const sql = 'SELECT * FROM users WHERE id=($1)'
            const result = await conn.query(sql, [id]);
            const user = result.rows[0];
            conn.release();

            return user;
        }catch(Err){
            throw new Error(`Cannot get user with id ${id}: ${Err}`);
        }
    }

    async update(u: User): Promise<User> {
        try{
            const conn = await Client.connect();
            const sql = 'UPDATE users SET first_name = ($1), last_name = ($2), email = ($3), billing_address = ($4), username = ($5) WHERE id = ($6) RETURNING *';
            const result = await conn.query(sql, [u.first_name, u.last_name, u.email, u.billing_address, u.username, u.id]);
            const user = result.rows[0];

            return user;
        }catch(err){
            throw new Error(`Cannot update user ${u.username}. ${err}`);
        }
    }

    async create(u: User): Promise<{id: string, username: string}> {
        try {
          // @ts-ignore
          const conn = await Client.connect()
          const sql = 'INSERT INTO users (id, first_name, last_name, email, billing_address, username, password) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *'
    
          const hash = hashPassword(u.password);
    
          const result = await conn.query(sql, [u.id, u.first_name, u.last_name, u.email, u.billing_address, u.username, hash])
          const user = result.rows[0]
          conn.release()
          
          return {id: user.id, username: user.username}
        } catch(err) {
          throw new Error(`Unable to create user (${u.username}): ${err}`)
        } 
      }

      async delete(id: string): Promise<User> {
        try {
            const sql = 'DELETE FROM users WHERE id=($1) RETURNING *'
            // @ts-ignore
            const conn = await Client.connect()
  
            const result = await conn.query(sql, [id])
  
            const user = result.rows[0]
  
            conn.release()
  
            return user
        } catch (err) {
            throw new Error(`Could not delete user ${id}. Error: ${err}`)
        }
    }

      async authenticate(username: string, password: string): 
      Promise<{id: string, first_name: string, last_name: string, username: string}|null> {
        const conn = await Client.connect();
        const sql = 'SELECT id, first_name, last_name, password FROM users WHERE username = ($1)';
        const result = await conn.query(sql, [username]);
        if(result.rows.length){
            const user = result.rows[0];
            if (comparePassword(password, user.password)) {
                return {id: user.id, first_name: user.first_name, last_name: user.last_name, username: username};
            }
        }
        return null;
    }
}