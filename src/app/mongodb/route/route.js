import { Router } from 'express';
import {
   handleLookupRouter,
   handleDeleteRouter,
   handleSearchRouter,
   handleCreteRouter,
   handleUpdateRouter,
   handleSendMessageRouter,
} from '../controller/Controllers';

export const lookUpRouter = Router();
export const createRouter = Router();
export const searchRouter = Router();
export const deleteRouter = Router();
export const updateRouter = Router();
export const sendMessageRouter = Router();

lookUpRouter.get('/lookup-buyer', handleLookupRouter);
createRouter.post('/create-buyer', handleCreteRouter);
searchRouter.post('/search-buyer', handleSearchRouter);
deleteRouter.post('/delete-buyer', handleDeleteRouter);
updateRouter.post('/update-buyer', handleUpdateRouter);
sendMessageRouter.post('/send-message', handleSendMessageRouter);