import express from 'express'
import emailTemplateController from '../controllers/emailTemplateController.js'

const router = express.Router()

router.route('/') // /email_templates
  .get() // get all email templates (admin/owner)
  .post() // create new email template (admin/owner)

router.route('/:id') // /email_templates/id
  .get() // get email template by id (admin/owner)
  .put() // update email template by id (admin/owner)
  .delete() // delete email template by id (admin/owner)

// send emails with template by id (admin/owner)
router.post('/:id/send') // /email_templates/id/send

export default router