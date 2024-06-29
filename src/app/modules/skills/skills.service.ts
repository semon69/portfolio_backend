import { TSkill } from "./skilss.interface";
import Skill from "./skills.model";

const addSkill = async(payload: TSkill) => {
    const { name, image} = payload

    const newSkill = new Skill({
      name,
      image
    });

    await newSkill.save();
    return newSkill
}

const getAll = async() => {
    const skills = await Skill.find();
    return skills
}

const getSingleSkill = async(id: string) => {
    const skill = await Skill.findById(id);
    if (!skill) {
      throw new Error( 'Skill not found');
    }
    return skill
}

const updateSkill = async(payload: Partial<TSkill>, id: string) => {
    const { name, image } = payload
    const updateSkill = await Skill.findByIdAndUpdate(id,
      { name, image },
      { new: true }
    );
    if (!updateSkill) {
      throw new Error( 'Skill not found');
    }
    return updateSkill
}

const deleteSkill = async(id: string) => {
    const deletedSkill = await Skill.findByIdAndDelete(id);
    if (!deletedSkill) {
      throw new Error( 'Contact not found');
    }
    // return updatedContact
}

export const skillServices = {
    addSkill,
    getAll,
    getSingleSkill,
    updateSkill,
    deleteSkill
}