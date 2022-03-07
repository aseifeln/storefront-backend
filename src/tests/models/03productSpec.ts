import {Product, ProductStore} from '../../models/product';
import {v4 as uuidv4} from 'uuid';
import dotenv from 'dotenv';

dotenv.config();

const store = new ProductStore();
const uuid = uuidv4();

describe('Product model', () => {
    const oldEnv = process.env.ENV;
    beforeAll(() => {
        process.env.ENV = 'test';
        console.log(process.env.ENV)
    });
    afterAll(()=> {
        process.env.ENV = oldEnv;
        console.log(process.env.ENV)
    });

    it('topProducts method should be defined', async () => {
        expect(store.topProducts).toBeDefined;
    });
    it('create method should add a new product', async () => {
        const product: Product = {
            id: uuid,
            name: 'Friskies Chicken',
            description: 'Friskies Chicken 156 GM can for adult cats',
            category: 'Wet Food',
            price: 32,
            stock: 50,
            image_url: '/Users/ahmedseifelnasr/Downloads/friskies-chicken.jpeg'
        }
        const createdProduct = await store.create(product);
        expect(createdProduct).toEqual({
            id: uuid,
            name: 'Friskies Chicken'
        })
    });
    it('show method should return a product', async () => {
        const product = await store.show(uuid);
        expect(product.name).toEqual('Friskies Chicken');
    });
    it('index method should return a list of products', async () => {
        const products = await store.index();
        expect(products.length).toEqual(1);
    });
    it('productInCategory method should return a list of products in that category', async () => {
        const products = await store.productsInCategory('Wet Food');
        expect(products.length).toEqual(1);
    });
    it('addImage method should add an image to an existing product', async () => {
        const result = await store.addImage(uuid, '/Users/ahmedseifelnasr/Downloads/friskies-turkey.jpeg');
        expect(result).toEqual("Product image added successfully!");
    });
    it('update method should edit an existing product', async () => {
        const id = uuid;
        const name = 'Friskies Chicken';
        const description = 'Friskies Chicken 156 GM can for adult cats';
        const category = 'Wet Food';
        const price = 40;
        const stock = 30;
        const result = await store.update(id, name, description, category, price, stock);
        expect(result).toEqual("Product updated successfully");
    });
    it('delete method should remove the product', async () => {
        await store.delete(uuid);
        const result = await store.index();
        expect(result).toEqual([]);
    });
})