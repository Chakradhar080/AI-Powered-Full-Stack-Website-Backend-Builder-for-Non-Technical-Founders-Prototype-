"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const pageController_1 = require("../controllers/pageController");
const router = express_1.default.Router({ mergeParams: true });
// Get all pages for a website
router.get('/', pageController_1.getAllPages);
// Create a new page
router.post('/', pageController_1.createPage);
// Get a specific page
router.get('/:id', pageController_1.getPage);
// Update a page
router.put('/:id', pageController_1.updatePage);
// Delete a page
router.delete('/:id', pageController_1.deletePage);
exports.default = router;
