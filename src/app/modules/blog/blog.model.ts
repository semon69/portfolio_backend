import mongoose, { model } from "mongoose";
import { TBlog } from "./blog.interface";

const blogSchema = new mongoose.Schema<TBlog>({
    title: { type: String, required: true },
    image: { type: String , required: true },
    description: { type: String, required: true  },
  });
  
  const Blog = model<TBlog>('Blog', blogSchema);
  
  export default Blog;