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
  let { title, description, company, position, skills, imgs, beginDate, endDate, city, portfolioId } = req.body;
  if(beginDate) beginDate = new Date(beginDate);
  if (endDate) endDate =  new Date(endDate);

  let portfolio = await Portfolio.findById(portfolioId)
  if (!portfolio) {
    next(ApiError.NotFound('Portfolio Not Found'));
    return;
  }

  if(beginDate >= endDate){
    return next(ApiError.BadRequest('End date should be bigger than begin date.'));
  }

  const workExperience = new WorkExperience({
    title, description, company, position, skills, imgs, beginDate, endDate, city, "portfolio": portfolioId
  });

  await workExperience.save();
  portfolio = await Portfolio.findOneAndUpdate({"_id":portfolioId}, { $push: { workExperiences: workExperience } }, {new: true})
  res.status(201).send({workExperience, portfolio});

};

const editOneWorkExperience = async (req, res, next) => {

  // separating the id
  const { id } = req.params;
  let workExperience = await WorkExperience.findById(id)
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
    });
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


  const workExperienceEdited = await WorkExperience.bulkWrite(bulkQueries, {ordered: false})
    .catch((err) => {
      res.status(400).json({errors: [{ message: err.message }]});
    });
  
  workExperience = await WorkExperience.findById(id);  
  const portfolio = await Portfolio.findByIdAndUpdate(
    {"_id": workExperience.portfolio}, 
    { $set: { "workExperiences.$[elem]" : workExperience } } , 
    { arrayFilters: [ { "elem._id": workExperience._id } ] , new: true}
  );

  res.status(200).send({workExperienceEdited, portfolio});
};


const deleteManyWorkExperiences = async (req, res, next) => {
  //get work experiences ids
  const { ids, portfolioId } = req.body;

  const deletedWorkExperiences = await WorkExperience.deleteMany({_id: {$in: ids}})
    .catch((err) => {
      res.status(400).json({errors: [{ message: err.message }]});
    });
  
  const portfolio = await Portfolio.findByIdAndUpdate(
    {"_id": portfolioId}, 
    {
      $pull: { 
        workExperiences: { 
          _id: { $in: ids }
        }
      }
    },  
    {new: true}
  );

  if (deletedWorkExperiences) {
    if (deletedWorkExperiences.deletedCount === 0) {
      next(ApiError.NotFound('No work experience found to delete'));
      return;
    }else if (deletedWorkExperiences.deletedCount < ids.length) {
      next(ApiError.NotFound(`${ids.length} Projects to be deleted but ${deletedWorkExperiences.deletedCount} are found and deleted`));
      return;
    }
  }

  res.status(200).send({deletedWorkExperiences, portfolio});
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
