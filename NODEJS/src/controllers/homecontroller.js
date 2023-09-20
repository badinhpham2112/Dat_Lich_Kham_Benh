import db from '../models/index';
import CRUDService from '../services/CRUDService';
let getHomePage = async(req, res) => {
    try {
        let data = await db.User.findAll();
        return res.render('homepage.ejs', {
            data: JSON.stringify(data)
        });
    } catch (e) {
        console.log(e)
    }
}

let getAboutpage = (req, res) => {
    return res.render('test/about.ejs');
}

let postCRUD = async(req, res) => {
    let message = await CRUDService.createNewUser(req.body);
    console.log(message)
    return res.send('POST crud from sever')
}

let getCRUD = (req, res) => {
    return res.render('crud.ejs');
}

let dislayGetCRUD = async(req, res) => {
    let data = await CRUDService.getAllUser();
    console.log('---------------------------------------')
    console.log(data);
    console.log('---------------------------------------')
    return res.render('desplayCRUD.ejs', {
        dataTable: data
    })
}

let GetEditCRUD = async(req, res) => {
    let userId = req.query.id;
    if (userId) {
        let userData = await CRUDService.getUserInfoById(userId);
        //let userData

        return res.render('editCRUD.ejs', {
            user: userData
        });

    } else {
        return res.send('User not found!');

    }

}

let putCRUD = async(req, res) => {
    let data = req.body;
    let allUsers = await CRUDService.updateUserData(data);
    return res.render('desplayCRUD.ejs', {
        dataTable: allUsers
    })
}

let deleteCRUD = async(req, res) => {
    let id = req.query.id;
    if (id) {
        await CRUDService.deleteUserById(id);
        return res.send('delete the user succees!')
    } else {
        return res.send('user not succees!')
    }
}

module.exports = {
    getHomePage: getHomePage,
    getAboutpage: getAboutpage,
    getCRUD: getCRUD,
    postCRUD: postCRUD,
    dislayGetCRUD: dislayGetCRUD,
    GetEditCRUD: GetEditCRUD,
    putCRUD: putCRUD,
    deleteCRUD: deleteCRUD,

}