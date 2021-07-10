// GET
/**
 * @swagger
 * /portfolio/{id}:
 *  get:
 *    description: Use to request a portfolio by its id
 *    tags:
 *      - Portfolio
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *           type: string
 *           format: uuid
 *        required: true
 *        description: unique ID of the portfolio to get
 *    responses:
 *      '200':
 *        content:  # Response body
 *          application/json:  # Media type
 *           schema:
 *             $ref: '#/components/schemas/Portfolio'    # Reference to object definition
 * components:
 *  schemas:
 *      Portfolio:      # Object definition
 *          type: object
 *          properties:
 *              id:
 *                  type: uuid
 *              description:
 *                  type: string
 *              name:
 *                  type: string
 *              phoneNumber:
 *                  type: string
 *              github:
 *                  type: string
 *              linkedIn: 
 *                  type: string
 *              CV:
 *                  type: string
 *              creationData:
 *                  type: string
 *                  format: date
 *              template:
 *                  type: object
 *                  properties:
 *                      _id:
 *                         type: string
 *                         format: uuid
 *                      name:
 *                          type: string
 *                      header:
 *                          type: object
 *                          example: {img: http://localhost:8000/backend/images/carbon.png, title: tata, description: tata, mainButton: tata }
 *                      colorChart:
 *                          type: object
 *                      colorChartOptions:
 *                          type: array
 *                          example: ['aa','bb']
 *                      font:
 *                          type: string
 *                      fontOptions:
 *                          type: array
 *                          example: ['aa','bb']
 *
 *
 *
 * /portfolio/url/{url}:
 *  get:
 *    description: Use to request one portfolio by url
 *    tags:
 *      - Portfolio
 *    parameters:
 *       - in: path
 *         name: url
 *         schema:
 *           type: string
 *         required: true
 *         description: unique url of the store to get
 *    responses:
 *      '200':
 *        content:  # Response body
 *          application/json:  # Media type
 *           schema:
 *             $ref: '#/components/schemas/Portfolio'    # Reference to object definition
 * 
 * /portfolio/all/names:
 *  get:
 *    description: Use to request one portfolio by url
 *    tags:
 *      - Portfolio
 *    parameters:
 *       - in: path
 *         name: url
 *         schema:
 *           type: string
 *         required: true
 *         description: unique url of the store to get
 *    responses:
 *      '200':
 *        content:  # Response body
 *          application/json:  # Media type
 *           schema:
 *             type: array
 *             items:
 *                  type: string
 * 
 */

// POST
/**
 * @swagger
 * /portfolio:
 *  post:
 *    description: Use to add one portfolio
 *    tags:
 *      - Portfolio
 *    requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              type: object
 *              properties:
 *                  name:
 *                      type: string
 *                  description:
 *                      type: string
 *                  templateId:
 *                      type: string
 *                      format: uuid
 *    responses:
 *      '200':
 *        content:  # Response body
 *          application/json:  # Media type
 *           schema:
 *             $ref: '#/components/schemas/Portfolio'    # Reference to object definition
 */


// UPDATE
/**
 * @swagger
 * /portfolio/{id}:
 *  patch:
 *    description: Use to edit one portfolio
 *    tags:
 *      - Portfolio
 *    parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: unique ID of the portfolio to edit
 *    requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              type: object
 *              example: {'template.font': Monsserat, name: 'name one'}
 *    responses:
 *      '200':
 *        content:  # Response body
 *          application/json:  # Media type
 *           schema:
 *             $ref: '#/components/schemas/Portfolio'    # Reference to object definition
 */

