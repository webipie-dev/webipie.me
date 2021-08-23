const {Project} = require('../models/project');
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
  let { name, description, skills, imgs, link, github, portfolioId } = req.body

  let portfolio = await Portfolio.findById(portfolioId)
  if (!portfolio) {
    next(ApiError.NotFound('Portfolio Not Found'));
    return;
  }

  const project = new Project({
    name, description, skills, imgs, link, github, "portfolio": portfolioId
  });

  await project.save();
  portfolio = await Portfolio.findOneAndUpdate({"_id":portfolioId}, { $push: { projects: project } }, {new: true})
  res.status(201).send({project, portfolio});

};

const editOneProject = async (req, res, next) => {

  // separating the id
  const { id } = req.params;
  let project = await Project.findById(id)
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
    if(imgs){
      await bulkQueries.push({
        updateOne: {
          "filter": { _id: id},
          "update": { $addToSet: {imgs: {$each: imgs} } }
        }
      })
    }
    if(deletedImages){
      await bulkQueries.push({
        updateOne: {
          "filter": { _id: id},
          "update": { $pull : {imgs: {$in: deletedImages}}}
        }
      })
    }
   

  const projectEdited = await Project.bulkWrite(bulkQueries, {ordered: false})
    .catch((err) => {
      res.status(400).json({errors: [{ message: err.message }]});
    });
  
  project = await Project.findById(id);  
  const portfolio = await Portfolio.findByIdAndUpdate(
    {"_id": project.portfolio}, 
    { $set: { "projects.$[elem]" : project } } , 
    { arrayFilters: [ { "elem._id": project._id } ] , new: true}
  );  

  res.status(200).send({projectEdited, portfolio});
};


const deleteManyProjects = async (req, res, next) => {
  //get projects ids
  const { ids, portfolioId } = req.body;

  const deletedProjects = await Project.deleteMany({_id: {$in: ids}})
    .catch((err) => {
      res.status(400).json({errors: [{ message: err.message }]});
    });

  const portfolio = await Portfolio.findByIdAndUpdate(
    {"_id": portfolioId}, 
    {
      $pull: { 
        projects: { 
          _id: { $in: ids }
        }
      }
    },  
    {new: true}
  );

  if (deletedProjects) {
    if (deletedProjects.deletedCount === 0) {
      next(ApiError.NotFound('No Projects found to delete'));
      return;
    }else if (deletedProjects.deletedCount < ids.length) {
      next(ApiError.NotFound(`${ids.length} Projects to be deleted but ${deletedProjects.deletedCount} are found and deleted`));
      return;
    }
  }

  res.status(200).send({deletedProjects, portfolio});
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
