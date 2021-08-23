const express = require('express');
const router = express.Router();
const templateService = require('../services/template');

const passport = require('passport');
const passportJWT = passport.authenticate('jwt', { session: false });
const isAdmin = require("../middlewares/auth_role");

//get all templates
router.get('', templateService.getTemplates);

// add template 
router.post('', passportJWT, isAdmin(), templateService.addTemplate);

// edit template
router.patch('/:id', passportJWT, isAdmin(), templateService.editTemplate);

// delete template
router.delete('/:id', passportJWT, isAdmin(), templateService.deleteTemplate);

// delete all templates
router.delete('/delete', passportJWT, isAdmin(), templateService.deleteTemplate);

module.exports = router;
