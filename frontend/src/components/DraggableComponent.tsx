import React from 'react';
import { useDrag } from 'react-dnd';
import { Box, Typography, IconButton } from '@mui/material';

interface DraggableComponentProps {
  id: string;
  type: string;
  label: string;
  icon: React.ReactNode;
}

const DraggableComponent: React.FC<DraggableComponentProps> = ({ id, type, label, icon }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'component',
    item: { id, type, label },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  // Cast drag to any to avoid TypeScript issues
  const dragRef = drag as any;

  return (
    <Box
      ref={dragRef}
      sx={{
        opacity: isDragging ? 0.5 : 1,
        cursor: 'move',
        padding: 1,
        border: '1px solid #ddd',
        borderRadius: 1,
        textAlign: 'center',
        backgroundColor: '#fff',
        '&:hover': {
          backgroundColor: '#f5f5f5',
        },
      }}
    >
      <IconButton sx={{ display: 'block', margin: '0 auto' }}>
        {icon}
      </IconButton>
      <Typography variant="caption">{label}</Typography>
    </Box>
  );
};

export default DraggableComponent;