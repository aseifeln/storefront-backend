import supertest from 'supertest';
import app from '../../server';
import { UserStore } from '../../models/user';

const request = supertest(app);
const userStore = new UserStore();

describe('Testing user endpoint responses', () => {
    // beforeAll(async () => {
    //     await userStore.deleteAll();
    // });

    let userId = '';
    let accessToken = '';
    it('returns status code 201 for creating a new user', async () => {
        const response = await request.post('/users')
        .send({firstName: "Dean", lastName: "Smith", username: "dsmith", password: "mypassword"})
        userId = response.body.id
        accessToken = response.body.accessToken

        expect(response.status).toBe(201)
    });

    it('returns status code 200 for authenticating an existing user', async () => {
        const response = await request.post('/users/login')
        .send({username: "dsmith", password: "mypassword"})
        expect(response.status).toBe(200)
        
    });

    it('returns status code 200 for returning a user', async () => {
        const response = await request.get(`/users/${userId}`).set('Authorization', `BEARER ${accessToken}`)
        expect(response.body.id).toEqual(userId)
        expect(response.status).toBe(200);
    });

    it('returns status code 200 for returning all user', async () => {
        const response = await request.get('/users').set('Authorization', `BEARER ${accessToken}`)
        expect(response.status).toBe(200);
    });

    it('returns status code 200 for updating a user', async () => {
        const response = await request.put(`/users/${userId}`).set('Authorization', `BEARER ${accessToken}`)
        .send({firstName: "Dean", lastName: "Smith", email: "dsmith@gmail.com", username: "dsmith", password: "mypassword"})
        expect(response.body.email).toEqual("dsmith@gmail.com");
        expect(response.status).toBe(200);
    });

    it('returns status code 200 for deleting a user', async () => {
        const response = await request.delete(`/users/${userId}`).set('Authorization', `BEARER ${accessToken}`)
        expect(response.body.username).toEqual("dsmith");
        expect(response.status).toBe(200);
    });
})