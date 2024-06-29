import mongoose, { model } from "mongoose";
import { TExperience } from "./experience.interface";

const experienceSchema = new mongoose.Schema<TExperience>({
    title: { type: String, required: true },
    company: { type: String },
    timeSpan: { type: String },
    description: { type: String },
  });
  
  const Experience = model<TExperience>('Experience', experienceSchema);
  
  export default Experience;