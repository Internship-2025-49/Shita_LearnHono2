//import context
import { Context } from 'hono'

//import prisma client
import prisma from "../../prisma/client";

/**
 * Getting all posts
 */
export const getPosts = async (c: Context) => {
    try {
        //get all posts
        const posts = await prisma.post.findMany({ orderBy: { id: 'desc' } });

        //return JSON
        return c.json({
            statusCode : 200,
            message: 'List Data Posts!',
            data: posts
        });

    } catch (e: unknown) {
        console.error(`Error getting posts: ${e}`);
    }
}

export async function createPost(c: Context) {
  try {

    //get body request
    const body = await c.req.json();

    //check if title and content is string
    const title   = typeof body['title'] === 'string' ? body['title'] : '';
    const content = typeof body['content'] === 'string' ? body['content'] : '';

  
    const post = await prisma.post.create({
      data: {
        title: title,
        content: content,
      }
    });

    //return JSON
    return c.json({
      success: true,
      message: 'Post Created Successfully!',
      data: post
    }, 201);

  } catch (e: unknown) {
    console.error(`Error creating post: ${e}`);
  }
}

export async function getPostById(c: Context) {
  try {

      // Konversi tipe id menjadi number
      const postId = parseInt(c.req.param('id'));

      //get post by id
      const post = await prisma.post.findMany({
          where: { id: postId },
      });

      console.log('Data Post: ', post)

      //if post not found
      if (!post) {
          //return JSON
          return c.json({
              success: false,
              message: 'ID Post Not Found!',
          }, 404);
      }

       //return JSON
       return c.json({
        statusCode : 200,
        message: `Detail Data Post By ID : ${postId}`,
        data: post
        });
  } catch (e: unknown) {
      console.error(`Error finding post: ${e}`);
  }
}

export async function updatePost(c: Context) {
  try {

      // Konversi tipe id menjadi number
      const postId = parseInt(c.req.param('id'));

      //get body request
      const body = await c.req.json();

      //check if title and content is string
      const title = typeof body['title'] === 'string' ? body['title'] : '';
      const content = typeof body['content'] === 'string' ? body['content'] : '';

      //update post with prisma
      const post = await prisma.post.update({
          where: { id: postId },
          data: {
              title: title,
              content: content,
              updatedAt: new Date(),
          },
      });

      //return JSON
      return c.json({
          success: true,
          message: 'Post Updated Successfully!',
          data: post
      }, 200);

  } catch (e: unknown) {
      console.error(`Error updating post: ${e}`);
  }
}

export async function deletePost(c: Context) {
  try {

      // Konversi tipe id menjadi number
      const postId = parseInt(c.req.param('id'));

      //delete post with prisma
      await prisma.post.delete({
          where: { id: postId },
      });

      //return JSON
      return c.json({
          success: true,
          message: 'Post Deleted Successfully!',
      }, 200);

  } catch (e: unknown) {
      console.error(`Error deleting post: ${e}`);
  }
}