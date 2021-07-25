const Project = require('../models/project');
const Portfolio = require('../models/portfolio');
const ApiError = require("../errors/api-error");


const getProjects = async (req, res, next) => {
  if(!req.query.portfolioId){
    return next(ApiError.BadRequest('you have to pass the portfolioID'));
  }

  const projects = await Project.find({portfolio: portfolioId})
    .catch((err) => {
      res.status(400).json({errors: [{ message: err.message }]});
    });

  res.status(200).send(projects);
};


const getOneProject = async (req, res, next) => {
  //get project id
  const { id } = req.params;

  const project = await Project.findById(id)
    .catch((err) => {
      res.status(400).json({errors: [{ message: err.message }]});
    });
  res.status(200).send(project);

};

const addProject = async (req, res, next) => {
  let { name, description, tags, skills, imgs, link, github, portfolioId } = req.body

  const portfolio = await Portfolio.findById(portfolioId)

  if (!portfolio) {
    next(ApiError.NotFound('Portfolio Not Found'));
    return;
  }

  const project = new Project({
    name, description, tags, skills, imgs, link, github, portfolio
  });

  await project.save();
  res.status(201).send(project);

};

const editOneProject = async (req, res, next) => {

  // separating the id
  const { id } = req.params;
  const project = await Project.findById(id)
    .catch((err) => {
      res.status(400).json({errors: [{ message: err.message }]});
    });

  if (!project) {
    next(ApiError.NotFound('Project Not Found'));
    return;
  }

  const { imgs , deletedImages } = req.body;


  //separating the updates
  const edits = {};
  for(let key in req.body) {
      if(key !== 'imgs' && key !== 'deletedImages'){
        edits[key] = req.body[key];
      }
  }


  let bulkQueries = [];
    await bulkQueries.push({
      updateOne: {
        "filter": { _id: id},
        "update":{ $set: edits }
      }
    })
    await bulkQueries.push({
      updateOne: {
        "filter": { _id: id},
        "update": { $addToSet: {imgs: {$each: imgs} } }
      }
    })
    await bulkQueries.push({
    updateOne: {
      "filter": { _id: id},
      "update": { $pull : {imgs: {$in: deletedImages}}}
    }
  })

  const projectEdited = await Project.bulkWrite(bulkQueries, {ordered: false})
    .catch((err) => {
      res.status(400).json({errors: [{ message: err.message }]});
    });

  res.status(200).send(projectEdited);
};


const deleteManyProjects = async (req, res, next) => {
  //get projects ids
  const { ids } = req.body;

  const deletedProjects = await Project.deleteMany({_id: {$in: ids}})
    .catch((err) => {
      res.status(400).json({errors: [{ message: err.message }]});
    });

  if (deletedProjects) {
    if (deletedProjects.deletedCount === 0) {
      next(ApiError.NotFound('No Projects found to delete'));
      return;
    }else if (deletedProjects.deletedCount < ids.length) {
      next(ApiError.NotFound(`${ids.length} Projects to be deleted but ${deletedProjects.deletedCount} are found and deleted`));
      return;
    }
  }

  res.status(200).send(deletedProjects);
};

const deleteAllProjects = async (req, res, next) => {

  const deletedProjects = await Project.deleteMany({})
    .catch((err) => {
      res.status(400).json({errors: [{ message: err.message }]});
    });

  res.status(200).send(deletedProjects);
};



module.exports = {
  getProjects,
  getOneProject,
  addProject,
  editOneProject,
  deleteAllProjects,
  deleteManyProjects
};
