"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const clientRegistration_route_1 = require("../modules/clientRegistration/clientRegistration.route");
const clientSubmission_route_1 = require("../modules/clientSubmission/clientSubmission.route");
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: '/client-registration',
        route: clientRegistration_route_1.ClientRegistrationRoutes,
    },
    {
        path: '/client-submission',
        route: clientSubmission_route_1.ClientSubmissionRoutes,
    },
];
moduleRoutes.forEach(route => router.use(route.path, route.route));
exports.default = router;
