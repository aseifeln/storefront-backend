import supertest from 'supertest';
import app from '../../server';

const request = supertest(app);

describe('Testing product endpoint responses', () => {
    let accessToken = '';
    let productId = '';
    it('get an access token after authenticating an admin', async () => {
        await request.post('/admin').send({username: "myadmin", password: "mypassword"});
        const response = await request.post('/admin/login').send({username: "myadmin", password: "mypassword"});
        accessToken = response.body.accessToken;
        expect(response.status).toBe(200);
    });

    it('returns status code 201 after creating a new product', async () => {
        const response = await request.post('/products')
        .send({name: "Friskies Product", description: "Friskies dry food", category: "Dry Food",
         price: 15, stock: 30, image: "assets/friskies-chicken.jpeg"})
         .set('Authorization', `BEARER ${accessToken}`)

         productId = response.body.id;
         expect(response.status).toBe(201);
    });

    it('returns status code 200 after retrieving all products', async () => {
        const response = await request.get('/products');
        expect(response.status).toBe(200)
    });

    it('return status code 200 after retrieving a product', async () => {
        const response = await request.get(`/products/${productId}`);
        expect(response.body.id).toEqual(productId);
        expect(response.status).toBe(200);
    });

    it('returns status code 200 for retrieving a product in a category', async () => {
        const response = await request.get('/products/category/Dry%20Food');
        expect(response.status).toBe(200);
    });

    it('returns status code 201 for adding an image to a product', async () => {
        const response = await request.post(`/products/${productId}/image`)
        .send({image: "assets/friskies-turkey.jpeg"})
        .set('Authorization', `BEARER ${accessToken}`)

        expect(response.body).toEqual("Product image added successfully!");
        expect(response.status).toBe(201);
    });

    it('returns status code 200 for updating a product', async () => {
        const response = await request.put(`/products/${productId}`)
        .send({name: "Friskies Product", description: "Friskies dry food", category: "Dry Food",
        price: 18, stock: 20})
        .set('Authorization', `BEARER ${accessToken}`)

        expect(response.body).toEqual("Product updated successfully")
        expect(response.status).toBe(200)
    });

    it('returns status code 200 for deleting a product', async () => {
        const response = await request.delete(`/products/${productId}`)
        .set('Authorization', `BEARER ${accessToken}`)

        expect(response.body).toEqual("Product deleted successfully!");
        expect(response.status).toBe(200);
    });
})