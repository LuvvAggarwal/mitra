// JAI SHREE SITARAM
const app_config = require("../config/appconfig")
const nodemailer = require('nodemailer');
const { workerData, parentPort, isMainThread } = require("worker_threads");
const { app } = require("../config/appconfig");

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: app_config.app.mail,
        pass: app_config.app.mail_pswd
        }
});

// if (!isMainThread) {
//     try {
//         parentPort.on("message", async (data) => {
//             const parsed = JSON.parse(data);
//             const mailOptions = createEmail(parsed.to, parsed.name, parsed.uniqueString)
//             transporter.sendMail(mailOptions, (error, info) => {
//                 if (error) {
//                     console.log(error);
//                 } else {
//                     const message = {
//                         msg: "Verification link has been sent on your email. Please Check"
//                     }
//                     parentPort.postMessage(message);
//                 }
//             });

//             // console.log(message);
//             // console.log(`${records.length} records are created.`);
//         })
//     } catch (e) {
//         console.log(e);
//     }
// // }




const sendEmail = async (mailOptions, msg) => {
    return new Promise(function (resolve, reject) {
        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                console.log("error: ", err);
                reject(err);
            } else {
                console.log(`Mail sent successfully!`);
                msg = "Verification link has been sent on your email. Please Check."
                resolve(msg);
            }
        });
    });
}

module.exports = { sendEmail, transporter }


