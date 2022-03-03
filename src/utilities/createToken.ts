import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const secret = process.env.TOKEN_SECRET as unknown as string;

const createToken = (info: object): string => {
    return jwt.sign(info, secret)
}

export default createToken;