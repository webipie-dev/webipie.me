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
const {cvUploadRoute, imageUploadRoute, videoUploadRoute} = require('./routes/upload')

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

//swagger documentation
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app
  .use(bodyParser.urlencoded({extended: true}))
  .use(bodyParser.json())
  .use('/user', userRoutes)
  .use('/portfolio', portfolioRoutes)
  .use('/project', projectRoutes)
  .use('/workexperience', workExperienceRoutes)
  .use('/volunteeringexperience', volunteeringExperienceRoutes)
  .use('/testimonial', testimonialRoutes)
  .use('/achievement', achievementRoutes)
  /*.use('/upload/cv', cvUploadRoute)
  .use('/upload/image', imageUploadRoute)
  .use('/upload/video', videoUploadRoute)*/;

module.exports = app;
