/* eslint-disable no-console */
import app from "./app";
import dotenv from 'dotenv';
dotenv.config();
import mongoose from "mongoose";

const port = process.env.PORT || 5000;


async function main() {
  try {
    await mongoose.connect(process.env.DATABASE_URL as string);

    app.listen(port, () => {
      console.log(`Portfolio Application is listening on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
}

main()