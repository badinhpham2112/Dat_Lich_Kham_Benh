import db from "../models/index";
import emailService from './emailService';
import { v4 as uuidv4 } from 'uuid';
import { reject } from "lodash";

require('dotenv').config();
let buildUrlEmail = (doctorId, token) => {
    let result = `${process.env.REACT_URL}/verify-booking?token=${token}&doctorId=${doctorId}`
    return result;
}
let postBookAppointment = (data) => {
    return new Promise(async(resolve, reject) => {
        try {
            if (!data.email || !data.doctorId || !data.date || !data.timeType ||
                !data.fullname || !data.selectedGender || !data.address
            ) {
                resolve({
                    errcode: 1,
                    errMessage: 'Missing parameter'
                })
            } else {
                let token = uuidv4();
                await emailService.senSimpleEmail({
                        reciverEmail: data.email,
                        patientName: data.fullname,
                        time: data.timeString,
                        doctorName: data.doctorName,
                        language: data.language,
                        redirectLink: buildUrlEmail(data.doctorId, token)

                    })
                    //upsert patient
                let user = await db.User.findOrCreate({
                    where: { email: data.email },
                    defaults: {
                        email: data.email,
                        roleId: 'R3',
                        gender: data.selectedGender,
                        address: data.address,
                        firstName: data.fullname
                    }
                });
                //create a booking record

                if (user && user[0]) {
                    await db.Booking.findOrCreate({
                        where: { patientId: user[0].id },
                        defaults: {
                            statusId: 'S1',
                            doctorId: data.doctorId,
                            patientId: user[0].id,
                            date: data.date,
                            timeType: data.timeType,
                            token: token
                        }


                    })
                }

                resolve({
                    // data: user,
                    errcode: 0,
                    errMessage: 'Ok'
                })

            }

        } catch (e) {
            reject(e);

        }
    })

}

let postVerifyBookAppointment = (data) => {
    return new Promise(async(resolve, reject) => {
        try {
            if (!data.token || !data.doctorId) {
                resolve({
                    errcode: 1,
                    errMessage: 'Missing parameter'
                })
            } else {
                let appointment = await db.Booking.findOne({
                    where: {
                        doctorId: data.doctorId,
                        token: data.token,
                        statusId: 'S1'
                    },
                    raw: false
                })
                console.log('check Appointment: ', appointment)
                if (appointment) {
                    appointment.statusId = 'S2'
                    await appointment.save();
                    resolve({
                        errcode: 0,
                        errMessage: "Update the appointment success!"
                    })
                } else {
                    resolve({
                        errcode: 2,
                        errMessage: "Appointment has been activated or does not exist"
                    })

                }
            }


        } catch (e) {
            reject(e);
        }

    })

}

module.exports = {
    postBookAppointment: postBookAppointment,
    postVerifyBookAppointment: postVerifyBookAppointment,
}