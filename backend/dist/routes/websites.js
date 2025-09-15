"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const websiteController_1 = require("../controllers/websiteController");
const router = express_1.default.Router();
// Get all websites
router.get('/', websiteController_1.getAllWebsites);
// Create a new website
router.post('/', websiteController_1.createWebsite);
// Get a specific website
router.get('/:id', websiteController_1.getWebsite);
// Update a website
router.put('/:id', websiteController_1.updateWebsite);
// Delete a website
router.delete('/:id', websiteController_1.deleteWebsite);
exports.default = router;
