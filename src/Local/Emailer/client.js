"use strict";
const configuration = require('./config');
const nodemailer = require("nodemailer");

class MailSender {

    /* Sends a mail to the given destination using a config variable */
    async sendMailToTeams(body, callback) {
        const configurationClass = new configuration();
        if (body.bugDesc !== undefined && body.message === undefined) { // Message to be sent to the Dev Email
            console.log('Received bug report, initialising procedure ...');
            var successfullySent = 0; // should be two, as two emails have to be successfully sent
            let sentToUser = await configurationClass.devConfigConst.sendMail({
                from: '"TomyVet Dev Team" <tomyvetdev@gmail.com>',
                to: body.email,
                subject: "Bug Report - Confirmation", 
                text: 'Thank you for sending us your review. We will read your bug report and fix the issues asap.', 
            }, async (err, info) => {
                if (!err) {
                    successfullySent += 1;
                }

                /* Execute second mail process */
                let sentToManager = await configurationClass.devConfigConst.sendMail({
                    from: body.email,
                    to: 'tomyvetdev@gmail.com',
                    subject: "Bug Report - Review", 
                    text: body.bugDesc, 
                }, (err, info) => {
                    if (!err) {
                        successfullySent += 1;
                        callback(successfullySent); // analysed on main thread (if 2, emails were sent accordingly)
                    }
                    else {
                        callback(-1);
                    }
                });
            });
        }
        else if (body.message !== undefined) { // Else sent to Shop
            console.log(`Received shop query, initialising procedure for address ${body.email} ...`);
            var successfullySent = 0; // should be two, as two emails have to be successfully sent
            let sentToUser = await configurationClass.shopConfigConst.sendMail({
                from: '"TomyVet Team" <tomyvetcontact@gmail.com>',
                to: body.email,
                subject: "Contact Us - Confirmation", 
                text: 'Thank you for sending us your question. We will review your message and get back to you immediately.', 
            }, async (err, info) => {
                if (!err) {
                    successfullySent += 1;
                }

                /* Execute second mail process */
                let sentToManager = await configurationClass.shopConfigConst.sendMail({
                    from: body.email,
                    to: 'tomyvetcontact@gmail.com',
                    subject: "Question - Review", 
                    text: body.message, 
                }, (err, info) => {
                    if (!err) {
                        successfullySent += 1;
                        callback(successfullySent); // analysed on main thread (if 2, emails were sent accordingly)
                    }
                    else {
                        callback(-1);
                    }
                });
            });
        }
    }

}

module.exports = MailSender;