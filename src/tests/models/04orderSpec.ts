import { Order, OrderStore } from "../../models/order";
import { User, UserStore } from "../../models/user";
import { Product, ProductStore } from "../../models/product";
import { v4 as uuidv4 } from 'uuid';
import dotenv from 'dotenv';

dotenv.config();

const orderStore = new OrderStore();
const userStore = new UserStore();
const productStore = new ProductStore();
const uuid = uuidv4();
const userId = uuidv4();
const orderId = uuidv4();
const productId = uuidv4();

describe('Order model', () => {
    const oldEnv = process.env.ENV;
    beforeAll(() => {
        process.env.ENV = 'test';
        console.log(process.env.ENV)
    });
    afterAll(()=> {
        process.env.ENV = oldEnv;
        console.log(process.env.ENV)
    });

    it('create method should add an order', async () => {
        const user: User = {
            id: userId,
            first_name: 'John',
            last_name: 'Doe',
            username: 'jdoe',
            password: 'mypassword'
        }
        await userStore.create(user);

        const order: Order = {
            id: orderId,
            user_id: userId,
            status: 'active'
        }
        const result = await orderStore.create(order);
        expect(result.id).toEqual(orderId)
    });

    it('addProduct method should add a product to an order', async () => {
        const product: Product = {
            id: productId,
            name: 'Friskies Chicken',
            description: 'Friskies Chicken 156 GM can for adult cats',
            category: 'Wet Food',
            price: 32,
            stock: 50,
            image_url: '/Users/ahmedseifelnasr/Downloads/friskies-chicken.jpeg'
        }
        await productStore.create(product);

        const result = await orderStore.addProduct(uuid, 5, orderId, productId);
        expect(result).toEqual({
            id: uuid,
            order_id: orderId,
            product_id: productId,
            quantity: 5
        })
    });

    it('currentOrder method should return the user current order', async () => {
        const result = await orderStore.currentOrder(userId);
        expect(result.id).toEqual(orderId);
    });

    it('completedOrders method should return the user completed orders', async () => {
        const result = await orderStore.completedOrders(userId);
        expect(result).toEqual([]);
    });
})