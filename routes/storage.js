const express = require("express");
const router = express.Router();
const uploadMiddleware = require('../utils/storage.handler')
const {  getItems, getItem ,createItem, deleteItem } = require("../controllers/storage");
const { getItemValidator } = require("../validators/storage");

/**
 * Get all storages
 * @openapi
 * /storage:
 *    get:
 *      tags:
 *        - storage
 *      summary: "List all storages"
 *      description: Get all storages and list them
 *      security:
 *        - bearerAuth: []
 *      responses:
 *        '200':
 *          description: Returns the object´s list
 *          content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/storage'
 *        '422':
 *          description: Validation error
 */

router.get('/', getItems);

/**
 * Get detail from storage
 * @openapi
 * /storage/{id}:
 *    get:
 *      tags:
 *        - storage
 *      summary: Get storage
 *      description: Get storage details by ID
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *      - name: id
 *        in: path
 *        description: storage ID
 *        required: true
 *        schema:
 *          type: string
 *      responses:
 *        '200':
 *          description: Storage object
 *          content:
 *             application/json:
 *               schema:
 *                   $ref: '#/components/schemas/storage'
 *        '422':
 *          description: Validation error
 */

router.get('/:id', getItemValidator, getItem);

/**
 * Upload file
 * @openapi
 * /storage:
 *    post:
 *      tags:
 *        - storage
 *      summary: Upload file
 *      description: Uplodad a file
 *      security:
 *        - bearerAuth: []
 *      responses:
 *        '200':
 *          description: Returns the object uploaded
 *        '422':
 *          description: Validation error
 *      requestBody:
 *        content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               myFile:
 *                 type: string
 *                 format: binary
 *    responses:
 *      '201':
 *        description: Object uploaded'
 *      '403':
 *        description: You don´t have permissions
 */

router.post("/", uploadMiddleware.single("myFile"), createItem);

/**
 * Delete storage
 * @openapi
 * /storage/{id}:
 *    delete:
 *      tags:
 *        - storage
 *      summary: Delete storage
 *      description: Delete a storage by ID
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *      - name: id
 *        in: path
 *        description: Storage ID
 *        required: true
 *        schema:
 *          type: string
 *      responses:
 *        '200':
 *          description: Returns object storage
 *        '422':
 *          description: You don´t have permissions
 */

router.delete('/:id', getItemValidator, deleteItem);

module.exports = router;