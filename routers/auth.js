/* eslint-disable import/no-import-module-exports */
import { PrismaClient } from '@prisma/client';
import { compare, hash } from 'bcrypt';
import express from 'express';
// eslint-disable-next-line import/extensions
import token from '../utils/createToken.js';

const router = express.Router();
const prisma = new PrismaClient();

// 新規登録
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  const hashedPassword = await hash(password, 10);
  const user = await prisma.user.create({
    data: {
      name, email, password: hashedPassword,
    },
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

  return isValidPassword ? token(user.id) : 'ログイン失敗';
});

// eslint-disable-next-line import/prefer-default-export
export { router as authRoute };
