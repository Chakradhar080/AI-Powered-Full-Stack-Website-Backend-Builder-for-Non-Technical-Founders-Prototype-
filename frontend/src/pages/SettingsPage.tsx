import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  AppBar, 
  Toolbar, 
  Tabs, 
  Tab, 
  Paper,
  Button
} from '@mui/material';
import { DatabaseSchemaVisualizer, BackendLogicBuilder } from '../components';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const SettingsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);

  // Mock data for schema visualization
  const mockSchemas = [
    {
      name: 'User',
      fields: [
        { name: 'id', type: 'String', required: true },
        { name: 'email', type: 'String', required: true },
        { name: 'firstName', type: 'String', required: true },
        { name: 'lastName', type: 'String', required: true },
        { name: 'createdAt', type: 'Date', required: true },
        { name: 'updatedAt', type: 'Date', required: true }
      ]
    },
    {
      name: 'Website',
      fields: [
        { name: 'id', type: 'String', required: true },
        { name: 'name', type: 'String', required: true },
        { name: 'domain', type: 'String', required: true },
        { name: 'status', type: 'String', required: true },
        { name: 'userId', type: 'String', required: true },
        { name: 'createdAt', type: 'Date', required: true },
        { name: 'updatedAt', type: 'Date', required: true }
      ]
    },
    {
      name: 'Page',
      fields: [
        { name: 'id', type: 'String', required: true },
        { name: 'websiteId', type: 'String', required: true },
        { name: 'title', type: 'String', required: true },
        { name: 'slug', type: 'String', required: true },
        { name: 'content', type: 'Object', required: false },
        { name: 'layout', type: 'Object', required: false },
        { name: 'userId', type: 'String', required: true },
        { name: 'createdAt', type: 'Date', required: true },
        { name: 'updatedAt', type: 'Date', required: true }
      ]
    }
  ];

  const handleNavigateToBuilder = () => {
    // In a real implementation, this would use React Router
    // For now, we'll use a simple approach
    window.location.hash = '';
    window.location.reload();
  };

  return (
    <Box sx={{ flexGrow: 1, height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <AppBar position="static">
        <Toolbar>
          <Button 
            color="inherit" 
            onClick={handleNavigateToBuilder}
            startIcon={<ArrowBackIcon />}
          >
            Back to Builder
          </Button>
          <Typography variant="h6" sx={{ flexGrow: 1, textAlign: 'center' }}>
            AI Website Builder - Settings
          </Typography>
        </Toolbar>
      </AppBar>
      
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)}>
          <Tab label="Database Schema" />
          <Tab label="Backend Logic" />
          <Tab label="API Configuration" />
          <Tab label="Deployment Settings" />
        </Tabs>
      </Box>
      
      <Box sx={{ flexGrow: 1, overflow: 'auto' }}>
        {activeTab === 0 && (
          <Paper sx={{ m: 2 }}>
            <DatabaseSchemaVisualizer schemas={mockSchemas} />
          </Paper>
        )}
        
        {activeTab === 1 && (
          <Paper sx={{ m: 2 }}>
            <BackendLogicBuilder />
          </Paper>
        )}
        
        {activeTab === 2 && (
          <Box sx={{ p: 2 }}>
            <Typography>API Configuration</Typography>
            {/* API configuration content would go here */}
          </Box>
        )}
        
        {activeTab === 3 && (
          <Box sx={{ p: 2 }}>
            <Typography>Deployment Settings</Typography>
            {/* Deployment settings content would go here */}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default SettingsPage;