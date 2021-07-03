const {Template} = require('../models/template');
const ApiError = require("../errors/api-error");


const getTemplates = async (req, res, next) => {
  const templates = await Template.find({})
    .catch((err) => {
      res.status(400).json({errors: [{ message: err.message }]});
    });

  res.status(200).send(templates);
};

const addTemplate = async (req, res, next) => {
  let { name, header, colorChart, colorChartOptions, font, fontOptions } = req.body

  const foundTemplate = await Template.findOne({"name": name});
  if(foundTemplate) return res.status(500).send("Template already exits");
  
  const template = new Template({
    name, header, colorChart, colorChartOptions, font, fontOptions 
  });

  await template.save();
  res.status(201).send(template);

};

const editTemplate= async (req, res, next) => {

  // separating the id
  const { id } = req.params;
  const template = await Template.findById(id)
    .catch((err) => {
      res.status(400).json({errors: [{ message: err.message }]});
    });

  if (!template) {
    next(ApiError.NotFound('Template Not Found'));
    return;
  }


  //separating the updates
  const edits = {};
  for(let key in req.body) {
    edits[key] = req.body[key];
  }


  let bulkQueries = [];
  await bulkQueries.push({
    updateOne: {
      "filter": { _id: id},
      "update":{ $set: edits }
    }
  })

  const templateEdited = await Template.bulkWrite(bulkQueries, {ordered: false})
    .catch((err) => {
      res.status(400).json({errors: [{ message: err.message }]});
    });

  res.status(200).send(templateEdited);
};


const deleteTemplate= async (req, res, next) => {

  // separating the id
  const { id } = req.params;
  const template = await Template.findById(id)
    .catch((err) => {
      res.status(400).json({errors: [{ message: err.message }]});
    });

  if (!template) {
    next(ApiError.NotFound('Template Not Found'));
    return;
  }

  const templateDeleted = await Template.deleteOne({"_id": id});

  res.status(200).send(templateDeleted);
};

const deleteAllTemplates = async (req, res, next) => {

  const deletedTemplates = await Template.deleteMany({})
    .catch((err) => {
      res.status(400).json({errors: [{ message: err.message }]});
    });

  res.status(200).send(deletedTemplates);
};



module.exports = {
    getTemplates,
    addTemplate,
    editTemplate,
    deleteTemplate,
    deleteAllTemplates
};