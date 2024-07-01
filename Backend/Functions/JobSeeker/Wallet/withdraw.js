const { HttpStatusCode } = require('axios');
const dotenv = require('dotenv');
const dwolla = require('dwolla-v2');
const connection = require('../../../Services/connection');
const sendMobNotify = require('../../Common/notifications/sendMobNotify');


dotenv.config();

const client = new dwolla.Client({
    key: process.env.DWOLLA_KEY,
    secret: process.env.DWOLLA_SECRET,
    environment: 'sandbox'
});

module.exports = async function withdraw(req, res) {
    try {
        const { userName, amount, coins, probation } = req.body;
        const query1 = "SELECT wallet_id, bankAcc, fundingSource FROM parttime_srilanka.seeker_wallet WHERE seeker = ?;";
        const query2 = "SELECT a.charge_percentge FROM parttime_srilanka.seeker_account_levels a JOIN parttime_srilanka.job_seeker s ON a.level_id = s.account_level WHERE s.UserName = ?;";
        const query3 = "UPDATE `parttime_srilanka`.`seeker_wallet` SET `withdrawal` = `withdrawal`+? WHERE (`wallet_id` = ?);";
        const query4 = "UPDATE `parttime_srilanka`.`coin` SET `withdrawal` = `withdrawal`+ ? WHERE (seeker = ?);";
        const query5 = "INSERT INTO `parttime_srilanka`.`seeker_wallet_credit` (`transaction_date`, `amount`, `service_charge`, `coins`, `wallet_id`) VALUES (?, ?, ?, ?, ?);";
        const query6 = "SELECT TpNumber FROM parttime_srilanka.job_seeker WHERE UserName = ?;";

        //Get bank details of the seeker
        let resp = await queryAsync(query1, userName);

        const date = new Date();
        const walletId = resp[0].wallet_id;
        const bankAcc = resp[0].bankAcc;
        const fundingSource = resp[0].fundingSource;
        let serviceCharge = 0;

        if (probation) {
            serviceCharge = Number(amount * 15 / 100).toFixed(2);
        } else {
            //Get service charge percentage of the seeker by account level
            resp = await queryAsync(query2, userName);
            const serviceChrgePct = resp[0].charge_percentge;
            serviceCharge = Number(amount * serviceChrgePct / 100).toFixed(2);
        }

        const withdrawalAmount = Number(amount - serviceCharge + coins).toFixed(2);

        //Convert withdrawal amount to USD for Dwolla transcation process
        const amountUSD = Number(withdrawalAmount / 300).toFixed(2);

        await queryAsync("START TRANSACTION");

        //Update withdrawal amount in seeker wallet
        await queryAsync(query3, [amount, walletId]);

        //Update coin withdrawal of seeker
        if (coins != 0) {
            await queryAsync(query4, [coins, userName]);
        }

        //Record transaction
        await queryAsync(query5, [date, amount, serviceCharge, coins, walletId]);

        //Transfer waithdrawal amount to seeker's bank account through Dwolla
        var transferRequest = {
            _links: {
                source: {
                    href: "https://api-sandbox.dwolla.com/funding-sources/1c43e7ce-ca2a-435e-abd4-6c86bb620bf0",
                },
                destination: {
                    href: fundingSource,
                },
            },
            amount: {
                currency: "USD",
                value: amountUSD,
            },
        };

        resp = await client.post("transfers", transferRequest);

        await queryAsync("COMMIT"); 

        resp = await queryAsync(query6, userName);

        const mobNo = resp[0].TpNumber;
        const accountNo = 'xxxxxxx'+bankAcc.slice(-4);
        const message = `Your amount of Rs.${withdrawalAmount} will be credited to account ${accountNo} within 24 hours. Rs.${serviceCharge} deducted as a service charge.\nThank You.`;
        await sendMobNotify(mobNo, message);

        return res.json(HttpStatusCode.Ok);
    } catch (error) {
        await queryAsync("ROLLBACK");
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