const { BASE_URL } = process.env;

const createVerifyEmail = (email, verificationToken) => {
    const mail = {
        to: email,
        subject: "Підтвердження реєстрації на сайті",
        html: `<a target="blank" href="${BASE_URL}/api/auth/verify/${verificationToken}">Натисніть для підтвердження</a>`
    };

    return mail;
};

module.exports = createVerifyEmail;