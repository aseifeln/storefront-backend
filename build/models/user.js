"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserStore = void 0;
const database_1 = __importDefault(require("../database"));
const passwordHashing_1 = require("../utilities/passwordHashing");
class UserStore {
    async index() {
        try {
            const conn = await database_1.default.connect();
            const sql = 'SELECT * FROM users';
            const result = await conn.query(sql);
            const users = result.rows;
            conn.release();
            return users;
        }
        catch (err) {
            throw new Error(`Cannot get users: ${err}`);
        }
    }
    async show(id) {
        try {
            const conn = await database_1.default.connect();
            const sql = 'SELECT * FROM users WHERE id=($1)';
            const result = await conn.query(sql, [id]);
            const user = result.rows[0];
            conn.release();
            return user;
        }
        catch (Err) {
            throw new Error(`Cannot get user with id ${id}: ${Err}`);
        }
    }
    async update(u) {
        try {
            const conn = await database_1.default.connect();
            const sql = 'UPDATE users SET firstName = ($1), lastName = ($2), email = ($3), billingAddress = ($4), username = ($5) WHERE id = ($6) RETURNING *';
            const result = await conn.query(sql, [u.firstName, u.lastName, u.email, u.billingAddress, u.username, u.id]);
            const user = result.rows[0];
            return user;
        }
        catch (err) {
            throw new Error(`Cannot update user ${u.username}. ${err}`);
        }
    }
    async create(u) {
        try {
            // @ts-ignore
            const conn = await database_1.default.connect();
            const sql = 'INSERT INTO users (firstName, lastName, username, password) VALUES($1, $2, $3, $4) RETURNING *';
            const hash = (0, passwordHashing_1.hashPassword)(u.password);
            const result = await conn.query(sql, [u.firstName, u.lastName, u.username, hash]);
            const user = result.rows[0];
            conn.release();
            return { "firstName": user.firstName, "lastName": user.lastName, "username": user.username };
        }
        catch (err) {
            throw new Error(`Unable to create user (${u.username}): ${err}`);
        }
    }
    async delete(id) {
        try {
            const sql = 'DELETE FROM users WHERE id=($1) RETURNING *';
            // @ts-ignore
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [id]);
            const user = result.rows[0];
            conn.release();
            return user;
        }
        catch (err) {
            throw new Error(`Could not delete user ${id}. Error: ${err}`);
        }
    }
    async authenticate(username, password) {
        const conn = await database_1.default.connect();
        const sql = 'SELECT password FROM users WHERE username = ($1)';
        const result = await conn.query(sql, [username]);
        if (result.rows.length) {
            const user = result.rows[0];
            if ((0, passwordHashing_1.comparePassword)(password, user.password)) {
                return "User authenticated successfully";
            }
        }
        return null;
    }
}
exports.UserStore = UserStore;
