import Client from "../database";

export type Order = {
    id: string,
    user_id: string,
    status: string,
    order_date?: string
}

export class OrderStore {
    async create(o: Order): Promise<Order> {
        try {
            const conn = await Client.connect();
            const sql = 'INSERT INTO orders (id, user_id, status) VALUES ($1, $2, $3) RETURNING *';
            const order = await conn.query(sql, [o.id, o.user_id, o.status]);
            conn.release();

            return order.rows[0];
        } catch(err) {
            throw new Error(`Unable to create new order. ${err}`);
        }
    }

    async addProduct(id: string, quantity: number, orderId: string, productId: string): 
    Promise<{id: string, order_id: string, product_id: string, quantity: number}> {
        // get order to see if it is open
    try {
        const ordersql = 'SELECT * FROM orders WHERE id = ($1)';
        //@ts-ignore
        const conn = await Client.connect();
  
        const result = await conn.query(ordersql, [orderId]);
  
        const order = result.rows[0];
  
        if (order.status !== "active") {
          throw new Error(`Could not add product ${productId} to order ${orderId} because order status is ${order.status}`)
        }
  
        conn.release()
      } catch (err) {
          throw new Error(`${err}`)
      }
  
      try {
        const sql = 'INSERT INTO order_products (id, order_id, product_id, quantity) VALUES($1, $2, $3, $4) RETURNING *'
        //@ts-ignore
        const conn = await Client.connect()
  
        const result = await conn
            .query(sql, [id, orderId, productId, quantity])
  
        const order = result.rows[0]
  
        conn.release()
  
        return order
      } catch (err) {
        throw new Error(`Could not add product ${productId} to order ${orderId}: ${err}`)
      }
    }
    
    async currentOrder(user_id: string): Promise<Order> {
        try {
            const conn = await Client.connect();
            const sql = 'SELECT * FROM orders WHERE user_id = ($1) AND status = ($2)';
            const order = await conn.query(sql, [user_id, 'active']);
            conn.release();

            return order.rows[0];
        } catch(err) {
            throw new Error(`Unable to retrieve current order for user ${user_id}. ${err}`);
        }
    }

    async completedOrders(user_id: string): Promise<Order[]> {
        try {
            const conn = await Client.connect();
            const sql = 'SELECT * FROM orders WHERE user_id = ($1) AND status = ($2)';
            const order = await conn.query(sql, [user_id, 'completed']);
            conn.release();

            return order.rows;
        } catch(err) {
            throw new Error(`Unable to retrieve completed orders for user ${user_id}. ${err}`);
        }
    }
}