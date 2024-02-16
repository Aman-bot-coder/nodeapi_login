require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); 
const AdminController = require('./controllers/adminController');
const geocodeController = require('./controllers/geocodeController')
const swaggeJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');




const app = express();
const port = 5050;

app.use(bodyParser.json());
app.use(cors()); 
const options = {
  definition:{
  openapi:'3.0.0',
  info:{
    title:'GEO LOCATION LOGS API',
    version:'1.0.0',
  },
  servers:[{
    url:'http://localhost:5050/',

  }
]
},
  apis:['./index.js']
}
const swaggerSpecs = swaggeJsDoc(options);
app.use('/api-docs',swaggerUi.serve,swaggerUi.setup(swaggerSpecs));

// Routes
/** 
 @swagger
 * /signup:
 *   post:
 *     summary: Signup method for admin
 *     description: Register a new admin
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               mobileNumber:
 *                 type: string
 *                 pattern: '^\d{10}$'
 *               adminPassword:
 *                 type: string
 *     responses:
 *       201:
 *         description: Admin registered successfully
 *       400:
 *         description: Bad request, missing or invalid parameters
 */
app.post('/signup', AdminController.signup);
/**
 * @swagger
 * /login:
 *   post:
 *     summary: Login method for admin
 *     description: Authenticate admin with mobile number and password
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               mobileNumber:
 *                 type: string
 *                 pattern: '^\d{10}$'
 *               adminPassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Unauthorized, invalid credentials
 *       500:
 *         description: Internal server error
 */
app.post('/login', AdminController.login);
/**
 * @swagger
 * /logs/ftd:
 *   post:
 *     summary: Fetch data from database by date
 *     description: Retrieve logs from the database for a specific date
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               year:
 *                 type: string
 *               month:
 *                 type: string
 *               date:
 *                 type: string
 *     responses:
 *       200:
 *         description: Logs retrieved successfully
 *       400:
 *         description: Bad request, missing or invalid parameters
 *       500:
 *         description: Internal server error
 */
app.post('/logs/ftd', geocodeController.getByDate);
/**
 * @swagger
 * /logs/mtd:
 *   post:
 *     summary: Fetch data from database by month and year
 *     description: Retrieve logs from the database for a specific month and year
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               month:
 *                 type: string
 *                 pattern: '^(0[1-9]|1[0-2])$'
 *                 description: Month in string format (e.g., "02" for February)
 *               year:
 *                 type: string
 *                 pattern: '^\d{4}$'
 *                 description: Year in string format (e.g., "2024")
 *     responses:
 *       200:
 *         description: Logs retrieved successfully
 *       400:
 *         description: Bad request, missing or invalid parameters
 *       500:
 *         description: Internal server error
 */

app.post('/logs/mtd', geocodeController.getByMonth);
/**
 * @swagger
 * /logs/ytd:
 *   post:
 *     summary: Fetch data from database by year
 *     description: Retrieve logs from the database for a specific year
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               year:
 *                 type: string
 *                 pattern: '^\d{4}$'
 *                 description: Year in string format (e.g., "2024")
 *     responses:
 *       200:
 *         description: Logs retrieved successfully
 *       400:
 *         description: Bad request, missing or invalid parameters
 *       500:
 *         description: Internal server error
 */
app.post('/logs/ytd',geocodeController.getByYear);
/**
 * @swagger
 * /logs/count:
 *   post:
 *     summary: Get the count of data
 *     description: Fetch the count of data from the logs table
 *     responses:
 *       200:
 *         description: Logs retrieved successfully
 *       400:
 *         description: Bad request, missing or invalid parameters
 *       500:
 *         description: Internal server error
 */
app.post('/logs/count',geocodeController.getCount);


app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
