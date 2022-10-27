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

// c4be9bbb8cd645178730b1b07aa1d088

// tQabw1aAtQ8vwnVFhZh1A0LGXta86lMiuPjaRKC1
