import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  TextField, 
  Button, 
  Select, 
  MenuItem, 
  FormControl, 
  InputLabel,
  Chip,
  IconButton
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';


interface LogicRule {
  id: string;
  condition: string;
  action: string;
}

const BackendLogicBuilder: React.FC = () => {
  const [rules, setRules] = useState<LogicRule[]>([
    { id: '1', condition: 'User submits form', action: 'Send email notification' }
  ]);
  const [newRule, setNewRule] = useState({ condition: '', action: '' });

  const handleAddRule = () => {
    if (newRule.condition && newRule.action) {
      setRules([
        ...rules,
        {
          id: Date.now().toString(),
          condition: newRule.condition,
          action: newRule.action
        }
      ]);
      setNewRule({ condition: '', action: '' });
    }
  };

  const handleRemoveRule = (id: string) => {
    setRules(rules.filter(rule => rule.id !== id));
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Backend Logic Builder
      </Typography>
      
      <Paper sx={{ p: 2, mb: 2 }}>
        <Typography variant="subtitle1" gutterBottom>
          Add New Rule
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
          <TextField
            label="Condition"
            fullWidth
            value={newRule.condition}
            onChange={(e) => setNewRule({...newRule, condition: e.target.value})}
          />
          
          <TextField
            label="Action"
            fullWidth
            value={newRule.action}
            onChange={(e) => setNewRule({...newRule, action: e.target.value})}
          />
          
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleAddRule}
            sx={{ height: '56px' }}
          >
            Add
          </Button>
        </Box>
      </Paper>
      
      <Typography variant="subtitle1" gutterBottom>
        Logic Rules
      </Typography>
      
      {rules.length === 0 ? (
        <Typography>No rules defined</Typography>
      ) : (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          {rules.map((rule) => (
            <Paper key={rule.id} sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
              <Box>
                <Typography variant="body1">
                  <strong>When:</strong> {rule.condition}
                </Typography>
                <Typography variant="body1">
                  <strong>Then:</strong> {rule.action}
                </Typography>
              </Box>
              <IconButton onClick={() => handleRemoveRule(rule.id)}>
                <DeleteIcon />
              </IconButton>
            </Paper>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default BackendLogicBuilder;
