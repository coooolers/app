const functions = require('firebase-functions');
const moment = require('moment');
const emailUtils = require("./utils/Email");
const Email = emailUtils.Email;


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
    },
    YOUR_BIG_WHY: {
        TEMPLATE_ID: '2fabb70e-3c13-4bab-ba41-925fbac4f0fa',
        UNSUBSCRIBE_GROUP_ID: 6425
    }
};


exports.accountWelcome = functions.database.ref('/users/{userId}/testEmail').onCreate((snapshot, context) => {
    const user = snapshot.val();

    if (user.email) {
        const email = new Email();
        email.setToEmail('john.rake12@gmail.com');
        email.setSubject('Welcome to Pursoo! Have any questions?');
        email.setTemplateId(TRANSACTIONAL_EMAIL_CONFIG.ACCOUNT_WELCOME.TEMPLATE_ID);
        email.setUnsubscribeGroupId(TRANSACTIONAL_EMAIL_CONFIG.ACCOUNT_WELCOME.UNSUBSCRIBE_GROUP_ID);
        return email.send();
    } else {
        console.warn(`${user.uid} has no email. Cannot send email. Terminating...`);
        return Promise.reject("invalid email");
    }
});

exports.choosingAFitnessPath = functions.database.ref('/users/{userId}').onCreate((snapshot, context) => {
    const user = snapshot.val();

    if (user.email) {
        const email = new Email();
        email.setToEmail(user.email);
        email.setSubject('Find your path to success');
        email.setTemplateId(TRANSACTIONAL_EMAIL_CONFIG.CHOOSING_A_FITNESS_PATH.TEMPLATE_ID);
        email.setUnsubscribeGroupId(TRANSACTIONAL_EMAIL_CONFIG.CHOOSING_A_FITNESS_PATH.UNSUBSCRIBE_GROUP_ID);
        email.setSentAt(moment().hour(18).minute(0).second(0).add(1, 'days').unix());
        return email.send();
    } else {
        console.warn(`${user.uid} has no email. Cannot send email. Terminating...`);
        return Promise.reject("invalid email");
    }
});

exports.powerOfHabit = functions.database.ref('/users/{userId}').onCreate((snapshot, context) => {
    const user = snapshot.val();

    if (user.email) {
        const email = new Email();
        email.setToEmail(user.email);
        email.setSubject('The science of habits');
        email.setTemplateId(TRANSACTIONAL_EMAIL_CONFIG.POWER_OF_HABIT.TEMPLATE_ID);
        email.setUnsubscribeGroupId(TRANSACTIONAL_EMAIL_CONFIG.POWER_OF_HABIT.UNSUBSCRIBE_GROUP_ID);
        email.setSentAt(moment().hour(18).minute(0).second(0).add(2, 'days').unix());
        return email.send();
    } else {
        console.warn(`${user.uid} has no email. Cannot send email. Terminating...`);
        return Promise.reject("invalid email");
    }
});

exports.habitCreatingTips = functions.database.ref('/users/{userId}').onCreate((snapshot, context) => {
    const user = snapshot.val();

    if (user.email) {
        const email = new Email();
        email.setToEmail(user.email);
        email.setSubject('4 tips that create lasting habits');
        email.setTemplateId(TRANSACTIONAL_EMAIL_CONFIG.HABIT_CREATING_TIPS.TEMPLATE_ID);
        email.setUnsubscribeGroupId(TRANSACTIONAL_EMAIL_CONFIG.HABIT_CREATING_TIPS.UNSUBSCRIBE_GROUP_ID);
        email.setSentAt(moment().hour(18).minute(0).second(0).add(3, 'days').unix());
        return email.send();
    } else {
        console.warn(`${user.uid} has no email. Cannot send email. Terminating...`);
        return Promise.reject("invalid email");
    }
});

exports.yourBigWhy = functions.database.ref('/users/{userId}').onCreate((snapshot, context) => {
    const user = snapshot.val();

    if (user.email) {
        const email = new Email();
        email.setToEmail(user.email);
        email.setSubject('What Japanese car manufactures can teach you about fitness');
        email.setTemplateId(TRANSACTIONAL_EMAIL_CONFIG.YOUR_BIG_WHY.TEMPLATE_ID);
        email.setUnsubscribeGroupId(TRANSACTIONAL_EMAIL_CONFIG.YOUR_BIG_WHY.UNSUBSCRIBE_GROUP_ID);
        email.setSentAt(moment().hour(18).minute(0).second(0).add(4, 'days').unix());
        return email.send();
    } else {
        console.warn(`${user.uid} has no email. Cannot send email. Terminating...`);
        return Promise.reject("invalid email");
    }
});