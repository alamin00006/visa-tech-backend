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
exports.clientSubmissionService = void 0;
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const clientSubmission_model_1 = require("./clientSubmission.model");
const http_status_1 = __importDefault(require("http-status"));
const createClientSubmission = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield clientSubmission_model_1.ClientSubmission.findOne({ id: payload.id });
    if (isExist) {
        return new Error('Submission already exists');
    }
    const result = yield clientSubmission_model_1.ClientSubmission.create(payload);
    return result;
});
const getClientSubmissionsByUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    return clientSubmission_model_1.ClientSubmission.find({ userId }).sort({ createdAt: -1 });
});
const getClientAllSubmissions = () => __awaiter(void 0, void 0, void 0, function* () {
    return clientSubmission_model_1.ClientSubmission.find({}).sort({ createdAt: -1 });
});
const updateClientSubmission = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    if (!id) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Please provide Submission ID to update.');
    }
    return clientSubmission_model_1.ClientSubmission.updateOne({ id: id }, { $set: payload }, { upsert: true });
});
const deleteClientSubmission = (id) => __awaiter(void 0, void 0, void 0, function* () {
    if (!id) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Please provide Submission ID to delete.');
    }
    return clientSubmission_model_1.ClientSubmission.deleteOne({ id: id });
});
exports.clientSubmissionService = {
    createClientSubmission,
    getClientSubmissionsByUser,
    getClientAllSubmissions,
    updateClientSubmission,
    deleteClientSubmission,
};
