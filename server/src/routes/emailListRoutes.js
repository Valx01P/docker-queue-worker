import express from 'express'
import emailListController from '../controllers/emailListController.js'

const router = express.Router()

// view email list (admin/owner)
router.get('/', ) // /email_list

// subscribe to email list (public)
router.post('/subscribe', ) // /email_list/subscribe

// unsubscribe from email list (public)
router.post('/unsubscribe', ) // /email_list/unsubscribe

// remove user from email list (admin/owner)
router.delete('/:userId', ) // /email_list/userId

export default router