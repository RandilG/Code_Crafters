const dotenv = require('dotenv');
const axios = require('axios');

dotenv.config();

module.exports = async function sendMobNotify(mobNo, message) {
    const key = process.env.SMS_API_KEY;
    const token = process.env.SMS_API_TOKEN;
    const sender = process.env.SENDER_ID;

    const resp = await axios.post(`http://cloud.websms.lk/smsAPI?sendsms&apikey=${key}&apitoken=${token}&type=sms&from=${sender}&to=${mobNo}&text=${encodeURIComponent(message)}`);

    if(resp.data.status === "queued"){
        return;
    }

    throw new Error();
}