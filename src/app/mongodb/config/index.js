import mongoose from 'mongoose';

const HOST = 'mongodb://127.0.0.1:27017/test';

mongoose.connect(HOST);

const db = mongoose.connection;

const handleDBOpen = () => {
   console.log('✅DB is open');
};

const handleError = error => {
   console.log('❌DB Error', error);
};

db.on('error', handleError);
db.once('open', handleDBOpen);
