CREATE TABLE order_products (
    id uuid DEFAULT uuid_generate_v4(),
    orderId uuid,
    productId uuid,
    quantity INTEGER NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT fk_order FOREIGN KEY (orderId) REFERENCES orders(id) ON DELETE CASCADE,
    CONSTRAINT fk_product FOREIGN KEY (productId) REFERENCES products(id) ON DELETE SET NULL
);