import specialtyService from '../services/specialtyService'

let CreateNewSpecialty = async(req, res) => {
    try {
        let infor = await specialtyService.CreateNewSpecialty(req.body);
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

let getAllSpecialty = async(req, res) => {
    try {
        let infor = await specialtyService.getAllSpecialty();
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

let getDetailSpecialtyById = async(req, res) => {
    try {
        let infor = await specialtyService.getDetailSpecialtyById(req.query.id, req.query.location);
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
    CreateNewSpecialty: CreateNewSpecialty,
    getAllSpecialty: getAllSpecialty,
    getDetailSpecialtyById: getDetailSpecialtyById
}