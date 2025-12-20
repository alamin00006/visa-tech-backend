import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { clientSubmissionController } from './clientSubmission.controller'
import { createClientSubmissionZodSchema } from './clientSubmission.validation'

const router = express.Router()

router.post(
  '/',
  //   validateRequest(createClientSubmissionZodSchema),
  clientSubmissionController.createClientSubmission,
)

router.get('/:userId', clientSubmissionController.getClientSubmissionsByUser)
router.get('/', clientSubmissionController.getClientAllSubmissions)
router.patch('/:id', clientSubmissionController.updateClientSubmission)
router.delete('/:id', clientSubmissionController.deleteClientSubmission)

export const ClientSubmissionRoutes = router
