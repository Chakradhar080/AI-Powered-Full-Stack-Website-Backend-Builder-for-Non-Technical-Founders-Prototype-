"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const router = express_1.default.Router();
// Get all users
router.get('/', userController_1.getAllUsers);
// Create a new user
router.post('/', userController_1.createUser);
// Get a specific user
router.get('/:id', userController_1.getUser);
// Update a user
router.put('/:id', userController_1.updateUser);
// Delete a user
router.delete('/:id', userController_1.deleteUser);
exports.default = router;
