const {VolunteeringExperience} = require('../models/volunteering_experience');
const Portfolio = require('../models/portfolio');
const ApiError = require("../errors/api-error");


const getVolunteeringExperiences = async (req, res, next) => {
  if(!req.query.portfolioId){
    return next(ApiError.BadRequest('you have to pass the portfolioID'));
  }

  const volunteeringExperience = await VolunteeringExperience.find({ portfolio: portfolioId })
    .catch((err) => {
      res.status(400).json({errors: [{ message: err.message }]});
    });

  res.status(200).send(volunteeringExperience);
};


const getOneVolunteeringExperience = async (req, res, next) => {
  //get volunteering experience id
  const { id } = req.params;

  const volunteeringExperience = await VolunteeringExperience.findById(id)
    .catch((err) => {
      res.status(400).json({errors: [{ message: err.message }]});
    });
  res.status(200).send(volunteeringExperience);

};

const addVolunteeringExperience = async (req, res, next) => {
  let { title, description, organisation, position, skills, imgs, beginDate, endDate, city, portfolioId } = req.body
  if(beginDate) beginDate = new Date(beginDate);
  if(endDate) endDate =  new Date(endDate);

  let portfolio = await Portfolio.findById(portfolioId)
  if (!portfolio) {
    next(ApiError.NotFound('Portfolio Not Found'));
    return;
  }

  if(beginDate >= endDate){
    return next(ApiError.BadRequest('End date should be bigger than begin date.'));
  }

  const volunteeringExperience = new VolunteeringExperience({
    title, description, organisation, position, skills, imgs,  beginDate, endDate, city,  "portfolio": portfolioId
  });

  await volunteeringExperience.save();
  portfolio = await Portfolio.findOneAndUpdate({"_id":portfolioId}, { $push: { volunteeringExperiences: volunteeringExperience } }, {new: true})
  res.status(201).send({volunteeringExperience, portfolio});

};

const editOneVolunteeringExperience = async (req, res, next) => {

  // separating the id
  const { id } = req.params;
  let volunteeringExperience = await VolunteeringExperience.findById(id)
    .catch((err) => {
      res.status(400).json({errors: [{ message: err.message }]});
    });

  if (!volunteeringExperience) {
    next(ApiError.NotFound('Volunteering Experience Not Found'));
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
    

  const volunteeringExperienceEdited = await VolunteeringExperience.bulkWrite(bulkQueries, {ordered: false})
    .catch((err) => {
      res.status(400).json({errors: [{ message: err.message }]});
    });

  volunteeringExperience = await VolunteeringExperience.findById(id);
  const portfolio = await Portfolio.findByIdAndUpdate(
    {"_id": volunteeringExperience.portfolio}, 
    { $set: { "volunteeringExperiences.$[elem]" : volunteeringExperience } } , 
    { arrayFilters: [ { "elem._id": volunteeringExperience._id } ] , new: true}
  );

  res.status(200).send({volunteeringExperienceEdited, portfolio});
};


const deleteManyVolunteeringExperiences = async (req, res, next) => {
  //get volunteering experiences ids
  const { ids, portfolioId } = req.body;

  const deletedVolunteeringExperiences = await VolunteeringExperience.deleteMany({_id: {$in: ids}})
    .catch((err) => {
      res.status(400).json({errors: [{ message: err.message }]});
    });
  
  const portfolio = await Portfolio.findByIdAndUpdate(
    {"_id": portfolioId}, 
    {
      $pull: { 
        volunteeringExperiences: { 
          _id: { $in: ids }
        }
      }
    },  
    {new: true}
  );

  if (deletedVolunteeringExperiences) {
    if (deletedVolunteeringExperiences.deletedCount === 0) {
      next(ApiError.NotFound('No volunteering experience found to delete'));
      return;
    }else if (deletedVolunteeringExperiences.deletedCount < ids.length) {
      next(ApiError.NotFound(`${ids.length} Projects to be deleted but ${deletedVolunteeringExperiences.deletedCount} are found and deleted`));
      return;
    }
  }

  res.status(200).send({deletedVolunteeringExperiences, portfolio});
};

const deleteAllVolunteeringExperiences = async (req, res, next) => {

  const deletedVolunteeringExperiences = await VolunteeringExperience.deleteMany({})
    .catch((err) => {
      res.status(400).json({errors: [{ message: err.message }]});
    });

  res.status(200).send(deletedVolunteeringExperiences);
};



module.exports = {
  getVolunteeringExperiences,
  getOneVolunteeringExperience,
  addVolunteeringExperience,
  editOneVolunteeringExperience,
  deleteManyVolunteeringExperiences,
  deleteAllVolunteeringExperiences
};
