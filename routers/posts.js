/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import { PrismaClient } from '@prisma/client';
import express from 'express';
import authentication from '../middleware/authentication.js';

const router = express.Router();
const prisma = new PrismaClient({ log: ['query'] });

// つぶやき投稿用PI
router.post('/post', authentication, async (req, res) => {
  const { content } = req.body;

  if (!content) return res.status(400).json({ message: '投稿内容がありません。' });

  try {
    const post = await prisma.post.create({
      data: {
        content,
        authorId: req.userId,
      },
      include: { author: { include: { profile: true } } },
    });
    return res.status(200).json(post);
  } catch (error) {
    return res.status(500).json({ message: 'サーバーエラーです' });
  }
});

// 最新のつぶやき投稿用API
router.get('/get', async (req, res) => {
  try {
    const posts = await prisma.post.findMany({
      take: 10,
      orderBy: { createdAt: 'desc' },
      include: { author: { include: { profile: true } } },
    });
    return res.status(200).json(posts);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: 'サーバーエラーです' });
  }
});

// 任意のユーザーの投稿内容だけを取得する
router.get('/get/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const posts = await prisma.post.findMany({
      where: {
        authorId: Number(userId),
      },
      orderBy: { createdAt: 'desc' },
      include: { author: true },
    });
    return res.status(200).json(posts);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: 'サーバーエラーです' });
  }
});

// eslint-disable-next-line import/prefer-default-export
export { router as postsRoute };
