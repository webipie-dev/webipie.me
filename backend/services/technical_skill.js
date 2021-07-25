const TechnicalSkill = require('../models/technical_skill');
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
  
    const portfolio = await Portfolio.findById(portfolioId); 
    if (!portfolio) {
      next(ApiError.NotFound('Portfolio Not Found'));
      return;
    }

    for (const [key, value] of Object.entries(skills)) {
        ids.push(value);
    }
    const technicalSkills = await TechnicalSkill.find({'_id': { $in: ids }});
    if (!technicalSkills) {
        next(ApiError.NotFound('Should add technical skills.'));
        return;
    }
  
    let results = Object.keys(skills).map( key => {
        let skill = technicalSkills.find( obj => obj.id === skills[key].id);
        return {skill: skill, level: skills[key].level};
    });
    const addedTechnicalSkills = await Portfolio.updateOne({_id: portfolioId}, {
      $push: {
        technicalSkills: results
      }
    })
    .select('technicalSkills -_id')
    .catch((err) => {
      res.status(400).json({errors: [{ message: err.message }]});
    });
  
    res.status(200).send(addedTechnicalSkills);
};


const deleteTechnicalSkills = async (req, res, next) => {
  //get technical skills ids
  const { ids } = req.body;

  const deletedTechnicalSkills = await Portfolio.updateOne({
      $pull: { 
        technicalSkills: { 
          $elemMatch: {
            "skill.id": { $in: ids }
          } 
        }
      } 
    })
    .select('technicalSkills -_id')
    .catch((err) => {
      res.status(400).json({errors: [{ message: err.message }]});
    });

  if (deletedTechnicalSkills) {
    if (deletedTechnicalSkills.deletedCount === 0) {
      next(ApiError.NotFound('No technical skills found to delete'));
      return;
    }else if (deletedTechnicalSkills.deletedCount < ids.length) {
      next(ApiError.NotFound(`${ids.length} TechnicalSkills to be deleted but ${deletedTechnicalSkills.deletedCount} are found and deleted`));
      return;
    }
  }

  res.status(200).send(deletedTechnicalSkills);
};
  

module.exports = {
    getAllTechnicalSkills,
    getTechnicalSkills,
    addTechnicalSkills,
    deleteTechnicalSkills
};