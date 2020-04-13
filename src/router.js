import { Router } from 'express';
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import Contacts from './app/controllers/ContactsController';
import AddressController from './app/controllers/AddressController';

import authMiddleware from './app/middlewares/authenticateMiddleware';

const router = new Router();

router.post('/users', UserController.store);
router.get('/address', AddressController.store);
router.use(authMiddleware);
router.put('/update', UserController.update);
router.post('/sessions', SessionController.verify);
router.post('/contacts', Contacts.store);
router.get('/getcontacts', Contacts.index);
export default router;
