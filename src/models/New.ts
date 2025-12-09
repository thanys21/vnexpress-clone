import mongoose, { Schema, Document } from 'mongoose';

export interface INew extends Document {
    new_id: number;
    title: string;
    sub_title?: string;
    content: string;
    thumbnail?: string;
    category: string;
    author?: string;
    publish_date: Date;
    views: number;
}

const NewSchema = new Schema<INew>({
    new_id: { type: Number, required: true, unique: true },
    title: { type: String, required: true },
    sub_title: { type: String },
    content: { type: String, required: true },
    thumbnail: { type: String },
    category: { type: String, required: true },
    author: { type: String },
    publish_date: { type: Date, default: Date.now },
    views: { type: Number, default: 0 },
}, {
    timestamps: true,
    collection: 'news'
});


if (mongoose.models.New) {
    delete mongoose.models.New;
}

const New = mongoose.model<INew>('New', NewSchema);
export default New;