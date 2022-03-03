import {Request, Response} from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const tokenSecret = process.env.TOKEN_SECRET as unknown as jwt.Secret | jwt.GetPublicKeyOrSecret;

const verifyAuthToken = (req: Request, res: Response, next: Function) => {
    try {
        const authorizationHeader = req.headers.authorization as unknown as string
        const token = authorizationHeader.split(' ')[1]
        const decoded = jwt.verify(token, tokenSecret)

        next()
    } catch (error) {
        res.status(401)
    }
}

export default verifyAuthToken;