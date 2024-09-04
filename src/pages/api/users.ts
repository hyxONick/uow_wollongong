import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { getAuth } from '@clerk/nextjs/server';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  const { userId } = getAuth(req);  // from Clerk get current user

  if (!userId) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  switch (method) {
    case 'GET':
      return getUser(userId, res);
    case 'POST':
      return createUser(userId, req, res);
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      return res.status(405).end(`Method ${method} Not Allowed`);
  }
}

// get current user info
async function getUser(userId: string, res: NextApiResponse) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch user' });
  }
}

// creat user（if not exist）
async function createUser(userId: string, req: NextApiRequest, res: NextApiResponse) {
  const { email, name } = req.body;

  try {
    let user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          id: userId,
          email,
          name,
        },
      });
    }

    return res.status(201).json(user);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to create user' });
  }
}
