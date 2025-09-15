"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const deploymentController_1 = require("../controllers/deploymentController");
const router = express_1.default.Router();
// Deploy website
router.post('/deploy', deploymentController_1.deployWebsite);
// Get deployment status
router.get('/status/:deploymentId', deploymentController_1.getDeploymentStatus);
exports.default = router;
