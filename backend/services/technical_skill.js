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
    const { skill, portfolioId } = req.body;
  
    let portfolio = await Portfolio.findById(portfolioId); 
    if (!portfolio) {
      next(ApiError.NotFound('Portfolio Not Found'));
      return;
    }

    const technicalSkill = await TechnicalSkill.findById(skill.id);
    if (!technicalSkill) {
        next(ApiError.NotFound('Should add technical skills.'));
        return;
    }

    const result = {skill: technicalSkill, level: skill.level}
    portfolio = await Portfolio.findOneAndUpdate({_id: portfolioId, 'technicalSkills.skill._id': {$ne: technicalSkill._id}}, {
      $push: {
        technicalSkills: result
      }
    }, {new: true})
    .catch((err) => {
      res.status(400).json({errors: [{ message: err.message }]});
    });
    if(!portfolio) {
        return next(ApiError.BadRequest('You seem to already have this skill, try adding another skill !'));
    }
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

const editOneTechnicalSkill = async (req, res, next) => {
    // separating the id
    const {portfolioID} = req.user;
    const {id, level} = req.body;

    const portfolio = await Portfolio.findById(portfolioID)
        .catch((err) => {
            res.status(400).json({errors: [{ message: err.message }]});
        });

    if (!portfolio) {
        next(ApiError.NotFound('Portfolio Not Found'));
        return;
    }

    const technicalSkill = await TechnicalSkill.findById(id)
        .catch((err) => {
            res.status(400).json({errors: [{ message: err.message }]});
        });
    if(!technicalSkill) {
        next(ApiError.NotFound('Hard Skill Not Found'));
        return;
    }
    const updatedPortfolio = await Portfolio.findOneAndUpdate({_id: portfolioID, technicalSkills: {$elemMatch: {skill: technicalSkill}}},
        {'$set': {
            'technicalSkills.$.level': level,
        }}, {'new': true, 'safe': true, 'upsert': true}).catch(err => {
        console.log(err)
    });
    if(!updatedPortfolio) {
        next(ApiError.BadRequest('Update Failed, Try Again !'));
        return;
    }

    res.status(200).send({technicalSkill, portfolio: updatedPortfolio});
};

module.exports = {
    getAllTechnicalSkills,
    getTechnicalSkills,
    addTechnicalSkills,
    deleteTechnicalSkills,
    editOneTechnicalSkill
};
