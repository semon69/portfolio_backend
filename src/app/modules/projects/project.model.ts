import mongoose, { model } from "mongoose";
import { TProject } from "./project.interface";

const projectSchema = new mongoose.Schema<TProject>({
    title: { type: String, required: true },
    description: { type: String },
    image: { type: String },
    g_backend: { type: String },
    g_frontend: { type: String },
    live_link: { type: String },
  });
  
  const Project = model<TProject>('Project', projectSchema);
  
  export default Project;