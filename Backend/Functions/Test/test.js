const { HttpStatusCode } = require('axios');
const dotenv = require('dotenv');
const dwolla = require('dwolla-v2');

dotenv.config();

const client = new dwolla.Client({
    key: 'QbjpiyIPmDJaQHlTlBPclHHcKPs5VfcBuouA0BOlJ9rsIOP1dC',
    secret: 'HsbMiuQny2s0i5tcMyrC3TLAOME2H4F6uwXJ7pw3rkVVD7lEl8',
    environment: 'sandbox'
})

module.exports = async function test(req, res) {
    try {
        const tokenResponse = await client.auth.client();

        const customerResponse = await client.post('customers', {
            firstName: 'John',
            lastName: 'Doe',
            email: 'johndoe4@example.com',
            type: 'receive-only' // Can be 'receive-only', 'personal', or 'business'
          });

        const customerUrl = customerResponse.headers.get('location');

        console.log(customerUrl);

        const fundingSourceResponse = await client.post(`${customerUrl}/funding-sources`, {
            routingNumber: "222222226",
            accountNumber: "55667788",
            bankAccountType: "checking", // 'checking' or 'savings'
            name: 'My Bank Account'
          });

          const fundingSource = fundingSourceResponse.headers.get('location');
          var accountUrl ="https://api-sandbox.dwolla.com/accounts/26346e84-a28e-4ed0-8e7e-2f4e128cfae5";

          var transferRequest = {
            _links: {
              source: {
                href: "https://api-sandbox.dwolla.com/funding-sources/26346e84-a28e-4ed0-8e7e-2f4e128cfae5",
              },
              destination: {
                href: fundingSource,
              },
            },
            amount: {
              currency: "LKR",
              value: "225.00",
            },
          };
          const resp = await client.post("transfers", transferRequest);
          console.log(resp);
          

        return res.json(HttpStatusCode.Ok);
    } catch (error) {
        console.log(error);
        return res.json(HttpStatusCode.InternalServerError);
    }
};