import React from 'react';
import { Box, Typography, Paper } from '@mui/material';

interface SchemaField {
  name: string;
  type: string;
  required: boolean;
}

interface SchemaModel {
  name: string;
  fields: SchemaField[];
}

interface DatabaseSchemaVisualizerProps {
  schemas: SchemaModel[];
}

const DatabaseSchemaVisualizer: React.FC<DatabaseSchemaVisualizerProps> = ({ schemas }) => {
  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Database Schema Visualization
      </Typography>
      
      {schemas.length === 0 ? (
        <Typography>No schemas available</Typography>
      ) : (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
          {schemas.map((schema) => (
            <Paper key={schema.name} sx={{ p: 2, minWidth: 250 }}>
              <Typography variant="h6" gutterBottom>
                {schema.name}
              </Typography>
              
              {schema.fields.map((field) => (
                <Box 
                  key={field.name} 
                  sx={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    py: 1,
                    borderBottom: '1px solid #eee'
                  }}
                >
                  <Typography variant="body2">
                    {field.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {field.type} {field.required && '(required)'}
                  </Typography>
                </Box>
              ))}
            </Paper>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default DatabaseSchemaVisualizer;