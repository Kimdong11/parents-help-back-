import './app/mongodb/config/index.js';
import './app/mongodb/model/model';
import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import {
   createRouter,
   lookUpRouter,
   searchRouter,
   deleteRouter,
   updateRouter,
   sendMessageRouter,
} from './app/mongodb/route/route.js';

const PORT = 3000;

const app = express();
const logger = morgan('dev');

app.use(logger);
app.use(bodyParser.json());

app.use('/', lookUpRouter);
app.use('/', createRouter);
app.use('/', searchRouter);
app.use('/', deleteRouter);
app.use('/', updateRouter);
app.use('/', sendMessageRouter);

const startMessage = () => {
   console.log('Server is listening On PORT Number 3000');
};

app.listen(PORT, startMessage);
