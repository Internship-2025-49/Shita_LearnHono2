//import hono
import { Hono } from 'hono';

//import controller
import { getFood, createFood, getFoodById, updateFood, deleteFood } from '../controllers/FoodController';
import { basicAuth } from 'hono/basic-auth';
import { apiKeyAuth } from '../middleware/auth';
import prisma from '../../prisma/client';

import { jwt } from 'hono/jwt'
import type { JwtVariables } from 'hono/jwt'

import { cors } from 'hono/cors'

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

app.use('/food/*', apiKeyAuth)

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

app.get('/foodData', (c) => getFood(c));
app.post('/foodData', (c) => createFood(c));
app.get('/foodData/:id', (c) => getFoodById(c));
app.put('/foodData/:id', (c) => updateFood(c)); // Biasain pake PUT 
app.patch('/foodData/:id', (c) => updateFood(c));
app.delete('/foodData/:id', (c) => deleteFood(c));

export const Food = app;