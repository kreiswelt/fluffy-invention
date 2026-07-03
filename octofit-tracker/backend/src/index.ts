import 'dotenv/config';
import express from 'express';
import db from './config/database';

const app = express();
const port = Number(process.env.PORT) || 8000;

app.use(express.json());

app.get('/', (_req, res) => {
  res.json({ status: 'OctoFit Tracker API', version: '0.1.0' });
});

app.get('/health', (_req, res) => {
  res.json({ uptime: process.uptime(), databaseState: db.readyState });
});

app.listen(port, () => {
  console.log(`OctoFit Tracker backend listening on http://localhost:${port}`);
});
