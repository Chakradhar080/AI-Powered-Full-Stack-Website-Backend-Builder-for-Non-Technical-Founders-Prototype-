import React from 'react';
import { useDrop } from 'react-dnd';
import { Box, Typography } from '@mui/material';

interface CanvasProps {
  children: React.ReactNode;
  onDrop: (item: any) => void;
  onRemoveComponent: (id: string) => void;
  onEditComponent: (id: string) => void;
  components: any[];
}

const Canvas: React.FC<CanvasProps> = ({ children, onDrop, onRemoveComponent, onEditComponent, components }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'component',
    drop: (item: any) => onDrop(item),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  // Cast drop to any to avoid TypeScript issues
  const dropRef = drop as any;

  return (
    <Box
      ref={dropRef}
      sx={{
        width: '100%',
        minHeight: '600px',
        border: '2px dashed #ccc',
        backgroundColor: isOver ? '#f0f0f0' : '#fafafa',
        position: 'relative',
        overflow: 'auto',
        p: 2,
      }}
    >
      {components.length === 0 ? (
        <Box 
          sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            justifyContent: 'center', 
            height: '100%', 
            color: '#999' 
          }}
        >
          <Typography variant="h5" gutterBottom>
            Drag components here to start building
          </Typography>
          <Typography variant="body1">
            Select components from the library on the left and drag them to this canvas
          </Typography>
        </Box>
      ) : (
        <Box sx={{ position: 'relative' }}>
          {components.map((component) => (
            <Box
              key={component.id}
              sx={{
                position: 'relative',
                mb: 2,
                p: 1,
                border: '1px solid #ddd',
                borderRadius: 1,
                backgroundColor: '#fff',
                '&:hover .component-actions': {
                  display: 'flex',
                },
              }}
            >
              <Box sx={{ position: 'absolute', top: -12, right: 8, backgroundColor: '#fff', px: 1, display: 'none' }} className="component-actions">
              </Box>
              {React.Children.toArray(children).find((child: any) => 
                child && React.isValidElement(child) && child.key === component.id
              )}
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default Canvas;