import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { 
  Box, 
  Typography, 
  AppBar, 
  Toolbar, 
  Button, 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  TextField, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem,
  Tabs,
  Tab,
  Snackbar,
  CircularProgress,
  FormControlLabel,
  Switch,
  FormGroup,
  Drawer,
  IconButton
} from '@mui/material';
import { Canvas, ComponentLibrary, AIChatAssistant } from '../components';
import { codeGenerationService } from '../services/api';
import ChatIcon from '@mui/icons-material/Chat';
import SettingsIcon from '@mui/icons-material/Settings';

const BuilderPage: React.FC = () => {
  const [droppedComponents, setDroppedComponents] = useState<any[]>([]);
  const [selectedComponent, setSelectedComponent] = useState<any>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isExportDialogOpen, setIsExportDialogOpen] = useState(false);
  const [isDeployDialogOpen, setIsDeployDialogOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [exportTab, setExportTab] = useState(0);
  const [exportedCode, setExportedCode] = useState({ html: '', css: '', js: '' });
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [deployConfig, setDeployConfig] = useState({
    platform: 'vercel',
    domain: '',
    autoPublish: true
  });
  const [isDeploying, setIsDeploying] = useState(false);
  const [deploymentResult, setDeploymentResult] = useState<any>(null);

  const handleDrop = (item: any) => {
    const newComponent = {
      id: `${item.type}-${Date.now()}`,
      type: item.type,
      content: item.label,
      properties: {
        text: item.label === 'Text' ? 'Edit this text' : '',
        color: '#000000',
        backgroundColor: '#ffffff',
        fontSize: 16,
        width: 'auto',
        height: 'auto',
      },
    };
    setDroppedComponents([...droppedComponents, newComponent]);
  };

  const handleRemoveComponent = (id: string) => {
    setDroppedComponents(droppedComponents.filter(component => component.id !== id));
  };

  const handleEditComponent = (id: string) => {
    const component = droppedComponents.find(c => c.id === id);
    if (component) {
      setSelectedComponent(component);
      setIsEditDialogOpen(true);
    }
  };

  const handleSaveComponent = () => {
    if (selectedComponent) {
      setDroppedComponents(droppedComponents.map(component => 
        component.id === selectedComponent.id ? selectedComponent : component
      ));
      setIsEditDialogOpen(false);
      setSelectedComponent(null);
    }
  };

  const handlePropertyChange = (property: string, value: any) => {
    if (selectedComponent) {
      setSelectedComponent({
        ...selectedComponent,
        properties: {
          ...selectedComponent.properties,
          [property]: value,
        },
      });
    }
  };

  const handleExport = async () => {
    try {
      // Generate code using our service
      const code = await codeGenerationService.generateCodeFromComponents(droppedComponents);
      setExportedCode(code);
      setIsExportDialogOpen(true);
    } catch (error) {
      setSnackbarMessage('Error generating code');
      setSnackbarOpen(true);
    }
  };

  const handleCopyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setSnackbarMessage('Code copied to clipboard');
    setSnackbarOpen(true);
  };

  const handleDeploy = async () => {
    setIsDeploying(true);
    try {
      // In a real implementation, this would call our backend API
      // For now, we'll simulate a deployment
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      setDeploymentResult({
        success: true,
        message: 'Website deployed successfully',
        url: `https://${deployConfig.domain || 'my-website'}.${
          deployConfig.platform === 'vercel' ? 'vercel.app' : 
          deployConfig.platform === 'netlify' ? 'netlify.app' : 'onrender.com'
        }`,
        deploymentId: 'deployment-' + Date.now()
      });
      
      setSnackbarMessage('Website deployed successfully!');
      setSnackbarOpen(true);
    } catch (error) {
      setSnackbarMessage('Error deploying website');
      setSnackbarOpen(true);
    } finally {
      setIsDeploying(false);
    }
  };

  const handleNavigateToSettings = () => {
    // In a real implementation, this would use React Router
    // For now, we'll use a simple approach
    window.location.hash = 'settings';
    window.location.reload();
  };

  const renderComponent = (component: any) => {
    const { properties } = component;
    
    switch (component.type) {
      case 'text':
        return (
          <Typography 
            key={component.id} 
            sx={{ 
              color: properties.color,
              backgroundColor: properties.backgroundColor,
              fontSize: properties.fontSize,
              width: properties.width,
              height: properties.height,
            }}
          >
            {properties.text || component.content}
          </Typography>
        );
      case 'image':
        return (
          <Box 
            key={component.id} 
            sx={{ 
              width: properties.width !== 'auto' ? properties.width : 200, 
              height: properties.height !== 'auto' ? properties.height : 150, 
              backgroundColor: '#e0e0e0', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              color: properties.color,
            }}
          >
            <Typography>Image Placeholder</Typography>
          </Box>
        );
      case 'button':
        return (
          <Button 
            key={component.id} 
            variant="contained"
            sx={{ 
              backgroundColor: properties.backgroundColor,
              color: properties.color,
              width: properties.width,
              height: properties.height,
            }}
          >
            {properties.text || component.content}
          </Button>
        );
      case 'container':
        return (
          <Box 
            key={component.id} 
            sx={{ 
              border: '1px solid #ccc', 
              padding: 2, 
              margin: 1,
              backgroundColor: properties.backgroundColor,
              width: properties.width,
              height: properties.height,
            }}
          >
            <Typography 
              sx={{ 
                color: properties.color,
                fontSize: properties.fontSize,
              }}
            >
              {properties.text || 'Container'}
            </Typography>
          </Box>
        );
      case 'form':
        return (
          <Box 
            key={component.id} 
            sx={{ 
              border: '1px solid #ccc', 
              padding: 2, 
              margin: 1,
              backgroundColor: properties.backgroundColor,
              width: properties.width,
              height: properties.height,
            }}
          >
            <Typography 
              sx={{ 
                color: properties.color,
                fontSize: properties.fontSize,
              }}
            >
              {properties.text || 'Form'}
            </Typography>
          </Box>
        );
      case 'input':
        return (
          <TextField
            key={component.id}
            label={properties.text || 'Input Field'}
            variant="outlined"
            sx={{ 
              width: properties.width,
              height: properties.height,
              margin: 1,
            }}
          />
        );
      default:
        return (
          <Typography 
            key={component.id}
            sx={{ 
              color: properties.color,
              backgroundColor: properties.backgroundColor,
              fontSize: properties.fontSize,
              width: properties.width,
              height: properties.height,
              padding: 1,
              border: '1px dashed #999',
            }}
          >
            {properties.text || component.content} Component
          </Typography>
        );
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <Box sx={{ flexGrow: 1, height: '100vh', display: 'flex', flexDirection: 'column' }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              AI Website Builder
            </Typography>
            <Button color="inherit" onClick={handleNavigateToSettings}>
              <SettingsIcon sx={{ mr: 1 }} />
              Settings
            </Button>
            <Button color="inherit">Preview</Button>
            <Button color="inherit" onClick={() => setIsDeployDialogOpen(true)}>Publish</Button>
            <IconButton color="inherit" onClick={() => setIsChatOpen(true)}>
              <ChatIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Box sx={{ display: 'flex', flexGrow: 1, overflow: 'hidden' }}>
          <ComponentLibrary />
          <Box sx={{ flexGrow: 1, padding: 2, display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h5">Design Canvas</Typography>
              <Box>
                <Button variant="outlined" sx={{ mr: 1 }}>Save</Button>
                <Button variant="contained" onClick={handleExport} sx={{ mr: 1 }}>Export</Button>
                <Button variant="contained" color="success" onClick={() => setIsDeployDialogOpen(true)}>Publish</Button>
              </Box>
            </Box>
            <Canvas 
              onDrop={handleDrop}
              onRemoveComponent={handleRemoveComponent}
              onEditComponent={handleEditComponent}
              components={droppedComponents}
            >
              {droppedComponents.map(renderComponent)}
            </Canvas>
          </Box>
        </Box>
      </Box>
      
      {/* Edit Component Dialog */}
      <Dialog open={isEditDialogOpen} onClose={() => setIsEditDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Edit Component</DialogTitle>
        <DialogContent>
          {selectedComponent && (
            <Box sx={{ mt: 2 }}>
              <TextField
                label="Text Content"
                fullWidth
                value={selectedComponent.properties.text || ''}
                onChange={(e) => handlePropertyChange('text', e.target.value)}
                sx={{ mb: 2 }}
              />
              <TextField
                label="Text Color"
                fullWidth
                value={selectedComponent.properties.color}
                onChange={(e) => handlePropertyChange('color', e.target.value)}
                sx={{ mb: 2 }}
              />
              <TextField
                label="Background Color"
                fullWidth
                value={selectedComponent.properties.backgroundColor}
                onChange={(e) => handlePropertyChange('backgroundColor', e.target.value)}
                sx={{ mb: 2 }}
              />
              <TextField
                label="Font Size"
                type="number"
                fullWidth
                value={selectedComponent.properties.fontSize}
                onChange={(e) => handlePropertyChange('fontSize', parseInt(e.target.value))}
                sx={{ mb: 2 }}
              />
              <TextField
                label="Width"
                fullWidth
                value={selectedComponent.properties.width}
                onChange={(e) => handlePropertyChange('width', e.target.value)}
                sx={{ mb: 2 }}
              />
              <TextField
                label="Height"
                fullWidth
                value={selectedComponent.properties.height}
                onChange={(e) => handlePropertyChange('height', e.target.value)}
                sx={{ mb: 2 }}
              />
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsEditDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleSaveComponent} variant="contained">Save</Button>
        </DialogActions>
      </Dialog>
      
      {/* Export Code Dialog */}
      <Dialog open={isExportDialogOpen} onClose={() => setIsExportDialogOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>Export Code</DialogTitle>
        <DialogContent>
          <Tabs value={exportTab} onChange={(e, newValue) => setExportTab(newValue)} sx={{ mb: 2 }}>
            <Tab label="HTML" />
            <Tab label="CSS" />
            <Tab label="JavaScript" />
          </Tabs>
          
          {exportTab === 0 && (
            <Box>
              <Button onClick={() => handleCopyToClipboard(exportedCode.html)} sx={{ mb: 1 }}>
                Copy HTML
              </Button>
              <pre style={{ 
                backgroundColor: '#f5f5f5', 
                padding: '16px', 
                overflow: 'auto', 
                maxHeight: '400px',
                whiteSpace: 'pre-wrap'
              }}>
                {exportedCode.html}
              </pre>
            </Box>
          )}
          
          {exportTab === 1 && (
            <Box>
              <Button onClick={() => handleCopyToClipboard(exportedCode.css)} sx={{ mb: 1 }}>
                Copy CSS
              </Button>
              <pre style={{ 
                backgroundColor: '#f5f5f5', 
                padding: '16px', 
                overflow: 'auto', 
                maxHeight: '400px',
                whiteSpace: 'pre-wrap'
              }}>
                {exportedCode.css}
              </pre>
            </Box>
          )}
          
          {exportTab === 2 && (
            <Box>
              <Button onClick={() => handleCopyToClipboard(exportedCode.js)} sx={{ mb: 1 }}>
                Copy JavaScript
              </Button>
              <pre style={{ 
                backgroundColor: '#f5f5f5', 
                padding: '16px', 
                overflow: 'auto', 
                maxHeight: '400px',
                whiteSpace: 'pre-wrap'
              }}>
                {exportedCode.js}
              </pre>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsExportDialogOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>
      
      {/* Deploy Dialog */}
      <Dialog open={isDeployDialogOpen} onClose={() => setIsDeployDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Publish Website</DialogTitle>
        <DialogContent>
          {isDeploying ? (
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 4 }}>
              <CircularProgress sx={{ mb: 2 }} />
              <Typography>Deploying your website...</Typography>
            </Box>
          ) : deploymentResult ? (
            <Box>
              <Typography variant="h6" sx={{ mb: 2, color: 'success.main' }}>
                Deployment Successful!
              </Typography>
              <Typography sx={{ mb: 2 }}>
                Your website has been deployed successfully.
              </Typography>
              <Typography>
                Visit your website at: 
                <a href={deploymentResult.url} target="_blank" rel="noopener noreferrer" style={{ marginLeft: 8 }}>
                  {deploymentResult.url}
                </a>
              </Typography>
            </Box>
          ) : (
            <Box>
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Deployment Platform</InputLabel>
                <Select
                  value={deployConfig.platform}
                  label="Deployment Platform"
                  onChange={(e) => setDeployConfig({...deployConfig, platform: e.target.value as string})}
                >
                  <MenuItem value="vercel">Vercel</MenuItem>
                  <MenuItem value="netlify">Netlify</MenuItem>
                  <MenuItem value="render">Render</MenuItem>
                </Select>
              </FormControl>
              
              <TextField
                label="Custom Domain (optional)"
                fullWidth
                value={deployConfig.domain}
                onChange={(e) => setDeployConfig({...deployConfig, domain: e.target.value})}
                sx={{ mb: 2 }}
              />
              
              <FormGroup>
                <FormControlLabel 
                  control={
                    <Switch 
                      checked={deployConfig.autoPublish} 
                      onChange={(e) => setDeployConfig({...deployConfig, autoPublish: e.target.checked})} 
                    />
                  } 
                  label="Publish automatically after deployment" 
                />
              </FormGroup>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          {isDeploying ? null : deploymentResult ? (
            <Button onClick={() => {
              setIsDeployDialogOpen(false);
              setDeploymentResult(null);
            }}>
              Close
            </Button>
          ) : (
            <>
              <Button onClick={() => setIsDeployDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleDeploy} variant="contained" color="success">
                Deploy
              </Button>
            </>
          )}
        </DialogActions>
      </Dialog>
      
      {/* AI Chat Assistant Drawer */}
      <Drawer
        anchor="right"
        open={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        sx={{ '& .MuiDrawer-paper': { width: 400 } }}
      >
        <AIChatAssistant />
      </Drawer>
      
      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        message={snackbarMessage}
      />
    </DndProvider>
  );
};

export default BuilderPage;