//import hono
import { Hono } from 'hono'
import { cors } from 'hono/cors'


//import routes
import { Routes } from './routes'
import { Food } from './routes/indexFood'

// Initialize the Hono app
const app = new Hono().basePath('/api')

app.use('*', cors({
  origin: 'http://localhost:3000',
  allowMethods: ['GET','POST', 'PUT', 'DELETE'], 
  allowHeaders: ["*"],
}))

// Posts Routes
app.route('/posts', Routes)
app.route('/food', Food)

export default app