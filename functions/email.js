const functions = require('firebase-functions');
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(functions.config().sendgrid.apikey);

const DEFAULT_FROM = "john@pursoo.co";
const TRANSACTIONAL_EMAIL_CONFIG = {
    ACCOUNT_WELCOME: {
        TEMPLATE_ID: "ceb7cb92-717a-46e9-bb71-3ce3516ca309",
        UNSUBSCRIBE_GROUP_ID: 6425
    }
};

function sendTransactionalEmail(to, from, subject, templateId, unsubscribeGroupId) {
    const msg = {
        to,
        from,
        subject,
        templateId,
        asm: {
            groupId: unsubscribeGroupId
        }
    };

    return sgMail.send(msg);
}


exports.accountWelcome = functions.database.ref('/users/{userId}').onCreate((snapshot, context) => {
    const user = snapshot.val();

    if (user.email) {
        return sendTransactionalEmail(
            user.email,
            DEFAULT_FROM,
            'Welcome to Pursoo! Have any questions?',
            TRANSACTIONAL_EMAIL_CONFIG.ACCOUNT_WELCOME.TEMPLATE_ID,
            TRANSACTIONAL_EMAIL_CONFIG.ACCOUNT_WELCOME.UNSUBSCRIBE_GROUP_ID
        );
    } else {
        console.warn(`${user.uid} has no email. Cannot send email. Terminating...`);
        return Promise.reject("invalid email");
    }
});