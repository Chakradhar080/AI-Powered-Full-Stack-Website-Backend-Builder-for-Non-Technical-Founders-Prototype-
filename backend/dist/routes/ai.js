"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const aiController_1 = require("../controllers/aiController");
const router = express_1.default.Router();
// Generate content using AI
router.post('/generate-content', aiController_1.generateContent);
// Generate image using AI
router.post('/generate-image', aiController_1.generateImage);
// Chat with AI assistant
router.post('/chat', aiController_1.chat);
// Generate code for components
router.post('/generate-code', aiController_1.generateCode);
// Optimize layout
router.post('/optimize-layout', aiController_1.optimizeLayout);
// Generate API
router.post('/generate-api', aiController_1.generateApi);
exports.default = router;
