import handbookService from "../services/handbookService"

let CreateNewHandbook = async(req, res) => {
    try {
        let infor = await handbookService.CreateNewHandbook(req.body);
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

let getAllHandbook = async(req, res) => {
    try {
        let infor = await handbookService.getAllHandbook();
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

let getDetailHandbookById = async(req, res) => {
    try {
        let infor = await handbookService.getDetailHandbookById(req.query.id);
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
    CreateNewHandbook: CreateNewHandbook,
    getAllHandbook: getAllHandbook,
    getDetailHandbookById: getDetailHandbookById
}