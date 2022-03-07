import {AdminStore} from '../../models/admin';
import {v4 as uuidv4} from 'uuid';
import dotenv from 'dotenv';

dotenv.config();

const store = new AdminStore();
const uuid = uuidv4();

describe('Admin model', () => {
    const oldEnv = process.env.ENV;
    beforeAll(() => {
        process.env.ENV = 'test';
    });
    afterAll(()=> {
        process.env.ENV = oldEnv;
    });

    it('should have a create method', () => {
        expect(store.create).toBeDefined();
    });

    it('should have an authenticate method', () => {
        expect(store.authenticate).toBeDefined();
    });

    it('create method should add a new admin', async () => {
        const result = await store.create({
            id: uuid,
            username: 'myadmin',
            password: 'mypassword'
        })
        expect(result).toEqual({
            id: uuid,
            username: 'myadmin'
        })
    });

    it('authenticate method should validate correct admin credentials', async () => {
        const result = await store.authenticate('myadmin', 'mypassword')
        expect(result).toEqual({
            id: uuid,
            username: 'myadmin'
        })
    });

    it('authenticate method should invalidate incorrect admin credentials', async () => {
        const result = await store.authenticate('user', 'password')
        expect(result).toEqual(null)
    });
})