import { PrismaClient } from '@prisma/client';
import { hash } from 'bcrypt';
import express, { json } from 'express';

const app = express();

const PORT = 5000;
const prisma = new PrismaClient();

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

app.listen(PORT, () => console.log(`server is running on port ${PORT}`));
