"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDeploymentStatus = exports.deployWebsite = void 0;
const deploymentService_1 = require("../services/deploymentService");
const deployWebsite = async (req, res) => {
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
                result = await deploymentService_1.DeploymentService.deployToVercel(websiteData, config);
                break;
            case 'netlify':
                result = await deploymentService_1.DeploymentService.deployToNetlify(websiteData, config);
                break;
            case 'render':
                result = await deploymentService_1.DeploymentService.deployToRender(websiteData, config);
                break;
            default:
                return res.status(400).json({ message: 'Unsupported deployment platform' });
        }
        res.json({
            message: 'Website deployment initiated',
            data: result
        });
    }
    catch (error) {
        res.status(500).json({ message: 'Error deploying website', error });
    }
};
exports.deployWebsite = deployWebsite;
const getDeploymentStatus = async (req, res) => {
    try {
        const { deploymentId } = req.params;
        const status = await deploymentService_1.DeploymentService.getDeploymentStatus(deploymentId);
        res.json({
            message: 'Deployment status retrieved',
            data: status
        });
    }
    catch (error) {
        res.status(500).json({ message: 'Error getting deployment status', error });
    }
};
exports.getDeploymentStatus = getDeploymentStatus;
