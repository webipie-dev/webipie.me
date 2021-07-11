const {User} = require('../models/user');
const sendEmail = require('../services/email')
const {contactEmail} = require('../configuration')

const contactUser = async (req, res, next) => {
  let { userID, name, email, message, subject } = req.body
  const user = await User.findById(userID);
  if (!user.email){
    res.status(404).json({error: "User email not found");
  }
  let content = `${name} contacted you via your webipie.me website !\nName: ${name}\nEmail: ${email}\n`
  + `Message: \n${message}`
  sendEmail(contactEmail, user.email, subject, content)
  res.status(200).json({result: "Email sent"})
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
  let { name, poistion, photo, description, portfolioId } = req.body

  const portfolio = await Portfolio.findById(portfolioId)

  if (!portfolio) {
    next(ApiError.NotFound('Portfolio Not Found'));
    return;
  }

  const testimonial = new Testimonial({
    name, poistion, photo, description, portfolio
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
