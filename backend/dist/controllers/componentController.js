"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteComponent = exports.updateComponent = exports.getComponent = exports.createComponent = exports.getAllComponents = void 0;
const Component_1 = __importDefault(require("../models/Component"));
const getAllComponents = async (req, res) => {
    try {
        const { pageId } = req.params;
        const components = await Component_1.default.find({ pageId });
        res.json({ message: 'Get all components', data: components });
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching components', error });
    }
};
exports.getAllComponents = getAllComponents;
const createComponent = async (req, res) => {
    try {
        const { pageId, type, content, styles, position, userId } = req.body;
        const component = new Component_1.default({
            pageId,
            type,
            content,
            styles,
            position,
            userId
        });
        const savedComponent = await component.save();
        res.status(201).json({ message: 'Component created successfully', data: savedComponent });
    }
    catch (error) {
        res.status(500).json({ message: 'Error creating component', error });
    }
};
exports.createComponent = createComponent;
const getComponent = async (req, res) => {
    try {
        const { id } = req.params;
        const component = await Component_1.default.findById(id);
        if (!component) {
            return res.status(404).json({ message: 'Component not found' });
        }
        res.json({ message: 'Component fetched successfully', data: component });
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching component', error });
    }
};
exports.getComponent = getComponent;
const updateComponent = async (req, res) => {
    try {
        const { id } = req.params;
        const { type, content, styles, position } = req.body;
        const component = await Component_1.default.findByIdAndUpdate(id, { type, content, styles, position }, { new: true });
        if (!component) {
            return res.status(404).json({ message: 'Component not found' });
        }
        res.json({ message: 'Component updated successfully', data: component });
    }
    catch (error) {
        res.status(500).json({ message: 'Error updating component', error });
    }
};
exports.updateComponent = updateComponent;
const deleteComponent = async (req, res) => {
    try {
        const { id } = req.params;
        const component = await Component_1.default.findByIdAndDelete(id);
        if (!component) {
            return res.status(404).json({ message: 'Component not found' });
        }
        res.json({ message: 'Component deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error deleting component', error });
    }
};
exports.deleteComponent = deleteComponent;
