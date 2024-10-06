// app/api/users/route.ts
import { NextRequest, NextResponse } from 'next/server'; // 导入 NextRequest
import { PrismaClient } from '@prisma/client';
import { getAuth } from '@clerk/nextjs/server';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) { // 将参数类型改为 NextRequest
  const { userId } = getAuth(req); // clertId
  
  const { action, email, name, id } = await req.json(); // 从请求体获取操作类型和用户数据

  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    switch (action) {
      case 'getUser':
        return await getUser(userId);
      case 'createUser':
        return await createUser(userId, email || '', name || ''); // 使用默认值确保不为undefined
      case 'updateUser':
        return await updateUser(userId, email || '', name || ''); // 使用默认值确保不为undefined
      case 'deleteUser':
        return await deleteUser(userId);
      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }
  } catch (error) {
    console.error('Error in user operation:', error);
    return NextResponse.json({ error: 'Operation failed' }, { status: 500 });
  }
}

// 获取当前用户信息
async function getUser(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  return NextResponse.json(user);
}

// 创建用户（如果不存在）
async function createUser(userId: string, email: string, name: string) {
  let user = await prisma.user.findUnique({
    where: { clerkId: userId },
  });

  if (!user) {
    user = await prisma.user.create({
      data: {
        clerkId: userId,
        email,
        name,
        updatedAt: new Date(),
      },
    });
  }

  return NextResponse.json(user, { status: 201 });
}

// 更新用户信息
async function updateUser(userId: string, email: string, name: string) {
  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data: {
      email,
      name,
      updatedAt: new Date(),
    },
  });

  return NextResponse.json(updatedUser);
}

// 逻辑删除用户
async function deleteUser(userId: string) {
  const deletedUser = await prisma.user.update({
    where: { id: userId },
    data: { isDeleted: true },
  });

  return NextResponse.json(deletedUser);
}
