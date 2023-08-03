# GraphQL Server with MySQL Integration
The application is a simple GraphQL server that exposes a GraphQL API to perform CRUD operations on a MySQL database. It uses Apollo Server to handle incoming GraphQL requests and execute the requested operations. The GraphQL schema and resolvers are used to define the API and fetch data from the MySQL database.

## Information:
The integration code is fairly simple and consists of few core components.
- MySQL pool
- Resolvers
- Schema
- Apollo Server

### MySQL Pool:
The MySQL pool is a collection of reusable connections to the MySQL database. It helps manage and reuse connections efficiently, reducing the overhead of creating new connections for each database operation.

### Schema:
The schema in GraphQL defines the types of data that can be queried and the operations that clients can perform. It acts as a contract between the client and server, specifying what data can be requested and what data will be returned.

### Resolvers:
Resolvers are functions responsible for fetching data for each field in the GraphQL schema. They define how to retrieve or process the requested data from various data sources (e.g., databases, APIs) and return the results. It can help to convert data from a database into a format that the client expects. It acts as a bridge between the GraphQL server and the data sources.

### Apollo Server:
Apollo Server is a GraphQL server implementation that takes a GraphQL schema and resolvers as input. It handles incoming GraphQL queries and mutations, uses the resolvers to execute the requested operations, and returns the data to the client. Apollo Server provides various features like subscriptions, caching, and error handling to build robust GraphQL APIs.

## Dependencies:
  - MySQL Server
  - Node

## Installation:
  1. Run `cd graphql-server` in console/terminal to redirect to project folder.
  2. Run `npm i` in console/terminal to install all the dependencies
  3. Create a new Schema(Database) in MySQL with the name of 'gql-mysql'.
  4. Import the data via the  `sql/gql-mysql.sql` file.
  5. Configure MySQL credential and database in `index.js` file.

## Start:
  1. Start local MySQL service.
  2. Run `npm start` to run Apollo Server.

## Usage:
  1. Access `localhost:4000` in browser (preferable Google Chrome) to access Apollo Server interface. 
  2. Copy and paste the scripts below to 'Operations' in Apollo Server interface.
  3. Edit the values in the 'Variables' section (optional). 
  4. Click on the 'Run' button to execute the script.

## Apollo Server Scripts:
Disclaimer: Run one script at a time to prevent errors.
```
# Show all data
query ($name: String){
  users (name: $name) {
    name
    email
  }
}

# Show specific data
query ($id: ID!){
  user (id: $id){
    name
    email
  }
}

# Add Data
mutation ($name: String!, $email: String!){
  addUser (
    name: $name,
    email: $email
  ){
  name
  email
}}

# Update Data
mutation ($id: ID!, $name: String!, $email: String!){
  updateUser (
    id: $id
    name: $name
    email: $email
  ){
  name
  email
}}

# Delete Data
mutation ($id: ID!){
  deleteUser(id: $id) {
    name
    email
}}
```

## References:
- [GraphQL](https://graphql.org/)
- [Apollo Server](https://www.apollographql.com/docs/apollo-server/)

By [kelv26](https://github.com/kelv26)