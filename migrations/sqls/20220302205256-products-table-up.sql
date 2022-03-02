CREATE TABLE products (
    id uuid DEFAULT uuid_generate_v4(),
    name VARCHAR(200),
    description TEXT,
    category VARCHAR(200),
    price DECIMAL,
    stock INTEGER,
    PRIMARY KEY (id)
);