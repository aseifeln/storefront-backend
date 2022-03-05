CREATE TABLE product_images (
    id uuid DEFAULT uuid_generate_v4(),
    product_id uuid,
    cloudinary_id VARCHAR(50) NOT NULL,
    image_url VARCHAR NOT NULL,
    default_image BOOLEAN NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT fk_product FOREIGN KEY(product_id) REFERENCES products(id) ON DELETE CASCADE
);