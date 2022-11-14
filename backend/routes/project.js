const express = require('express');
const router = express.Router();
const projectService = require('../services/project');

const passport = require('passport');
const validateRequest = require("../middlewares/validate-request");
const validation = require("../middlewares/validation/validator");
const projectValidator = require("../middlewares/validation/project-validator");
const handleErrors = require("./error-handling");
const passportJWT = passport.authenticate('jwt', { session: false });

//get all projects
router.get('all/:portfolioId', [validation.portfolioId], validateRequest, projectService.getProjects)

// getProjectbyId
router.get('/:id', [
  validation.id
], validateRequest, handleErrors(projectService.getOneProject))

// addProject
router.post('', passportJWT, [validation.portfolioId,
  projectValidator.description,
  projectValidator.name,
], validateRequest, handleErrors(projectService.addProject));

// deleteManyProjects
router.delete('', validation.ids, passportJWT, handleErrors(projectService.deleteManyProjects));

//deleteAllProjects
router.delete('/delete', passportJWT, handleErrors(projectService.deleteAllProjects));


router.patch('/:id', passportJWT, [
  validation.id
], validateRequest , handleErrors(projectService.editOneProject))


module.exports = router;

