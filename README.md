# Storefront Backend Project

## Project Description

This project provides API endpoints to support an E-commerce application. Endpoints include viewing all products, viewing a specific product, adding a product to an order, and many more.

## Installation

### Environment Variables
You need to add the following variables in a .env file
```
POSTGRES_HOST=
POSTGRES_USER=
POSTGRES_DB=
POSTGRES_TEST_DB=
POSTGRES_PASSWORD=
ENV=dev
TOKEN_SECRET=
BCRYPT_PASSWORD=
SALT_ROUNDS=
CLOUD_NAME=
API_KEY=
API_SECRET=
```

### Database Setup
Install Postgres Server if not already installed [Download link](https://www.postgresql.org/download/)

Using the SQL Shell or any interface to connect to the server (e.g pgAdmin), create a database user 

Example:

```bash
CREATE USER full_stack_user WITH PASSWORD 'pswd123';
```

Using the SQL Shell or any interface to connect to the server (e.g pgAdmin), create two databases
one for development and one for testing

Example:

```bash
CREATE DATABASE storefront;
CREATE DATABASE storefront_test;
```

Grant all database privileges to the user in both databases

```bash
GRANT ALL PRIVILEGES ON DATABASE storefront TO full_stack_user;
GRANT ALL PRIVILEGES ON DATABASE storefront_test TO full_stack_user;
```

The database is running on the default port (5432)

### Package Installation
After cloning the repository run the following command to install the dependencies

```bash
npm install
```
Run the following command to enable using the db-migrate commands directly

```bash
npm install -g db-migrate
```
Run the following command to apply the migrations to your main database

```bash
db-migrate up
```
Run the following script to start the dev server

```bash
npm run start
```
Run the following script to build the typescript project

```bash
npm run build
```
You can then run the build server by running the following command

```bash
node build/server.js
```
### Testing

Run the following command to build the project and run all the integration tests

```bash
npm run integration-test
```

## Usage

- Start the server (running on port 3000)

- Using Postman or other softwares, you may begin by creating a user or an admin to receive an access token which can be used for all the other endpoints that require a token

- You may then test any of the user, product, or order endpoints by providing the appropriate data in the request body and/or request header

- Please note that when you create a product, the image provided will be uploaded to a cloud service (namely, Cloudinary). The product Create method returns the url of the uploaded image along with the  info of the created product so you can make sure that the image was uploaded successfully


## Copyright and licensing information.

## Known bugs

