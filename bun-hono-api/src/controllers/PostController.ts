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