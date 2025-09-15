import mongoose, { Schema, Document } from 'mongoose';

export interface IComponent extends Document {
  pageId: string;
  type: string;
  content: any;
  styles: any;
  position: {
    x: number;
    y: number;
  };
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

const ComponentSchema: Schema = new Schema({
  pageId: { type: String, required: true },
  type: { type: String, required: true },
  content: { type: Schema.Types.Mixed },
  styles: { type: Schema.Types.Mixed },
  position: {
    x: { type: Number, default: 0 },
    y: { type: Number, default: 0 }
  },
  userId: { type: String, required: true },
}, {
  timestamps: true
});

export default mongoose.model<IComponent>('Component', ComponentSchema);