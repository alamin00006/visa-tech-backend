"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.clientRegistrationService = void 0;
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const jwtHelpers_1 = require("../../../helpers/jwtHelpers");
const clientRegistration_model_1 = require("./clientRegistration.model");
const http_status_1 = __importDefault(require("http-status"));
const createClientRegistration = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield clientRegistration_model_1.ClientRegistration.findOne({
        $or: [
            payload.email ? { email: payload.email } : {},
            payload.mobile ? { mobile: payload.mobile } : {},
        ],
    });
    if (isExist) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Client already registered with this email or mobile number.');
    }
    const user = yield clientRegistration_model_1.ClientRegistration.create(payload);
    const token = jwtHelpers_1.jwtHelpers.generateToken(user);
    return { token, user };
});
const createLogin = (email, mobile) => __awaiter(void 0, void 0, void 0, function* () {
    if (!email || mobile) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Please provide Email or Mobile to login.');
    }
    const user = yield clientRegistration_model_1.ClientRegistration.findOne({
        $or: [email ? { email } : {}, mobile ? { mobile: mobile } : {}],
    });
    if (!user) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'No user found with the provided email or mobile.');
    }
    const unauthorizedStatuses = ['blocked', 'deactive'];
    if (unauthorizedStatuses.includes(user.status)) {
        throw new ApiError_1.default(http_status_1.default.FORBIDDEN, 'Your account is blocked or deactivated. Please contact support.');
    }
    const token = jwtHelpers_1.jwtHelpers.generateToken(user);
    return { token, user };
});
// Get Single User By Phone Number
const getUserByEmailOrMobile = (email, mobile) => __awaiter(void 0, void 0, void 0, function* () {
    if (!email && !mobile) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'This email or mobile number was not found.');
    }
    const user = yield clientRegistration_model_1.ClientRegistration.findOne({
        email: email,
        mobile: mobile,
    });
    if (!user) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'No account found with this email or mobile number.');
    }
    return user;
});
const getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield clientRegistration_model_1.ClientRegistration.find({});
    return users;
});
exports.clientRegistrationService = {
    createClientRegistration,
    createLogin,
    getUserByEmailOrMobile,
    getAllUsers,
};
