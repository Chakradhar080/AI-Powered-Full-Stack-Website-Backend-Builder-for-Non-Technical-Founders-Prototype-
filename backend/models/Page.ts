import mongoose, { Schema, Document } from 'mongoose';

export interface IPage extends Document {
  websiteId: string;
  title: string;
  slug: string;
  content: any;
  layout: any;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

const PageSchema: Schema = new Schema({
  websiteId: { type: String, required: true },
  title: { type: String, required: true },
  slug: { type: String, required: true },
  content: { type: Schema.Types.Mixed },
  layout: { type: Schema.Types.Mixed },
  userId: { type: String, required: true },
}, {
  timestamps: true
});

export default mongoose.model<IPage>('Page', PageSchema);