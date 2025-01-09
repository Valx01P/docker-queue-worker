import express from 'express'
import authController from '../controllers/authController.js'

const router = express.Router()

// Native auth routes (email and password)
router.post('/signup', authController.signup) // update so this creates a pending user that is verified in the email code routes
router.post('/login', authController.login)

// OAuth routes
router.get('/github/login', authController.githubLogin)
router.get('/github/callback', authController.githubCallback)
router.get('/google/login', authController.googleLogin)
router.get('/google/callback', authController.googleCallback)

// Token management routes
router.post('/refresh', authController.refresh)
router.post('/logout', authController.logout)


export default router