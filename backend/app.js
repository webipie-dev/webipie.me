const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");


const app = express();


const userRoutes = require('./routes/user');
const projectRoutes = require('./routes/project');
const portfolioRoutes = require('./routes/portfolio');
const workExperienceRoutes = require('./routes/work_experience');
const volunteeringExperienceRoutes = require('./routes/volunteering_experience');
const achievementRoutes = require('./routes/achievement');
const testimonialRoutes = require('./routes/testimonial');
const healthcheckRoutes = require('./routes/healthCheck');
const fileUploadRoutes = require('./routes/upload');
const templateRoutes = require('./routes/template');
const softSkillsRoutes = require('./routes/soft_skill');
const technicalSkillsRoutes = require('./routes/technical_skill');
const educationRoutes = require('./routes/education');
const contactRoutes = require('./routes/contact');
const errorHandler = require('./middlewares/error-handler');

// Extended: https://swagger.io/specification/#infoObject
const swaggerOptions = {
    swaggerDefinition: {
      openapi: '3.0.3',
      components: {},
      info: {
        version: "1.0.0",
        title: "Webipie API",
        description: "Webipie API Information",
        servers: ["http://localhost:8000"]
      }
    },
    apis: ["./swagger-doc/*.js"]
  };


app.use(cors());
app.use(express.static('./public'));
app.use('/uploads', express.static('uploads'));

//swagger documentation
const swaggerDocs = swaggerJsDoc(swaggerOptions);

app
  .use(bodyParser.urlencoded({extended: true}))
  .use(bodyParser.json({  extended: true }))
  .use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))
  .use('/user', userRoutes)
  .use('/portfolio', portfolioRoutes)
  .use('/project', projectRoutes)
  .use('/workexperience', workExperienceRoutes)
  .use('/volunteeringexperience', volunteeringExperienceRoutes)
  .use('/softskills', softSkillsRoutes)
  .use('/testimonial', testimonialRoutes)
  .use('/achievement', achievementRoutes)
  .use('/health_check', healthcheckRoutes)
  .use('/upload', fileUploadRoutes)
  .use('/template', templateRoutes)
  .use('/education', educationRoutes)
  .use('/technicalskills', technicalSkillsRoutes)
  .use('/contact', contactRoutes)
  .use(errorHandler)
  .use(function (err, req, res, next) {
    res.status(500);
    res.send("Oops, something went wrong.")
});


module.exports = app;
