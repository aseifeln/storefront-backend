import Client from '../database';
import {hashPassword, comparePassword} from '../utilities/passwordHashing';

export type User = {
    id: string,
    firstName: string,
    lastName: string,
    email?: string | undefined,
    billingAddress?: string | undefined,
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
            const sql = 'UPDATE users SET firstName = ($1), lastName = ($2), email = ($3), billingAddress = ($4), username = ($5) WHERE id = ($6) RETURNING *';
            const result = await conn.query(sql, [u.firstName, u.lastName, u.email, u.billingAddress, u.username, u.id]);
            const user = result.rows[0];

            return user;
        }catch(err){
            throw new Error(`Cannot update user ${u.username}. ${err}`);
        }
    }

    async create(u: User): Promise<{id: string, firstName: string, lastName: string, username: string}> {
        try {
          // @ts-ignore
          const conn = await Client.connect()
          const sql = 'INSERT INTO users (id, firstName, lastName, email, billingAddress, username, password) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *'
    
          const hash = hashPassword(u.password);
    
          const result = await conn.query(sql, [u.id, u.firstName, u.lastName, u.email, u.billingAddress, u.username, hash])
          const user: User = result.rows[0]
          conn.release()
          
          return {id: user.id, firstName: user.firstName, lastName: user.lastName, username: user.username}
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
      Promise<{id: string, firstName: string, lastName: string, username: string}|null> {
        const conn = await Client.connect();
        const sql = 'SELECT id, firstName, lastName, password FROM users WHERE username = ($1)';
        const result = await conn.query(sql, [username]);
        if(result.rows.length){
            const user = result.rows[0];
            if (comparePassword(password, user.password)) {
                return {id: user.id, firstName: user.firstName, lastName: user.lastName, username: username};
            }
        }
        return null;
    }
}