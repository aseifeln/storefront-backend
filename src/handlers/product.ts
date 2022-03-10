import express, {Request, Response} from 'express';
import { Product, ProductStore } from '../models/product';
import verifyAuthToken from '../middlewares/verifyAuthToken';
import {v4 as uuidv4} from 'uuid';

const store = new ProductStore();

const index = async (_req: Request, res: Response) => {
    try{
        const products = await store.index();
        res.status(200).json(products);
    }catch(err){
        res.status(400).json(err);
    }
}

const show = async (req: Request, res: Response) => {
    try{
        const id: string = req.params.id;
        const product = await store.show(id);
        res.status(200).json(product);
    }catch(err){
        res.status(400).json(err);
    } 
}

const create = async (req: Request, res: Response) => {
    try{
        const uuid = uuidv4();
        const product: Product = {
            id: uuid,
            name: req.body.name,
            description: req.body.description,
            category: req.body.category,
            price: Number(req.body.price),
            stock: Number(req.body.stock),
            image_url: req.body.image,
        }
        const new_product = await store.create(product);
        res.status(201).json(new_product);
    }catch(err){
        res.status(400).json(err);
    }
}

const update = async (req: Request, res: Response) => {
    try{
        let {id, name, description, category, price, stock} = req.body;
        price = Number(price);
        stock = Number(stock);
        const updated_product = await store.update(id, name, description, category, price, stock);
        res.status(200).json(updated_product);
    }catch(err){
        res.status(400).json(err);
    }
}

const destroy = async (req: Request, res: Response) => {
    try{
        const id = req.params.id;
        const deleted_user = await store.delete(id);
        res.status(200).json(deleted_user);
    }catch(err){
        res.status(400).json(err);
    }
}

const addImage = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const image_url = req.body.image;
        const result = await store.addImage(id, image_url);
        res.status(201).json(result);
    } catch(err) {
        res.status(400).json(err);
    }
}

const productsInCategory = async (req: Request, res: Response) => {
    try {
        const category = req.params.category;
        const products = await store.productsInCategory(category);
        res.status(200).json(products);
    } catch(err) {
        res.status(400).json(err);
    }
}

// Retrieve top 5 products ordered
const topProducts = async (req: Request, res: Response) => {
    try {
        const products = await store.topProducts();
        res.status(200).json(products);
    } catch(err) {
        res.status(400).json(err);
    }
}

const productRoutes = (app: express.Application) => {
    app.get('/products', index)
    app.get('/products/:id', show)
    app.get('/products/category/:category', productsInCategory)
    app.get('/products/top', topProducts)
    app.post('/products', verifyAuthToken, create)
    app.post('/products/:id/image', verifyAuthToken, addImage)
    app.put('/products/:id', verifyAuthToken, update)
    app.delete('/products/:id', verifyAuthToken, destroy)
}

export default productRoutes;