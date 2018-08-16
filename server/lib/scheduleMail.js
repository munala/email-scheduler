const nodemailer = require('nodemailer');
const schedule = require('node-schedule');
const Job = require('../models').jobs;

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_SENDER,
    pass: process.env.EMAIL_PASSWORD,
  },
  logger: true,
  debug: false,
});

const sendMail = async ({
  subject, body, to,
}) => {
  const mailOptions = {
    from: process.env.EMAIL_SENDER,
    to,
    subject,
    text: body,
    html: body,
  };

  return transporter.sendMail(mailOptions);
};

module.exports = async (data) => {
  const date = new Date(data.date);

  const job = schedule.scheduleJob(date, async () => {
    sendMail(data);

    await Job.update({
      finished: true,
    }, {
      where: data,
    });
  });

  return job;
};
