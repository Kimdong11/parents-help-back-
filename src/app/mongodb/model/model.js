import mongoose from 'mongoose';

const personInfo = new mongoose.Schema({
   name: String,
   PhoneNum: String,
   Address: String,
});

const Person = mongoose.model('Person', personInfo);

personInfo.statics.findAll = () => {
   // return promise
   // V4부터 exec() 필요없음
   return this.find({});
};

export default Person;
