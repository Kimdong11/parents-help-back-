import { Router } from 'express';
import {
   handleLookupRouter,
   handleDeleteRouter,
   handleSearchRouter,
   handleCreteRouter,
} from '../controller/Controllers';

export const lookUpRouter = Router();
export const createRouter = Router();
export const searchRouter = Router();
export const deleteRouter = Router();

lookUpRouter.get('/lookup-buyer', handleLookupRouter);
createRouter.post('/create-buyer', handleCreteRouter);
searchRouter.post('/search-buyer', handleSearchRouter);
deleteRouter.get('/delete-buyer', handleDeleteRouter);
