// app/modules/clientRegistration/clientRegistration.interface.ts
import { Model } from 'mongoose'

export type TClientStatus = 'active' | 'inactive'

export interface IClientRegistration {
  id: string
  name: string
  email?: string
  role: string
  mobile: string
  whatsapp?: string
  location?: string
  status?: TClientStatus
}

export type ClientRegistrationModel = Model<IClientRegistration>
