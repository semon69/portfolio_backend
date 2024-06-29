import mongoose, { model } from "mongoose";
import { TSkill } from "./skilss.interface";

const skillSchema = new mongoose.Schema<TSkill>({
    name: { type: String, required: true },
    image: { type: String },
  });
  
  const Skill = model<TSkill>('Skill', skillSchema);
  
  export default Skill;