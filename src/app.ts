import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { notFound } from './app/middlewares/notFoundError';
import cookieParser from 'cookie-parser';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import { UserRoutes } from './app/modules/auth/auth.routes';
import { SkillRoutes } from './app/modules/skills/skills.routes';
import { ExperienceRoutes } from './app/modules/experience/experience.routes';
import { ProjectRoutes } from './app/modules/projects/project.routes';
const app: Application = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors())

// app.use(
//   cors({
//     origin: ['https://contactmanagementfrontend-semon69s-projects.vercel.app'],
//     credentials: true,
//   }),
// );

app.get('/', (req: Request, res: Response) => {
  res.send('Hello from my portfolio backend!');
});

app.use('/api/v1', UserRoutes);
app.use('/api/v1/experience', ExperienceRoutes);
app.use('/api/v1/skill', SkillRoutes);
app.use('/api/v1/project', ProjectRoutes);

app.use(notFound);
app.use(globalErrorHandler);

export default app;
