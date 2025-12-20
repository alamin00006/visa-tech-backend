import mongoose, { Schema } from 'mongoose'
import {
  IClientSubmission,
  ClientSubmissionModel,
} from './clientSubmission.interface'

const clientSubmissionSchema = new Schema<IClientSubmission>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },

    userId: {
      type: String,
      required: true,
    },

    userName: {
      type: String,
      required: true,
    },

    userType: {
      type: String,
      enum: ['client', 'agency'],
      required: true,
    },

    startDate: {
      type: String,
      required: true,
    },

    endDate: {
      type: String,
      required: true,
    },

    personCount: {
      type: Number,
      required: true,
      min: 1,
    },

    portalUsername: {
      type: String,
      required: true,
    },

    portalPassword: {
      type: String,
      required: true,
    },

    securityQ1: { type: String, required: true },
    securityA1: { type: String, required: true },
    securityQ2: { type: String, required: true },
    securityA2: { type: String, required: true },
    securityQ3: { type: String, required: true },
    securityA3: { type: String, required: true },

    priority: {
      type: String,
      enum: ['regular', 'high'],
      default: 'regular',
    },

    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending',
    },

    submittedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  },
)

export const ClientSubmission = mongoose.model<
  IClientSubmission,
  ClientSubmissionModel
>('ClientSubmission', clientSubmissionSchema)
