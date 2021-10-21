const {CustomSkill} = require('../models/custom_skill');
const Portfolio = require('../models/portfolio');
const ApiError = require("../errors/api-error");

/* const getAllTechnicalSkills = async (req, res, next) => {
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
}; */

const addCustomSkills = async (req, res, next) => {
    const { skill, portfolioId } = req.body;
  
    let portfolio = await Portfolio.findById(portfolioId); 
    if (!portfolio) {
      next(ApiError.NotFound('Portfolio Not Found'));
      return;
    }

    const customSkill = new CustomSkill({
        name: skill.name
    });
    await customSkill.save();

    const result = {skill: customSkill, level: skill.level}
    portfolio = await Portfolio.findOneAndUpdate({_id: portfolioId, 'customSkills.skill.name': {$ne: skill.name}}, {
      $push: {
        customSkills: result
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

const deleteCustomSkills = async (req, res, next) => {
  //get custom hard skills ids
  const { ids, portfolioId } = req.body;

  const portfolio = await Portfolio.findOneAndUpdate({_id: portfolioId},
    {
      $pull: { 
        customSkills: { 
          _id: { $in: ids }
        }
      } 
    }, { new: true })
    .catch((err) => {
      res.status(400).json({errors: [{ message: err.message }]});
    });

  res.status(200).send(portfolio);
};

const editOneCustomSkill = async (req, res, next) => {
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

    const customSkill = await CustomSkill.findById(id)
        .catch((err) => {
            res.status(400).json({errors: [{ message: err.message }]});
        });
    if(!customSkill) {
        next(ApiError.NotFound('Hard Skill Not Found'));
        return;
    }
    const updatedPortfolio = await Portfolio.findOneAndUpdate({_id: portfolioID, customSkills: {$elemMatch: {skill: customSkill}}},
        {'$set': {
            'cutomSkills.$.level': level,
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
    addCustomSkills,
    editOneCustomSkill,
    deleteCustomSkills
};
