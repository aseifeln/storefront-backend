CREATE TABLE products (
    id uuid DEFAULT uuid_generate_v4(),
    name VARCHAR(200) NOT NULL,
    description TEXT NOT NULL,
    category VARCHAR(200) NOT NULL,
    price DECIMAL NOT NULL,
    stock INTEGER NOT NULL,
    PRIMARY KEY (id)
);