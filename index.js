require('dotenv').config()

const express = require('express');
const request = require('request-promise-native');
const stripe = require('stripe')(process.env.STRIPE_KEY);
const rateLimit = require('express-rate-limit');

const app = express();

const apiLimiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 5
});

app.use(express.static('public'));
app.use(express.json());

app.post('/', apiLimiter, async (req, res) => {
    const { email, token, fullName, membership, additional, plusOne } = req.body;

    if (!email || !token || !fullName || !membership) {
        return res.status(400).json({ message: 'Invalid body' });
    }

    try {
        const options = {
            method: 'POST',
            uri: process.env.FORM_LINK,
            form: {
                "entry.717698538": fullName,
                "entry.799749242": additional,
                "entry.924011423": membership,
                "entry.1233294446": email,
                "entry.1577292230": plusOne
            }
        }

        const results = await stripe.charges.create({
            amount: plusOne ? 1100 : 550,
            currency: 'cad',
            description: `UBCAni Spring Gala 2019 RSVP`,
            source: token,
            receipt_email: email
        });

        console.log(`Charge successful for ${email}`);
        await request(options);

        console.log(`Submitted payment of ${results.amount} from ${email} to Google Forms`);

        res.json({ message: 'success' });
    } catch (err) {
        console.log('An unexpected error occurred');
        console.log(err);

        res.status(500).json(err);
    }
});

app.listen(3000, () => {
    console.log('App listening on port 3000');
});
