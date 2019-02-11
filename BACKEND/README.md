# Backend
## Technologies

* NodeJS
* GraphQL
* PostgreSQL
* TypeScript

## Setup
* Install PostgreSQL
* Create DB called "myfavappliances"
* Install NodeJS
* Install dependencies (npm install)
* Run scripts to create tables (npm run db:migrate)
* Start server (npm run start:dev)
* Go to http://localhost:4300/graphql

## Database
To quickly create a database I have chosen "Knex.js" and for access to database "Objection.js" (ORM).
### Tables
* Client
* Cart
* Wishlist
* Product

## Features
### User
* Sign in in app
* Login in app (JWT Authentication)
* Edit profile
* Change password
* Get logged user
### Wishlist
* Create wishlist
* Edit wishlist
* Delete wishlist
* Add product to wishlist
* Delete product from wishlist
* Get wishlist by user
* Get wishlist by id
### Cart
* Create cart
* Delete cart
* Get cart by id
### Products
* Get product by id
* Get products
### Application
* JWT Authentication
* Caching data (products)
* Pagination data (products)
