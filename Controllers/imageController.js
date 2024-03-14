const imageModel = require("../Models/imageModel");

module.exports = {
  getImage: (req, res) => {
    const imageId = req.params.id;

    imageModel.find({ id: imageId })
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

  getAll: (req, res) => {
    imageModel.findAll(req.query)
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

  update: (req, res) => {
    const content = req.body
    const imageId = req.params.id;
    if (!Object.keys(content).length) {
      return res.status(400).json({
        status: false,
        error: {
          message: "The information sent is empty.",
        },
      });
    }

    imageModel.update({ id: imageId }, payload)
      .then(() => {
        return imageModel.find({ id: imageId });
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

  upload: (req, res) => {
    const content = req.body;

    imageModel.create(
      Object.assign(content)
    )
      .then((image) => {

        return res.status(200).json({
          status: true,
          result: {
            data: image.toJSON(),
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

};
