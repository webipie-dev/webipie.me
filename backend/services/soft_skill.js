const SoftSkill = require('../models/soft_skill');
const Portfolio = require('../models/portfolio');
const ApiError = require("../errors/api-error");

const getAllSoftSkills = async (req, res, next) => {
    const softSkills = await SoftSkill.find()
      .catch((err) => {
        res.status(400).json({errors: [{ message: err.message }]});
      });
  
    res.status(200).send(softSkills);
};

const getSoftSkills = async (req, res, next) => {
    if(!req.query.portfolioId){
      return next(ApiError.BadRequest('you have to pass the portfolioID'));
    }
  
    const softSkills = await Portfolio.find({ _id: req.query.portfolioId }).select('softSkills -_id')
      .catch((err) => {
        res.status(400).json({errors: [{ message: err.message }]});
      });
  
    res.status(200).send(softSkills);
};

const addSoftSkills = async (req, res, next) => {
    let { ids, portfolioId } = req.body
  
    const portfolio = await Portfolio.findById(portfolioId);
  
    if (!portfolio) {
      next(ApiError.NotFound('Portfolio Not Found'));
      return;
    }

    const softSkills = await SoftSkill.find({'_id': { $in: ids }});

    if (!softSkills) {
        next(ApiError.NotFound('Should add soft skills.'));
        return;
    }
  
    
  
  };
  

module.exports = {
    getAllSoftSkills,
    getSoftSkills
};