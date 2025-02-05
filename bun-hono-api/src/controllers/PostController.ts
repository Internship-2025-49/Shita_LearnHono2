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