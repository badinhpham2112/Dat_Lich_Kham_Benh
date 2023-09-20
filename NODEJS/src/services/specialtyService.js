import { resolve } from "promise";
import db from "../models/index";
import { reject } from "lodash";
// import Promise from 'promise'
import { name } from "ejs";

let CreateNewSpecialty = (data) => {
    return new Promise(async(resolve, reject) => {
        try {
            if (!data.name || !data.imageBase64 || !data.descriptionHTML || !data.descriptionMarkdown) {
                resolve({
                    errcode: 1,
                    errMessage: 'Missing parameter'
                })
            } else {
                await db.Specialty.create({
                    name: data.name,
                    image: data.imageBase64,
                    descriptionHTML: data.descriptionHTML,
                    descriptionMarkdown: data.descriptionMarkdown,

                })
                resolve({
                    errcode: 0,
                    errMessage: "Ok"
                })
            }
        } catch (e) {
            reject(e);

        }
    })
}

let getAllSpecialty = () => {
    return new Promise(async(resolve, reject) => {
        try {
            let data = await db.Specialty.findAll({

            });
            if (data && data.length > 0) {
                data.map(item => {
                    item.image = new Buffer(item.image, 'base64').toString('binary');
                    return item;
                })
            }
            resolve({
                errcode: 0,
                errMessage: "Ok",
                data
            })
        } catch (e) {
            reject(e)

        }
    })
}

let getDetailSpecialtyById = (inputId, location) => {
    return new Promise(async(resolve, reject) => {
        try {
            if (!inputId || !location) {
                resolve({
                    errcode: 1,
                    errMessage: 'Missing parameter'
                })
            } else {
                let data = await db.Specialty.findOne({
                    where: { id: inputId },
                    attributes: ['descriptionHTML', 'descriptionMarkdown'],
                })



                if (data) {
                    //do something
                    let doctorSpecialty = [];
                    if (location === 'ALL') {
                        doctorSpecialty = await db.Doctor_Infor.findAll({
                            where: { specialtyId: inputId },
                            attributes: ['doctorId', 'provinceId'],
                        })
                    } else {
                        //find by location
                        doctorSpecialty = await db.Doctor_Infor.findAll({
                            where: {
                                specialtyId: inputId,
                                provinceId: location

                            },
                            attributes: ['doctorId', 'provinceId'],
                        })

                    }

                    data.doctorSpecialty = doctorSpecialty;

                } else data = {};
                resolve({
                    errcode: 0,
                    errMessage: "Ok",
                    data
                })


            }

        } catch (e) {
            reject(e);

        }
    })
}

module.exports = {
    CreateNewSpecialty: CreateNewSpecialty,
    getAllSpecialty: getAllSpecialty,
    getDetailSpecialtyById: getDetailSpecialtyById
}