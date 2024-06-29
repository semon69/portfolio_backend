import { TBlog } from './blog.interface';
import Blog from './blog.model';
import Experience from './blog.model';

const addBlog = async (payload: TBlog) => {
  const { title, image, description, } = payload;

  const newBlog = new Experience({
    title,
    image,
    description,
  });

  await newBlog.save();
  return newBlog;
};

const getAll = async () => {
  const blogs = await Blog.find();
  return blogs;
};

const getSingleBlog = async (id: string) => {
  const blog = await Blog.findById(id);
  if (!blog) {
    throw new Error('Blog not found');
  }
  return blog;
};

const updateBlog = async (payload: Partial<TBlog>, id: string) => {
  const { title, image, description } = payload;
  const updateBlog = await Blog.findByIdAndUpdate(
    id,
    { title, image, description },
    { new: true },
  );
  if (!updateBlog) {
    throw new Error('Blog not found');
  }
  return updateBlog;
};

const deleteBlog = async (id: string) => {
  const deletedBlog = await Blog.findByIdAndDelete(id);
  if (!deletedBlog) {
    throw new Error('Blog not found');
  }
  // return updatedContact
};

export const blogServices = {
  addBlog,
  getAll,
  getSingleBlog,
  updateBlog,
  deleteBlog,
};
