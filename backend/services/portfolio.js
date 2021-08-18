const Portfolio = require('../models/portfolio');
const {Template} = require('../models/template');
const ApiError = require("../errors/api-error");
const { User } = require('../models/user');
const { createDomain } = require('../services/domain');
const geoip = require('geoip-lite');
const date = require('date-and-time')


const getPortfolioUrls = async (req,res) => {
  const urls =await Portfolio.find({}).select({ "url": 1, "_id": 0})
    .catch((err) => {
    res.status(400).json({errors: [{ message: err.message }]});
    });

  res.status(200).send(urls);
}

const getOnePortfolio = async (req, res) => {
  //get portfolio id
  const { id } = req.params;
  const portfolio = await Portfolio.findById(id)
    .catch((err) => {
      res.status(400).json({errors: [{ message: err.message }]});
    });

  res.status(200).send(portfolio);
}

const getPortfolioByUrl = async (req,res) => {
  const { url } = req.params;
  const portfolio = await Portfolio.findOne({url})
    .catch((err) => {
      res.status(400).json({errors: err.message});
    });
  
  let ip;
  console.log(`req ip: ${req.ip}, x-forwarded-for: ${req.headers["x-forwarded-for"]}`)
  if(req.headers["x-forwarded-for"])
    ip = req.headers["x-forwarded-for"]
  else if (req.ip)
    ip = req.ip
  if(ip && ip !== '::1'){
    const geo = geoip.lookup(ip);
    if(geo && geo.country){
      if (!portfolio.visits)
        portfolio.visits = {}
      
      let cnt = portfolio.visits.count
      if(!cnt)
        cnt = 0
      portfolio.visits.set(ip.replace(/\./g, '-').replace(/:/g, '_'), {
        ip: ip, date: Date.now(), country: geo.country, count: cnt + 1
      })   
    }
  }

  if (!portfolio.visitsPerDay)
    portfolio.visitsPerDay = {}
  let today = date.format(new Date(Date.now()),'YYYY-MM-DD');
  let todayCount = portfolio.visitsPerDay.get(today);
  if (!todayCount)
    todayCount = 0;
  portfolio.visitsPerDay.set(today, todayCount+1);
  res.status(200).send(portfolio);
  portfolio.save()
}

const addPortfolio = async (req, res, next) => {
  // TODO: email verification error doesn't return a readable error
  const name = req.user.name + (""+Math.random()).substring(2,7);
  const foundPortfolio = await Portfolio.findOne({name});
  if(foundPortfolio){
    return next(ApiError.BadRequest('Portfolio name is already in use'));
  }

  const { templateId } = req.body

  let getTemplate = await Template.findById(templateId);

  if (!getTemplate) {
    next(ApiError.NotFound('Template not Found'));
    return;
  }

  getTemplate.id = templateId
  const portfolioSubdomain = name.toLowerCase().replace(/\s/g, '').replace(/'/, '');
  const portfolio = new Portfolio({
    name,
    url: portfolioSubdomain + '.webipie.me',
    template: getTemplate
  });

  // update User with its id
  if (req.user){
    const user = await User.updateOne({_id: req.user.id}, {portfolioID: portfolio.id}, {new: true});
  }


  await portfolio.save()
    //.catch((err) => {
      //return res.status(400).json({errors: [{ message: err.message }]});
    //});

  createDomain(portfolioSubdomain)

  console.log(portfolio);
  res.status(201).json(portfolio);

}

const editPortfolio = async (req, res, next) => {
  // getting the id
  const { id } = req.params;
  const edits = {};

  if('name' in req.body){
    const user = await User.findOne({name: req.body.name});
    if(store){
      return next(ApiError.BadRequest('Portfolio name is already in use'));
    }
  }

  // separating the updates
  for (const key in req.body) {
    if (key !== 'id') {
      edits[key] = req.body[key];
    }
  }


  const portfolio = await Portfolio.updateOne({_id: id}, { $set: edits })
    .catch((err) => {
      res.status(400).json({errors: [{ message: err.message }]});
    });

  if (portfolio){
    if (portfolio.nModified === 0) {
      next(ApiError.NotFound('No portfolios modified'));
      return;
    }
  }

  const portfolioEdited = await Portfolio.findById(id);

  res.status(200).send(portfolioEdited)

};

const changeTemplate = async (req, res, next) => {
  const { id } = req.params
  const { templateId } = req.body;
  const template = await Template.findById(templateId)

  if (!template) {
    next(ApiError.NotFound('Template not Found'));
    return;
  }
  const portfolio = await Portfolio.updateOne({_id: id}, { $set: {
    template: template
    } })
    .catch((err) => {
      res.status(400).json({errors: [{ message: err.message }]});
    });

  if (portfolio){
    if (portfolio.nModified === 0) {
      next(ApiError.NotFound('No portfolios modified'));
      return;
    }
  }
  const portfolioEdited = await Portfolio.findById(id)
  res.status(200).send(portfolioEdited)
};

module.exports = {
  getOnePortfolio,
  getPortfolioByUrl,
  getPortfolioUrls,
  addPortfolio,
  editPortfolio,
  changeTemplate
};


