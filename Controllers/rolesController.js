const roleModel = require("../Models/rolesModels");

module.exports = {
  getRole: (req, res) => {
    const idRole = req.params.id;

    roleModel.findRoles({ id: idRole })
      .then((role) => {
        return res.status(200).json({
          status: true,
          data: role.toJSON(),
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
    roleModel.findAllRoles(req.query)
      .then((role) => {
        return res.status(200).json({
          status: true,
          data: role,
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
