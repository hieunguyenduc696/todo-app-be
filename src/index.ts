import express, { Application } from 'express';
import { MongoClient, ServerApiVersion } from 'mongodb';
import { configuration } from './config';
import { TodoRouter } from './routes/todo.route';
import { errorHandler } from './errors';

import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';

const app: Application = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use('/static', express.static(path.join(__dirname, 'upload')));

app.use('/todo', TodoRouter);

app.use(errorHandler);

const client = new MongoClient(configuration.MONGO_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function bootstrap() {
  try {
    mongoose.connect(configuration.MONGO_URI).then(() => console.log('DB Connected'));
    app.listen(configuration.PORT, (): void => {
      console.log(`Connected successfully on port ${configuration.PORT}`);
    });
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
bootstrap();
