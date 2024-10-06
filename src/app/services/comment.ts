import { PrismaClient, Comment } from '@prisma/client';

const prisma = new PrismaClient();

export async function createComment(data: {
  comment: string;
  authorId: string;
  postId: string;
  commentId?: string;
}): Promise<Comment> {
  const { comment, authorId, postId, commentId } = data;

  // Create a comment
  const createdComment = await prisma.comment.create({
    data: {
      comment,
      author: {
        connect: { id: authorId },
      },
      post: {
        connect: { id: postId },
      },
      // Include `commentId` only if it's provided
      commentId: commentId || undefined,
    },
  });

  return createdComment;
}

export async function getComments(postId: string): Promise<Comment[]> {
  return prisma.comment.findMany({
    where: {
      postId,
      isDeleted: false,
    },
    include: {
      author: true,
      post: true,
    },
  });
}

export async function getCommentsByAuthor(authorId: string): Promise<Comment[]> {
  return prisma.comment.findMany({
    where: {
      authorId,
      isDeleted: false,
    },
    include: {
      post: true, // Include post information if needed
    },
  });
}

export async function getCommentById(id: string): Promise<Comment | null> {
  const comment = await prisma.comment.findUnique({
    where: { id },
    include: {
      author: true,
      post: true,
    },
  });
  if (!comment || comment.isDeleted) {
    return null; // Handle comment not found or logically deleted
  }
  return comment;
}

// export async function updateComment(id: string, data: {
//   comment?: string;
// }): Promise<Comment | null> {
//   const comment = await prisma.comment.update({
//     where: { id },
//     data: {
//       ...data,
//       updatedAt: new Date(),
//     },
//   });
//   if (!comment || comment.isDeleted) {
//     return null; // Handle comment not found or logically deleted
//   }
//   return comment;
// }

export async function deleteComment(id: string): Promise<Comment | null> {
  const comment = await prisma.comment.update({
    where: { id },
    data: { isDeleted: true },
  });
  if (!comment) {
    return null; // Handle comment not found
  }
  return comment;
}
