const Education = require('../models/education');
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

  const portfolio = await Portfolio.findById(portfolioId)

  if (!portfolio) {
    next(ApiError.NotFound('Portfolio Not Found'));
    return;
  }

  const education = new Education({
    title, level, beginDate, endDate, city, portfolio
  });

  await education.save();
  res.status(201).send(education);

};

const editOneEducation = async (req, res, next) => {

  // separating the id
  const { id } = req.params;
  const education = await Education.findById(id)
    .catch((err) => {
      res.status(400).json({errors: [{ message: err.message }]});
    });

  if (!education) {
    next(ApiError.NotFound('Education Not Found'));
    return;
  }

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

  res.status(200).send(educationEdited);
};


const deleteEducation = async (req, res, next) => {
  //get education ids
  const { ids } = req.body;

  const deletedEducation = await Education.deleteMany({_id: {$in: ids}})
    .catch((err) => {
      res.status(400).json({errors: [{ message: err.message }]});
    });

  if (deletedEducation) {
    if (deletedEducation.deletedCount === 0) {
      next(ApiError.NotFound('No education found to delete'));
      return;
    }else if (deletedEducation.deletedCount < ids.length) {
      next(ApiError.NotFound(`${ids.length} education to be deleted but ${deletedEducation.deletedCount} are found and deleted`));
      return;
    }
  }

  res.status(200).send(deletedEducation);
};


module.exports = {
    getEducation,
    addEducation,
    editOneEducation,
    deleteEducation
};
