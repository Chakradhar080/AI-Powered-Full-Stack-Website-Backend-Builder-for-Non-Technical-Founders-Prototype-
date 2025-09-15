import { DeploymentService } from '../services/deploymentService';

export const deployWebsite = async (req: any, res: any) => {
  try {
    const { websiteId, platform, config } = req.body;
    
    // In a real implementation, you would fetch the website data from the database
    const websiteData = {
      id: websiteId,
      name: 'Sample Website',
      domain: 'sample-website'
    };
    
    let result;
    
    switch (platform) {
      case 'vercel':
        result = await DeploymentService.deployToVercel(websiteData, config);
        break;
      case 'netlify':
        result = await DeploymentService.deployToNetlify(websiteData, config);
        break;
      case 'render':
        result = await DeploymentService.deployToRender(websiteData, config);
        break;
      default:
        return res.status(400).json({ message: 'Unsupported deployment platform' });
    }
    
    res.json({ 
      message: 'Website deployment initiated', 
      data: result
    });
  } catch (error) {
    res.status(500).json({ message: 'Error deploying website', error });
  }
};

export const getDeploymentStatus = async (req: any, res: any) => {
  try {
    const { deploymentId } = req.params;
    
    const status = await DeploymentService.getDeploymentStatus(deploymentId);
    
    res.json({ 
      message: 'Deployment status retrieved', 
      data: status
    });
  } catch (error) {
    res.status(500).json({ message: 'Error getting deployment status', error });
  }
};