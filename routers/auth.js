/* eslint-disable import/extensions */
/* eslint-disable import/no-import-module-exports */
import { PrismaClient } from '@prisma/client';
import { compare, hash } from 'bcrypt';
import express from 'express';
import createIdenticion from '../utils/createIdenticon.js';
import token from '../utils/createToken.js';

const router = express.Router();
const prisma = new PrismaClient({ log: ['query'] });

// 新規登録
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  const hashedPassword = await hash(password, 10);
  const icon = createIdenticion(email);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      profile: {
        create: {
          bio: '初めまして',
          imageUrl: icon,
        },
      },
    },
    include: { profile: true },
  });

  return res.json({ user });
});

// ログイン
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const user = await prisma.user.findUniqueOrThrow({
    where: {
      email,
    },
  });

  const isValidPassword = await compare(password, user.password);

  return isValidPassword ? res.json(token(user.id)) : 'ログイン失敗';
});

// eslint-disable-next-line import/prefer-default-export
export { router as authRoute };
