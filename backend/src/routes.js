import { Router } from 'express';
import authMiddleware from './app/middlewares/auth';
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';

const routes = new Router();

routes.post('/signup', UserController.create);
routes.get('/user', authMiddleware, UserController.read);

routes.post('/signin', SessionController.create);

export default routes;
