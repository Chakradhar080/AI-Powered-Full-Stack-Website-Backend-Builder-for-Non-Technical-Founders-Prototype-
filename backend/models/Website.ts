import mongoose, { Schema, Document } from 'mongoose';

export interface IWebsite extends Document {
  name: string;
  domain: string;
  status: 'draft' | 'published';
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

const WebsiteSchema: Schema = new Schema({
  name: { type: String, required: true },
  domain: { type: String, required: true },
  status: { type: String, enum: ['draft', 'published'], default: 'draft' },
  userId: { type: String, required: true },
}, {
  timestamps: true
});

export default mongoose.model<IWebsite>('Website', WebsiteSchema);