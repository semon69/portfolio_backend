import mongoose, { model } from 'mongoose';
import { TSkill } from './skilss.interface';

const skillSchema = new mongoose.Schema<TSkill>(
  {
    name: { type: String, required: true },
    // Records created before categories existed have no value; the client
    // buckets those under "Other" rather than dropping them.
    category: { type: String, required: true, default: 'Other' },
    image: { type: String },
  },
  { timestamps: true },
);

const Skill = model<TSkill>('Skill', skillSchema);

export default Skill;
