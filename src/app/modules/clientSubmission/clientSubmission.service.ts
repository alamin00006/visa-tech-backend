import ApiError from '../../../errors/ApiError'
import { IClientSubmission } from './clientSubmission.interface'
import { ClientSubmission } from './clientSubmission.model'
import httpStatus from 'http-status'

const createClientSubmission = async (
  payload: IClientSubmission,
): Promise<IClientSubmission | Error> => {
  const isExist = await ClientSubmission.findOne({ id: payload.id })

  if (isExist) {
    return new Error('Submission already exists')
  }

  const result = await ClientSubmission.create(payload)
  return result
}

const getClientSubmissionsByUser = async (userId: string) => {
  return ClientSubmission.find({ userId }).sort({ createdAt: -1 })
}
const getClientAllSubmissions = async () => {
  return ClientSubmission.find({}).sort({ createdAt: -1 })
}
const updateClientSubmission = async (
  id: string,
  payload: Partial<IClientSubmission>,
) => {
  if (!id) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Please provide Submission ID to update.',
    )
  }

  return ClientSubmission.updateOne(
    { id: id },
    { $set: payload },
    { upsert: true },
  )
}

const deleteClientSubmission = async (id: string) => {
  if (!id) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Please provide Submission ID to delete.',
    )
  }

  return ClientSubmission.deleteOne({ id: id })
}

export const clientSubmissionService = {
  createClientSubmission,
  getClientSubmissionsByUser,
  getClientAllSubmissions,
  updateClientSubmission,
  deleteClientSubmission,
}
