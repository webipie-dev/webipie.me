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

  let portfolio = await Portfolio.findById(portfolioId)

  if (!portfolio) {
    next(ApiError.NotFound('Portfolio Not Found'));
    return;
  }

  const testimonial = new Testimonial({
    name, position, photo, description, "portfolio": portfolioId
  });

  await testimonial.save();
  portfolio = await Portfolio.findOneAndUpdate({"_id":portfolioId}, { $push: { testimonials: testimonial } }, {new: true})
  res.status(201).send({testimonial, portfolio});

};

const editOneTestimonial = async (req, res, next) => {

  // separating the id
  const { id } = req.params;
  let testimonial = await Testimonial.findById(id)
    .catch((err) => {
      res.status(400).json({errors: [{ message: err.message }]});
    });

  if (!testimonial) {
    next(ApiError.NotFound('Testimonial Not Found'));
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

  const testimonialEdited = await Testimonial.bulkWrite(bulkQueries, {ordered: false})
    .catch((err) => {
      res.status(400).json({errors: [{ message: err.message }]});
    });

  testimonial = await Testimonial.findById(id);
  const portfolio = await Portfolio.findByIdAndUpdate(
    {"_id": testimonial.portfolio}, 
    { $set: { "testimonials.$[elem]" : testimonial } } , 
    { arrayFilters: [ { "elem._id": testimonial._id } ] , new: true}
  );
  res.status(200).send({testimonialEdited, portfolio});
};


const deleteManyTestimonials = async (req, res, next) => {
  //get testimonials ids
  const { ids, portfolioId } = req.body;

  const deletedTestimonials = await Testimonial.deleteMany({_id: {$in: ids}})
    .catch((err) => {
      res.status(400).json({errors: [{ message: err.message }]});
    });

  const portfolio = await Portfolio.findByIdAndUpdate(
    {"_id": portfolioId}, 
    {
      $pull: { 
        testimonials: { 
          _id: { $in: ids }
        }
      }
    },  
    {new: true}
  );

  if (deletedTestimonials) {
    if (deletedTestimonials.deletedCount === 0) {
      next(ApiError.NotFound('No testimonial found to delete'));
      return;
    }else if (deletedTestimonials.deletedCount < ids.length) {
      next(ApiError.NotFound(`${ids.length} Projects to be deleted but ${deletedTestimonials.deletedCount} are found and deleted`));
      return;
    }
  }

  res.status(200).send({deletedTestimonials, portfolio});
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
