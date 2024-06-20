const { HttpStatusCode } = require('axios');
const connection = require('../../../Services/connection');
const moment = require('moment');

module.exports = async function getWalletData(req, res) {
    try {
        const { userName } = req.params;

        let balance = 0;
        let coins = 0;
        let transactions = [];
        let probation = false;

        //Get wallet balance
        const query1 = "SELECT earnings - withdrawal as balance FROM parttime_srilanka.seeker_wallet WHERE seeker = ?;";
        let resp = await queryAsync(query1, userName);
        if (resp.length != 0) {
            balance = resp[0].balance;
        }

        //Get coins balance
        const query2 = "SELECT earning - withdrawal as balance FROM parttime_srilanka.coin WHERE seeker = ?;";
        resp = await queryAsync(query2, userName);
        if (resp.length != 0) {
            coins = resp[0].balance;
        }

        //Get debit transactions(inflows)
        const query3 = "SELECT * FROM parttime_srilanka.seeker_wallet_debit WHERE wallet_id = (SELECT wallet_id FROM parttime_srilanka.seeker_wallet WHERE seeker = ?);"
        resp = await queryAsync(query3, userName);
        if (resp.length != 0) {
            for (const trans of resp) {
                const transaction = {};
                transaction.id = trans.transaction_id;
                transaction.date = moment(trans.transaction_Date).format("YYYY/MM/DD");
                transaction.amount = (trans.amount).toFixed(2);
                transaction.coins = trans.coins;
                transaction.total = (trans.amount + trans.coins).toFixed(2);
                transaction.type = "debit";
                transactions.push(transaction);
            }
        }

        //Get credit transactions(outflows)
        const query4 = "SELECT * FROM parttime_srilanka.seeker_wallet_credit WHERE wallet_id = (SELECT wallet_id FROM parttime_srilanka.seeker_wallet WHERE seeker = ?);"
        resp = await queryAsync(query4, userName);
        if (res.length != 0) {
            for (const trans of resp) {
                const transaction = {};
                transaction.id = trans.transaction_id;
                transaction.date = moment(trans.transaction_date).format("YYYY/MM/DD");
                transaction.amount = (trans.amount - trans.service_charge).toFixed(2);
                transaction.serviceCharge = (trans.service_charge).toFixed(2);
                transaction.coins = trans.coins;
                transaction.total = (trans.amount + trans.coins).toFixed(2);
                transaction.type = "credit";
                transactions.push(transaction);
            }
        }

        //Sort transactions as recent dates first
        transactions.sort((a, b) => new Date(b.date) - new Date(a.date));

        //Check seeker is in probation or not
        const query5 = "SELECT count(rate) AS count, sum(rate) AS total FROM parttime_srilanka.seeker_ratings WHERE seeker = ?;";
        resp = await queryAsync(query5, userName);
        if (resp.length != 0) {
            const count = resp[0].count;
            const total = resp[0].total;
            const avg = (total / count).toFixed();
            if (count >= 5 && avg < 3) {
                probation = true;
            }
        }

        //Response generate
        const response = {};
        response.balance = balance;
        response.coins = coins;
        response.probation = probation;
        response.transactions = transactions;

        return res.json(response);
    } catch (error) {
        console.log(error);
        return res.json(HttpStatusCode.InternalServerError);
    }
}

function queryAsync(query, values) {
    return new Promise((resolve, reject) => {
        connection.query(query, values, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
}