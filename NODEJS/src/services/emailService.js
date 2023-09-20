require('dotenv').config();
// const nodemailer = require("nodemailer");
import nodemailer from 'nodemailer'

let senSimpleEmail = async(dataSend) => {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.EMAIL_APP, // generated ethereal user
            pass: process.env.EMAIL_APP_PASSWORD, // generated ethereal password
        },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: '"Phạm Đình Ba 👻" <phamdinhba09112002@gmail.com>', // sender address
        to: dataSend.reciverEmail, // list of receivers
        subject: "Thông tin đặt lịch khám bệnh ✔", // Subject line
        text: "Hello world?", // plain text body
        html: getBodyHTMLEmail(dataSend), // html body
    });


}

let getBodyHTMLEmail = (dataSend) => {
    let result = ''
    if (dataSend.language === 'vi') {
        result =
            `
        <h3>Xin chào ${dataSend.patientName}!</h3>
        <p>Bạn nhận được email này vì đã dặt lịch khám bện online trên website Đặt lịch khám bệnh</p>
        <p>Thông tin đặt lịch khám bệnh : </p>
        <div><b>Thời gian: ${dataSend.time}</b></div>
        <div><b>Bác sĩ: ${dataSend.doctorName}</b></div>

        <p>Nếu các thông tin trên là đúng sự thật vui lòng click vào link
         bên dưới để xác nhận hoàn tất thủ tục đặt lịch khám bện.</p>
         <div>
         <a href=${dataSend.redirectLink} target="_blank">Click here</a>
         </div>

         <div> Xin chân thành cảm ơn </div>

        `
    }
    if (dataSend.language === 'en') {
        result =
            `
        <h3>Dear ${dataSend.patientName}!</h3>
        <p>You received this email because you booked an online medical appointment on the Book an appointment website</p>
         <p>Medical appointment booking information : </p>
         <div><b>Time: ${dataSend.time}</b></div>
         <div><b>Doctor: ${dataSend.doctorName}</b></div>

         <p>If the above information is true please click on the link
          below to confirm completion of the medical appointment booking process.</p>
          <div>
          <a href=${dataSend.redirectLink} target="_blank">Click here</a>
          </div>

          <div> Thank you very much! </div>

        `
    }
    return result;
}

let getBodyHTMLEmailRemedy = (dataSend) => {
    let result = ''
    if (dataSend.language === 'vi') {
        result =
            `
        <h3>Xin chào ${dataSend.patientName}!</h3>
        <p>Bạn nhận được email này vì đã khám bệnh thành công</p>
        <p>Thông tin đơn thuốc và hóa đơn đính kèm của bạn: </p>
         <div> Xin chân thành cảm ơn </div>

        `
    }
    if (dataSend.language === 'en') {
        result =
            `
            <h3>Dear ${dataSend.patientName}!</h3>
            <p>You received this email because your medical examination was successful</p>
            <p>Your prescription information and attached bill: </p>
             <div> Thank you very much </div>

        `
    }
    return result;

}

let senAttachments = async(dataSend) => {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.EMAIL_APP, // generated ethereal user
            pass: process.env.EMAIL_APP_PASSWORD, // generated ethereal password
        },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: '"Phạm Đình Ba 👻" <phamdinhba09112002@gmail.com>', // sender address
        to: dataSend.email, // list of receivers
        subject: "Kết quả đặt lịch khám bệnh ✔", // Subject line
        text: "Hello world?", // plain text body
        html: getBodyHTMLEmailRemedy(dataSend), // html body
        attachments: [{ // encoded string as an attachment
            filename: `remedy-${dataSend.patientId}-${new Date().getTime()}.png`,
            content: dataSend.imgBase64.split("base64")[1],
            encoding: 'base64'
        }, ]
    });

}


module.exports = {
    senSimpleEmail: senSimpleEmail,
    senAttachments: senAttachments
}