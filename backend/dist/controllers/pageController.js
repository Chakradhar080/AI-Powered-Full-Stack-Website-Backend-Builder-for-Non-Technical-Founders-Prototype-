"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePage = exports.updatePage = exports.getPage = exports.createPage = exports.getAllPages = void 0;
const Page_1 = __importDefault(require("../models/Page"));
const Component_1 = __importDefault(require("../models/Component"));
const getAllPages = async (req, res) => {
    try {
        const { websiteId } = req.params;
        const pages = await Page_1.default.find({ websiteId });
        res.json({ message: 'Get all pages', data: pages });
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching pages', error });
    }
};
exports.getAllPages = getAllPages;
const createPage = async (req, res) => {
    try {
        const { websiteId, title, slug, userId } = req.body;
        const page = new Page_1.default({
            websiteId,
            title,
            slug,
            userId,
            content: {},
            layout: {}
        });
        const savedPage = await page.save();
        res.status(201).json({ message: 'Page created successfully', data: savedPage });
    }
    catch (error) {
        res.status(500).json({ message: 'Error creating page', error });
    }
};
exports.createPage = createPage;
const getPage = async (req, res) => {
    try {
        const { id } = req.params;
        const page = await Page_1.default.findById(id);
        if (!page) {
            return res.status(404).json({ message: 'Page not found' });
        }
        res.json({ message: 'Page fetched successfully', data: page });
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching page', error });
    }
};
exports.getPage = getPage;
const updatePage = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, slug, content, layout } = req.body;
        const page = await Page_1.default.findByIdAndUpdate(id, { title, slug, content, layout }, { new: true });
        if (!page) {
            return res.status(404).json({ message: 'Page not found' });
        }
        res.json({ message: 'Page updated successfully', data: page });
    }
    catch (error) {
        res.status(500).json({ message: 'Error updating page', error });
    }
};
exports.updatePage = updatePage;
const deletePage = async (req, res) => {
    try {
        const { id } = req.params;
        // Delete page
        const page = await Page_1.default.findByIdAndDelete(id);
        if (!page) {
            return res.status(404).json({ message: 'Page not found' });
        }
        // Delete associated components
        await Component_1.default.deleteMany({ pageId: id });
        res.json({ message: 'Page deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error deleting page', error });
    }
};
exports.deletePage = deletePage;
