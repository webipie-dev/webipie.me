const {Achievement} = require('../models/achievement');
const Portfolio = require('../models/portfolio');
const ApiError = require("../errors/api-error");


const getAchievements = async (req, res, next) => {
  if(!req.query.portfolioId){
    return next(ApiError.BadRequest('you have to pass the portfolioID'));
  }

  const achievements = await Achievement.find({ portfolio: portfolioId })
    .catch((err) => {
      res.status(400).json({errors: [{ message: err.message }]});
    });

  res.status(200).send(achievements);
};

const getOneAchievement = async (req, res, next) => {
  //get achievement id
  const { id } = req.params;

  const achievement = await Achievement.findById(id)
    .catch((err) => {
      res.status(400).json({errors: [{ message: err.message }]});
    });
  res.status(200).send(achievement);

};

const addAchievement = async (req, res, next) => {
  let { description, title, portfolioId, date, image } = req.body
  if(date) date = new Date(date);

  let portfolio = await Portfolio.findById(portfolioId)
  if (!portfolio) {
    next(ApiError.NotFound('Portfolio Not Found'));
    return;
  }

  const achievement = new Achievement({
    description, title, "portfolio": portfolioId, date, image
  });

  await achievement.save();
  portfolio = await Portfolio.findOneAndUpdate({"_id":portfolioId}, { $push: { achievements: achievement } }, {new: true})
  res.status(201).send({achievement, portfolio});

};

const editOneAchievement = async (req, res, next) => {

  // separating the id
  const { id } = req.params;
  let achievement = await Achievement.findById(id)
    .catch((err) => {
      res.status(400).json({errors: [{ message: err.message }]});
    });

  if (!achievement) {
    next(ApiError.NotFound('Achievement Not Found'));
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

  const achievementEdited = await Achievement.bulkWrite(bulkQueries, {ordered: false})
    .catch((err) => {
      res.status(400).json({errors: [{ message: err.message }]});
    });

  achievement = await Achievement.findById(id);  
  const portfolio = await Portfolio.findByIdAndUpdate(
    {"_id": achievement.portfolio}, 
    { $set: { "achievements.$[elem]" : achievement } } , 
    { arrayFilters: [ { "elem._id": achievement._id } ] , new: true}
  );  
  res.status(200).send({achievementEdited, portfolio});
};

const deleteManyAchievements = async (req, res, next) => {
  //get achievements ids
  const { ids, portfolioId } = req.body;
  const deletedAchievements = await Achievement.deleteMany({_id: {$in: ids}})
    .catch((err) => {
      res.status(400).json({errors: [{ message: err.message }]});
    });

  const portfolio = await Portfolio.findByIdAndUpdate(
    {"_id": portfolioId}, 
    {
      $pull: { 
        achievements: { 
          _id: { $in: ids }
        }
      }
    },  
    {new: true}
  );

  if (deletedAchievements) {
    if (deletedAchievements.deletedCount === 0) {
      next(ApiError.NotFound('No achievement found to delete'));
      return;
    }else if (deletedAchievements.deletedCount < ids.length) {
      next(ApiError.NotFound(`${ids.length} Projects to be deleted but ${deletedAchievements.deletedCount} are found and deleted`));
      return;
    }
  }

  res.status(200).send({deletedAchievements, portfolio});
};

const deleteAllAchievements = async (req, res, next) => {

  const deletedAchievements = await Achievement.deleteMany({})
    .catch((err) => {
      res.status(400).json({errors: [{ message: err.message }]});
    });

  res.status(200).send(deletedAchievements);
};



module.exports = {
  getAchievements,
  getOneAchievement,
  addAchievement,
  editOneAchievement,
  deleteManyAchievements,
  deleteAllAchievements
};
