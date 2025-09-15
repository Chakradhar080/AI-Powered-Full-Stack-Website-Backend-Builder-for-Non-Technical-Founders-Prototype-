import Website from '../models/Website';
import Page from '../models/Page';
import Component from '../models/Component';

export const getAllWebsites = async (req: any, res: any) => {
  try {
    const websites = await Website.find();
    res.json({ message: 'Get all websites', data: websites });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching websites', error });
  }
};

export const createWebsite = async (req: any, res: any) => {
  try {
    const { name, domain, userId } = req.body;
    
    // Create website
    const website = new Website({
      name,
      domain,
      userId,
      status: 'draft'
    });
    
    const savedWebsite = await website.save();
    
    // Create default page
    const page = new Page({
      websiteId: savedWebsite._id,
      title: 'Home',
      slug: 'home',
      userId,
      content: {},
      layout: {}
    });
    
    await page.save();
    
    res.status(201).json({ message: 'Website created successfully', data: savedWebsite });
  } catch (error) {
    res.status(500).json({ message: 'Error creating website', error });
  }
};

export const getWebsite = async (req: any, res: any) => {
  try {
    const { id } = req.params;
    const website = await Website.findById(id);
    
    if (!website) {
      return res.status(404).json({ message: 'Website not found' });
    }
    
    res.json({ message: 'Website fetched successfully', data: website });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching website', error });
  }
};

export const updateWebsite = async (req: any, res: any) => {
  try {
    const { id } = req.params;
    const { name, domain, status } = req.body;
    
    const website = await Website.findByIdAndUpdate(
      id, 
      { name, domain, status },
      { new: true }
    );
    
    if (!website) {
      return res.status(404).json({ message: 'Website not found' });
    }
    
    res.json({ message: 'Website updated successfully', data: website });
  } catch (error) {
    res.status(500).json({ message: 'Error updating website', error });
  }
};

export const deleteWebsite = async (req: any, res: any) => {
  try {
    const { id } = req.params;
    
    // Delete website
    const website = await Website.findByIdAndDelete(id);
    
    if (!website) {
      return res.status(404).json({ message: 'Website not found' });
    }
    
    // Delete associated pages and components
    await Page.deleteMany({ websiteId: id });
    await Component.deleteMany({ pageId: { $in: await Page.find({ websiteId: id }).distinct('_id') } });
    
    res.json({ message: 'Website deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting website', error });
  }
};