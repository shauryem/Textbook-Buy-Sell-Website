import nodemailer from "nodemailer";
import { authenticatedAction } from "../../utils/api";

// Utilizes NodeMailer - a Node.js module - to allow users to send their information to buyers

export default async function sendMail(req, user) {
  const to = req.body.to;
  const email = req.body.email;
  const name = req.body.name;

  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "ucsb.cs48.s20.textbook.app@gmail.com",
      pass: "textbook123",
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const test =
    "<p>Hello!</p> <p>Someone is interested in your book: " +
    name +
    ". Please message them at: " +
    email +
    ".</p> <br> <p>Thank you!</p> <p>The UCSB Textbooks App</p>";

  let mailOptions = {
    from: "ucsb.cs48.s20.textbook.app@gmail.com",
    to: to,
    subject: email + " is Interested in your book (" + name + ")!",
    html: test,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });

  return "ok";
}
