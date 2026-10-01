import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { notFound } from './app/middlewares/notFoundError';
import cookieParser from 'cookie-parser';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import { UserRoutes } from './app/modules/auth/auth.routes';
import { SkillRoutes } from './app/modules/skills/skills.routes';
import { ExperienceRoutes } from './app/modules/experience/experience.routes';
import { ProjectRoutes } from './app/modules/projects/project.routes';
import { BlogRoutes } from './app/modules/blog/blog.routes';
const app: Application = express();

app.use(express.json());
app.use(cookieParser());
// app.use(cors())

// Allowed browser origins. A request from anywhere else gets no
// Access-Control-Allow-Origin header, so the browser blocks the response
// even though the server answered — add new deployments here.
const allowedOrigins = [
  // Public site
  'https://mdemonsheikh.vercel.app',
  'https://mt-portfolio-seven.vercel.app',
  'https://emon69.netlify.app',

  // Dashboard
  'https://portfolio-dashboard-seven.vercel.app',

  // Local development
  'http://localhost:5173',
  'http://localhost:5174',
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  }),
);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello from my portfolio backend!');
});

app.use('/api/v1', UserRoutes);
app.use('/api/v1/experience', ExperienceRoutes);
app.use('/api/v1/skill', SkillRoutes);
app.use('/api/v1/project', ProjectRoutes);
app.use('/api/v1/blog', BlogRoutes);

app.use(notFound);
app.use(globalErrorHandler);

export default app;
