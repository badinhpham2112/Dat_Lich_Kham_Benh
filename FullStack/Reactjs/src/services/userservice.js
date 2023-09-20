import axios from '../axios'
const handleLoginApi = (email, password) => {
    return axios.post('/api/login', { email, password });

}

const getAllUsers = (inputId) => {
    return axios.get(`/api/get-all-users?id=${inputId}`)
}
const createNewUserService = (data) => {
    console.log('check data from userservice : ', data)
    return axios.post('api/create-new-user', data)
}
const deleteUserService = (userId) => {
    // return axios.delete('api/delete-user', { id: userId })
    return axios.delete('/api/delete-user', {
        data: {
            id: userId
        }
    });

}

const editUserSevice = (inputdata) => {
    return axios.put('/api/edit-user', inputdata);

}

const getAllCodeService = (inputType) => {
    return axios.get(`/api/allcode?type=${inputType}`)

}

const getTopDoctorHomeService = (limit) => {
    return axios.get(`/api/top-doctor-home?limit=${limit}`)
}

const getAllDoctors = () => {
    return axios.get(`/api/get-all-doctors`)
}

const saveDetailDoctorService = (data) => {
    return axios.post('/api/save-infor-doctors', data);

}

const getDetailInforDoctor = (inputId) => {
    return axios.get(`/api/get-detail-doctor-by-id?id=${inputId}`)
}

const saveBulkScheduleDoctor = (data) => {
    return axios.post('/api/bulk-create-schedule', data);

}
const getScheduleDoctorByDate = (doctorId, date) => {
    return axios.get(`/api/get-schedule-doctor-by-date?doctorId=${doctorId}&date=${date}`)
}

const getExtraInforDoctorById = (doctorId) => {
    return axios.get(`/api/get-extra-infor-doctor-by-id?doctorId=${doctorId}`)
}
const getProfileDoctorById = (doctorId) => {
    return axios.get(`/api/get-profile-doctor-by-id?doctorId=${doctorId}`)
}

const postPatientBookAppointment = (data) => {
    return axios.post('/api/patient-book-appointment', data);

}

const postVerifyBookAppointment = (data) => {
    return axios.post('/api/verify-book-appointment', data);

}

const CreateNewSpecialty = (data) => {
    return axios.post('/api/create-new-specialty', data);

}

const getAllSpecialty = () => {
    return axios.get('/api/get-all-specialty')
}

const getDetailSpecialtyById = (data) => {
    return axios.get(`/api/get-detail-specialty-by-id?id=${data.id}&location=${data.location}`)
}

const CreateNewClinic = (data) => {
    return axios.post('/api/create-new-clinic', data);

}

const getAllClinic = () => {
    return axios.get('/api/get-all-clinic')
}

const getDetailClinicById = (data) => {
    return axios.get(`/api/get-detail-clinic-by-id?id=${data.id}`)
}

const getListPatientForDoctor = (data) => {
    return axios.get(`/api/get-list-patient-for-doctor?doctorId=${data.doctorId}&date=${data.date}`)
}

const postSendRemedy = (data) => {
    return axios.post('/api/send-remedy', data);

}

const CreateNewHandbook = (data) => {
    return axios.post('/api/create-new-handbook', data);

}

const getAllHandbook = () => {
    return axios.get('/api/get-all-handbook')
}

const getDetailHandbookById = (data) => {
    return axios.get(`/api/get-detail-handbook-by-id?id=${data.id}&location=${data.location}`)
}


export {
    handleLoginApi,
    getAllUsers,
    createNewUserService,
    deleteUserService,
    editUserSevice,
    getAllCodeService,
    getTopDoctorHomeService,
    getAllDoctors,
    saveDetailDoctorService,
    getDetailInforDoctor,
    saveBulkScheduleDoctor,
    getScheduleDoctorByDate,
    getExtraInforDoctorById,
    getProfileDoctorById,
    postPatientBookAppointment,
    postVerifyBookAppointment,
    CreateNewSpecialty,
    getAllSpecialty,
    getDetailSpecialtyById,
    CreateNewClinic,
    getAllClinic,
    getDetailClinicById,
    getListPatientForDoctor,
    postSendRemedy,
    CreateNewHandbook,
    getAllHandbook,
    getDetailHandbookById



}