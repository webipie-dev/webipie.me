const {TechnicalSkill} = require('../models/technical_skill');
const Portfolio = require('../models/portfolio');
const ApiError = require("../errors/api-error");

const getAllTechnicalSkills = async (req, res, next) => {
    const technicalSkills = await TechnicalSkill.find()
      .catch((err) => {
        res.status(400).json({errors: [{ message: err.message }]});
      });
  
    res.status(200).send(technicalSkills);
};

const getTechnicalSkills = async (req, res, next) => {
    if(!req.query.portfolioId){
      return next(ApiError.BadRequest('you have to pass the portfolioID'));
    }
  
    const technicalSkills = await Portfolio.find({ _id: req.query.portfolioId }).select('technicalSkills -_id')
      .catch((err) => {
        res.status(400).json({errors: [{ message: err.message }]});
      });
  
    res.status(200).send(technicalSkills);
};

const addTechnicalSkills = async (req, res, next) => {
    let { skills, portfolioId } = req.body;
    let ids = [];
  
    let portfolio = await Portfolio.findById(portfolioId); 
    if (!portfolio) {
      next(ApiError.NotFound('Portfolio Not Found'));
      return;
    }

    ids = skills.map(a => a.id);
    const technicalSkills = await TechnicalSkill.find({'_id': { $in: ids }});
    if (!technicalSkills) {
        next(ApiError.NotFound('Should add technical skills.'));
        return;
    }
  
    let results = Object.keys(skills).map( key => {
        let skill = technicalSkills.find( obj => obj.id === skills[key].id);
        return {skill: skill, level: skills[key].level};
    });
    portfolio = await Portfolio.findOneAndUpdate({_id: portfolioId}, {
      $push: {
        technicalSkills: results
      }
    }, {new: true})
    .catch((err) => {
      res.status(400).json({errors: [{ message: err.message }]});
    });
  
    res.status(200).send(portfolio);
};


const deleteTechnicalSkills = async (req, res, next) => {
  //get technical skills ids
  const { ids,portfolioId } = req.body;

  const portfolio = await Portfolio.findOneAndUpdate({_id: portfolioId},
    {
      $pull: { 
        technicalSkills: { 
          _id: { $in: ids }
        }
      } 
    }, { new: true })
    .catch((err) => {
      res.status(400).json({errors: [{ message: err.message }]});
    });

  /* if (deletedTechnicalSkills) {
    if (deletedTechnicalSkills.deletedCount === 0) {
      next(ApiError.NotFound('No technical skills found to delete'));
      return;
    }else if (deletedTechnicalSkills.deletedCount < ids.length) {
      next(ApiError.NotFound(`${ids.length} TechnicalSkills to be deleted but ${deletedTechnicalSkills.deletedCount} are found and deleted`));
      return;
    }
  } */

  res.status(200).send(portfolio);
};
  

module.exports = {
    getAllTechnicalSkills,
    getTechnicalSkills,
    addTechnicalSkills,
    deleteTechnicalSkills
};