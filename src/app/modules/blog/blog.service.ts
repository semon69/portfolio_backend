import { TBlog } from './blog.interface';
import Blog from './blog.model';

const addBlog = async (payload: TBlog) => {
  const { title, image, description, excerpt, tags, published } = payload;

  const newBlog = new Blog({
    title,
    image,
    description,
    excerpt,
    tags,
    published,
  });

  await newBlog.save();
  return newBlog;
};

const getAll = async () => {
  // Newest first. Older records predate timestamps, so _id is the
  // tiebreaker — it embeds creation time.
  const blogs = await Blog.find().sort({ createdAt: -1, _id: -1 });
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
  // Only assign what the caller actually sent, so a partial update can't
  // blank out fields it never mentioned.
  const updates: Partial<TBlog> = {};
  const fields: (keyof TBlog)[] = [
    'title',
    'image',
    'description',
    'excerpt',
    'tags',
    'published',
  ];

  fields.forEach((field) => {
    if (payload[field] !== undefined) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (updates as any)[field] = payload[field];
    }
  });

  const updatedBlog = await Blog.findByIdAndUpdate(id, updates, { new: true });
  if (!updatedBlog) {
    throw new Error('Blog not found');
  }
  return updatedBlog;
};

const deleteBlog = async (id: string) => {
  const deletedBlog = await Blog.findByIdAndDelete(id);
  if (!deletedBlog) {
    throw new Error('Blog not found');
  }
};

export const blogServices = {
  addBlog,
  getAll,
  getSingleBlog,
  updateBlog,
  deleteBlog,
};
