"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientSubmissionRoutes = void 0;
const express_1 = __importDefault(require("express"));
const clientSubmission_controller_1 = require("./clientSubmission.controller");
const router = express_1.default.Router();
router.post('/', 
//   validateRequest(createClientSubmissionZodSchema),
clientSubmission_controller_1.clientSubmissionController.createClientSubmission);
router.get('/:userId', clientSubmission_controller_1.clientSubmissionController.getClientSubmissionsByUser);
router.get('/', clientSubmission_controller_1.clientSubmissionController.getClientAllSubmissions);
router.patch('/:id', clientSubmission_controller_1.clientSubmissionController.updateClientSubmission);
router.delete('/:id', clientSubmission_controller_1.clientSubmissionController.deleteClientSubmission);
exports.ClientSubmissionRoutes = router;
