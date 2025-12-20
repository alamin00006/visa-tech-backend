import jwt, { JwtPayload } from 'jsonwebtoken'
import 'dotenv/config'

import httpStatus from 'http-status'

// import { IAdminUser } from '../app/modules/adminUser/admin.user.interface'
import ApiError from '../errors/ApiError'
import config from '../config'
import { IClientRegistration } from '../app/modules/clientRegistration/clientRegistration.interface'

const generateToken = (user: IClientRegistration) => {
  const payload: JwtPayload = {
    id: user.id,
    email: user?.email,
    mobile: user?.mobile,
    role: user.role,
  }

  try {
    if (config.jwt.secret == null || config.jwt.expires_in == null) {
      throw new ApiError(
        httpStatus.INTERNAL_SERVER_ERROR,
        'JWT configuration is missing',
      )
    }

    const token = jwt.sign(payload, config.jwt.secret, {
      expiresIn: config.jwt.expires_in,
    } as jwt.SignOptions)

    return token
  } catch (error) {
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      `Failed to generate token: ${error instanceof Error ? error.message : 'Unknown error'}`,
    )
  }
}

// For Admin Users

const generateTokenForAdminUsers = (user: any) => {
  const payload = {
    userId: user?._id,
    email: user.email,
    role: user.role,
  }

  try {
    if (config.jwt.secret == null || config.jwt.expires_in == null) {
      throw new ApiError(
        httpStatus.INTERNAL_SERVER_ERROR,
        'JWT configuration is missing',
      )
    }

    const token = jwt.sign(payload, config.jwt.secret, {
      expiresIn: config.jwt.expires_in,
    } as jwt.SignOptions)

    return token
  } catch (error) {
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      `Failed to generate token: ${error instanceof Error ? error.message : 'Unknown error'}`,
    )
  }
}

const verifyToken = (token: string, secret: string) => {
  return jwt.verify(token, secret)
}

export const jwtHelpers = {
  generateToken,

  generateTokenForAdminUsers,
  verifyToken,
}
