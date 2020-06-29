const configuration = require('./config');
const sendMail = require('node-email-sender');

class MailSender {

    /* Sends a mail to the given destination using a config variable */
    sendMail(destination) {
        var response = sendMail.sendMail({
            emailConfig: configuration,
            to: destination,
            subject: 'Sample subject',
            content: 'Sample content',
        });
        console.log(response);
    }

}

module.exports = MailSender;