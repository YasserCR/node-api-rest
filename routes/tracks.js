const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/session.middleware");
const checkRolMiddleware = require("../middleware/rol.middleware");
const { getItems, getItem, createItem, updateItem, deleteItem } = require("../controllers/tracks");
const { createItemValidator, getItemValidator } = require("../validators/tracks");

/**
 * Get all tracks
 * @openapi
 * /tracks:
 *    get:
 *      tags:
 *        - tracks
 *      summary: List tracks
 *      description: Get a list of all tracks
 *      security:
 *        - bearerAuth: []
 *      responses:
 *        '200':
 *          description: Returns a tracks list
 *          content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/track'
 *        '422':
 *          description: Validation error
 */

router.get("/", getItems);

/**
 * Get track
 * @openapi
 * /tracks/{id}:
 *    get:
 *      tags:
 *        - tracks
 *      summary: Get a track
 *      description: Get track details by ID
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *      - name: id
 *        in: path
 *        description: Track ID
 *        required: true
 *        schema:
 *          type: string
 *      responses:
 *        '200':
 *          description: Returns track object
 *          content:
 *             application/json:
 *               schema:
 *                   $ref: '#/components/schemas/track'
 *        '422':
 *          description: Validation error
 */

router.get('/:id', getItemValidator, getItem);

/**
 * Register new track
 * @openapi
 * /tracks:
 *    post:
 *      tags:
 *        - tracks
 *      summary: "Register track"
 *      description: Register a new track
 *      security:
 *        - bearerAuth: []
 *      responses:
 *        '200':
 *          description: Returns track registered
 *        '422':
 *          description: Validation error
 *      requestBody:
 *          content:
 *            application/json:
 *              schema:
 *                 $ref: "#/components/schemas/track"
 *    responses:
 *      '201':
 *        description: Returns track registered
 *      '403':
 *        description: You don´t have permissions
 */

router.post('/', authMiddleware, checkRolMiddleware(["admin", "user"]), createItemValidator, createItem);

/**
 * Update track
 * @openapi
 * /tracks/{id}:
 *    put:
 *      tags:
 *        - tracks
 *      summary: Update track
 *      description: Update track and get details
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *      - name: id
 *        in: path
 *        description: Track ID
 *        required: true
 *        schema:
 *          type: string
 *      responses:
 *        '200':
 *          description: Returns the track updated
 *        '422':
 *          description: Validatrio error
 *      requestBody:
 *          content:
 *            application/json:
 *              schema:
 *                 $ref: "#/components/schemas/track"
 *    responses:
 *      '201':
 *        description: Returns track object
 *        content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/track'
 *      '403':
 *        description: You don´t have permissions
 */

router.put('/:id', authMiddleware, getItemValidator, createItemValidator, updateItem);

/**
 * Delete track
 * @openapi
 * /tracks/{id}:
 *    delete:
 *      tags:
 *        - tracks
 *      summary: Delete a track
 *      description: Delete a track by ID
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *      - name: id
 *        in: path
 *        description: Track ID
 *        required: true
 *        schema:
 *          type: string
 *      responses:
 *        '200':
 *          description: Returns the track Object
 *        '422':
 *          description: VFalidation error
 */

router.delete('/:id', authMiddleware, getItemValidator, deleteItem);

module.exports = router;