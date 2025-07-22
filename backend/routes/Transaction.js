// import express from 'express';
// import { CreateTransaction, GetTransactions,UpdateTransaction, DeleteTransaction,TransactionMonthlySummary } from '../controllers/subscription.js';
// const router = express.Router();

// // Define the route for creating a transaction
// router.post('/', CreateTransaction);

// // Define the route for fetching all transactions
// router.get('/', GetTransactions);

// // Define the route for updating a transaction by ID
// router.put('/:id', UpdateTransaction);

// // Define the route for deleting a transaction by ID
// router.delete('/:id', DeleteTransaction);
// // Define the route for fetching monthly summary of transactions
// router.get('/transactions/monthly-summary', TransactionMonthlySummary);

// // Export the router to be used in the main app
// export default router;

import express from 'express';
import {
  CreateTransaction,
  GetTransactions,
  UpdateTransaction,
  DeleteTransaction,
  TransactionMonthlySummary
} from '../controllers/subscription.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Transactions
 *   description: Transaction management endpoints
 */

/**
 * @swagger
 * /transactions:
 *   post:
 *     summary: Create a new transaction
 *     tags: [Transactions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - amount
 *               - type
 *               - category
 *               - date
 *             properties:
 *               title:
 *                 type: string
 *                 example: Groceries
 *               amount:
 *                 type: number
 *                 example: -50
 *               type:
 *                 type: string
 *                 enum: [expense, income]
 *                 example: expense
 *               category:
 *                 type: string
 *                 example: Food
 *               date:
 *                 type: string
 *                 format: date
 *                 example: 2025-05-27
 *     responses:
 *       201:
 *         description: Transaction created successfully
 *       400:
 *         description: Invalid request
 */
router.post('/', CreateTransaction);

/**
 * @swagger
 * /transactions:
 *   get:
 *     summary: Get all transactions
 *     tags: [Transactions]
 *     responses:
 *       200:
 *         description: List of transactions
 */
router.get('/', GetTransactions);

/**
 * @swagger
 * /transactions/{id}:
 *   put:
 *     summary: Update a transaction by ID
 *     tags: [Transactions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Transaction ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               amount:
 *                 type: number
 *               type:
 *                 type: string
 *                 enum: [expense, income]
 *               category:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date
 *     responses:
 *       200:
 *         description: Transaction updated successfully
 *       404:
 *         description: Transaction not found
 */
router.put('/:id', UpdateTransaction);

/**
 * @swagger
 * /transactions/{id}:
 *   delete:
 *     summary: Delete a transaction by ID
 *     tags: [Transactions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Transaction ID
 *     responses:
 *       200:
 *         description: Transaction deleted successfully
 *       404:
 *         description: Transaction not found
 */
router.delete('/:id', DeleteTransaction);

/**
 * @swagger
 * /transactions/monthly-summary:
 *   get:
 *     summary: Get monthly summary (total spent/earned per category)
 *     tags: [Transactions]
 *     responses:
 *       200:
 *         description: Monthly summary data
 *       500:
 *         description: Server error
 */
router.get('/transactions/monthly-summary', TransactionMonthlySummary);

export default router;
