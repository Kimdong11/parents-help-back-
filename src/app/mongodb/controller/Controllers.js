import Person from '../model/model';

const re = /[^0-9]/g;

export const handleLookupRouter = (req, res) => {
   Person.find({})
      .then(peopleInfo => {
         if (!peopleInfo.length) return res.status(404).send({ err: 'peopleInfo not found' });
         res.send(peopleInfo);
      })
      .catch(err => res.status(500).send(err));
};

export const handleCreteRouter = (req, res) => {
   console.log(req.body);
   const inputData = req.body;
   const newData = new Person({ name: inputData.name, phoneNum: inputData.phoneNum, address: inputData.address });
   newData.save();
   return res.send('Success');
};

export const handleSearchRouter = (req, res) => {
   const inputData = req.body;
   console.log(typeof inputData.keyword);
   Person.find(inputData.keyword.length == 11 ? { phoneNum: inputData.keyword } : { name: inputData.keyword })
      .then(peopleInfo => {
         if (!peopleInfo.length) return res.status(404).send({ err: 'peopleInfo not found' });
         return res.json(peopleInfo);
      })
      .catch(err => res.status(500).send(err));
};

export const handleDeleteRouter = (req, res) => {
   return res.send('Delete');
};
