import { PrismaClient } from '@prisma/client';
import { compare, hash } from 'bcrypt';
import express, { json } from 'express';
// eslint-disable-next-line import/no-extraneous-dependencies
import jwt from 'jsonwebtoken';

const app = express();

const PORT = 5000;
const prisma = new PrismaClient();
const token = (userId) => jwt.sign({ id: userId }, process.env.SECRET_KEY, { expiresIn: '1d' });

app.use(json());

// 新規登録
app.post('/api/auth/register', async (req, res) => {
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
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;

  const user = await prisma.user.findUniqueOrThrow({
    where: {
      email,
    },
  });

  const isValidPassword = await compare(password, user.password);

  return isValidPassword ? token(user.id) : 'ログイン失敗';
});

app.listen(PORT, () => console.log(`server is running on port ${PORT}`));
