const {Education} = require('../models/education');
const Portfolio = require('../models/portfolio');
const ApiError = require("../errors/api-error");


const getEducation = async (req, res, next) => {
  if(!req.query.portfolioId){
    return next(ApiError.BadRequest('you have to pass the portfolioID'));
  }

  const education = await Education.find({ portfolio: portfolioId })
    .catch((err) => {
      res.status(400).json({errors: [{ message: err.message }]});
    });

  res.status(200).send(education);
};

const addEducation = async (req, res, next) => {
  let { title, level, beginDate, endDate, city, portfolioId } = req.body
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

  const education = new Education({
    title, level, beginDate, endDate, city, "portfolio": portfolioId
  });

  await education.save();
  portfolio = await Portfolio.findOneAndUpdate({"_id":portfolioId}, { $push: { education: education } }, {new: true})
  res.status(201).send({education, portfolio});

};

const editOneEducation = async (req, res, next) => {

  // separating the id
  const { id } = req.params;
  let education = await Education.findById(id)
    .catch((err) => {
      res.status(400).json({errors: [{ message: err.message }]});
    });

  if (!education) {
    next(ApiError.NotFound('Education Not Found'));
    return;
  }

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
  });

  const educationEdited = await Education.bulkWrite(bulkQueries, {ordered: false})
    .catch((err) => {
      res.status(400).json({errors: [{ message: err.message }]});
    });

   //TODO: correct portfolio with modified education 
  eduaction = await Education.findById(id);
  const portfolio = await Portfolio.findByIdAndUpdate(
    {"_id": education.portfolio}, 
    { $set: { "education.$[elem]" : education } } , 
    { arrayFilters: [ { "elem._id": education._id } ] , new: true}
  );
  res.status(200).send({educationEdited, portfolio});
};


const deleteEducation = async (req, res, next) => {
  //get education ids
  const { ids, portfolioId } = req.body;

  const deletedEducation = await Education.deleteMany({_id: {$in: ids}})
    .catch((err) => {
      res.status(400).json({errors: [{ message: err.message }]});
    });

  const portfolio = await Portfolio.findByIdAndUpdate(
    {"_id": portfolioId}, 
    {
      $pull: { 
        education: { 
          _id: { $in: ids }
        }
      }
    },  
    {new: true}
  );

  if (deletedEducation) {
    if (deletedEducation.deletedCount === 0) {
      next(ApiError.NotFound('No education found to delete'));
      return;
    }else if (deletedEducation.deletedCount < ids.length) {
      next(ApiError.NotFound(`${ids.length} education to be deleted but ${deletedEducation.deletedCount} are found and deleted`));
      return;
    }
  }

  res.status(200).send({deletedEducation, portfolio});
};


module.exports = {
    getEducation,
    addEducation,
    editOneEducation,
    deleteEducation
};
