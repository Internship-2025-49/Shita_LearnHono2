//import hono
import { Hono } from 'hono'

//import routes
import { Routes } from './routes'
import { Food } from './routes/indexFood'

// Initialize the Hono app
const app = new Hono().basePath('/api')

// Posts Routes
app.route('/posts', Routes)
app.route('/food', Food)

export default app