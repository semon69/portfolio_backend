/* eslint-disable no-unused-vars */
import { Model } from "mongoose";

export type TUser = {
    name: string;
    email: string;
    password: string
    role: "admin"
}

export interface UserModel extends Model<TUser> {
    //instance methods for checking if passwords are matched
    isPasswordMatched(
      plainTextPassword: string,
      hashedPassword: string,
    ): Promise<boolean>;
  }