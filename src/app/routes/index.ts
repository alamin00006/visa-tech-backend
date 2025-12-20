import express from 'express'
import { ClientRegistrationRoutes } from '../modules/clientRegistration/clientRegistration.route'
import { ClientSubmissionRoutes } from '../modules/clientSubmission/clientSubmission.route'
const router = express.Router()

const moduleRoutes = [
  {
    path: '/client-registration',
    route: ClientRegistrationRoutes,
  },
  {
    path: '/client-submission',
    route: ClientSubmissionRoutes,
  },
]

moduleRoutes.forEach(route => router.use(route.path, route.route))
export default router
