"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteWebsite = exports.updateWebsite = exports.getWebsite = exports.createWebsite = exports.getAllWebsites = void 0;
const Website_1 = __importDefault(require("../models/Website"));
const Page_1 = __importDefault(require("../models/Page"));
const Component_1 = __importDefault(require("../models/Component"));
const getAllWebsites = async (req, res) => {
    try {
        const websites = await Website_1.default.find();
        res.json({ message: 'Get all websites', data: websites });
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching websites', error });
    }
};
exports.getAllWebsites = getAllWebsites;
const createWebsite = async (req, res) => {
    try {
        const { name, domain, userId } = req.body;
        // Create website
        const website = new Website_1.default({
            name,
            domain,
            userId,
            status: 'draft'
        });
        const savedWebsite = await website.save();
        // Create default page
        const page = new Page_1.default({
            websiteId: savedWebsite._id,
            title: 'Home',
            slug: 'home',
            userId,
            content: {},
            layout: {}
        });
        await page.save();
        res.status(201).json({ message: 'Website created successfully', data: savedWebsite });
    }
    catch (error) {
        res.status(500).json({ message: 'Error creating website', error });
    }
};
exports.createWebsite = createWebsite;
const getWebsite = async (req, res) => {
    try {
        const { id } = req.params;
        const website = await Website_1.default.findById(id);
        if (!website) {
            return res.status(404).json({ message: 'Website not found' });
        }
        res.json({ message: 'Website fetched successfully', data: website });
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching website', error });
    }
};
exports.getWebsite = getWebsite;
const updateWebsite = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, domain, status } = req.body;
        const website = await Website_1.default.findByIdAndUpdate(id, { name, domain, status }, { new: true });
        if (!website) {
            return res.status(404).json({ message: 'Website not found' });
        }
        res.json({ message: 'Website updated successfully', data: website });
    }
    catch (error) {
        res.status(500).json({ message: 'Error updating website', error });
    }
};
exports.updateWebsite = updateWebsite;
const deleteWebsite = async (req, res) => {
    try {
        const { id } = req.params;
        // Delete website
        const website = await Website_1.default.findByIdAndDelete(id);
        if (!website) {
            return res.status(404).json({ message: 'Website not found' });
        }
        // Delete associated pages and components
        await Page_1.default.deleteMany({ websiteId: id });
        await Component_1.default.deleteMany({ pageId: { $in: await Page_1.default.find({ websiteId: id }).distinct('_id') } });
        res.json({ message: 'Website deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error deleting website', error });
    }
};
exports.deleteWebsite = deleteWebsite;
