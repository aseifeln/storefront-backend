CREATE TABLE admin (
    id uuid DEFAULT uuid_generate_v4(),
    username VARCHAR NOT NULL,
    password VARCHAR NOT NULL,
    PRIMARY KEY (id)
);