import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import mysql from "mysql2";

// MySQL db config
const dbConfig = {
  host: "localhost",
  user: "root",
  password: "admin123",
  database: "gql-mysql",
  port: 3306,
};

// Create a MySQL connection pool
const pool = mysql.createPool(dbConfig);

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = `#graphql
        # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

        # This "User" type defines the queryable fields for every user in our data source.
        type User {
            id: ID!
            name: String
            email: String
        }

        # The "Query" type is special: it lists all of the available queries that
        # clients can execute, along with the return type for each. In this
        # case, the "users" query returns an array of zero or more Users (defined above).
        type Query {
            users(name: String): [User]
            user(id: ID!): User
        }

        # Mutation is used to conduct CUD (Create, Update, Delete) operations
        # on the data
        type Mutation {
            addUser(name: String!, email: String!): User
            updateUser(id: ID!, name: String, email: String): User
            deleteUser(id: ID!): User
        }
    `;

// Resolvers define how to fetch the types defined in your schema.
// Define what to do with the functions defined in schema
// Acts like a bridge between the schema and the database
const resolvers = {
  Query: {
    // add optional name filter for users query
    users: (parent, args, context) => {
        return new Promise((resolve, reject) => {
            if(args.name) {
                pool.query('SELECT * FROM user WHERE name = ?', [args.name], (error, results) => {
                    if(error) {
                        reject(error);
                    }
                    resolve(results);
                });
            } else {
                pool.query('SELECT * FROM user', (error, results) => {
                    if(error) {
                        reject(error);
                    }
                    resolve(results);
                });
            }
        });
    },
    user: (parent, args, context) => {
        return new Promise((resolve, reject) => {
            pool.query('SELECT * FROM user WHERE id = ?', [args.id], (error, results) => {
                if(error) {
                    reject(error);
                }
                resolve(results[0]);
            });
        });
    }
  },

  Mutation: {
    addUser: (parent, args, context) => {
        return new Promise((resolve, reject) => {
            pool.query('INSERT INTO user (name, email) VALUES (?, ?)', [args.name, args.email], (error, results) => {
                if(error) {
                    reject(error);
                }
                resolve(results);
            }
            )
        })
    },
    updateUser: (parent, args, context) => {
        return new Promise((resolve, reject) => {
            pool.query('UPDATE user SET name = ?, email = ? WHERE id = ?', [args.name, args.email, args.id], (error, results) => {
                if(error) {
                    reject(error);
                }
                resolve(results);
            }
            )
        })
    },
    deleteUser: (parent, args, context) => {
        return new Promise((resolve, reject) => {
            pool.query('DELETE FROM user WHERE id = ?', [args.id], (error, results) => {
                if(error) {
                    reject(error);
                }
                resolve(results);
            }
            )
        })
    }
  }
};

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Passing an ApolloServer instance to the `startStandaloneServer` function:
//  1. creates an Express app
//  2. installs your ApolloServer instance as middleware
//  3. prepares your app to handle incoming requests
const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);
