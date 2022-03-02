CREATE TABLE product_images (
    id uuid DEFAULT uuid_generate_v4(),
    productId uuid,
    cloudinaryId VARCHAR(50) NOT NULL,
    imageUrl VARCHAR NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT fk_product FOREIGN KEY(productId) REFERENCES products(id) ON DELETE CASCADE
);