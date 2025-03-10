//import hono
import { Hono } from 'hono';

//import controller
import { getPosts, createPost, getPostById, updatePost, deletePost } from '../controllers/PostController';
import { basicAuth } from 'hono/basic-auth';
import { apiKeyAuth } from '../middleware/auth';
import prisma from '../../prisma/client';

import { jwt } from 'hono/jwt'
import type { JwtVariables } from 'hono/jwt'

// const app = new Hono()

// //routes posts index
// app.use(
//   '/*',
//   basicAuth({
//     username: 'shita',
//     password: 'sitaa',
//   })
// )

// app.get('/shita', async (c) => {
//   const auth = await prisma.auth.findFirst()

//   if (auth) {
//     return c.json(
//       {
//         success: true,
//         message: 'Authorized',
//         key: auth.key
//       }
//     )
//   }
// })

type Variables = JwtVariables

const app = new Hono<{ Variables: Variables }>()

app.use('/data/*', apiKeyAuth)

app.use(
  '/auth/*',
  jwt({
    secret: '4bc8dacaeff0b089cc7d4c06dbc9a4128aabaa67fe72e8e1825be6b410745dc1',
  })
)

app.get('/shita', async (c) => {
    const auth = await prisma.auth.findFirst()
  
    if (auth) {
      return c.json(
        {
          success: true,
          message: 'Authorized',
          key: auth.key
        }
      )
    }
  })

app.get('/data', (c) => getPosts(c));
app.post('/data', (c) => createPost(c));
app.get('/data/:id', (c) => getPostById(c));
app.put('/data/:id', (c) => updatePost(c)); // Biasain pake PUT 
app.patch('/data/:id', (c) => updatePost(c));
app.delete('/data/:id', (c) => deletePost(c));

export const Routes = app;