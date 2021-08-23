const {User} = require('../models/user');
const {sendEmail} = require('../services/email')
const {EMAIL} = require('../configuration')


const contactUser = async (req, res, next) => {
  let { userID, name, email, message, subject } = req.body
  const user = await User.findById(userID);
  if (!user.local.email){
    res.status(404).json({error: "User email not found"});
    return
  }
  let content = `${name} contacted you via your webipie.me website !\nName: ${name}\nEmail: ${email}\n`
  + `Message: \n${message}`
  let emailError = sendEmail(EMAIL.USER, user.local.email, subject, content)
// TODO: handle email failure correctly, this always returns undefined:
  if (emailError)
    return res.status(500).send({error:'Technical Issue!, Please try again later.'});
  res.status(200).json({result: "Email sent"})
}


module.exports = {
  contactUser
};
