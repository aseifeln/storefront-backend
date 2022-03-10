import express, {Request, Response} from 'express';
import {User, UserStore} from '../models/user';
import createToken from '../utilities/createToken';
import verifyAuthToken from '../middlewares/verifyAuthToken';
import {v4 as uuidv4} from 'uuid';

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
        const uuid = uuidv4();
        const user: User = {
            id: uuid,
            first_name: req.body.firstName,
            last_name: req.body.lastName,
            email: req.body.email,
            billing_address: req.body.billingAddress,
            username: req.body.username,
            password: req.body.password,
        }
        const new_user = await store.create(user);
        const accessToken = createToken({user: new_user})
        res.status(201).json({id: new_user.id, username: new_user.username, accessToken: accessToken});
    }catch(err){
        res.status(400).json(err);
    }
}

const update = async (req: Request, res: Response) => {
    try{
        const user: User = {
            id: req.params.id,
            first_name: req.body.firstName,
            last_name: req.body.lastName,
            email: req.body.email,
            billing_address: req.body.billingAddress,
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
            const accessToken = createToken({user: result})
            res.status(200).json({accessToken});
        }else{
            res.status(400).json("User does not exist!");
        }
}

const userRoutes = (app: express.Application) => {
    app.get('/users', verifyAuthToken, index)
    app.get('/users/:id', verifyAuthToken, show)
    app.post('/users', create)
    app.put('/users/:id', verifyAuthToken, update)
    app.delete('/users/:id', verifyAuthToken, destroy)
    app.post('/users/login', authenticate)
}

export default userRoutes;