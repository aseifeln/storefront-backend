# Storefront Backend Project

## Project Description

This project provides API endpoints to support an E-commerce application. Endpoints include viewing all products, viewing a specific product, adding a product to an order, and many more.

## Environment Variable Setup

I'm using the following environment variables:
```
POSTGRES_HOST=127.0.0.1
POSTGRES_USER=ahmedseifelnasr
POSTGRES_DB=storefront
POSTGRES_TEST_DB=storefront_test
POSTGRES_PASSWORD=null
ENV=dev
TOKEN_SECRET=top-secret
BCRYPT_PASSWORD=secret-santa
SALT_ROUNDS=10
CLOUD_NAME=dpftkdepn
API_KEY=911325844553731
API_SECRET=1g5sz4uqIJo7odnpYlidkC50niY
```
## Installation

### Database Setup
- Install Postgres Server if not already installed
- Create a database user
- Using the SQL Shell or any interface to connect to the server (e.g pgAdmin), create two databases
one for development and one for testing

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

- Start the server

- Using Postman or other softwares, you may begin by creating a user or an admin to receive an access token which can be used for all the other endpoints that require a token

- You may then test any of the user, product, or order endpoints by providing the appropriate data in the request body and/or request header

- Please note that when you create a product, the image provided will be uploaded to a cloud service (namely, Cloudinary). The product Create method returns the url of the uploaded image along with the  info of the created product so you can make sure that the image was uploaded successfully


## Copyright and licensing information.

## Known bugs

