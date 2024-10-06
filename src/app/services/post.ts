import { PrismaClient, Post } from '@prisma/client';

const prisma = new PrismaClient();

export async function createPost(data: {
  slug: string;
  title: string;
  body: string;
  like: number;
  category: string;
  picUrls: string[];
  authorId: string;
}): Promise<Post> {
  try {
    return await prisma.post.create({
      data: {
        slug: data.slug,
        title: data.title,
        body: data.body,
        like: data.like,
        category: data.category,
        picUrls: data.picUrls,
        author: {
          connect: { id: data.authorId },
        },
        updatedAt: new Date(),
      },
    });
  } catch (error) {
    console.error('Error creating post:', error);
    throw new Error('Failed to create post');
  }
}

export async function getPosts(): Promise<Post[]> {
  try {
    return await prisma.post.findMany({
      where: { isDeleted: false },
      include: {
        author: true,
        comments: true,
      },
    });
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw new Error('Failed to fetch posts');
  }
}

export async function getPostById(id: string): Promise<Post | null> {
  try {
    const post = await prisma.post.findUnique({
      where: { id },
      include: {
        author: true,
        comments: true,
      },
    });

    if (!post || post.isDeleted) {
      return null; // or throw an error if appropriate
    }

    return post;
  } catch (error) {
    console.error('Error fetching post by ID:', error);
    throw new Error('Failed to fetch post');
  }
}

export async function getPostsByAuthorId(authorId: string): Promise<Post[]> {
  try {
    const posts = await prisma.post.findMany({
      where: {
        authorId,
        isDeleted: false, // Only include posts that are not logically deleted
      },
      include: {
        author: true,
        comments: true, // Include comments if needed
      },
    });

    return posts;
  } catch (error) {
    console.error('Error fetching posts by author ID:', error);
    throw new Error('Failed to fetch posts');
  }
}

export async function getPostsByKeyword(keyword: string): Promise<Post[]> {
  try {
    return await prisma.post.findMany({
      where: {
        isDeleted: false,
        OR: [
          { title: { contains: keyword, mode: 'insensitive' } },
          { body: { contains: keyword, mode: 'insensitive' } },
        ],
      },
      include: {
        author: true,
        comments: true,
      },
    });
  } catch (error) {
    console.error('Error fetching posts by keyword:', error);
    throw new Error('Failed to fetch posts by keyword');
  }
}

export async function updatePost(id: string, data: {
  slug?: string;
  title?: string;
  body?: string;
  like?: number;
  category?: string;
  picUrls?: string[];
}): Promise<Post> {
  try {
    const post = await prisma.post.update({
      where: { id },
      data: {
        ...data,
        updatedAt: new Date(),
      },
    });

    if (!post || post.isDeleted) {
      throw new Error('Post not found or is deleted');
    }

    return post;
  } catch (error) {
    console.error('Error updating post:', error);
    throw new Error('Failed to update post');
  }
}

export async function deletePost(id: string): Promise<Post> {
  try {
    const post = await prisma.post.update({
      where: { id },
      data: { isDeleted: true },
    });

    if (!post || post.isDeleted) {
      throw new Error('Post not found or already deleted');
    }

    return post;
  } catch (error) {
    console.error('Error deleting post:', error);
    throw new Error('Failed to delete post');
  }
}
