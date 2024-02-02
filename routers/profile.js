/* eslint-disable import/extensions */
/* eslint-disable consistent-return */
import { PrismaClient } from '@prisma/client';
import express from 'express';

const prisma = new PrismaClient({ log: ['query'] });
const router = express.Router();

router.get('/find/:userId', async (req, res) => {
  const { userId } = req.params;
  if (!userId) return res.status(400).json({ message: 'ユーザーIDがありません。' });

  try {
    const profile = await prisma.profile.findUniqueOrThrow({
      where: { userId: Number(userId) },
      include: { user: true },
    });
    return res.status(200).json({
      profile: {
        id: profile.id,
        bio: profile.bio,
        imageUrl: profile.imageUrl,
        user: {
          id: profile.user.id,
          name: profile.user.name,
        },
      },
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// eslint-disable-next-line import/prefer-default-export
export { router as profileRoute };
