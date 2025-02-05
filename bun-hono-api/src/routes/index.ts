//import hono
import { Hono } from 'hono';

//import controller
import { getPosts } from '../controllers/PostController';

//inistialize router
const router = new Hono()

//routes posts index
router.get('/', (c) => getPosts(c));

export const Routes = router;