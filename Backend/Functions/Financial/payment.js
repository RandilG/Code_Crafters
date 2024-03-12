const connection = require('./../../Services/connection');
const dotenv = require('dotenv');
const moment = require('moment');

dotenv.config();

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

module.exports = async function Payment(req, res) {
  try {
    const customer = await stripe.customers.create({
      email: req.body.email,
    });
  
    const paymentIntent = await stripe.paymentIntents.create({
      amount: req.body.amount,
      currency: 'usd',
      customer: customer.id,
      payment_method_types: ['card']
    });

    const query = "INSERT INTO `parttime_srilanka`.`payment` (`amount`, `payment_date`, `payment_id`, `JobPoster`) VALUES (?, ?, ?, ?);";

    const currentDate = moment().format('YYYY-MM-DD');
    const values = [req.body.amount, currentDate, paymentIntent.id, req.body.JobPoster];

    let response = await queryAsync(query, values);

    console.log(paymentIntent)

    if(response.affectedRows==0){
        return res.json("Error")
    }else{
        return res.json("Success")
    }
    
  } catch (error) {
    console.error('Stripe API error:', error);
    return res.json("Internal Server Error");
  }
};

// Helper function to wrap connection.query in a promise
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
