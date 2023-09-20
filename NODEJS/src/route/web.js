import express, { Router } from "express";
import homecontrollers from "../controllers/homecontroller";
import userControllers from "../controllers/userControllers";
import doctorController from "../controllers/doctorController";
import patientController from "../controllers/patientController";
import specialtyController from "../controllers/specialtyController";
import clinicController from "../controllers/clinicController";
import handbookController from "../controllers/handbookController";

let router = express.Router();

let initWebRoutes = (app) => {

    router.get('/', homecontrollers.getHomePage);
    router.get('/about', homecontrollers.getAboutpage);
    router.get('/crud', homecontrollers.getCRUD);
    router.post('/post-crud', homecontrollers.postCRUD);
    router.get('/get-crud', homecontrollers.dislayGetCRUD);
    router.get('/edit-crud', homecontrollers.GetEditCRUD);
    router.post('/put-crud', homecontrollers.putCRUD);
    router.get('/delete-crud', homecontrollers.deleteCRUD);

    router.post('/api/login', userControllers.handleLogin);
    router.get('/api/get-all-users', userControllers.handleGetAllUsers);
    router.post('/api/create-new-user', userControllers.handleCreateNewUser);
    router.put('/api/edit-user', userControllers.handleEditUser);
    router.delete('/api/delete-user', userControllers.handleDeleteUser);
    router.get('/api/allcode', userControllers.getAllcode);

    router.get('/api/top-doctor-home', doctorController.getTopDoctorHome);
    router.get('/api/get-all-doctors', doctorController.getAllDoctors);
    router.post('/api/save-infor-doctors', doctorController.postInforDoctor);
    router.get('/api/get-detail-doctor-by-id', doctorController.getDetailDoctorById);
    router.post('/api/bulk-create-schedule', doctorController.bulkCreateSchedule);
    router.get('/api/get-schedule-doctor-by-date', doctorController.getScheduleByDate);
    router.get('/api/get-extra-infor-doctor-by-id', doctorController.getExtraInforDoctorById);
    router.get('/api/get-profile-doctor-by-id', doctorController.getProfileDoctorById);

    router.get('/api/get-list-patient-for-doctor', doctorController.getListPatientForDoctor);
    router.post('/api/send-remedy', doctorController.sendRemedy);





    router.post('/api/patient-book-appointment', patientController.postBookAppointment);
    router.post('/api/verify-book-appointment', patientController.postVerifyBookAppointment);

    router.post('/api/create-new-specialty', specialtyController.CreateNewSpecialty);
    router.get('/api/get-all-specialty', specialtyController.getAllSpecialty);
    router.get('/api/get-detail-specialty-by-id', specialtyController.getDetailSpecialtyById);

    router.post('/api/create-new-clinic', clinicController.CreateNewClinic);
    router.get('/api/get-all-clinic', clinicController.getAllClinic);
    router.get('/api/get-detail-clinic-by-id', clinicController.getDetailClinicById);


    router.post('/api/create-new-handbook', handbookController.CreateNewHandbook);
    router.get('/api/get-all-handbook', handbookController.getAllHandbook);
    router.get('/api/get-detail-handbook-by-id', handbookController.getDetailHandbookById);



    return app.use("/", router);
}

module.exports = initWebRoutes;