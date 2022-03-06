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
            const sql = 'SELECT id, name, description, category, price, stock, image_url FROM products JOIN product_images ON products.id = product_images.product_id WHERE default_image' 
            const products = await conn.query(sql)
            conn.release();

            return products.rows;
        }catch(err) {
            throw new Error(`Unable to retrieve products. Error: ${err}`);
        }
    }

    async show(id: string): Promise<Product> {
        try {
            const conn = await Client.connect();
            let sql = 'SELECT * FROM products WHERE id = ($1)';
            const result = await conn.query(sql, [id]);
            const product = result.rows[0];

            sql = 'SELECT image_url FROM product_images WHERE product_id = ($1)';
            const imageResult = await conn.query(sql, [id]);
            const productImages = imageResult.rows;
            conn.release();

            return {
                id: id,
                name: product.name,
                description: product.description, 
                category: product.category, 
                price: product.price, 
                stock: product.stock, 
                image_url: productImages
            }
        }catch(err) {
            throw new Error(`Unable to retrieve product ${id}. Error: ${err}`);
        }
    }

    async create(p: Product): Promise<{id: string, name: string}> {
        try {
            const conn = await Client.connect();
            let sql = 'INSERT INTO products (id, name, description, category, price, stock) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *';
            const result = await conn.query(sql, [p.id, p.name, p.description, p.category, p.price, p.stock])
            if(result.rows.length > 0){
                const image = await cloudinary.uploader.upload(String(p.image_url));
                sql = 'INSERT INTO product_images (product_id, cloudinary_id, image_url, default_image) VALUES ($1, $2, $3, $4)';
                await conn.query(sql, [p.id, image.public_id, image.secure_url, 'TRUE']);
            }
            conn.release();
            return {id: result.rows[0].id, name: result.rows[0].name}
        }catch(err) {
            throw new Error(`Unable to create new product ${p.name}. Error: ${err}`);
        }
    }

    async update(id: string, name: string, description: string,
         category: string, price: number, stock: number): Promise<string> {
             try {
                 const conn = await Client.connect();
                 const sql = 'UPDATE products SET name = ($1), description = ($2), category = ($3), price = ($4), stock = ($5) WHERE id = ($6)';
                 await conn.query(sql, [name, description, category, price, stock, id]);
                 conn.release();

                 return "Product updated successfully";
             } catch(err) {
                throw new Error(`Unable to update product ${name}. Error: ${err}`);
             }
         }

    async delete(id: string): Promise<string> {
        try {
            const sql = 'DELETE FROM products WHERE id=($1) RETURNING *'
            // @ts-ignore
            const conn = await Client.connect()
  
            const result = await conn.query(sql, [id])
  
            const product = result.rows[0]
  
            conn.release()
  
            return product.id
        } catch (err) {
            throw new Error(`Unable to delete product ${id}. Error: ${err}`)
        }
    }

    async addImage(product_id: string, image_path: string): Promise<string> {
        try {
            const conn = await Client.connect();
            const sql = 'INSERT INTO product_images (product_id, cloudinary_id, image_url, default_image) VALUES ($1, $2, $3, $4)';
            const image = await cloudinary.uploader.upload(image_path);
            await conn.query(sql, [product_id, image.public_id, image.secure_url, 'FALSE']);
            conn.release();

            return "Product image added successfully!";
        } catch(err) {
            throw new Error(`Unable to add image for product ${product_id}. Error: ${err}`);
        }
    }

    async productsInCategory(category: string): Promise<Product[]> {
        try {
            const conn = await Client.connect();
            const sql = 'SELECT id, name, description, category, price, stock, image_url FROM products JOIN product_images ON products.id = product_images.product_id WHERE category = ($1) AND default_image' 
            const products = await conn.query(sql, [category])
            conn.release();

            return products.rows;
        }catch(err) {
            throw new Error(`Unable to retrieve products in category ${category}. Error: ${err}`);
        }
    }

    async topProducts(): Promise<{productId: string, productName: string, orderedCount: number}[]> {
        try {
            const conn = await Client.connect();
            const sql = 'SELECT id AS productId, name AS productName, COUNT(id) AS orderedCount FROM products JOIN order_products ON products.id = order_products.product_id GROUP BY id, name ORDER BY orderedCount DESC LIMIT 5';
            const products = await conn.query(sql);
            conn.release();

            return products.rows;
        } catch(err) {
            throw new Error(`Unable to retrieve top 5 products. Error: ${err}`);
        }
    }
}