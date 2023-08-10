import express from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import mongoose from 'mongoose';
import { config } from './config';
import AudioRoutes from './audio/routes';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());

app.use('/v1/audio', AudioRoutes);

mongoose.connect(config.mongoUrl)
    .then(() => {
        console.log(`Connected to MongoDB: ${config.mongoUrl}`);
    }).catch((err) => {
        console.log(err);
    });

app.listen(config.appPort, () => {
    console.log(`Server listening on port ${config.appPort}`);
});

export default app;

