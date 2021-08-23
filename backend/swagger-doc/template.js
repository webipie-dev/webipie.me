// GET
/**
 * @swagger
 * /template:
 *  get:
 *    description: Use to request all templates
 *    tags:
 *      - Template
 *    responses:
 *      '200':
 *        content:  # Response body
 *          application/json:  # Media type
 *           schema:
 *             $ref: '#/components/schemas/Template'    # Reference to object definition
 * components:
 *  schemas:
 *      Template:
 *                  type: object
 *                  properties:
 *                      id:
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
 */

// POST
/**
 * @swagger
 * /template:
 *  post:
 *    description: Use to add one template by admin
 *    tags:
 *      - Template
 *    parameters:
 *       - in: header
 *         name: Authorization
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *    requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              $ref: '#/components/schemas/Template'
 *    responses:
 *      '200':
 *        content:  # Response body
 *          application/json:  # Media type
 *           schema:
 *             $ref: '#/components/schemas/Template'    # Reference to object definition
 */

// UPDATE
/**
 * @swagger
 * /template/{id}:
 *  patch:
 *    description: Use to edit one template by admin
 *    tags:
 *      - Template
 *    parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: unique ID of the template to edit
 *       - in: header
 *         name: Authorization
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
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
 *             $ref: '#/components/schemas/Template'    # Reference to object definition
 */

// DELETE
/**
 * @swagger
 * /template/{id}:
 *  delete:
 *    description: Use to delete one template by admin
 *    tags:
 *      - Template
 *    parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: unique ID of the template to delete
 *       - in: header
 *         name: Authorization
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *    responses:
 *      '200':
 *        content:  # Response body
 *          application/json:  # Media type
 *           schema:
 *             $ref: '#/components/schemas/Template'    # Reference to object definition
 * 
 * 
 * /template:
 *  delete:
 *    description: Use to delete all templates by admin
 *    tags:
 *      - Template
 *    parameters:
 *       - in: header
 *         name: Authorization
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *    responses:
 *      '200':
 *        content:  # Response body
 *          application/json:  # Media type
 *           schema:
 *             $ref: '#/components/schemas/Template'    # Reference to object definition
 */
