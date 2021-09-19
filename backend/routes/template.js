const express = require('express');
const router = express.Router();
const templateService = require('../services/template');
const handleErrors = require("./error-handling");

const passport = require('passport');
const passportJWT = passport.authenticate('jwt', { session: false });
const isAdmin = require("../middlewares/auth_role");

//get all templates
router.get('', handleErrors(templateService.getTemplates));

// add template 
router.post('', passportJWT, isAdmin(), templateService.addTemplate);

// edit template
router.patch('/:id', passportJWT, isAdmin(), handleErrors(templateService.editTemplate));

// delete template
router.delete('/:id', passportJWT, isAdmin(), handleErrors(templateService.deleteTemplate));

// delete all templates
router.delete('/delete', passportJWT, isAdmin(), handleErrors(templateService.deleteTemplate));

module.exports = router;
