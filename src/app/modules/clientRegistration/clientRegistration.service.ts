import ApiError from '../../../errors/ApiError'
import { jwtHelpers } from '../../../helpers/jwtHelpers'
import { IClientRegistration } from './clientRegistration.interface'
import { ClientRegistration } from './clientRegistration.model'
import httpStatus from 'http-status'
const createClientRegistration = async (payload: IClientRegistration) => {
  const orConditions = []

  if (payload.email) {
    orConditions.push({ email: payload.email })
  }

  if (payload.mobile) {
    orConditions.push({ mobile: payload.mobile })
  }

  let isExist = null

  if (orConditions.length > 0) {
    isExist = await ClientRegistration.findOne({
      $or: orConditions,
    })
  }

  if (isExist) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Client already registered with this email or mobile number.',
    )
  }

  const user = await ClientRegistration.create(payload)
  const token = jwtHelpers.generateToken(user)

  return { token, user }
}

const createLogin = async (email: string, mobile: string) => {
  if (!email || mobile) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Please provide Email or Mobile to login.',
    )
  }

  const user = await ClientRegistration.findOne({
    $or: [email ? { email } : {}, mobile ? { mobile: mobile } : {}],
  })
  if (!user) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      'No user found with the provided email or mobile.',
    )
  }

  const unauthorizedStatuses = ['blocked', 'deactive']

  if (unauthorizedStatuses.includes(user.status as string)) {
    throw new ApiError(
      httpStatus.FORBIDDEN,
      'Your account is blocked or deactivated. Please contact support.',
    )
  }

  const token = jwtHelpers.generateToken(user)

  return { token, user }
}

// Get Single User By Phone Number
const getUserByEmailOrMobile = async (email: string, mobile: string) => {
  if (!email && !mobile) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      'This email or mobile number was not found.',
    )
  }

  const user = await ClientRegistration.findOne({
    email: email,
    mobile: mobile,
  })
  if (!user) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      'No account found with this email or mobile number.',
    )
  }

  return user
}
const getAllUsers = async () => {
  const users = await ClientRegistration.find({})

  return users
}

export const clientRegistrationService = {
  createClientRegistration,
  createLogin,
  getUserByEmailOrMobile,
  getAllUsers,
}
