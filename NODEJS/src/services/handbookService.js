import { resolve } from "promise";
import db from "../models/index";
import { reject } from "lodash";
// import Promise from 'promise'
import { name } from "ejs";

let CreateNewHandbook = (data) => {
    return new Promise(async(resolve, reject) => {
        try {
            if (!data.name || !data.imageBase64 || !data.descriptionHTML || !data.descriptionMarkdown) {
                resolve({
                    errcode: 1,
                    errMessage: 'Missing parameter'
                })
            } else {
                await db.Handbook.create({
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

let getAllHandbook = () => {
    return new Promise(async(resolve, reject) => {
        try {
            let data = await db.Handbook.findAll({

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

let getDetailHandbookById = (inputId) => {
    return new Promise(async(resolve, reject) => {
        try {
            if (!inputId) {
                resolve({
                    errcode: 1,
                    errMessage: 'Missing parameter'
                })
            } else {
                let data = await db.Handbook.findOne({
                    where: { id: inputId },
                    attributes: ['name', 'descriptionHTML', 'descriptionMarkdown'],
                })



                if (data) {
                    //do something
                    let doctorHandbook = [];

                    doctorHandbook = await db.Doctor_Infor.findAll({
                        where: { clinicId: inputId },
                        attributes: ['doctorId', 'provinceId'],
                    })


                    data.doctorHandbook = doctorHandbook;

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
    CreateNewHandbook: CreateNewHandbook,
    getAllHandbook: getAllHandbook,
    getDetailHandbookById: getDetailHandbookById
}