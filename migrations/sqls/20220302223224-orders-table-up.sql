CREATE TABLE orders (
    id uuid DEFAULT uuid_generate_v4(),
    userId uuid,
    status VARCHAR(50) NOT NULL,
    orderDate DATE NOT NULL DEFAULT CURRENT_DATE,
    PRIMARY KEY (id),
    CONSTRAINT fk_user FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
);