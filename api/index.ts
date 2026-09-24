import { Request, Response } from 'express';
import mongoose from 'mongoose';
import app from '../src/app';

// Vercel entry point. src/server.ts calls app.listen() for local dev; on
// Vercel each request is handed to the exported function instead. The DB
// connection is cached across warm invocations of the same instance.
let connection: Promise<typeof mongoose> | null = null;

export default async function handler(req: Request, res: Response) {
  if (!connection) {
    connection = mongoose.connect(process.env.DATABASE_URL as string);
  }
  try {
    await connection;
  } catch (error) {
    connection = null;
    throw error;
  }
  return app(req, res);
}
