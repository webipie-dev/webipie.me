const {User} = require('../models/user');
const {sendEmail} = require('../services/email')
const {EMAIL} = require('../configuration')


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
  let content = `${name} contacted you via your webipie.me website !\nName: ${name}\nEmail: ${email}\n`
  + `Message: \n${message}`
  let emailError = sendEmail(EMAIL.USER, user.email, subject, content)
// TODO: handle email failure correctly, this always returns undefined:
  if (emailError)
    return res.status(500).send({error:'Technical Issue!, Please try again later.'});
  res.status(200).json({result: "Email sent"})
}


module.exports = {
  contactUser
};
