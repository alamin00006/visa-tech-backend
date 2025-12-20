import mongoose, { Schema } from 'mongoose'
import {
  IClientRegistration,
  ClientRegistrationModel,
} from './clientRegistration.interface'

const clientRegistrationSchema = new Schema<IClientRegistration>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 100,
    },

    email: {
      type: String,
      //   required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address'],
      default: null,
    },
    role: {
      type: String,
      required: true,
      trim: true,
      default: 'client',
    },

    mobile: {
      type: String,
      required: true,
      trim: true,
    },

    whatsapp: {
      type: String,
      trim: true,
      default: null,
    },
    location: {
      type: String,
      trim: true,
      default: null,
    },

    status: {
      type: String,
      enum: ['active', 'inactive'],
      default: 'active',
    },
  },
  {
    timestamps: true,
  },
)

export const ClientRegistration = mongoose.model<
  IClientRegistration,
  ClientRegistrationModel
>('ClientRegistration', clientRegistrationSchema)
