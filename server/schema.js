const { gql } = require('apollo-server');

const typeDefs = gql`
     type Vehicle {
        idVehicle: ID!
        idUser: Int!
        brand: String!
        model: String!
        productionDate: String!
        examinationDate: String!
        insuranceDate: String!
     }
     type User @key(fields: "idUser"){
        idUser: ID!
        username: String!
        password: String!
        email: String!
     }
     type Repair {
         idRepair: ID!
         idVehicle: Int!
         type: String!
         usedParts: String!
         description: String!
      }
     extend type Query {
        vehicles: [Vehicle!]!,
        users: [User!]!,
        repairs: [Repair!]!,
        vehiclesbyuser: [Vehicle!]!,      
        repairsbyvehicle(idVehicle: ID! ): [Repair!]!, 
     }
     extend type Mutation {
         login(username: String!, password: String!): String,
         createVehicle(brand: String!, model: String!, productionDate: String!, examinationDate: String!, insuranceDate: String!): String,
         editVehicle(idVehicle: ID!, brand: String!, model: String!, productionDate: String!, examinationDate: String!, insuranceDate: String!): String,
         deleteVehicle(idVehicle: ID!): String,
         createUser(username: String!, password: String!, email: String!): String,
         editUser(idUser: ID!,username: String!, password: String!, email: String!): User,
         createRepair(idVehicle: Int!, type: String!, usedParts: String!, description: String!): Repair,
         editRepair(idUser: ID!,idVehicle: Int!, type: String!, usedParts: String!, description: String!): Repair,
     }
`;

module.exports = typeDefs;
