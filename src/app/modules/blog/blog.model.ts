import mongoose, { model } from 'mongoose';
import { TBlog } from './blog.interface';

const blogSchema = new mongoose.Schema<TBlog>(
  {
    title: { type: String, required: true },
    image: { type: String, required: true },
    description: { type: String, required: true },
    excerpt: { type: String, default: '' },
    tags: { type: [String], default: [] },
    published: { type: Boolean, default: true },
  },
  // Gives createdAt/updatedAt so posts can be dated and sorted. Records
  // written before this was added have no createdAt until next saved.
  { timestamps: true },
);

const Blog = model<TBlog>('Blog', blogSchema);

export default Blog;
