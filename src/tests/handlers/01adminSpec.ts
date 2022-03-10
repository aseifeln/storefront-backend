import supertest from 'supertest';
import app from '../../server';

const request = supertest(app);

describe('Testing admin endpoint responses', () => {
    it('returns status code 201 for creating a new admin', async () => {
        const response = await request.post('/admin').send({username: "admin", password: "myadmin"})
        expect(response.status).toBe(201)
        expect(response.body.username).toEqual("admin")
    });

    it('returns status code 200 for authenticating an existing admin', async () => {
        const response = await request.post('/admin/login').send({username: "admin", password: "myadmin"})
        expect(response.status).toBe(200)
    });
})