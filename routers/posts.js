/* eslint-disable import/no-import-module-exports */
import { PrismaClient } from '@prisma/client';
import express from 'express';
// eslint-disable-next-line import/extensions

const router = express.Router();
const prisma = new PrismaClient();

// つぶやき投稿用PI
router.post('/post', async (req, res) => {
  const { context } = req.body;

  if (!context) return res.status(400).json({ message: '投稿内容がありません。' });

  try {
    const post = await prisma.post.create({
      data: {
        context,
        authId: 1,
      },
    });
    return res.status(200).json(post);
  } catch (error) {
    return res.status(500).json({ message: 'サーバーエラーです' });
  }
});

// TODO: 最新のつぶやき投稿用API

// eslint-disable-next-line import/prefer-default-export
export { router as postsRoute };
