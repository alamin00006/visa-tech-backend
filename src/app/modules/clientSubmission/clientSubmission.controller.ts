import httpStatus from 'http-status'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import { clientSubmissionService } from './clientSubmission.service'

const createClientSubmission = catchAsync(async (req, res) => {
  const payload = req.body

  console.log(payload)
  const result = await clientSubmissionService.createClientSubmission(payload)

  //   if (result instanceof Error) {
  //     return sendResponse(res, {
  //       statusCode: httpStatus.BAD_REQUEST,
  //       success: false,
  //       message: result.message,
  //     })
  //   }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'CGI Data Portal submission successful! Tracking ID generated.',
    data: result,
  })
})

const getClientSubmissionsByUser = catchAsync(async (req, res) => {
  const { userId } = req.params

  const result =
    await clientSubmissionService.getClientSubmissionsByUser(userId)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Submissions retrieved successfully',
    data: result,
  })
})
const getClientAllSubmissions = catchAsync(async (req, res) => {
  const result = await clientSubmissionService.getClientAllSubmissions()

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Submissions retrieved successfully',
    data: result,
  })
})
const updateClientSubmission = catchAsync(async (req, res) => {
  const { id } = req.params
  const payload = req.body

  const result = await clientSubmissionService.updateClientSubmission(
    id,
    payload,
  )

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
    message: 'Submission updated successfully',
    data: result,
  })
})

const deleteClientSubmission = catchAsync(async (req, res) => {
  const { id } = req.params

  const result = await clientSubmissionService.deleteClientSubmission(id)

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
    message: 'Submission deleted successfully',
    data: result,
  })
})

export const clientSubmissionController = {
  createClientSubmission,
  getClientSubmissionsByUser,
  getClientAllSubmissions,
  updateClientSubmission,
  deleteClientSubmission,
}
