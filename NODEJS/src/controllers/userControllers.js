import userservice from "../services/userservice"

let handleLogin = async(req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    if (!email || !password) {
        return res.status(500).json({
            errcode: 1,
            message: 'Mising input parameter!'
        })
    }


    let userData = await userservice.handleUserLogin(email, password);
    console.log(userData)
    return res.status(200).json({
        errcode: userData.errcode,
        message: userData.errMessage,
        user: userData.user ? userData.user : {}

    })

}

let handleGetAllUsers = async(req, res) => {
    let id = req.query.id;

    if (!id) {
        return res.status(200).json({
            errcode: 1,
            errMessage: 'Missing required parameters',
            users: []
        })
    }


    let users = await userservice.getAllUsers(id);

    return res.status(200).json({
        errcode: 0,
        errMessage: 'ok',
        users
    })
}

let handleCreateNewUser = async(req, res) => {

    let message = await userservice.createNewUser(req.body);
    return res.status(200).json(message);

}

let handleDeleteUser = async(req, res) => {
    if (!req.body.id) {
        return res.status(200).json({
            errcode: 1,
            errMessage: "Missing requaired parameters!"
        })
    }
    let message = await userservice.deleteUser(req.body.id);
    return res.status(200).json(message);

}

let handleEditUser = async(req, res) => {
    let data = req.body;
    let message = await userservice.updateUserData(data);
    return res.status(200).json(message)
}

let getAllcode = async(req, res) => {
    try {
        setTimeout(async() => {
            let data = await userservice.getAllCodeService(req.query.type);
            return res.status(200).json(data);
        }, 0)


    } catch (e) {
        console.log('Get all code error: ', e)
        return res.status(200).json({
            errcode: 1,
            errMessage: 'Error from sever',
        })
    }
}


module.exports = {
    handleLogin: handleLogin,
    handleGetAllUsers: handleGetAllUsers,
    handleCreateNewUser: handleCreateNewUser,
    handleEditUser: handleEditUser,
    handleDeleteUser: handleDeleteUser,
    getAllcode: getAllcode,
}