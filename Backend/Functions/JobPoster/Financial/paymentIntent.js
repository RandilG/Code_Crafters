const connection = require('../../../Services/connection');
const dotenv = require('dotenv');
const {HttpStatusCode} = require('axios');

dotenv.config();

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

module.exports = async function createPaymentIntent(req, res) { 
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: req.body.amount,
      currency: 'usd',
      payment_method_types: ['card']
    });

    console.log(paymentIntent);

    return res.status(HttpStatusCode.Ok).json(paymentIntent.client_secret);
    
  } catch (error) {
    console.log(error);
    return res.status(HttpStatusCode.InternalServerError).json("Internal Server Error");
  }
}