"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientRegistrationRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const clientRegistration_controller_1 = require("./clientRegistration.controller");
const clientRegistration_validation_1 = require("./clientRegistration.validation");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const role_1 = require("../../../enums/role");
const router = express_1.default.Router();
router.post('/', (0, validateRequest_1.default)(clientRegistration_validation_1.ClientRegistrationValidation.createClientRegistrationZodSchema), clientRegistration_controller_1.clientRegistrationController.createClientRegistration);
router.post('/login', clientRegistration_controller_1.clientRegistrationController.createLogin);
router
    .route('/user-info')
    .get((0, auth_1.default)(role_1.USER_ROLE.CLIENT, role_1.USER_ROLE.AGENCY), clientRegistration_controller_1.clientRegistrationController.getUserByEmailOrMobile);
router.route('/').get(clientRegistration_controller_1.clientRegistrationController.getAllUsers);
exports.ClientRegistrationRoutes = router;
