// app/api/posts/index.ts
import { NextResponse } from 'next/server';
import { getPosts, createPost } from '../../services/post';

// GET 请求，获取所有帖子
export async function GET() {
  try {
    const posts = await getPosts();
    return NextResponse.json(posts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    return new NextResponse('Failed to fetch posts', { status: 500 });
  }
}

// POST 请求，创建新帖子
export async function POST(req: Request) {
  try {
    const data = await req.json(); // 从请求体获取数据
    const newPost = await createPost(data); // 使用Prisma创建新帖子
    return NextResponse.json(newPost, { status: 201 });
  } catch (error) {
    console.error('Error creating post:', error);
    return new NextResponse('Failed to create post', { status: 500 });
  }
}