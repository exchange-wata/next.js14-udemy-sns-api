/* eslint-disable import/extensions */
// eslint-disable-next-line import/no-extraneous-dependencies
import cors from 'cors';
import express, { json } from 'express';
import { authRoute } from './routers/auth.js';
import { postsRoute } from './routers/posts.js';
import { usersRoute } from './routers/users.js';

const app = express();

const PORT = process.env.API_PORT;

app.use(cors());
app.use(json());
app.use('/api/auth', authRoute);
app.use('/api/posts', postsRoute);
app.use('/api/users', usersRoute);

app.listen(PORT, () => console.log(`server is running on port ${PORT}`));
