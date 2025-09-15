"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const componentController_1 = require("../controllers/componentController");
const router = express_1.default.Router({ mergeParams: true });
// Get all components for a page
router.get('/', componentController_1.getAllComponents);
// Create a new component
router.post('/', componentController_1.createComponent);
// Get a specific component
router.get('/:id', componentController_1.getComponent);
// Update a component
router.put('/:id', componentController_1.updateComponent);
// Delete a component
router.delete('/:id', componentController_1.deleteComponent);
exports.default = router;
