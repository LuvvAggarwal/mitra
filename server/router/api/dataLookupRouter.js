const router = require('express').Router();
// const { attachments } = require('../../config/takeConfig');/
// const AuthController = require('../../controllers/AuthController');
const dataLookupController = require('../../controllers/DataLookupController');
const auth = require('../../utils/auth');
const { upload } = require('../../utils/multerUtil');

// NO AUTHENTICATION FOR DL
/**
 * @swagger
 * /dataLookup/countries:
 *   get:
 *     tags:
 *       - data_lookup
 *     description: Get Countries
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: all countries
 *         schema:
 *           $ref: '#/definitions/data_lookup'
 */
router.get('/countries', dataLookupController.getCountries);

/**
 * @swagger
 * /dataLookup/states/{id}:
 *   get:
 *     tags:
 *       - data_lookup
 *     description: Get States of country
 *     produces:
 *       - application/json
 *     parameters:
 *      - name: id
 *        description: id of country
 *        in: path
 *        required: true
 *        schema: 
 *          type: string
 *          format: uuid
 *     responses:
 *       200:
 *         description: all states of country
 *         schema:
 *           $ref: '#/definitions/data_lookup'
 */
router.get('/states/:id', dataLookupController.getStates);

/**
 * @swagger
 * /dataLookup/cities/{id}:
 *   get:
 *     tags:
 *       - data_lookup
 *     description: Get cities of state
 *     produces:
 *       - application/json
 *     parameters:
 *      - name: id
 *        description: id of state
 *        in: path
 *        required: true
 *        schema: 
 *          type: string
 *          format: uuid
 *     responses:
 *       200:
 *         description: all cities of state
 *         schema:
 *           $ref: '#/definitions/data_lookup'
 */
router.get('/cities/:id', dataLookupController.getCities);

/**
 * @swagger
 * /dataLookup/model/{model}:
 *   get:
 *     tags:
 *       - data_lookup
 *     description: Get Data from model
 *     produces:
 *       - application/json
 *     parameters:
 *      - name: model
 *        description: model to get data from. Its value can be /help_type|post_category|problem_category|countries/
 *        in: path
 *        required: true
 *        schema: 
 *          type: string
 *     responses:
 *       200:
 *         description: Get Data from model
 *         schema:
 *           $ref: '#/definitions/data_lookup'
 */
router.get('/model/:model', dataLookupController.getDL);


/**
 * @swagger
 * /dataLookup/model/{model}/name/{name}:
 *   get:
 *     tags:
 *       - data_lookup
 *     description: Get Data from model
 *     produces:
 *       - application/json
 *     parameters:
 *      - name: model
 *        description: model to get data from. Its value can be /help_type|post_category|problem_category|countries/
 *        in: path
 *        required: true
 *        schema: 
 *          type: string
 *      - name: name
 *        description: name for filtering data
 *        in: path
 *        required: true
 *        schema: 
 *          type: string
 *     responses:
 *       200:
 *         description: Get Data from model
 *         schema:
 *           $ref: '#/definitions/dataLookup'
 */
router.get('/model/:model/name/:name', dataLookupController.getDLData);

module.exports = router;
