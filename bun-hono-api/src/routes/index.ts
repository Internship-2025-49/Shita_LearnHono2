//import hono
import { Hono } from 'hono';

//import controller
import { getPosts, createPost, getPostById, updatePost, deletePost } from '../controllers/PostController';
import { basicAuth } from 'hono/basic-auth';
import { apiKeyAuth } from '../middleware/auth';
import prisma from '../../prisma/client';

const app = new Hono()

//routes posts index
app.use(
  '/shita/*',
  basicAuth({
    username: 'shita',
    password: 'sitaa',
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

// app.use(
//   '/admin/*',
//   basicAuth({
//     username: 'admin',
//     password: 'secret',
//   })
// )

// app.get('/admin', (c) => {
//   return c.text('You are authorized!')
// })

app.use('*', apiKeyAuth)

app.get('/data', (c) => getPosts(c));
app.post('/data', (c) => createPost(c));
app.get('/data/:id', (c) => getPostById(c));
app.put('/data/:id', (c) => updatePost(c)); // Biasain pake PUT 
app.patch('/data/:id', (c) => updatePost(c));
app.delete('/data/:id', (c) => deletePost(c));

export const Routes = app;