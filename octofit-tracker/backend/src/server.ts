import 'dotenv/config';
import express from 'express';
import db from './config/database';
import usersRouter from './routes/users';
import teamsRouter from './routes/teams';
import activitiesRouter from './routes/activities';
import leaderboardRouter from './routes/leaderboard';
import workoutsRouter from './routes/workouts';

const port = Number(process.env.PORT) || 8000;
const apiBaseUrl = process.env.CODESPACE_NAME
  ? `https://${process.env.CODESPACE_NAME}-8000.app.github.dev`
  : `http://localhost:${port}`;

const app = express();

app.use(express.json());
app.use('/api/users', usersRouter);
app.use('/api/teams', teamsRouter);
app.use('/api/activities', activitiesRouter);
app.use('/api/leaderboard', leaderboardRouter);
app.use('/api/workouts', workoutsRouter);

app.get('/', (_req, res) => {
  res.json({ status: 'OctoFit Tracker API', version: '0.1.0', apiUrl: apiBaseUrl });
});

app.get('/health', (_req, res) => {
  res.json({ uptime: process.uptime(), databaseState: db.readyState });
});

export { app, port, apiBaseUrl };
