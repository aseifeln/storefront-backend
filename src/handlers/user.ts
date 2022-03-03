import express, {Request, Response} from 'express';
import {User, UserStore} from '../models/user';

const store = new UserStore();

const index = async (_req: Request, res: Response) => {
    try{
        const users = await store.index();
        res.status(200).json(users);
    }catch(err){
        res.status(400).json(err);
    }
    
}

const show = async (req: Request, res: Response) => {
    try{
        const id: string = req.params.id;
        const user = await store.show(id);
        res.status(200).json(user);
    }catch(err){
        res.status(400).json(err);
    }
    
}

const create = async (req: Request, res: Response) => {
    try{
        const user: User = {
            id: req.body.id,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            billingAddress: req.body.billingAddress,
            username: req.body.username,
            password: req.body.password,
        }
        const new_user = await store.create(user);
        res.status(201).json(new_user);
    }catch(err){
        res.status(400).json(err);
    }
}

const update = async (req: Request, res: Response) => {
    try{
        const user: User = {
            id: req.params.id,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            billingAddress: req.body.billingAddress,
            username: req.body.username,
            password: req.body.password,
        }
        const updated_user = await store.update(user);
        res.status(200).json(updated_user);
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

const authenticate = async (req: Request, res: Response) => {
        const username = req.body.username;
        const password = req.body.password;
        const result = await store.authenticate(username, password);
        if(result) {
            res.status(200).json(result);
        }else{
            res.status(400).json("User does not exist!");
        }
}

const userRoutes = (app: express.Application) => {
    app.get('/users', index)
    app.get('/users/:id', show)
    app.post('/users', create)
    app.put('/users/:id', update)
    app.delete('/users/:id', destroy)
    app.get('/users/login', authenticate)
}

export default userRoutes;