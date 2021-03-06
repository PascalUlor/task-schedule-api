import http from 'http';
import dotenv from 'dotenv';
import app from './server/api/server';
import winston from './server/config/winston';

dotenv.config();

const port = process.env.PORT || 4000;

const httpServer = http.createServer(app);

httpServer.listen(port, (err) => {
  if (err) return winston.info(err.message);
  return winston.info(`Application started on http://localhost:${port}`);
});
