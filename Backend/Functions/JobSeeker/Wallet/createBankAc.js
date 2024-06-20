const { HttpStatusCode } = require('axios');
const dotenv = require('dotenv');
const dwolla = require('dwolla-v2');
const connection = require('../../../Services/connection');

dotenv.config();

const client = new dwolla.Client({
    key: process.env.DWOLLA_KEY,
    secret: process.env.DWOLLA_SECRET,
    environment: 'sandbox'
});

module.exports = async function createBankAccount(req, res) {
    try {
        const { userName, firstName, lastName, bank, branch, account } = req.body;

        //Check status of Dwolla account
        await client.auth.client();

        //Create Customer
        const customerResponse = await client.post('customers', {
            firstName: firstName,
            lastName: lastName,
            email: userName,
            type: 'receive-only' // Can be 'receive-only', 'personal', or 'business'
          });

        const customerUrl = customerResponse.headers.get('location');

        const fundingSourceResponse = await client.post(`${customerUrl}/funding-sources`, {
            routingNumber: "222222226",
            accountNumber: "55667788",
            bankAccountType: "checking", // 'checking' or 'savings'
            name: 'My Bank Account'
          });

        const fundingSource = fundingSourceResponse.headers.get('location');

        const query1 = "SELECT * FROM parttime_srilanka.seeker_wallet WHERE seeker = ?;";
        const query2 = "UPDATE `parttime_srilanka`.`seeker_wallet` SET `holder` = ?, `bank` = ?, `branch` = ?, `bankAcc` = ?, `fundingSource` = ? WHERE (`wallet_id` = ?);";
        const query3 = "INSERT INTO `parttime_srilanka`.`seeker_wallet` (`seeker`, `holder`, `bank`, `branch`, `bankAcc`, `fundingSource`) VALUES (?, ?, ?, ?, ?, ?);";

        let resp = await queryAsync(query1, userName);

        console.log(fundingSource);

        if(resp.length!=0){
            const walletId = resp[0].wallet_id;
            const name = firstName+' '+lastName;
            await queryAsync(query2, [name, bank, branch, account, fundingSource, walletId]);
        }else{
            const name = firstName+' '+lastName;
            await queryAsync(query3, [userName, name, bank, branch, account, fundingSource]);
        }
        return res.json(HttpStatusCode.Ok);
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