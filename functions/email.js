const functions = require('firebase-functions');
const moment = require('moment');
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(functions.config().sendgrid.apikey);

const DEFAULT_FROM = "john@pursoo.co";
const TRANSACTIONAL_EMAIL_CONFIG = {
    ACCOUNT_WELCOME: {
        TEMPLATE_ID: "ceb7cb92-717a-46e9-bb71-3ce3516ca309",
        UNSUBSCRIBE_GROUP_ID: 6425
    },
    CHOOSING_A_FITNESS_PATH: {
        TEMPLATE_ID: '5b1213da-fa60-442d-ba5e-9396891a2202',
        UNSUBSCRIBE_GROUP_ID: 6425
    },
    POWER_OF_HABIT: {
        TEMPLATE_ID: 'ab3fc734-0b16-4d76-969e-f8f811c7b9b6',
        UNSUBSCRIBE_GROUP_ID: 6425
    },
    HABIT_CREATING_TIPS: {
        TEMPLATE_ID: '609d79cd-7901-4bcb-b03d-ae65ea63a0b4',
        UNSUBSCRIBE_GROUP_ID: 6425
    }
};

function sendTransactionalEmail(to, from, subject, templateId, unsubscribeGroupId, options = {}) {
    const msg = Object.assign({
        to,
        from,
        subject,
        templateId,
        asm: {
            groupId: unsubscribeGroupId
        }
    }, options);

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

exports.choosingAFitnessPath = functions.database.ref('/users/{userId}').onCreate((snapshot, context) => {
    const user = snapshot.val();

    if (user.email) {
        return sendTransactionalEmail(
            user.email,
            DEFAULT_FROM,
            'Find your path to success',
            TRANSACTIONAL_EMAIL_CONFIG.CHOOSING_A_FITNESS_PATH.TEMPLATE_ID,
            TRANSACTIONAL_EMAIL_CONFIG.CHOOSING_A_FITNESS_PATH.UNSUBSCRIBE_GROUP_ID, {
                sendAt: moment().hour(18).minute(0).second(0).add(1, 'days').unix()
            }
        );
    } else {
        console.warn(`${user.uid} has no email. Cannot send email. Terminating...`);
        return Promise.reject("invalid email");
    }
});

exports.powerOfHabit = functions.database.ref('/users/{userId}').onCreate((snapshot, context) => {
    const user = snapshot.val();

    if (user.email) {
        return sendTransactionalEmail(
            user.email,
            DEFAULT_FROM,
            'The science of habits',
            TRANSACTIONAL_EMAIL_CONFIG.POWER_OF_HABIT.TEMPLATE_ID,
            TRANSACTIONAL_EMAIL_CONFIG.POWER_OF_HABIT.UNSUBSCRIBE_GROUP_ID, {
                sendAt: moment().hour(18).minute(0).second(0).add(2, 'days').unix()
            }
        );
    } else {
        console.warn(`${user.uid} has no email. Cannot send email. Terminating...`);
        return Promise.reject("invalid email");
    }
});

exports.habitCreatingTips = functions.database.ref('/users/{userId}').onCreate((snapshot, context) => {
    const user = snapshot.val();

    if (user.email) {
        return sendTransactionalEmail(
            user.email,
            DEFAULT_FROM,
            '4 tips that create lasting habits',
            TRANSACTIONAL_EMAIL_CONFIG.HABIT_CREATING_TIPS.TEMPLATE_ID,
            TRANSACTIONAL_EMAIL_CONFIG.HABIT_CREATING_TIPS.UNSUBSCRIBE_GROUP_ID, {
                sendAt: moment().hour(18).minute(0).second(0).add(3, 'days').unix()
            }
        );
    } else {
        console.warn(`${user.uid} has no email. Cannot send email. Terminating...`);
        return Promise.reject("invalid email");
    }
});