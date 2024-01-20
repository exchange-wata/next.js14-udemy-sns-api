/* eslint-disable import/extensions */
/* eslint-disable consistent-return */
import { PrismaClient } from '@prisma/client';
import express from 'express';
import authentication from '../middleware/authentication.js';

const prisma = new PrismaClient({ log: ['query'] });
const router = express.Router();

router.get('/find', authentication, async (req, res) => {
  try {
    const user = await prisma.user.findUniqueOrThrow({ where: { id: req.userId } });
    return res.status(200).json({ user: { id: user.id, name: user.name, email: user.email } });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});
