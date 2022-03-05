CREATE TABLE admin (
    id uuid DEFAULT uuid_generate_v4(),
    username VARCHAR NOT NULL UNIQUE,
    password VARCHAR NOT NULL,
    PRIMARY KEY (id)
);