const {WorkExperience} = require('../models/work_experience');
const Portfolio = require('../models/portfolio');
const ApiError = require("../errors/api-error");


const getWorkExperiences = async (req, res, next) => {
  if(!req.query.portfolioId){
    return next(ApiError.BadRequest('you have to pass the portfolioID'));
  }

  const workExperiences = await WorkExperience.find({ portfolio: portfolioId })
    .catch((err) => {
      res.status(400).json({errors: [{ message: err.message }]});
    });

  res.status(200).send(workExperiences);
};


const getOneWorkExperience = async (req, res, next) => {
  //get work experience id
  const { id } = req.params;

  const workExperience = await WorkExperience.findById(id)
    .catch((err) => {
      res.status(400).json({errors: [{ message: err.message }]});
    });
  res.status(200).send(workExperience);

};

const addWorkExperience = async (req, res, next) => {
  let { name, description, company, position, tags, skills, beginDate, endDate, city, portfolioId } = req.body

  const portfolio = await Portfolio.findById(portfolioId)
  if (!portfolio) {
    next(ApiError.NotFound('Portfolio Not Found'));
    return;
  }

  if(beginDate >= endDate){
    return next(ApiError.BadRequest('End date should be bigger than begin date.'));
  }

  const workExperience = new WorkExperience({
    name, description, company, position, tags, skills, imgs, beginDate, endDate, city, portfolio
  });

  await workExperience.save();
  res.status(201).send(workExperience);

};

const editOneWorkExperience = async (req, res, next) => {

  // separating the id
  const { id } = req.params;
  const workExperience = await WorkExperience.findById(id)
    .catch((err) => {
      res.status(400).json({errors: [{ message: err.message }]});
    });

  if (!workExperience) {
    next(ApiError.NotFound('Work Experience Not Found'));
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

  const workExperienceEdited = await WorkExperience.bulkWrite(bulkQueries, {ordered: false})
    .catch((err) => {
      res.status(400).json({errors: [{ message: err.message }]});
    });

  res.status(200).send(workExperienceEdited);
};


const deleteManyWorkExperiences = async (req, res, next) => {
  //get work experiences ids
  const { ids } = req.body;

  const deletedWorkExperiences = await WorkExperience.deleteMany({_id: {$in: ids}})
    .catch((err) => {
      res.status(400).json({errors: [{ message: err.message }]});
    });

  if (deletedWorkExperiences) {
    if (deletedWorkExperiences.deletedCount === 0) {
      next(ApiError.NotFound('No work experience found to delete'));
      return;
    }else if (deletedWorkExperiences.deletedCount < ids.length) {
      next(ApiError.NotFound(`${ids.length} Projects to be deleted but ${deletedWorkExperiences.deletedCount} are found and deleted`));
      return;
    }
  }

  res.status(200).send(deletedWorkExperiences);
};

const deleteAllWorkExperiences = async (req, res, next) => {

  const deletedWorkExperiences = await WorkExperience.deleteMany({})
    .catch((err) => {
      res.status(400).json({errors: [{ message: err.message }]});
    });

  res.status(200).send(deletedWorkExperiences);
};



module.exports = {
  getWorkExperiences,
  getOneWorkExperience,
  addWorkExperience,
  editOneWorkExperience,
  deleteManyWorkExperiences,
  deleteAllWorkExperiences
};
