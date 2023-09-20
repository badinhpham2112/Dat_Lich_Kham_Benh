import db from "../models/index";
import bcrypt from 'bcryptjs';

const salt = bcrypt.genSaltSync(10);

let hashUserPassword = (password) => {
    return new Promise(async(resolve, reject) => {
        try {
            let hashPassword = await bcrypt.hashSync(password, salt);
            resolve(hashPassword);
        } catch (e) {
            reject(e);

        }

    })

}


let handleUserLogin = (email, password) => {
    return new Promise(async(resolve, reject) => {
        try {
            let userData = {};

            let isExist = await checkUserEmail(email);
            if (isExist) {
                //user already exist
                //compare password
                let user = await db.User.findOne({
                    attributes: ['id', 'email', 'roleId', 'password', 'firstName', 'lastName', ],
                    where: { email: email },
                    raw: true,
                });
                if (user) {
                    let check = await bcrypt.compareSync(password, user.password);
                    if (check) {
                        userData.errcode = 0;
                        userData.errMessage = 'ok';

                        delete user.password;
                        userData.user = user;
                    } else {
                        userData.errcode = 3;
                        userData.errMessage = 'Wrong password';
                    }
                } else {
                    userData.errcode = 2;
                    userData.errMessage = `User's not found`
                }

            } else {
                //return error
                userData.errcode = 1;
                userData.errMessage = 'your Email isnt exist in your system'
            }

            await resolve(userData)
        } catch (e) {
            reject(e)
        }
    })

}

let checkUserEmail = (UserEmail) => {
    return new Promise(async(resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { email: UserEmail }
            })
            if (user) {
                resolve(true)
            } else {
                resolve(false)
            }

        } catch (e) {
            reject(e)
        }
    })
}

let getAllUsers = (userId) => {
    return new Promise(async(resolve, reject) => {
        try {
            let users = '';
            if (userId === 'ALL') {
                users = await db.User.findAll({
                    attributes: {
                        exclude: ['password']
                    }


                })
            }
            if (userId && userId !== 'ALL') {
                users = await db.User.findOne({
                    where: { id: userId },
                    attributes: {
                        exclude: ['password']
                    }
                })
            }
            resolve(users)

        } catch (e) {
            reject(e);
        }
    })
}

let createNewUser = (data) => {
    return new Promise(async(resolve, reject) => {
        try {
            let check = await checkUserEmail(data.email);
            if (check === true) {
                resolve({
                    errcode: 1,
                    errMessage: 'Your email is already in used, plz try another email!'
                })

            } else {
                let hashPasswordFromBcrypt = await hashUserPassword(data.password);
                await db.User.create({
                    email: data.email,
                    password: hashPasswordFromBcrypt,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    address: data.address,
                    phonenumber: data.phoNenumber,
                    gender: data.gender,
                    roleId: data.roleId,
                    positionId: data.positionId,
                    image: data.avarta
                })
                resolve({
                    errcode: 0,
                    message: 'OK'
                })

            }



        } catch (e) {
            reject(e);

        }

    })
}

let deleteUser = (userId) => {
    return new Promise(async(resolve, reject) => {
        let user = await db.User.findOne({
            where: { id: userId }
        })
        if (!user) {
            resolve({
                ercode: 2,
                errMessage: `nguoi dung khong ton tai`
            })
        }
        await db.User.destroy({
            where: { id: userId }
        });

        resolve({
            ercode: 0,
            message: `nguoi dung da bi xoa`
        })

    })
}

let updateUserData = (data) => {
    return new Promise(async(resolve, reject) => {
        try {
            if (!data.id || !data.roleId || !data.positionId || !data.gender) {
                resolve({
                    ercode: 2,
                    errMessage: 'Missing required parameters!'
                })
            }
            let user = await db.User.findOne({
                where: { id: data.id },
                raw: false
            })
            if (user) {
                user.firstName = data.firstName;
                user.lastName = data.lastName;
                user.address = data.address;
                user.roleId = data.roleId;
                user.positionId = data.positionId;
                user.gender = data.gender;
                user.phonenumber = data.phoneNumber;
                if (data.avarta) {
                    user.image = data.avarta;
                }


                await user.save();

                // await db.User.save({
                //     firstName: data.firstName,
                //     lastName: data.lastName,
                //     address: data.address
                // })

                resolve({
                    errcode: 0,
                    message: 'Update the user success!'
                });
            } else {
                resolve({
                    ercode: 1,
                    errMessage: 'User not found'
                });
            }

        } catch (e) {
            reject(e);

        }
    })
}
let getAllCodeService = (typeInput) => {
    return new Promise(async(resolve, reject) => {
        try {
            if (!typeInput) {
                resolve({
                    errcode: 1,
                    errMessage: 'Missing required parameters!'
                })

            } else {
                let res = {};
                let allcode = await db.Allcode.findAll({
                    where: { type: typeInput }
                });
                res.errcode = 0;
                res.data = allcode;
                resolve(res);
            }



        } catch (e) {
            reject(e);
        }
    })
}

module.exports = {
    handleUserLogin: handleUserLogin,
    getAllUsers: getAllUsers,
    createNewUser: createNewUser,
    deleteUser: deleteUser,
    updateUserData: updateUserData,
    getAllCodeService: getAllCodeService,

}