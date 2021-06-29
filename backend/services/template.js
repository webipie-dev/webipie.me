const {Template} = require('../models/template');
const ApiError = require("../errors/api-error");


const getTemplates = async (req, res, next) => {
  const templates = await Template.find({})
    .catch((err) => {
      res.status(400).json({errors: [{ message: err.message }]});
    });

  res.status(200).send(templates);
};

module.exports = {
    getTemplates,
  };