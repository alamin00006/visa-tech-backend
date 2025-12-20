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
exports.clientSubmissionController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const clientSubmission_service_1 = require("./clientSubmission.service");
const createClientSubmission = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = req.body;
    console.log(payload);
    const result = yield clientSubmission_service_1.clientSubmissionService.createClientSubmission(payload);
    //   if (result instanceof Error) {
    //     return sendResponse(res, {
    //       statusCode: httpStatus.BAD_REQUEST,
    //       success: false,
    //       message: result.message,
    //     })
    //   }
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'CGI Data Portal submission successful! Tracking ID generated.',
        data: result,
    });
}));
const getClientSubmissionsByUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    const result = yield clientSubmission_service_1.clientSubmissionService.getClientSubmissionsByUser(userId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Submissions retrieved successfully',
        data: result,
    });
}));
const getClientAllSubmissions = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield clientSubmission_service_1.clientSubmissionService.getClientAllSubmissions();
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Submissions retrieved successfully',
        data: result,
    });
}));
const updateClientSubmission = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const payload = req.body;
    const result = yield clientSubmission_service_1.clientSubmissionService.updateClientSubmission(id, payload);
    if (result instanceof Error) {
        return (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.BAD_REQUEST,
            success: false,
            message: result.message,
        });
    }
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Submission updated successfully',
        data: result,
    });
}));
const deleteClientSubmission = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield clientSubmission_service_1.clientSubmissionService.deleteClientSubmission(id);
    if (result instanceof Error) {
        return (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.BAD_REQUEST,
            success: false,
            message: result.message,
        });
    }
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Submission deleted successfully',
        data: result,
    });
}));
exports.clientSubmissionController = {
    createClientSubmission,
    getClientSubmissionsByUser,
    getClientAllSubmissions,
    updateClientSubmission,
    deleteClientSubmission,
};
