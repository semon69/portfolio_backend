import { TProject } from './project.interface';
import Project from './project.model';

const addProject = async (payload: TProject) => {
  const { title, image, tech, description, g_frontend, g_backend, live_link } =
    payload;

  const newProject = new Project({
    title,
    image,
    tech,
    description,
    g_frontend,
    g_backend,
    live_link,
  });

  await newProject.save();
  return newProject;
};

const getAll = async () => {
  const exs = await Project.find();
  return exs;
};

const getSingleProject = async (id: string) => {
  const project = await Project.findById(id);
  if (!project) {
    throw new Error('Project not found');
  }
  return project;
};

const updateProject = async (payload: Partial<TProject>, id: string) => {
  const { title, image,tech, description, g_frontend, g_backend, live_link } =
    payload;
  const updateProject = await Project.findByIdAndUpdate(
    id,
    { title, image, tech, description, g_frontend, g_backend, live_link },
    { new: true },
  );
  if (!updateProject) {
    throw new Error('Project not found');
  }
  return updateProject;
};

const deleteProject = async (id: string) => {
  const deletedProject = await Project.findByIdAndDelete(id);
  if (!deletedProject) {
    throw new Error('Project not found');
  }
  // return updatedContact
};

export const projectServices = {
  addProject,
  getAll,
  getSingleProject,
  updateProject,
  deleteProject,
};
