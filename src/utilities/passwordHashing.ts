import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

const saltRounds = process.env.SALT_ROUNDS;
const pepper = process.env.BCRYPT_PASSWORD;

const hashPassword = (password: string): string => {
    return bcrypt.hashSync(
        password + pepper, 
        Number(saltRounds)
      );
}

const comparePassword = (password: string, storedPassword: string): boolean => {
    return bcrypt.compareSync(password+pepper, storedPassword)
}
export { hashPassword, comparePassword };