// app/api/comments/route.ts
import { NextResponse } from 'next/server';
import {
  createComment,
  getComments,
  getCommentById,
  deleteComment,
  // updateComment, // 如果需要更新功能，可以启用
} from '../../services/comment'; // 根据实际路径调整

// GET 请求，获取评论
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const postId = searchParams.get('postId'); // 获取帖子ID以查询评论
  const id = searchParams.get('id'); // 获取评论ID以查询单个评论

  try {
    if (id) {
      const comment = await getCommentById(id);
      if (!comment) {
        return NextResponse.json({ message: 'Comment not found' }, { status: 404 });
      }
      return NextResponse.json(comment);
    }

    if (postId) {
      const comments = await getComments(postId);
      return NextResponse.json(comments);
    }

    return NextResponse.json({ message: 'Post ID is required' }, { status: 400 });
  } catch (error) {
    console.error('Error fetching comments:', error);
    return new NextResponse('Failed to fetch comments', { status: 500 });
  }
}

// POST 请求，创建和删除评论
export async function POST(req: Request) {
  try {
    const { action, data } = await req.json(); // 从请求体获取数据

    if (action === 'create') {
      const newComment = await createComment(data); // 使用Prisma创建新评论
      return NextResponse.json(newComment, { status: 201 });
    }

    if (action === 'delete') {
      const { id } = data; // 提取ID
      const deletedComment = await deleteComment(id); // 使用Prisma逻辑删除评论
      return NextResponse.json(deletedComment);
    }

    return NextResponse.json({ message: 'Invalid action' }, { status: 400 });
  } catch (error) {
    console.error('Error processing request:', error);
    return new NextResponse('Failed to process request', { status: 500 });
  }
}
