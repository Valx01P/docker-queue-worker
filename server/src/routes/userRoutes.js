import express from 'express'
import userController from '../controllers/userController.js'

const router = express.Router()

router.get('/') // /users

router.route('/:id') // /users/id
  .get() // get user by id (admin/owner)
  .put() // update user by id (admin/owner)
  .delete() // delete user by id (only user)

// ensure user is onboarded (public)
router.put('/:id/onboard') // /users/id/onboard
// ban user (admin/owner)
router.put('/:id/ban') // /users/id/ban
// unban user (admin/owner)
router.put('/:id/unban') // /users/id/unban
// update user role (admin/owner)
router.put('/:id/role') // /users/id/role