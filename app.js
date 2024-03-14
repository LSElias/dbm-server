require('dotenv').config();
const dbConfig = require("./db.config");
const cors = require("cors");
const morgan = require("morgan");
const Express = require("express");
const app = Express();
const { Sequelize } = require("sequelize");
const { port } = require("./configuration");
const router = Express.Router();
const UserModel = require("./Models/userModel");
const RolesModel = require("./Models/rolesModels");
const ImageModel = require("./Models/imageModel");


const PORT = process.env.PORT || port;

app.use(morgan("tiny"));
app.use(cors());

app.use(Express.json());

const UserRoutes = require("./routes/userRoute");
const RolesRoutes = require("./routes/rolesRoute");
const ImageRoutes = require("./routes/imageRoute");


const sequelize = new Sequelize(
  dbConfig.DB,
  dbConfig.USER,
  dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operationsAliases: false,
    pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
    },
    define: {
      freezeTableName: true
    }
  }
  );


  UserModel.initialize(sequelize);
  RolesModel.initialize(sequelize);
  ImageModel.initialize(sequelize);

sequelize
  .sync()
  .then(() => {
    console.log("Sequelize Initialised!!");

    app.use("/roles", RolesRoutes);
    app.use("/user", UserRoutes);
    app.use("/image", ImageRoutes);

   
    app.listen(PORT, () => {
      console.log("Server Listening on PORT:", port);
    });

  })
  .catch((err) => {
    console.error("Sequelize Initialisation threw an error:", err);
  });

