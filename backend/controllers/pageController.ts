import Page from '../models/Page';
import Component from '../models/Component';

export const getAllPages = async (req: any, res: any) => {
  try {
    const { websiteId } = req.params;
    const pages = await Page.find({ websiteId });
    res.json({ message: 'Get all pages', data: pages });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching pages', error });
  }
};

export const createPage = async (req: any, res: any) => {
  try {
    const { websiteId, title, slug, userId } = req.body;
    
    const page = new Page({
      websiteId,
      title,
      slug,
      userId,
      content: {},
      layout: {}
    });
    
    const savedPage = await page.save();
    res.status(201).json({ message: 'Page created successfully', data: savedPage });
  } catch (error) {
    res.status(500).json({ message: 'Error creating page', error });
  }
};

export const getPage = async (req: any, res: any) => {
  try {
    const { id } = req.params;
    const page = await Page.findById(id);
    
    if (!page) {
      return res.status(404).json({ message: 'Page not found' });
    }
    
    res.json({ message: 'Page fetched successfully', data: page });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching page', error });
  }
};

export const updatePage = async (req: any, res: any) => {
  try {
    const { id } = req.params;
    const { title, slug, content, layout } = req.body;
    
    const page = await Page.findByIdAndUpdate(
      id, 
      { title, slug, content, layout },
      { new: true }
    );
    
    if (!page) {
      return res.status(404).json({ message: 'Page not found' });
    }
    
    res.json({ message: 'Page updated successfully', data: page });
  } catch (error) {
    res.status(500).json({ message: 'Error updating page', error });
  }
};

export const deletePage = async (req: any, res: any) => {
  try {
    const { id } = req.params;
    
    // Delete page
    const page = await Page.findByIdAndDelete(id);
    
    if (!page) {
      return res.status(404).json({ message: 'Page not found' });
    }
    
    // Delete associated components
    await Component.deleteMany({ pageId: id });
    
    res.json({ message: 'Page deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting page', error });
  }
};