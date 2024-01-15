// eslint-disable-next-line import/no-extraneous-dependencies
import cors from 'cors';
import express, { json } from 'express';
// eslint-disable-next-line import/extensions
import { authRoute } from './routers/auth.js';

const app = express();

const PORT = process.env.API_PORT;

app.use(cors());
app.use(json());
app.use('/api/auth', authRoute);

app.listen(PORT, () => console.log(`server is running on port ${PORT}`));
