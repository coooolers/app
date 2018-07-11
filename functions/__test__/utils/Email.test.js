const test = require('firebase-functions-test')();
test.mockConfig({
    sendgrid: {
        apikey: "fake"
    }
});
const moment = require('moment');
const emailUtils = require('../../utils/Email');
const Email = emailUtils.Email;

it('default email', () => {
    const email = new Email();
    email.setToEmail('bob.yukon@pursoo.co');
    email.setTemplateId('1f5493cf-55ff-4712-9d9b-74bdb5bf3277');
    email.setUnsubscribeGroupId(1234);
    email.setSubject('My subject line');
    expect(email.__sgConfig).toEqual({
        asm: {
            groupId: 1234,
        },
        from: {
            email: "john@pursoo.co",
            name: "John Rake",
        },
        subject: "My subject line",
        templateId: "1f5493cf-55ff-4712-9d9b-74bdb5bf3277",
        to: {
            "email": "bob.yukon@pursoo.co",
        },
    });
});

it('default email with no group id', () => {
    const email = new Email();
    email.setToEmail('bob.yukon@pursoo.co');
    email.setTemplateId('1f5493cf-55ff-4712-9d9b-74bdb5bf3277');
    email.setSubject('My subject line');
    expect(email.__sgConfig).toEqual({
        from: {
            email: "john@pursoo.co",
            name: "John Rake",
        },
        subject: "My subject line",
        templateId: "1f5493cf-55ff-4712-9d9b-74bdb5bf3277",
        to: {
            "email": "bob.yukon@pursoo.co",
        },
    });
});

it('default email with send at time', () => {
    const tomorrowAtFour = moment().hour(4).minute(0).second(0).add(1, 'days').unix();
    const email = new Email();
    email.setToEmail('bob.yukon@pursoo.co');
    email.setTemplateId('1f5493cf-55ff-4712-9d9b-74bdb5bf3277');
    email.setSubject('My subject line');
    email.setSentAt(tomorrowAtFour);
    expect(email.__sgConfig).toEqual({
        from: {
            email: "john@pursoo.co",
            name: "John Rake",
        },
        subject: "My subject line",
        templateId: "1f5493cf-55ff-4712-9d9b-74bdb5bf3277",
        to: {
            "email": "bob.yukon@pursoo.co",
        },
        sendAt: tomorrowAtFour
    });
});

it('default email with categories', () => {
    const email = new Email();
    email.setToEmail('bob.yukon@pursoo.co');
    email.setTemplateId('1f5493cf-55ff-4712-9d9b-74bdb5bf3277');
    email.setSubject('My subject line');
    email.setCategories(["transactional", "user-onboarding-drip"]);
    expect(email.__sgConfig).toEqual({
        from: {
            email: "john@pursoo.co",
            name: "John Rake",
        },
        subject: "My subject line",
        templateId: "1f5493cf-55ff-4712-9d9b-74bdb5bf3277",
        to: {
            "email": "bob.yukon@pursoo.co",
        },
        categories: ["transactional", "user-onboarding-drip"]
    });
});