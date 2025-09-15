"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.getUser = exports.createUser = exports.getAllUsers = void 0;
const User_1 = __importDefault(require("../models/User"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const getAllUsers = async (req, res) => {
    try {
        const users = await User_1.default.find({}, '-password'); // Exclude password field
        res.json({ message: 'Get all users', data: users });
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching users', error });
    }
};
exports.getAllUsers = getAllUsers;
const createUser = async (req, res) => {
    try {
        const { email, password, firstName, lastName } = req.body;
        // Check if user already exists
        const existingUser = await User_1.default.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
        // Hash password
        const saltRounds = 10;
        const hashedPassword = await bcrypt_1.default.hash(password, saltRounds);
        // Create user
        const user = new User_1.default({
            email,
            password: hashedPassword,
            firstName,
            lastName
        });
        const savedUser = await user.save();
        // Remove password from response
        const userResponse = savedUser.toObject();
        delete userResponse.password;
        res.status(201).json({ message: 'User created successfully', data: userResponse });
    }
    catch (error) {
        res.status(500).json({ message: 'Error creating user', error });
    }
};
exports.createUser = createUser;
const getUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User_1.default.findById(id, '-password'); // Exclude password field
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ message: 'User fetched successfully', data: user });
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching user', error });
    }
};
exports.getUser = getUser;
const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { email, firstName, lastName } = req.body;
        const user = await User_1.default.findByIdAndUpdate(id, { email, firstName, lastName }, { new: true, select: '-password' } // Exclude password field
        );
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ message: 'User updated successfully', data: user });
    }
    catch (error) {
        res.status(500).json({ message: 'Error updating user', error });
    }
};
exports.updateUser = updateUser;
const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User_1.default.findByIdAndDelete(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ message: 'User deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error deleting user', error });
    }
};
exports.deleteUser = deleteUser;
