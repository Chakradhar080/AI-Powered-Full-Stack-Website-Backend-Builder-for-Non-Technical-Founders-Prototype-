import axios from 'axios';

// Use environment variable for API base URL, with fallback to localhost for development
const API_BASE_URL = `${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api`;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const websiteService = {
  // Get all websites
  getWebsites: () => api.get('/websites'),
  
  // Create a new website
  createWebsite: (data: any) => api.post('/websites', data),
  
  // Get a specific website
  getWebsite: (id: string) => api.get(`/websites/${id}`),
  
  // Update a website
  updateWebsite: (id: string, data: any) => api.put(`/websites/${id}`, data),
  
  // Delete a website
  deleteWebsite: (id: string) => api.delete(`/websites/${id}`),
};

export const aiService = {
  // Generate content using AI
  generateContent: (prompt: string) => api.post('/ai/generate-content', { prompt }),
  
  // Generate image using AI
  generateImage: (description: string) => api.post('/ai/generate-image', { description }),
  
  // Chat with AI assistant
  chat: (message: string) => api.post('/ai/chat', { message }),
  
  // Generate code for components
  generateCode: (componentData: any) => api.post('/ai/generate-code', { componentData }),
  
  // Optimize layout
  optimizeLayout: (layoutData: any) => api.post('/ai/optimize-layout', { layoutData }),
};

// Code generation service
export const codeGenerationService = {
  // Generate HTML/CSS/JS code from components
  generateCodeFromComponents: async (components: any[]) => {
    try {
      // In a real implementation, this would call an AI service
      // For now, we'll generate basic code
      const html = generateHTML(components);
      const css = generateCSS(components);
      const js = generateJS(components);
      
      return {
        html,
        css,
        js
      };
    } catch (error) {
      console.error('Error generating code:', error);
      throw error;
    }
  }
};

// Helper functions for code generation
const generateHTML = (components: any[]) => {
  let html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Generated Website</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
`;

  components.forEach(component => {
    switch (component.type) {
      case 'text':
        html += `    <p style="color: ${component.properties.color}; font-size: ${component.properties.fontSize}px;">${component.properties.text || component.content}</p>
`;
        break;
      case 'button':
        html += `    <button style="background-color: ${component.properties.backgroundColor}; color: ${component.properties.color};">${component.properties.text || component.content}</button>
`;
        break;
      case 'image':
        html += `    <div style="width: ${component.properties.width !== 'auto' ? component.properties.width : '200px'}; height: ${component.properties.height !== 'auto' ? component.properties.height : '150px'}; background-color: #e0e0e0; display: flex; align-items: center; justify-content: center;">
        <span>Image Placeholder</span>
    </div>
`;
        break;
      case 'container':
        html += `    <div style="border: 1px solid #ccc; padding: 16px; margin: 8px; background-color: ${component.properties.backgroundColor};">
        <p style="color: ${component.properties.color}; font-size: ${component.properties.fontSize}px;">${component.properties.text || 'Container'}</p>
    </div>
`;
        break;
      default:
        html += `    <div style="padding: 8px; border: 1px dashed #999;">
        <p>${component.properties.text || component.content} Component</p>
    </div>
`;
    }
  });

  html += `    <script src="script.js"></script>
</body>
</html>`;
  
  return html;
};

const generateCSS = (components: any[]) => {
  return `/* Generated CSS */
body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 20px;
}

/* Component styles will be inline in HTML for simplicity */
`;
};

const generateJS = (components: any[]) => {
  return `// Generated JavaScript
document.addEventListener('DOMContentLoaded', function() {
    console.log('Website loaded successfully');
    
    // Add event listeners for interactive components
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            alert('Button clicked!');
        });
    });
});
`;
};

export default api;