const { HttpStatusCode } = require('axios');
const connection = require('../../../Services/connection');

module.exports = async function ratePoster(req, res) {
    try {
        const { userName, job_id } = req.params;
        const { rate, review } = req.body;

        //Get job data
        const query1 = "SELECT job_poster, work_hours, hourly_rate FROM parttime_srilanka.job WHERE job_id = ?";
        let resp = await queryAsync(query1, job_id);
        const jobPoster = resp[0].job_poster;
        const workHours = Number(resp[0].work_hours);
        const hourly_rate = Number(resp[0].hourly_rate);

        await queryAsync("START TRANSACTION");

        //Insert rate and review to the relevant poster
        const query2 = "INSERT INTO `parttime_srilanka`.`poster_ratings` (`poster`, `rate`, `review`, `seeker`, `job_id`) VALUES (?, ?, ?, ?, ?)";
        resp = await queryAsync(query2, [jobPoster, rate, review, userName, job_id]);

        //Insert income to the seeker wallet        
        //Check availabality of the seeker wallet
        const query3 = "SELECT wallet_id, earnings FROM parttime_srilanka.seeker_wallet WHERE seeker = ?";
        resp = await queryAsync(query3, userName);
        let wallet_id;
        let coins;
        const earnings = workHours * hourly_rate;
        if(resp.length == 0){
            //Create new wallet with the income
            const query4 = "INSERT INTO `parttime_srilanka`.`seeker_wallet` (`seeker`, `earnings`) VALUES (?, ?)";
            resp = await queryAsync(query4, [userName, earnings.toFixed(2)]);
            coins = Math.floor(earnings/1000);
            wallet_id = resp.insertId;
        }else{
            //Update wallet with the income
            wallet_id = resp[0].wallet_id;
            coins = Math.floor((Number(resp[0].earnings)+earnings)/1000);
            const query4 = "UPDATE `parttime_srilanka`.`seeker_wallet` SET `earnings` = `earnings` + ? WHERE (`wallet_id` = ?)";
            await queryAsync(query4, [earnings, wallet_id]);
        }

        //Record transaction
        const query4 = "INSERT INTO `parttime_srilanka`.`seeker_wallet_debit` (`transaction_Date`, `amount`, `wallet_Id`) VALUES (?, ?, ?);";

        await queryAsync(query4, [new Date(), earnings, wallet_id]);

        //Update coins
        const query5 = "UPDATE `parttime_srilanka`.`coin` SET `earning` = ? WHERE (`seeker` = ?);";
        await queryAsync(query5, [coins, userName]);

        //Check upgrade of account level
        const query6 = "SELECT s.account_level, a.coins_limit FROM parttime_srilanka.seeker_account_levels a JOIN parttime_srilanka.job_seeker s ON a.level_id = s.account_level WHERE s.UserName = ?";
        resp = await queryAsync(query6, userName);
        let level = resp[0].account_level;
        const limit = resp[0].coins_limit;
        if(level!=4){
            if(coins>=limit){
                level++;
                const query7 = "UPDATE `parttime_srilanka`.`job_seeker` SET `account_level` = ? WHERE (`UserName` = ?);"
                await queryAsync(query7, [level, userName]);
            }
        }

        await queryAsync("COMMIT"); 

        const jobCoin = Math.floor(earnings/1000);

        return res.json(jobCoin);
    } catch (error) {
        console.log(error);
        await queryAsync("ROLLBACK");
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