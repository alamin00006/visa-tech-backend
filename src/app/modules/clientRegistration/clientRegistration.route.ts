import express from 'express'
import { clientRegistrationController } from './clientRegistration.controller'
import auth from '../../middlewares/auth'
import { USER_ROLE } from '../../../enums/role'

const router = express.Router()

router.post('/', clientRegistrationController.createClientRegistration)
router.post('/login', clientRegistrationController.createLogin)
router
  .route('/user-info')
  .get(
    auth(USER_ROLE.CLIENT, USER_ROLE.AGENCY),
    clientRegistrationController.getUserByEmailOrMobile,
  )
router.route('/').get(clientRegistrationController.getAllUsers)

export const ClientRegistrationRoutes = router
