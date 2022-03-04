import express, {Request, Response} from 'express';
import {Admin, AdminStore} from '../models/admin';
import createToken from '../utilities/createToken';
import {v4 as uuidv4} from 'uuid';

const store = new AdminStore();

const create = async (req: Request, res: Response) => {
    try{
        const uuid = uuidv4();
        const admin: Admin = {
            id: uuid,
            username: req.body.username,
            password: req.body.password,
        }
        const new_admin = await store.create(admin);
        res.status(201).json(new_admin);
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
        res.status(400).json("Admin does not exist!");
    }
}

const adminRoutes = (app: express.Application) => {
    app.post('/admin', create);
    app.post('/admin/login', authenticate)
}

export default adminRoutes;