//import hono
import { Hono } from 'hono';

//import controller
import { getPosts, createPost, getPostById, updatePost } from '../controllers/PostController';

//inistialize router
const router = new Hono()

//routes posts index
router.get('/', (c) => getPosts(c));
router.post('/', (c) => createPost(c));
router.get('/:id', (c) => getPostById(c));
router.patch('/:id', (c) => updatePost(c));

export const Routes = router;