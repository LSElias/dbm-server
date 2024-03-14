const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const UserModel = require("../Models/userModel");
const { jwtSecret, jwtExpirationInSeconds } = require("../configuration");

const generateAccessToken = (username, userId) => {
  return jwt.sign(
    {
      userId,
      username,
    },
    jwtSecret,
    {
      expiresIn: jwtExpirationInSeconds,
    }
  );
};

// Encrypts the password using SHA256 Algorithm, for enhanced security of the password
const encryptPassword = (password) => {
  // We will hash the password using SHA256 Algorithm before storing in the DB
  // Creating SHA-256 hash object
  const hash = crypto.createHash("sha256");
  // Update the hash object with the string to be encrypted
  hash.update(password);
  // Get the encrypted value in hexadecimal format
  return hash.digest("hex");
};

module.exports = {
  getUser: (req, res) => {
    const userId = req.params.id;

    UserModel.findUser({ id: userId })
      .then((user) => {
        user.password = ''
        return res.status(200).json({
          status: true,
          data: user.toJSON(),
        });
      })
      .catch((err) => {
        return res.status(500).json({
          status: false,
          error: err,
        });
      });
  },

  getAll: (req, res) => {
    UserModel.findAllUsers(req.query)
      .then((user) => {
        return res.status(200).json({
          status: true,
          data: user,
        });
      })
      .catch((err) => {
        return res.status(500).json({
          status: false,
          error: err,
        });
      });
  },

  signUp: (req, res) => {
    const payload = req.body;
    let encryptedPassword = encryptPassword(payload.password);
    let role = payload.role;

    if (!role) {
      role = 2;
    }

    UserModel.createUser(
      Object.assign(payload, { password: encryptedPassword, role })
    )
      .then((user) => {
        const accessToken = generateAccessToken(payload.username, user.id);

        return res.status(200).json({
          status: true,
          result: {
            user: user.toJSON(),
            token: accessToken,
          },
        });
      })
      .catch((err) => {
        return res.status(500).json({
          status: false,
          error: err,
        });
      });
  },

  login: (req,res) =>{
    const { username, password} = req.body;

    UserModel.findUser({username})
    .then((user) => {
      if(!user){
        return res.status(400).json({
          status: false,
          error:{
            message: `User not found`
          },
        });
      }

      const encryptedPassword = encryptPassword(password);

      if(user.password !== encryptedPassword){
        return res.status(400).json({
          status: false,
          error:{
            message: `Incorrect password.`
          }
        });
      }

      const accessToken = generateAccessToken(user.username, user.id);

      return res.status(200).json({
        status:true, 
        data: {
          username: user.username,
          id: user.id,
          token: accessToken
        },
      });
    }).catch((err) => {
      return res.status(500).json({
        status:false,
        error:err
      })
    })
  },

  updateUser: (req, res) => {
      const payload = req.body;
      let userId = payload.userId;
      payload.password = encryptPassword(payload.password);
      
    if (!Object.keys(payload).length) {
      return res.status(400).json({
        status: false,
        error: {
          message: "The information sent is empty.",
        },
      });
    }
    
    UserModel.updateUser({ id: userId }, payload)
      .then(() => {
        return UserModel.findUser({ id: userId });
      })
      .then((user) => {
        return res.status(200).json({
          status: true,
          data: user.toJSON(),
        });
      })
      .catch((err) => {
        return res.status(500).json({
          status: false,
          error: err,
        });
      });
  },


};
