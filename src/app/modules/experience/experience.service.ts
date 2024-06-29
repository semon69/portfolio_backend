import { TExperience } from './experience.interface';
import Experience from './experience.model';

const addEx = async (payload: TExperience) => {
  const { title, company, description, timeSpan } = payload;

  const newEx = new Experience({
    title,
    company,
    description,
    timeSpan,
  });

  await newEx.save();
  return newEx;
};

const getAll = async () => {
  const exs = await Experience.find();
  return exs;
};

const getSingleEx = async (id: string) => {
  const ex = await Experience.findById(id);
  if (!ex) {
    throw new Error('Experience not found');
  }
  return ex;
};

const updateEx = async (payload: Partial<TExperience>, id: string) => {
  const { title, company, description, timeSpan } = payload;
  const updateEx = await Experience.findByIdAndUpdate(
    id,
    { title, company, description, timeSpan },
    { new: true },
  );
  if (!updateEx) {
    throw new Error('Experience not found');
  }
  return updateEx;
};

const deleteEx = async (id: string) => {
  const deletedEx = await Experience.findByIdAndDelete(id);
  if (!deletedEx) {
    throw new Error('Experience not found');
  }
  // return updatedContact
};

export const experienceServices = {
  addEx,
  getAll,
  getSingleEx,
  updateEx,
  deleteEx,
};
