const _ = require('lodash');
const { Path } = require('path-parser');
const { URL } = require('url');
const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

const Survey = mongoose.model('surveys');

module.exports = (app) => {
    app.get('/api/surveys/:surveyId/:choice', (req, res) => {
        res.send('Thanks for voting!');
    });

    app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
        const { title, subject, body, recipients } = req.body;

        const survey = new Survey({
            title,
            subject,
            body,
            recipients: recipients.split(',').map(email => ({ email: email.trim() })),
            _user: req.user.id,
            dateSent: Date.now()
        });

        try {
            const mailer = new Mailer(survey, surveyTemplate(survey));
            await mailer.send();
            await survey.save();
            req.user.credits -= 1;
            const user = await req.user.save();
            res.send(user);
        } catch (err) {
            res.status(422).send(err);
        }
        
    });

    app.post('/api/surveys/webhook', (req, res) => {
        console.log(req.body);
        const path = Path.createPath('/api/surveys/:surveyId/:choice');
        
        _.chain(req.body)
            .map((event) => {
                const match = path.test(new URL(event.url).pathname);
                if (match) {
                    return {
                        email: event.email,
                        surveyId: match.surveyId,
                        choice: match.choice
                    }
                }
            })
            .compact()
            .uniqBy('email', 'surveyId')
            .each(event => {
                Survey.updateOne({
                    _id: event.surveyId,
                    recipients: {
                        $elemMatch: { email: event.email, responded: false }
                    }
                }, {
                    $inc: { [event.choice]: 1 },
                    $set: { 'recipients.$.responded': true },
                    lastResponded: new Date()
                }).exec();
            })
            .value();
        res.send({});
    });
}