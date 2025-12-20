"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtHelpers = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv/config");
const http_status_1 = __importDefault(require("http-status"));
// import { IAdminUser } from '../app/modules/adminUser/admin.user.interface'
const ApiError_1 = __importDefault(require("../errors/ApiError"));
const config_1 = __importDefault(require("../config"));
const generateToken = (user) => {
    const payload = {
        id: user.id,
        email: user === null || user === void 0 ? void 0 : user.email,
        mobile: user === null || user === void 0 ? void 0 : user.mobile,
        role: user.role,
    };
    try {
        if (config_1.default.jwt.secret == null || config_1.default.jwt.expires_in == null) {
            throw new ApiError_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, 'JWT configuration is missing');
        }
        const token = jsonwebtoken_1.default.sign(payload, config_1.default.jwt.secret, {
            expiresIn: config_1.default.jwt.expires_in,
        });
        return token;
    }
    catch (error) {
        throw new ApiError_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, `Failed to generate token: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
};
// For Admin Users
const generateTokenForAdminUsers = (user) => {
    const payload = {
        userId: user === null || user === void 0 ? void 0 : user._id,
        email: user.email,
        role: user.role,
    };
    try {
        if (config_1.default.jwt.secret == null || config_1.default.jwt.expires_in == null) {
            throw new ApiError_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, 'JWT configuration is missing');
        }
        const token = jsonwebtoken_1.default.sign(payload, config_1.default.jwt.secret, {
            expiresIn: config_1.default.jwt.expires_in,
        });
        return token;
    }
    catch (error) {
        throw new ApiError_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, `Failed to generate token: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
};
const verifyToken = (token, secret) => {
    return jsonwebtoken_1.default.verify(token, secret);
};
exports.jwtHelpers = {
    generateToken,
    generateTokenForAdminUsers,
    verifyToken,
};
