require('dotenv').config()
const { ApolloServer } = require('apollo-server');
const { buildFederatedSchema } = require("@apollo/federation");
const typeDefs = require('./schema');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const { permissions } = require("./permissions");

const port = 4001;

//Database
const sequelize = require('./config/database');
const VehicleModel = require('./newmodels/Vehicle');
const UserModel = require('./newmodels/User');
const RepairModel = require('./newmodels/Repair');
const { applyMiddleware } = require('graphql-middleware');
/*
VehicleModel.hasMany(UserModel, { foreignKey: 'idUser' });
RepairModel.hasMany(VehicleModel, { foreignKey: 'idVehicle' });
*/
sequelize.sync();
sequelize.authenticate()
    .then(() => console.log('db connected'))
    .catch(err => console.log(err)) 

const resolvers = {    
    User: {
      _resolveReference(object) {
        return UserModel.find({ where: {idUser : object.id}})    
      }
    },
    Query: {
        users: () => UserModel.findAll({}),
        vehicles: () => VehicleModel.findAll({}),
        repairs: () => RepairModel.findAll({}),
        vehiclesbyuser: (parent, args , {user}) => VehicleModel.findAll({ where: {idUser: user.sub }}),     
        repairsbyvehicle: (parent, {idVehicle}) => RepairModel.findAll({ where: {idVehicle: idVehicle}}),    
    },
    Mutation: {
      createUser: async (parent, {username, password, email }) => { 
          password = await bcrypt.hash(password, 10)
          let user = await UserModel.findOne({where: {username: username}})
          if(user == null) {
            UserModel.create({           
              username, 
              password,
              email
            }) 
            return 'Account Created'
          }
          else{
            return 'Username already exist'
          }
      },
      login: async (parent, {username, password}) => {
        let user = await UserModel.findOne({where: {username: username}})
        if(user == null) {
          return 'No user with that username'
        }
        let id = user.dataValues.idUser
        let iD = id + ''
        const match = await bcrypt.compare(password , user.dataValues.password )
        if(match)
        {
          return jwt.sign({id, username}, process.env.SECRET , {algorithm: "HS256", subject: iD, expiresIn: '7d'})
        }
        else{
          return 'Bad password'
        }
      },
      editUser: async (parent, {idUser , username, password, email }) => {
          UserModel.update(
            { where: { idUser: idUser }},
            { username: username},
            { password: password},
            { email: email}   
          )
      },
      createVehicle: async (parent, {brand, model, productionDate, examinationDate, insuranceDate },{user}) => {
          const idUser = user.sub
          VehicleModel.create({           
            idUser, 
            brand,
            model,
            productionDate,
            examinationDate,
            insuranceDate
          }) 
      },
      editVehicle: async (parent, { idVehicle , brand, model, productionDate, examinationDate, insuranceDate }) => {
          VehicleModel.update(
            { where: { idVehicle: idVehicle }},
            { brand: brand},
            { model: model},
            { productionDate: productionDate},
            { examinationDate: examinationDate},
            { insuranceDate: insuranceDate}   
          )
          return 'Succes'
      },
      deleteVehicle: async (parent, { idVehicle }) => {
        VehicleModel.destroy(
          { where: { idVehicle: idVehicle }},  
        )
        return 'Succes'
    },
      createRepair: async (parent, {idVehicle, type, usedParts, description }) => {
          RepairModel.create({           
            idVehicle, 
            type,
            usedParts,
            description
          }) 
      },
      editRepair: async (parent, {idRepair , idVehicle, type, usedParts, description}) => {
          UserModel.update(
            { where: { idRepair: idRepair }},
            { idVehicle: idVehicle},
            { type: type},
            { usedParts: usedParts},
            { description: description}
          )
      },
    }
};

const server = new ApolloServer({
  schema: applyMiddleware(
  buildFederatedSchema([{ typeDefs, resolvers }]),
  permissions
  ),
  context: ({ req }) => {
    const user = req.headers.user ? JSON.parse(req.headers.user) : null;
    return { user };
  }
});

server.listen({ port }).then(({ url }) => {
  console.log(`Server service ready at ${url}`);
});


