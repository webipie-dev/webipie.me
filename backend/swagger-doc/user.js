// POST
/**
 * @swagger
 * /user/signup:
 *  post:
 *    description: Use to Sign Up a user
 *    tags:
 *      - User
 *    requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              type: object
 *              properties:
 *                  name:
 *                      type: string
 *                  email:
 *                      type: string
 *                  password:
 *                      type: string
 *    responses:
 *      '200':
 *        content:  # Response body
 *          application/json:  # Media type
 *           schema:
 *                  type: object
 *                  properties:
 *                      token:
 *                          type: string
 *                          format: uuid
 *                      name:
 *                          type: string
 *                      email:
 *                          type: string
 * /user/signin:
 *  post:
 *    description: Use to sign in a user
 *    tags:
 *      - User
 *    requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              type: object
 *              properties:
 *                  name:
 *                      type: string
 *                  email:
 *                      type: string
 *                  password:
 *                      type: string
 *    responses:
 *      '200':
 *        content:  # Response body
 *          application/json:  # Media type
 *           schema:
 *             type: object
 *             properties:
 *                      token:
 *                          type: string
 *                          format: uuid
 *                      name:
 *                          type: string
 *                      email:
 *                          type: string
 *                      portfolioId:
 *                          type: string
 *                          format: uuid
 *                      verified:
 *                          type: boolean
 *
 */

// GET
/**
 * @swagger
 * /user/confirmation/{token}:
 *  get:
 *    description: Use to confirm email of a user
 *    tags:
 *      - User
 *    parameters:
 *       - in: path
 *         name: token
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: unique token of the user to confirm his email
 *    responses:
 *      '200':
 *        content:  # Response body
 *          application/json:  # Media type
 *           schema:
 *             type: object
 *             properties:
 *                  message:
 *                      type: string
 * /user/confirmation/resend/{token}:
 *  get:
 *    description: Use to resend email confirmation to a user
 *    tags:
 *      - User
 *    parameters:
 *       - in: path
 *         name: token
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: unique token of the user to confirm his email
 *    responses:
 *      '200':
 *        content:  # Response body
 *          application/json:  # Media type
 *           schema:
 *             type: object
 *             properties:
 *                  message:
 *                      type: string
 */