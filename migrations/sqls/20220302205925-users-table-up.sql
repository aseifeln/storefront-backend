CREATE TABLE users (
    id uuid DEFAULT uuid_generate_v4(),
    firstName VARCHAR(100) NOT NULL,
    lastName VARCHAR(100) NOT NULL,
    email VARCHAR,
    billingAddress TEXT,
    username VARCHAR NOT NULL,
    password VARCHAR NOT NULL,
    PRIMARY KEY (id)
);