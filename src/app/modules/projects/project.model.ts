import mongoose, { model } from "mongoose";
import { TProject } from "./project.interface";

const projectSchema = new mongoose.Schema<TProject>({
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String , required: true},
    g_backend: { type: String },
    g_frontend: { type: String, required: true },
    live_link: { type: String, required: true },
  });
  
  const Project = model<TProject>('Project', projectSchema);
  
  export default Project;