import supertest from 'supertest';
import app from '../../server';

const request = supertest(app);

describe('Testing order endpoint responses', () => {
    let productId = '';
    let userId = '';
    let orderId = '';
    let accessToken = '';

    it('returns status code 201 for creating a new order', async () => {
        const userResponse = await request.post('/users')
        .send({firstName: "Marry", lastName: "Jean", username: "mjean", password: "mypassword"})
        userId = userResponse.body.id
        accessToken = userResponse.body.accessToken

        const response = await request.post('/orders')
        .send({userId: userId, status: "active"})
        .set('Authorization', `BEARER ${accessToken}`)

        orderId = response.body.id
        expect(response.status).toBe(201)
    });

    it('returns status code 201 for adding a product to order', async () => {
        const productResponse = await request.post('/products')
        .send({name: "Friskies Product 2", description: "Friskies dry food", category: "Dry Food",
         price: 25, stock: 40, image: "assets/friskies-chicken.jpeg"})
         .set('Authorization', `BEARER ${accessToken}`)
         productId = productResponse.body.id;

         const response = await request.post(`/orders/${orderId}/products`)
         .send({orderId: orderId, productId: productId, quantity: 3})
         .set('Authorization', `BEARER ${accessToken}`)

         expect(response.body.orderId).toEqual(orderId);
         expect(response.status).toBe(201);
    });

    it('returns status code 200 for retrieving current order', async () => {
        const response = await request.get(`/orders/users/${userId}/current`)
        .set('Authorization', `BEARER ${accessToken}`)

        expect(response.body.orderId).toEqual(orderId);
        expect(response.status).toBe(200);
    });

    it('returns status code 200 for retrieving completed orders', async () => {
        const response = await request.get(`/orders/users/${userId}/completed`)
        .set('Authorization', `BEARER ${accessToken}`)

        expect(response.status).toBe(200);
    });
})