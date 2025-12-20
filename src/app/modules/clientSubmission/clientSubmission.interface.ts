import { Model } from 'mongoose'

export type TUserType = 'client' | 'admin'
export type TPriority = 'regular' | 'high'
export type TStatus = 'pending' | 'approved' | 'rejected'

export interface IClientSubmission {
  id: string
  userId: string
  userName: string
  userType: TUserType

  startDate: string
  endDate: string
  personCount: number

  portalUsername: string
  portalPassword: string

  securityQ1: string
  securityA1: string
  securityQ2: string
  securityA2: string
  securityQ3: string
  securityA3: string

  priority: TPriority
  status: TStatus
  submittedAt?: Date
}

export type ClientSubmissionModel = Model<IClientSubmission>
