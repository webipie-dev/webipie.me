const {Testimonial} = require('../models/testimonial');
const Portfolio = require('../models/portfolio');
const ApiError = require("../errors/api-error");


const getTestimonials = async (req, res, next) => {
  if(!req.query.portfolioId){
    return next(ApiError.BadRequest('you have to pass the portfolioID'));
  }

  const testimonials = await Testimonial.find({ portfolio: portfolioId })
    .catch((err) => {
      res.status(400).json({errors: [{ message: err.message }]});
    });

  res.status(200).send(testimonials);
};


const getOneTestimonial = async (req, res, next) => {
  //get testimonial id
  const { id } = req.params;

  const testimonial = await Testimonial.findById(id)
    .catch((err) => {
      res.status(400).json({errors: [{ message: err.message }]});
    });
  res.status(200).send(testimonial);

};

const addTestimonial = async (req, res, next) => {
  let { name, position, photo, description, portfolioId } = req.body

  const portfolio = await Portfolio.findById(portfolioId)

  if (!portfolio) {
    next(ApiError.NotFound('Portfolio Not Found'));
    return;
  }

  const testimonial = new Testimonial({
    name, position, photo, description, portfolio
  });

  await testimonial.save();
  res.status(201).send(testimonial);

};

const editOneTestimonial = async (req, res, next) => {

  // separating the id
  const { id } = req.params;
  const testimonial = await Testimonial.findById(id)
    .catch((err) => {
      res.status(400).json({errors: [{ message: err.message }]});
    });

  if (!testimonial) {
    next(ApiError.NotFound('Testimonial Not Found'));
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

  const testimonialEdited = await Testimonial.bulkWrite(bulkQueries, {ordered: false})
    .catch((err) => {
      res.status(400).json({errors: [{ message: err.message }]});
    });

  res.status(200).send(testimonialEdited);
};


const deleteManyTestimonials = async (req, res, next) => {
  //get testimonials ids
  const { ids } = req.body;

  const deletedTestimonials = await Achievemnent.deleteMany({_id: {$in: ids}})
    .catch((err) => {
      res.status(400).json({errors: [{ message: err.message }]});
    });

  if (deletedTestimonials) {
    if (deletedTestimonials.deletedCount === 0) {
      next(ApiError.NotFound('No testimonial found to delete'));
      return;
    }else if (deletedTestimonials.deletedCount < ids.length) {
      next(ApiError.NotFound(`${ids.length} Projects to be deleted but ${deletedTestimonials.deletedCount} are found and deleted`));
      return;
    }
  }

  res.status(200).send(deletedTestimonials);
};

const deleteAllTestimonials = async (req, res, next) => {

  const deletedTestimonials = await testimonial.deleteMany({})
    .catch((err) => {
      res.status(400).json({errors: [{ message: err.message }]});
    });

  res.status(200).send(deletedTestimonials);
};



module.exports = {
  getTestimonials,
  getOneTestimonial,
  addTestimonial,
  editOneTestimonial,
  deleteManyTestimonials,
  deleteAllTestimonials
};
