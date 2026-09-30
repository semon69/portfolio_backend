import { TSkill } from './skilss.interface';
import Skill from './skills.model';

const addSkill = async (payload: TSkill) => {
  const { name, category, image } = payload;

  const newSkill = new Skill({ name, category, image });

  await newSkill.save();
  return newSkill;
};

const getAll = async () => {
  const skills = await Skill.find();
  return skills;
};

const getSingleSkill = async (id: string) => {
  const skill = await Skill.findById(id);
  if (!skill) {
    throw new Error('Skill not found');
  }
  return skill;
};

const updateSkill = async (payload: Partial<TSkill>, id: string) => {
  // Only write what was actually sent, so a partial update can't blank
  // out a field it never mentioned.
  const updates: Partial<TSkill> = {};
  (['name', 'category', 'image'] as (keyof TSkill)[]).forEach((field) => {
    if (payload[field] !== undefined) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (updates as any)[field] = payload[field];
    }
  });

  const updatedSkill = await Skill.findByIdAndUpdate(id, updates, {
    new: true,
  });
  if (!updatedSkill) {
    throw new Error('Skill not found');
  }
  return updatedSkill;
};

const deleteSkill = async (id: string) => {
  const deletedSkill = await Skill.findByIdAndDelete(id);
  if (!deletedSkill) {
    throw new Error('Skill not found');
  }
};

export const skillServices = {
  addSkill,
  getAll,
  getSingleSkill,
  updateSkill,
  deleteSkill,
};
