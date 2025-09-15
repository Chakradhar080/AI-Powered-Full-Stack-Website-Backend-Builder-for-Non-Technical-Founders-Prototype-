# AI-Powered Full-Stack Website Builder

An innovative platform that enables non-technical users to create and deploy full-stack web applications using intuitive drag-and-drop tools integrated with AI-assisted code generation.

## Features

- **Visual Drag-and-Drop Builder**: Intuitive interface for designing websites without coding
- **AI-Powered Code Generation**: Automatically generates production-ready HTML, CSS, and JavaScript
- **Database Schema Visualization**: Visual representation of database models
- **Backend Logic Builder**: Create business logic rules without writing code
- **AI Chat Assistant**: Get help and suggestions from an AI assistant
- **One-Click Deployment**: Deploy to popular platforms like Vercel, Netlify, and Render
- **Responsive Design**: Create websites that work on all devices

## Tech Stack

### Frontend
- React with TypeScript
- Redux for state management
- Material UI for components
- React DnD for drag-and-drop functionality

### Backend
- Node.js with Express
- MongoDB with Mongoose
- TypeScript
- RESTful API architecture

## Project Structure

```
ai-website-builder/
├── frontend/
│   ├── public/
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── store/
│       ├── services/
│       ├── types/
│       ├── App.tsx
│       └── index.tsx
└── backend/
    ├── controllers/
    ├── models/
    ├── routes/
    ├── services/
    ├── server.ts
    └── package.json
```

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MongoDB (local or cloud instance)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/ai-website-builder.git
   cd ai-website-builder
   ```

2. Install frontend dependencies:
   ```bash
   cd frontend
   npm install
   ```

3. Install backend dependencies:
   ```bash
   cd ../backend
   npm install
   ```

4. Set up environment variables:
   - Create a `.env` file in the `backend` directory
   - Add your MongoDB connection string:
     ```
     MONGODB_URI=your-mongodb-connection-string
     PORT=5000
     ```

### Running the Application

1. Start the backend server:
   ```bash
   cd backend
   npm run dev
   ```

2. Start the frontend development server:
   ```bash
   cd frontend
   npm start
   ```

3. Open your browser to `http://localhost:3000`

## Usage

### Building a Website

1. **Add Components**: Drag components from the library on the left to the canvas
2. **Edit Components**: Click on components to edit their properties
3. **Arrange Layout**: Drag components to reposition them on the canvas
4. **Preview**: Use the preview button to see how your website looks
5. **Export**: Export the generated code for use in other projects
6. **Deploy**: Publish your website to hosting platforms with one click

### Using AI Features

1. **AI Chat Assistant**: Click the chat icon to get help with building your website
2. **Content Generation**: Use the AI to generate text content for your website
3. **Layout Optimization**: Let the AI suggest improvements to your layout

### Managing Backend

1. **Database Schema**: View and manage your database models in the settings
2. **Logic Builder**: Create business rules without writing code
3. **API Configuration**: Configure your API endpoints

## API Endpoints

### Websites
- `GET /api/websites` - Get all websites
- `POST /api/websites` - Create a new website
- `GET /api/websites/:id` - Get a specific website
- `PUT /api/websites/:id` - Update a website
- `DELETE /api/websites/:id` - Delete a website

### Pages
- `GET /api/websites/:websiteId/pages` - Get all pages for a website
- `POST /api/websites/:websiteId/pages` - Create a new page
- `GET /api/pages/:id` - Get a specific page
- `PUT /api/pages/:id` - Update a page
- `DELETE /api/pages/:id` - Delete a page

### Components
- `GET /api/pages/:pageId/components` - Get all components for a page
- `POST /api/pages/:pageId/components` - Create a new component
- `GET /api/components/:id` - Get a specific component
- `PUT /api/components/:id` - Update a component
- `DELETE /api/components/:id` - Delete a component

### AI Services
- `POST /api/ai/generate-content` - Generate content using AI
- `POST /api/ai/generate-image` - Generate images using AI
- `POST /api/ai/chat` - Chat with AI assistant
- `POST /api/ai/generate-code` - Generate code for components
- `POST /api/ai/optimize-layout` - Optimize layout using AI
- `POST /api/ai/generate-api` - Generate API code

### Deployment
- `POST /api/deployment/deploy` - Deploy website
- `GET /api/deployment/status/:deploymentId` - Get deployment status

## Development

### Frontend Development
The frontend is built with React and TypeScript. Key components include:
- Drag-and-drop builder interface
- Component library
- Canvas area for designing websites
- Preview functionality
- AI chat assistant

### Backend Development
The backend is built with Node.js and Express. Key features include:
- RESTful API endpoints
- MongoDB integration
- AI service integration
- Deployment functionality

## Future Enhancements

- User authentication and account management
- Template library for quick start
- Collaborative editing features
- Advanced AI capabilities
- Integration with more deployment platforms
- Custom domain management
- Analytics dashboard

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a pull request

## License

This project is licensed under the MIT License.

## Contact

For questions or support, please open an issue on GitHub.