import express from 'express'
import { clientSubmissionController } from './clientSubmission.controller'

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
