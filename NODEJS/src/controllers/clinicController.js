import clinicService from '../services/clinicService'



let CreateNewClinic = async(req, res) => {
    try {
        let infor = await clinicService.CreateNewClinic(req.body);
        return res.status(200).json(
            infor
        )

    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errcode: -1,
            errMassage: 'Error from a server'
        })

    }
}

let getAllClinic = async(req, res) => {
    try {
        let infor = await clinicService.getAllClinic();
        return res.status(200).json(
            infor
        )

    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errcode: -1,
            errMassage: 'Error from a server'
        })

    }
}

let getDetailClinicById = async(req, res) => {
    try {
        let infor = await clinicService.getDetailClinicById(req.query.id);
        return res.status(200).json(
            infor
        )

    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errcode: -1,
            errMassage: 'Error from a server'
        })

    }

}

module.exports = {
    CreateNewClinic: CreateNewClinic,
    getAllClinic: getAllClinic,
    getDetailClinicById: getDetailClinicById
}