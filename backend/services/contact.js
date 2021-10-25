const {User} = require('../models/user');
const {sendEmail} = require('../services/email')
const {sendSlackMessage} = require('../services/slack')
const {EMAIL} = require('../configuration')

const contact = function(name, email, receiverEmail, message, subject) {
  let content = `${name} contacted you via your webipie.me website !\nName: ${name}\nEmail: ${email}\n`
  + `Message: \n${message}`
  let emailError = sendEmail(EMAIL.USER, receiverEmail, subject, content)
  return emailError
}

const contactUser = async (req, res, next) => {
  let { portfolioID, name, email, message, subject } = req.body

  let user = null;
  try{
    user = await User.findOne({portfolioID});
  }
  catch(err){
    res.status(404).json({error: "Wrong user information"});
    return
  }
  if (!user){
    res.status(404).json({error: "User not found"});
    return
  }
  if (!user.email){
    res.status(404).json({error: "User email not found"});
    return
  }
  let emailError = contact(name, email, user.email, message, subject)
  
  // TODO: handle email failure correctly, this always returns undefined:
  if (emailError)
  return res.status(500).send({error:'Technical Issue!, Please try again later.'});
  res.status(200).json({result: "Email sent"})
}

const contactSupport = async (req, res, next) => {
  let { email, name, message, subject } = req.body
  let emailError = contact(name, email, EMAIL.SUPPORT, message, subject)
  sendSlackMessage(`Support request: name: ${name}\nemail: ${email}\nsubject: ${subject}\n message: ${message}`)
  
  // TODO: handle email failure correctly, this always returns undefined:
  if (emailError)
    return res.status(500).send({error:'Technical Issue!, Please try again later.'});
  res.status(200).json({result: "Email sent"})
}

const contactRequestDomain = async (req, res, next) => {
  let { portfolioID, domain, email, name } = req.body

  let user = null;
  try{
    user = await User.findOne({portfolioID});
  }
  catch(err){
    res.status(404).json({error: "Wrong user information"});
    return
  }
  if (!user){
    res.status(404).json({error: "User not found"});
    return
  }
  let content = `${name} wants to create a custom domain name and link it to his portfolio with ID: ${portfolioID}\ndomain: ${domain}\nemail: ${email}\n`
  let emailError = sendEmail(EMAIL.USER, EMAIL.SUPPORT, 'Domain name request', content)
  sendSlackMessage(`Domain Name Request: ${content}`)
  
  // TODO: handle email failure correctly, this always returns undefined:
  if (emailError)
    return res.status(500).send({error:'Technical Issue!, Please try again later.'});
  res.status(200).json({result: "Email sent"})
}


module.exports = {
  contactUser,
  contactSupport,
  contactRequestDomain
};
