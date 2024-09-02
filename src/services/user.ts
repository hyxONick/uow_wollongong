import { PrismaClient, User } from '@prisma/client';

const prisma = new PrismaClient();

export async function createUser(data: {
  clerkId: string;
  email: string;
  name?: string;
  address?: { street: string; city: string; state: string; zip: string };
}): Promise<User> {
  return prisma.user.create({
    data: {
      clerkId: data.clerkId,
      email: data.email,
      name: data.name,
      address: data.address,
      updatedAt: new Date()
    },
  });
}

export async function getUsers(): Promise<User[]> {
  return prisma.user.findMany({
    where: { isDeleted: false },
  });
}

export async function getUserById(id: string): Promise<User | null> {
  return prisma.user.findUnique({
    where: { id },
    include: {
      posts: true,
      comments: true,
    },
  });
}

export async function updateUser(id: string, data: {
  clerkId?: string;
  email?: string;
  name?: string;
  address?: { street: string; city: string; state: string; zip: string };
}): Promise<User> {
  return prisma.user.update({
    where: { id },
    data: {
      ...data,
      updatedAt: new Date(),
    },
  });
}

export async function deleteUser(id: string): Promise<User> {
  return prisma.user.update({
    where: { id },
    data: { isDeleted: true },
  });
}
