// app/modules/clientRegistration/clientRegistration.interface.ts
import { Model } from 'mongoose'

export type TClientStatus = 'active' | 'inactive'

export interface IClientRegistration {
  id: string
  name: string
  email?: string | null
  role: string
  mobile: string
  whatsapp?: string | null
  location?: string | null
  status?: TClientStatus
}

export type ClientRegistrationModel = Model<IClientRegistration>
