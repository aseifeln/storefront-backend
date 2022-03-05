import Client from "../database";
import {v2 as cloudinary} from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

// cloudinary configuration
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

export type Product = {
    id: string,
    name: string,
    description: string,
    category: string,
    price: number,
    stock: number,
    image_url: string | string[]
}

export class ProductStore {
    async index(): Promise<Product[]> {
        try {
            const conn = await Client.connect();
            // what should be the query??
            const sql = 'SELECT * FROM products JOIN product_images ON products.id = product_images.product_id' 
            const products = await conn.query(sql)

            return products.rows;

        }catch(err) {
            throw new Error(`Could not retireve products: ${err}`)
        }
    }
    //async show(id: string): Promise<Product> {}
    //async create(p: Product): Promise<string> {}
    //async update(p: Product): Promise<string> {}
    //async delete(id: string): Promise<string> {}
    //async addImage(id: string, image: string): Promise<string> {}
    //async productsInCategory(category: string): Promise<Product[]> {}
    //async topProducts(): Promise<Product[]> {}
}