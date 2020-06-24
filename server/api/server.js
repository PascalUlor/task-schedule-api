import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import winston from '../config/winston';
import routes from '../routes';

const app = express();

app.use(helmet());
app.use(express.json());
app.use(cors());

app.use(morgan('combined', { stream: winston.stream }));

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  winston.error(
    `${err.status || 500} - ${err.message} - 
        ${req.originalUrl} - 
        ${req.method} - ${req.ip}`,
  );

  res.status(err.status || 500);
  res.render('error');
  next();
});

app.use('/api', routes);

app.get('/', (req, res) => {
  res.status(200).json({
    status: 200,
    message: 'Hello from your Backend Engineer! I love coding.',
  });
});

app.get('*', (req, res) => {
  res.status(404).json({
    status: 404,
    message: 'Invalid route!',
  });
});

export default app;
