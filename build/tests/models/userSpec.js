"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../../models/user");
const uuid_1 = require("uuid");
const bcrypt_1 = __importDefault(require("bcrypt"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const pepper = process.env.BCRYPT_PASSWORD;
const saltRounds = process.env.SALT_ROUNDS;
const hashedPassword = bcrypt_1.default.hashSync('mypassword' + pepper, Number(saltRounds));
const store = new user_1.UserStore();
const uuid = (0, uuid_1.v4)();
describe('User Model', () => {
    it('should have an index method', () => {
        expect(store.index).toBeDefined();
    });
    it('should have a show method', () => {
        expect(store.show).toBeDefined();
    });
    it('should have a create method', () => {
        expect(store.create).toBeDefined();
    });
    it('should have a update method', () => {
        expect(store.update).toBeDefined();
    });
    it('should have a delete method', () => {
        expect(store.delete).toBeDefined();
    });
    it('should have an authenticate method', () => {
        expect(store.authenticate).toBeDefined();
    });
    it('create method should add a user', async () => {
        const user = {
            id: uuid,
            firstName: 'John',
            lastName: 'Doe',
            email: 'jdoe@gmail.com',
            billingAddress: 'Sunset Boulevard, LA',
            username: 'jdoe',
            password: 'mypassword'
        };
        const createdUser = await store.create(user);
        expect(createdUser).toEqual({
            id: uuid,
            firstName: 'John',
            lastName: 'Doe',
            username: 'jdoe'
        });
    });
    it('index method should return a list of users', async () => {
        const users = await store.index();
        expect(users).toEqual([{
                id: uuid,
                firstName: 'John',
                lastName: 'Doe',
                email: 'jdoe@gmail.com',
                billingAddress: 'Sunset Boulevard, LA',
                username: 'jdoe',
                password: hashedPassword
            }]);
    });
    it('update method should edit a user', async () => {
        const user = {
            id: uuid,
            firstName: 'Mary',
            lastName: 'Doe',
            email: 'mdoe@gmail.com',
            billingAddress: 'Miami Beach, FL',
            username: 'mdoe',
            password: 'mypassword'
        };
        const updatedUser = await store.update(user);
        expect(updatedUser).toEqual({
            id: uuid,
            firstName: 'Mary',
            lastName: 'Doe',
            email: 'mdoe@gmail.com',
            billingAddress: 'Miami Beach, FL',
            username: 'mdoe',
            password: hashedPassword
        });
    });
    it('authenticate method should validate correct user credentials', async () => {
        const result = await store.authenticate('mdoe', 'mypassword');
        expect(result).toEqual({
            id: uuid,
            firstName: 'Mary',
            lastName: 'Doe',
            username: 'mdoe'
        });
    });
    it('authenticate method should invalidate incorrect user credentials', async () => {
        const result = await store.authenticate('user', 'password');
        expect(result).toEqual(null);
    });
    it('delete method should remove the user', async () => {
        await store.delete(uuid);
        const result = await store.index();
        expect(result).toEqual([]);
    });
});
