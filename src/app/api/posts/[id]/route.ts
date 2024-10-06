// pages/api/posts/[id].ts
import { NextApiRequest, NextApiResponse } from 'next';
import { getPostById, updatePost, deletePost } from '../../../services/post';

export async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (req.method === 'GET') {
    // detail
    try {
      const post = await getPostById(id as string);
      if (!post) return res.status(404).json({ message: 'Post not found' });
      res.status(200).json(post);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch post', error });
    }
  } else if (req.method === 'PUT') {
    // update
    try {
      const updatedPost = await updatePost(id as string, req.body);
      res.status(200).json(updatedPost);
    } catch (error) {
      res.status(500).json({ message: 'Failed to update post', error });
    }
  } else if (req.method === 'DELETE') {
    // delete
    try {
      const deletedPost = await deletePost(id as string);
      res.status(200).json(deletedPost);
    } catch (error) {
      res.status(500).json({ message: 'Failed to delete post', error });
    }
  } else {
    res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
