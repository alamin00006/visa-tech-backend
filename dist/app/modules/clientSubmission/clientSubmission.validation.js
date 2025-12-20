"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createClientSubmissionZodSchema = void 0;
const zod_1 = require("zod");
exports.createClientSubmissionZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        id: zod_1.z.string(),
        userId: zod_1.z.string(),
        userName: zod_1.z.string(),
        userType: zod_1.z.enum(['client', 'admin']),
        startDate: zod_1.z.string(),
        endDate: zod_1.z.string(),
        personCount: zod_1.z.number().min(1),
        portalUsername: zod_1.z.string(),
        portalPassword: zod_1.z.string(),
        securityQ1: zod_1.z.string(),
        securityA1: zod_1.z.string(),
        securityQ2: zod_1.z.string(),
        securityA2: zod_1.z.string(),
        securityQ3: zod_1.z.string(),
        securityA3: zod_1.z.string(),
        priority: zod_1.z.enum(['regular', 'high']).optional(),
        status: zod_1.z.enum(['pending', 'approved', 'rejected']).optional(),
    }),
});
