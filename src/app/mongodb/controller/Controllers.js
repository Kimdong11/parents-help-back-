import Person from '../model/model';
import CryptoJS from 'crypto-js';
import request from 'request';
import dotenv from "dotenv"



export const handleLookupRouter = (req, res) => {
   Person.find({})
      .then(peopleInfo => {
         if (!peopleInfo.length) return res.status(404).send({ err: 'peopleInfo not found' });
         res.send(peopleInfo);
      })
      .catch(err => res.status(500).send(err));
};

export const handleCreteRouter = (req, res) => {
   const inputData = req.body;
   Person.find({ name: inputData.name, phoneNum: inputData.phoneNum })
      .then(peopleInfo => {
         if (peopleInfo.length) return res.json('Failed');
         else {
            const newData = new Person({
               name: inputData.name,
               phoneNum: inputData.phoneNum,
               address: inputData.address,
            });
            newData.save();
            return res.json('Success');
         }
      })
      .catch(err => res.status(500).send(err));
};

export const handleSearchRouter = (req, res) => {
   const inputData = req.body;

   Person.find(inputData.keyword.length == 11 ? { phoneNum: inputData.keyword } : { name: inputData.keyword })
      .then(peopleInfo => {
         if (!peopleInfo.length) return res.status(404).send(null);
         return res.json(peopleInfo);
      })
      .catch(err => res.status(500).send(err));
};

export const handleDeleteRouter = (req, res) => {
   const inputData = req.body;
   Person.findOneAndDelete(inputData)
      .then(response => {
         if (response === null) return res.status(404).send('Failed');
         return res.json([{ status: 'success' }]);
      })
      .catch(err => res.status(500).send(err));
};

export const handleUpdateRouter = (req, res) => {
   const inputData = req.body;
   Person.findOneAndUpdate(inputData[0], inputData[1], err => {
      if (err) {
         return res.status(404).send('Failed');
      } else {
         return res.json([{ status: 'success' }]);
      }
   });
};

export const handleSendMessageRouter = (req, res) => {
   dotenv.config()
   const SERVICE_ID = process.env.SERVICE_ID
   const SECRET_KEY = process.env.SECRET_KEY
   const ACCESS_KEY = process.env.ACCESS_KEY
   const CALL_NUM = process.env.CALL_NUM

   const messageType = () => {
      if (req.body.message.length <= 40) {
         return "SMS"
      }else {
         return "LMS"
      }
   }

   function send_message(phoneNum) {
      var user_phone_number = phoneNum; //수신 전화번호 기입
      var resultCode = 404;
      const date = Date.now().toString();
      const method = 'POST';
      const space = ' ';
      const newLine = '\n';
      const url = `https://sens.apigw.ntruss.com/sms/v2/services/${SERVICE_ID}/messages`;
      const url2 = `/sms/v2/services/${SERVICE_ID}/messages`;
      const hmac = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA256, SECRET_KEY);
      hmac.update(method);
      hmac.update(space);
      hmac.update(url2);
      hmac.update(newLine);
      hmac.update(date);
      hmac.update(newLine);
      hmac.update(ACCESS_KEY);
      const hash = hmac.finalize();
      const signature = hash.toString(CryptoJS.enc.Base64);
      request(
         {
            method: method,
            json: true,
            uri: url,
            headers: {
               'Contenc-type': 'application/json; charset=utf-8',
               'x-ncp-iam-access-key': ACCESS_KEY,
               'x-ncp-apigw-timestamp': date,
               'x-ncp-apigw-signature-v2': signature,
            },
            body: {
               type: messageType(),
               countryCode: '82',
               from: CALL_NUM, //"발신번호기입",
               content: req.body.message, //문자내용 기입,,
               messages: [{ to: `${user_phone_number}` }],
            },
         },
         (err, html) => {
            if (err) {
               console.log(err);
            } else {
               return res.json(html);
            }
         },
      );
   }

   req.body.phoneNum.forEach(phoneNum => {
      send_message(phoneNum);
   });
};
