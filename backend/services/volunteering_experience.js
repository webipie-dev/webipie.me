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
  let { name, description, organisation, position, tags, skills, beginDate, endDate, city, portfolioId } = req.body

  const portfolio = await Portfolio.findById(portfolioId)
  if (!portfolio) {
    next(ApiError.NotFound('Portfolio Not Found'));
    return;
  }

  if(beginDate >= endDate){
    return next(ApiError.BadRequest('End date should be bigger than begin date.'));
  }

  const volunteeringExperience = new VolunteeringExperience({
    name, description, organisation, position, tags, skills, imgs,  beginDate, endDate, city, portfolio
  });

  await volunteeringExperience.save();
  res.status(201).send(volunteeringExperience);

};

const editOneVolunteeringExperience = async (req, res, next) => {

  // separating the id
  const { id } = req.params;
  const volunteeringExperience = await VolunteeringExperience.findById(id)
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

  const volunteeringExperienceEdited = await VolunteeringExperience.bulkWrite(bulkQueries, {ordered: false})
    .catch((err) => {
      res.status(400).json({errors: [{ message: err.message }]});
    });

  res.status(200).send(volunteeringExperienceEdited);
};


const deleteManyVolunteeringExperiences = async (req, res, next) => {
  //get volunteering experiences ids
  const { ids } = req.body;

  const deletedVolunteeringExperiences = await VolunteeringExperience.deleteMany({_id: {$in: ids}})
    .catch((err) => {
      res.status(400).json({errors: [{ message: err.message }]});
    });

  if (deletedVolunteeringExperiences) {
    if (deletedVolunteeringExperiences.deletedCount === 0) {
      next(ApiError.NotFound('No volunteering experience found to delete'));
      return;
    }else if (deletedVolunteeringExperiences.deletedCount < ids.length) {
      next(ApiError.NotFound(`${ids.length} Projects to be deleted but ${deletedVolunteeringExperiences.deletedCount} are found and deleted`));
      return;
    }
  }

  res.status(200).send(deletedVolunteeringExperiences);
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
