"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const websites_1 = __importDefault(require("./routes/websites"));
const pages_1 = __importDefault(require("./routes/pages"));
const components_1 = __importDefault(require("./routes/components"));
const users_1 = __importDefault(require("./routes/users"));
const ai_1 = __importDefault(require("./routes/ai"));
const deployment_1 = __importDefault(require("./routes/deployment"));
// Load environment variables
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Connect to MongoDB
mongoose_1.default.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ai-website-builder')
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));
// Routes
app.get('/', (req, res) => {
    res.send('AI Website Builder API is running...');
});
app.use('/api/websites', websites_1.default);
app.use('/api/websites/:websiteId/pages', pages_1.default);
app.use('/api/pages/:pageId/components', components_1.default);
app.use('/api/users', users_1.default);
app.use('/api/ai', ai_1.default);
app.use('/api/deployment', deployment_1.default);
exports.default = app;
