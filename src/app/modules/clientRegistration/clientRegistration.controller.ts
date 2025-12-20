import httpStatus from 'http-status'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import { clientRegistrationService } from './clientRegistration.service'

const createClientRegistration = catchAsync(async (req, res) => {
  const payload = req.body

  const result =
    await clientRegistrationService.createClientRegistration(payload)

  if (result instanceof Error) {
    return sendResponse(res, {
      statusCode: httpStatus.BAD_REQUEST,
      success: false,
      message: result.message,
    })
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Client registered successfully!',
    data: result,
  })
})

const createLogin = catchAsync(async (req, res) => {
  const { email, mobile } = req.body

  // Call the login service
  const result = await clientRegistrationService.createLogin(email, mobile)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Logged in successfully',
    data: result,
  })
})

const getUserByEmailOrMobile = catchAsync(async (req, res) => {
  const email = req?.user?.email
  const mobile = req?.user?.mobile

  const userData = await clientRegistrationService.getUserByEmailOrMobile(
    email,
    mobile,
  )

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'get Success',
    data: userData,
  })
})
const getAllUsers = catchAsync(async (req, res) => {
  const users = await clientRegistrationService.getAllUsers()

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'get Success',
    data: users,
  })
})

export const clientRegistrationController = {
  createClientRegistration,
  createLogin,
  getUserByEmailOrMobile,
  getAllUsers,
}
