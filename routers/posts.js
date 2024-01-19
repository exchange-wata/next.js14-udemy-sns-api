/* eslint-disable import/no-import-module-exports */
import { PrismaClient } from '@prisma/client';
import express from 'express';
// eslint-disable-next-line import/extensions

const router = express.Router();
const prisma = new PrismaClient({ log: ['query'] });

// つぶやき投稿用PI
router.post('/post', async (req, res) => {
  const { content } = req.body;

  if (!content) return res.status(400).json({ message: '投稿内容がありません。' });

  try {
    const post = await prisma.post.create({
      data: {
        content,
        authorId: 20, // TODO: requestから取得するように変更する。ログインユーザーにid=20番を使ってる
      },
      include: { author: true },
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
      include: { author: true },
    });
    return res.status(200).json(posts);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'サーバーエラーです' });
  }
});

// eslint-disable-next-line import/prefer-default-export
export { router as postsRoute };
