import express from 'express'
import eventController from '../controllers/eventController.js'

const router = express.Router()

router.route('/') // /events
  .get() // get all events (public)
  .post() // create new event (admin/owner)

router.route('/:id') // /events/id
  .get() // get event by id (public)
  .put() // update event by id (admin/owner)
  .delete() // delete event by id (admin/owner)

// register/unregister for event (public)
router.post('/:id/register') // /events/id/register
router.post('/:id/unregister') // /events/id/unregister

export default router