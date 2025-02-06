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
            success: true,
            message: 'List Data Posts!',
            data: posts
        }, 200);

    } catch (e: unknown) {
        console.error(`Error getting posts: ${e}`);
    }
}

export async function createPost(c: Context) {
  try {

    //get body request
    const body = await c.req.parseBody();

    //check if title and content is string
    const title   = typeof body['title'] === 'string' ? body['title'] : '';
    const content = typeof body['content'] === 'string' ? body['content'] : '';

    //create post
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
      const post = await prisma.post.findUnique({
          where: { id: postId },
      });

      //if post not found
      if (!post) {
          //return JSON
          return c.json({
              success: false,
              message: 'Post Not Found!',
          }, 404);
      }

      //return JSON
      return c.json({
          success: true,
          message: `Detail Data Post By ID : ${postId}`,
          data: post
      }, 200);

  } catch (e: unknown) {
      console.error(`Error finding post: ${e}`);
  }
}