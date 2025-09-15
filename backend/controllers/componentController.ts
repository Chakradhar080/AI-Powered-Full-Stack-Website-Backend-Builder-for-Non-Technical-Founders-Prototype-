import Component from '../models/Component';

export const getAllComponents = async (req: any, res: any) => {
  try {
    const { pageId } = req.params;
    const components = await Component.find({ pageId });
    res.json({ message: 'Get all components', data: components });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching components', error });
  }
};

export const createComponent = async (req: any, res: any) => {
  try {
    const { pageId, type, content, styles, position, userId } = req.body;
    
    const component = new Component({
      pageId,
      type,
      content,
      styles,
      position,
      userId
    });
    
    const savedComponent = await component.save();
    res.status(201).json({ message: 'Component created successfully', data: savedComponent });
  } catch (error) {
    res.status(500).json({ message: 'Error creating component', error });
  }
};

export const getComponent = async (req: any, res: any) => {
  try {
    const { id } = req.params;
    const component = await Component.findById(id);
    
    if (!component) {
      return res.status(404).json({ message: 'Component not found' });
    }
    
    res.json({ message: 'Component fetched successfully', data: component });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching component', error });
  }
};

export const updateComponent = async (req: any, res: any) => {
  try {
    const { id } = req.params;
    const { type, content, styles, position } = req.body;
    
    const component = await Component.findByIdAndUpdate(
      id, 
      { type, content, styles, position },
      { new: true }
    );
    
    if (!component) {
      return res.status(404).json({ message: 'Component not found' });
    }
    
    res.json({ message: 'Component updated successfully', data: component });
  } catch (error) {
    res.status(500).json({ message: 'Error updating component', error });
  }
};

export const deleteComponent = async (req: any, res: any) => {
  try {
    const { id } = req.params;
    
    const component = await Component.findByIdAndDelete(id);
    
    if (!component) {
      return res.status(404).json({ message: 'Component not found' });
    }
    
    res.json({ message: 'Component deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting component', error });
  }
};