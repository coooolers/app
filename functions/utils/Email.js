const functions = require('firebase-functions');
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(functions.config().sendgrid.apikey);

class Email {
    constructor() {
        this.__sgConfig = {
            to: {
                email: null
            },
            from: {
                email: "john@pursoo.co",
                name: "John Rake"
            }
        };
    }

    setToEmail(toEmail) {
        this.__sgConfig.to.email = toEmail;
    };

    setSubject(subject) {
        this.__sgConfig.subject = subject;
    };

    setTemplateId(templateId) {
        this.__sgConfig.templateId = templateId;
    };

    setUnsubscribeGroupId(unsubscribeGroupId) {
        this.__sgConfig.asm = {
            groupId: unsubscribeGroupId
        };
    };

    setSentAt(sendAt) {
        this.__sgConfig.sendAt = sendAt;
    };

    setCategories(categories) {
        this.__sgConfig.categories = categories;
    }

    send() {
        return sgMail.send(this.__sgConfig)
            .catch(function(error) {
                console.error(error);
            });
    }
}

exports.Email = Email;