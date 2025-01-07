import express from 'express'
import userController from '../controllers/userController.js'
import verifyJWT from '../middleware/verifyJWT.js'

const router = express.Router()

router.route('/')
  .get()