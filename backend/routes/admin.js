import express from 'express';
import { protect } from '../middlewares/auth.js';
import { authorize } from '../middlewares/authorize.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: Admin-only dashboard routes
 */

/**
 * @swagger
 * /admin/Dashboard:
 *   get:
 *     summary: Get the admin dashboard (admin only)
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully accessed admin dashboard
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Welcome to the admin dashboard
 *                 user:
 *                   type: object
 *       401:
 *         description: Unauthorized (missing or invalid token)
 *       403:
 *         description: Forbidden (not an admin user)
 */
router.get('/Dashboard', protect, authorize('admin'), (req, res) => {
  res.status(200).json({
    message: "Welcome to the admin dashboard",
    user: req.user
  });
});

export default router;
