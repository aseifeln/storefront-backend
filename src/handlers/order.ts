import express, {Request, Response} from 'express';
import { Order, OrderStore } from '../models/order';
import verifyAuthToken from '../middlewares/verifyAuthToken';
import {v4 as uuidv4} from 'uuid';

const store = new OrderStore();

const create = async (req: Request, res: Response) => {
    try {
        const uuid = uuidv4();
        const order: Order = {
            id: uuid,
            user_id: req.body.userId,
            status: req.body.status
        }
        const result = await store.create(order);
        res.status(201).json(result);
    } catch(err) {
        res.status(400).json(err);
    }
}

const addProduct = async (req: Request, res: Response) => {
    try {
        const uuid = uuidv4();
        const order_id = req.params.id;
        const product_id = req.body.productId;
        const quantity = Number(req.body.quantity);
        const result = await store.addProduct(uuid, quantity, order_id, product_id);
        res.status(201).json(result);
    } catch(err) {
        res.status(400).json(err);
    }
}

const currentOrder = async (req: Request, res: Response) => {
    try {
        const user_id = req.params.id;
        const result = await store.currentOrder(user_id);
        res.status(200).json(result);
    } catch(err) {
        res.status(400).json(err);
    }  
}

const completedOrders = async (req: Request, res: Response) => {
    try {
        const user_id = req.params.id;
        const result = await store.completedOrders(user_id);
        res.status(200).json(result);
    } catch(err) {
        res.status(400).json(err);
    }     
}

const orderRoutes = (app: express.Application) => {
    app.post('/orders', verifyAuthToken, create)
    app.post('/orders/:id/products', verifyAuthToken, addProduct)
    app.get('/orders/users/:id/current', verifyAuthToken, currentOrder)
    app.get('/orders/users/:id/completed', verifyAuthToken, completedOrders)
}

export default orderRoutes;