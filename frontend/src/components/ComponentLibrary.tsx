import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Grid, 
  Accordion, 
  AccordionSummary, 
  AccordionDetails, 
  TextField
} from '@mui/material';
import { DraggableComponent } from '.';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import ImageIcon from '@mui/icons-material/Image';
import ButtonIcon from '@mui/icons-material/Gesture';
import ContainerIcon from '@mui/icons-material/ViewCompact';
import FormIcon from '@mui/icons-material/Assignment';
import NavigationIcon from '@mui/icons-material/Menu';
import MediaIcon from '@mui/icons-material/PlayCircle';
import LayoutIcon from '@mui/icons-material/ViewQuilt';

const ComponentLibrary: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const basicComponents = [
    { id: 'text', type: 'text', label: 'Text', icon: <TextFieldsIcon /> },
    { id: 'image', type: 'image', label: 'Image', icon: <ImageIcon /> },
    { id: 'button', type: 'button', label: 'Button', icon: <ButtonIcon /> },
    { id: 'container', type: 'container', label: 'Container', icon: <ContainerIcon /> },
  ];

  const formComponents = [
    { id: 'form', type: 'form', label: 'Form', icon: <FormIcon /> },
    { id: 'input', type: 'input', label: 'Input', icon: <FormIcon /> },
    { id: 'textarea', type: 'textarea', label: 'Text Area', icon: <FormIcon /> },
  ];

  const layoutComponents = [
    { id: 'navbar', type: 'navbar', label: 'Navigation Bar', icon: <NavigationIcon /> },
    { id: 'footer', type: 'footer', label: 'Footer', icon: <LayoutIcon /> },
    { id: 'sidebar', type: 'sidebar', label: 'Sidebar', icon: <LayoutIcon /> },
  ];

  const mediaComponents = [
    { id: 'video', type: 'video', label: 'Video', icon: <MediaIcon /> },
    { id: 'audio', type: 'audio', label: 'Audio', icon: <MediaIcon /> },
  ];

  const allComponents = [
    ...basicComponents,
    ...formComponents,
    ...layoutComponents,
    ...mediaComponents
  ];

  const filteredComponents = allComponents.filter(component => 
    component.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box sx={{ padding: 2, borderRight: '1px solid #eee', height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Typography variant="h6" gutterBottom>
        Components
      </Typography>
      
      <TextField
        label="Search components"
        variant="outlined"
        size="small"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{ mb: 2 }}
      />
      
      {searchTerm ? (
        <Box sx={{ overflowY: 'auto', flexGrow: 1 }}>
          <Grid container spacing={2}>
            {filteredComponents.map((component) => (
              <Grid item xs={6} key={component.id}>
                <DraggableComponent 
                  id={component.id} 
                  type={component.type} 
                  label={component.label} 
                  icon={component.icon} 
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      ) : (
        <Box sx={{ overflowY: 'auto', flexGrow: 1 }}>
          <Accordion defaultExpanded>
            <AccordionSummary expandIcon="▼">
              <Typography>Basic</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={2}>
                {basicComponents.map((component) => (
                  <Grid item xs={6} key={component.id}>
                    <DraggableComponent 
                      id={component.id} 
                      type={component.type} 
                      label={component.label} 
                      icon={component.icon} 
                    />
                  </Grid>
                ))}
              </Grid>
            </AccordionDetails>
          </Accordion>
          
          <Accordion>
            <AccordionSummary expandIcon="▼">
              <Typography>Forms</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={2}>
                {formComponents.map((component) => (
                  <Grid item xs={6} key={component.id}>
                    <DraggableComponent 
                      id={component.id} 
                      type={component.type} 
                      label={component.label} 
                      icon={component.icon} 
                    />
                  </Grid>
                ))}
              </Grid>
            </AccordionDetails>
          </Accordion>
          
          <Accordion>
            <AccordionSummary expandIcon="▼">
              <Typography>Layout</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={2}>
                {layoutComponents.map((component) => (
                  <Grid item xs={6} key={component.id}>
                    <DraggableComponent 
                      id={component.id} 
                      type={component.type} 
                      label={component.label} 
                      icon={component.icon} 
                    />
                  </Grid>
                ))}
              </Grid>
            </AccordionDetails>
          </Accordion>
          
          <Accordion>
            <AccordionSummary expandIcon="▼">
              <Typography>Media</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={2}>
                {mediaComponents.map((component) => (
                  <Grid item xs={6} key={component.id}>
                    <DraggableComponent 
                      id={component.id} 
                      type={component.type} 
                      label={component.label} 
                      icon={component.icon} 
                    />
                  </Grid>
                ))}
              </Grid>
            </AccordionDetails>
          </Accordion>
        </Box>
      )}
    </Box>
  );
};

export default ComponentLibrary;