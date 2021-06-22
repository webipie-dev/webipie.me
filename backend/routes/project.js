const express = require('express');
const router = express.Router();
const projectService = require('../services/project');

const passport = require('passport');
const validateRequest = require("../middlewares/validate-request");
const validation = require("../middlewares/validation/validator");
const projectValidator = require("../middlewares/validation/project-validator");
const passportJWT = passport.authenticate('jwt', { session: false });
// passportJWT.unless = require('express-unless');



//get all projects
router.get('', projectService.getProjects)

// getProjectbyId
router.get('/:id', [
  validation.id
], validateRequest, projectService.getOneProject)

// addProject
router.post('', passportJWT, [validation.portfolioId,
  projectValidator.description,
  projectValidator.name,
], validateRequest, projectService.addProject);

// deleteManyProjects
router.delete('', validation.ids, passportJWT, projectService.deleteManyProjects);

//deleteAllProjects
router.delete('/delete', passportJWT, projectService.deleteAllProjects);


router.patch('/:id', passportJWT, [
  validation.id
], validateRequest , projectService.editOneProject)


module.exports = router;

