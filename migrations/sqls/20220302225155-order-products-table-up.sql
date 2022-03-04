CREATE TABLE order_products (
    id uuid DEFAULT uuid_generate_v4(),
    order_id uuid,
    product_id uuid,
    quantity INTEGER NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT fk_order FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    CONSTRAINT fk_product FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE SET NULL
);