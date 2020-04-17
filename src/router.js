import { Router } from 'express';
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import Contacts from './app/controllers/ContactsController';

import authMiddleware from './app/middlewares/authenticateMiddleware';

const router = new Router();

router.post('/users', UserController.store);
router.post('/sessions', SessionController.verify);

router.use(authMiddleware);
router.put('/user_update', UserController.update);
router.put('/contact_update', Contacts.update);

router.post('/contacts', Contacts.store);
router.get('/getcontacts', Contacts.index);
router.put('/editcontact/', Contacts.update);

export default router;
