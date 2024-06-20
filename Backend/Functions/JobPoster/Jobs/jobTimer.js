const connection = require('../../../Services/connection');
const { HttpStatusCode } = require("axios");
const moment = require('moment');
require('moment-duration-format');
const sendMobNotify = require('../../Common/notifications/sendMobNotify');


module.exports = async function jobTimer(req, res){
    try {
        const { jobId } = req.body; 

        const query1 = "SELECT work_hours,title FROM parttime_srilanka.job WHERE job_id = ?";
        const query2 = "SELECT j.FirstName, j.TpNumber FROM parttime_srilanka.job_seeker j JOIN parttime_srilanka.assigned_jobs a ON j.UserName = a.assigned_job_seeker WHERE a.assigned_job = ?;";
        const query3 = "UPDATE `parttime_srilanka`.`job` SET `status` = 'complete' WHERE (`job_id` = ?);";

        const jobData = await queryAsync(query1, jobId);

        const workHours = jobData[0].work_hours;
        const jobTitle = jobData[0].title;
        const seekerData = await queryAsync(query2, jobId);

        if(seekerData.length == 0) return res.json(HttpStatusCode.NotFound); //Return 404 for if job seekers not applied

        //Ex: If work hours = 1.30 -> hours = 1, minutes = 30
        //If work hours = 2 -> hours = 2, minutes = 00
        let hours = Math.floor(workHours);
        let minutes = Math.round((workHours - hours) * 60);

        //Check the work time is greater than 0 (Valid work time)
        if(hours<=0 && minutes<=0) return res.json(HttpStatusCode.NoContent); //Return 204 for if work hours 0 or minus value

        let jobDuration = moment.duration({
            hours: hours,
            minutes: minutes
        });

        let countdownInterval = setInterval( async() => {
          // Decrement the countdown by 1 second
          jobDuration = moment.duration(jobDuration - moment.duration(1, 'seconds'));

          if (jobDuration.asMilliseconds() < 0) {
              await queryAsync(query3, jobId);
              clearInterval(countdownInterval);
              return;
          }

          // Format the countdown
          let formattedTime = moment.utc(jobDuration.asMilliseconds()).format('HH:mm:ss');

          //Brodcast to the seekers who applied the job
          req.app.get('io').to(jobId).emit('timerStarted', { timer: formattedTime });

          // console.log(formattedTime);

        }, 1000);

        //Send job starting notification for all the applied seekers
        for(const seeker of seekerData){
          const name = seeker.FirstName;
          const mobNo = seeker.TpNumber;
          const message = `Dear ${name},\n\nYour position as a ${jobTitle} (Job ID:${jobId}), has officially started. Welcome aboard!\n\n**Please reach to the job location immediately.\nIf you have arrived already, disregard this message.\nThank you`
          await sendMobNotify(mobNo, message);
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