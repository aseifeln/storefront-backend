import {User, UserStore} from '../../models/user';
import {v4 as uuidv4} from 'uuid';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();
const pepper = process.env.BCRYPT_PASSWORD;
const saltRounds = process.env.SALT_ROUNDS;
const hashedPassword = bcrypt.hashSync('mypassword'+pepper, Number(saltRounds))

const store = new UserStore();
const uuid = uuidv4();

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
          const user: User = {
              id: uuid,
              firstName: 'John',
              lastName: 'Doe',
              email: 'jdoe@gmail.com',
              billingAddress: 'Sunset Boulevard, LA',
              username: 'jdoe',
              password: 'mypassword'
          }
          const createdUser = await store.create(user);
          expect(createdUser).toEqual({
              id: uuid,
              firstName: 'John',
              lastName: 'Doe',
              username: 'jdoe'
          })
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
          }])
      });

      it('update method should edit a user', async () => {
        const user: User = {
            id: uuid,
            firstName: 'Mary',
            lastName: 'Doe',
            email: 'mdoe@gmail.com',
            billingAddress: 'Miami Beach, FL',
            username: 'mdoe',
            password: 'mypassword'
        }
        const updatedUser = await store.update(user);
        expect(updatedUser).toEqual({
            id: uuid,
            firstName: 'Mary',
            lastName: 'Doe',
            email: 'mdoe@gmail.com',
            billingAddress: 'Miami Beach, FL',
            username: 'mdoe',
            password: hashedPassword
        })
    });

    it('authenticate method should validate correct user credentials', async () => {
        const result = await store.authenticate('mdoe', 'mypassword')
        expect(result).toEqual({
            id: uuid,
            firstName: 'Mary',
            lastName: 'Doe',
            username: 'mdoe'
        })
    });

    it('authenticate method should invalidate incorrect user credentials', async () => {
        const result = await store.authenticate('user', 'password')
        expect(result).toEqual(null)
    });

    it('delete method should remove the user', async () => {
        await store.delete(uuid);
        const result = await store.index();
        expect(result).toEqual([])
    });
})