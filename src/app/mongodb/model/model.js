import mongoose from 'mongoose';

const personInfo = new mongoose.Schema({
   name: String,
   phoneNum: String,
   address: String,
});

const Person = mongoose.model('Person', personInfo);


export default Person;
