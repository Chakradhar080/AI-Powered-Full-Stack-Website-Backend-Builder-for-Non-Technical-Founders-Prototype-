import React from 'react';
import { useDrop } from 'react-dnd';
import { Box } from '@mui/material';

interface DroppableAreaProps {
  onDrop: (item: any) => void;
  children: React.ReactNode;
}

const DroppableArea: React.FC<DroppableAreaProps> = ({ onDrop, children }) => {
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
        minHeight: '200px',
        border: '2px dashed #ccc',
        backgroundColor: isOver ? '#e0e0e0' : '#f5f5f5',
        padding: 2,
        margin: 1,
      }}
    >
      {children}
    </Box>
  );
};

export default DroppableArea;