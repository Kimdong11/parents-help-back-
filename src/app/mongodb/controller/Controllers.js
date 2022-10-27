import Person from '../model/model';
import CryptoJS from 'crypto-js';
import request from 'request';

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
   let result;
   function send_message(phoneNum) {
      var user_phone_number = phoneNum; //수신 전화번호 기입
      var resultCode = 404;
      const date = Date.now().toString();
      const uri = 'ncp:sms:kr:294897668574:address_bok'; //서비스 ID
      const secretKey = 'mRPgGE5N8Mihu9B9L7DjysQ6cLAdqB0oAvrpxSmo'; // Secret Key
      const accessKey = 'Rh2PLA1KdnZ6Y9rBuPkb'; //Access Key
      const method = 'POST';
      const space = ' ';
      const newLine = '\n';
      const url = `https://sens.apigw.ntruss.com/sms/v2/services/${uri}/messages`;
      const url2 = `/sms/v2/services/${uri}/messages`;
      const hmac = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA256, secretKey);
      hmac.update(method);
      hmac.update(space);
      hmac.update(url2);
      hmac.update(newLine);
      hmac.update(date);
      hmac.update(newLine);
      hmac.update(accessKey);
      const hash = hmac.finalize();
      const signature = hash.toString(CryptoJS.enc.Base64);
      request(
         {
            method: method,
            json: true,
            uri: url,
            headers: {
               'Contenc-type': 'application/json; charset=utf-8',
               'x-ncp-iam-access-key': accessKey,
               'x-ncp-apigw-timestamp': date,
               'x-ncp-apigw-signature-v2': signature,
            },
            body: {
               type: 'SMS',
               countryCode: '82',
               from: '01098982660', //"발신번호기입",
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
