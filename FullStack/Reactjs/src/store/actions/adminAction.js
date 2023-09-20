import actionTypes from './actionTypes';
import {
    createNewUserService,
    getAllCodeService,
    getAllUsers,
    deleteUserService,
    editUserSevice,
    getTopDoctorHomeService,
    getAllDoctors,
    saveDetailDoctorService,
    getAllSpecialty,
    getAllClinic
} from '../../services/userservice';
import { toast } from "react-toastify";

// export const fetchGenderStart = () => ({
//     type: actionTypes.FETCH_GENDER_START
// })

export const fetchGenderStart = () => {
    return async(dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_GENDER_START })
            let res = await getAllCodeService('GENDER');
            if (res && res.errcode == 0) {

                dispatch(fetchGenderSuccess(res.data))
            } else {
                dispatch(fetchGenderFaider());
            }
        } catch (e) {
            dispatch(fetchGenderFaider());
            console.log('fetchGenderStart error', e)

        }
    }
}

export const fetchPositionStart = () => {
    return async(dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_POSITION_START })
            let res = await getAllCodeService('POSITION');
            if (res && res.errcode == 0) {

                dispatch(fetchPositionSuccess(res.data))
            } else {
                dispatch(fetchPositionFaider());
            }
        } catch (e) {
            dispatch(fetchPositionFaider());
            console.log('fetchPositionStart error', e)

        }
    }
}

export const fetchRoleStart = () => {
    return async(dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_ROLE_START })
            let res = await getAllCodeService('ROLE');
            if (res && res.errcode == 0) {

                dispatch(fetchRoleSuccess(res.data))
            } else {
                dispatch(fetchRoleFaider());
            }
        } catch (e) {
            dispatch(fetchRoleFaider());
            console.log('fetchRoleStart error', e)

        }
    }
}

export const createNewUser = (data) => {
    return async(dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_ROLE_START })
            let res = await createNewUserService(data);


            if (res && res.errcode === 0) {
                toast.success("create a new user succeed!");
                dispatch(saveUserSuccess())
                dispatch(fetchAllUsersStart())
            } else {
                dispatch(saveUserFailed());
            }
        } catch (e) {
            dispatch(saveUserFailed());
            console.log('saveUserFailed error', e)

        }
    }

}

export const saveUserSuccess = () => ({
    type: actionTypes.CREATE_USER_SUCCESS,
})

export const saveUserFailed = () => ({
    type: actionTypes.CREATE_USER_FAILDED

})

export const deleteAUser = (userId) => {
    return async(dispatch, getState) => {
        try {
            let res = await deleteUserService(userId);


            if (res && res.errcode === 0) {
                // toast.success("Delete the user secceed!");
                // dispatch(deleteUserSuccess())
                // dispatch(fetchAllUsersStart())
                toast.error("Delete the user error!");
                dispatch(deleteUserFailed());
            } else {
                // toast.error("Delete the user error!");
                // dispatch(deleteUserFailed());
                toast.success("Delete the user secceed!");
                dispatch(deleteUserSuccess())
                dispatch(fetchAllUsersStart())
            }
        } catch (e) {
            toast.error("Delete the user error!");
            dispatch(deleteUserFailed());
            console.log('deleteUserFailed error', e)

        }
    }

}


export const editAUser = (data) => {
    return async(dispatch, getState) => {
        try {
            let res = await editUserSevice(data);


            if (res && res.errcode === 0) {
                toast.success("Update the user secceed!");
                dispatch(editUserSuccess())
                dispatch(fetchAllUsersStart())
            } else {
                toast.error("Update the user error!");
                dispatch(editUserFailed());
            }
        } catch (e) {
            toast.error("Update the user error!");
            dispatch(editUserFailed());
            console.log('UpdateUserFailed error', e)

        }
    }

}

export const editUserSuccess = () => ({
    type: actionTypes.EDIT_USERS_SUCCESS
})

export const editUserFailed = () => ({
    type: actionTypes.EDIT_USERS_FAIDER
})

export const deleteUserSuccess = () => ({
    type: actionTypes.DELETE_USERS_SUCCESS,
})

export const deleteUserFailed = () => ({
    type: actionTypes.DELETE_USERS_FAIDER,
})




export const fetchGenderSuccess = (genderData) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data: genderData
})


export const fetchGenderFaider = () => ({
    type: actionTypes.FETCH_GENDER_FAIDER

})


export const fetchPositionSuccess = (positionData) => ({
    type: actionTypes.FETCH_POSITION_SUCCESS,
    data: positionData
})


export const fetchPositionFaider = () => ({
    type: actionTypes.FETCH_POSITION_FAIDER

})

export const fetchRoleSuccess = (roleData) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    data: roleData
})


export const fetchRoleFaider = () => ({
    type: actionTypes.FETCH_ROLE_FAIDER

})

export const fetchAllUsersStart = () => {
    return async(dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_GENDER_START })
            let res = await getAllUsers('ALL');
            // let res1 = await getTopDoctorHomeService(3);
            // console.log('check res get top doctor: ', res1)
            if (res && res.errcode == 0) {
                dispatch(fetchAllUsersSuccess(res.users.reverse()))
            } else {
                toast.error("Fetch all user error!");
                dispatch(fetchAllUsersFaider());
            }
        } catch (e) {
            toast.error("Fetch all user error!");

            dispatch(fetchAllUsersFaider());
            console.log('fetchAllUsersFaider error', e)

        }
    }
}

export const fetchAllUsersSuccess = (data) => ({
    type: 'FETCH_ALL_USERS_SUCCESS',
    users: data
})

export const fetchAllUsersFaider = () => ({
    type: 'FETCH_ALL_USERS_FAIDE'

})

export const fetchTopDoctor = () => {
    return async(dispatch, getState) => {
        try {
            let res = await getTopDoctorHomeService('')
            if (res && res.errcode === 0) {
                dispatch({
                    type: actionTypes.FETCH_TOP_DOCTOR_SUCCESS,
                    dataDoctors: res.data
                })
            } else {
                dispatch({
                    type: actionTypes.FETCH_TOP_DOCTOR_FAIDER,
                })
            }

        } catch (e) {
            console.log(' FETCH_TOP_DOCTOR_FAIDER: ', e)
            dispatch({
                type: actionTypes.FETCH_TOP_DOCTOR_FAIDER,
            })


        }
    }

}


export const fetchAllDoctors = () => {
    return async(dispatch, getState) => {
        try {
            let res = await getAllDoctors()
                // console.log('res:', res);
            if (res && res.errcode === 0) {
                dispatch({
                    type: actionTypes.FETCH_ALL_DOCTORS_SUCCESS,
                    dataDr: res.data
                })
            } else {
                dispatch({
                    type: actionTypes.FETCH_ALL_DOCTORS_FAIDER,
                })
            }

        } catch (e) {
            console.log(' FETCH_ALL_DOCTORS_FAIDER: ', e)
            dispatch({
                type: actionTypes.FETCH_ALL_DOCTORS_FAIDER,
            })


        }
    }

}

export const saveDetailDoctor = (data) => {
    return async(dispatch, getState) => {
        try {
            console.log('data', data)
            let res = await saveDetailDoctorService(data)
            if (res && res.errcode === 0) {
                toast.success("save Infor Detail Doctor secceed!");
                dispatch({
                    type: actionTypes.SAVE_DETAIL_DOCTOR_SUCCESS,

                })
            } else {
                console.log('error res', res)
                toast.error("save Infor Detail Doctor error!");
                dispatch({
                    type: actionTypes.SAVE_DETAIL_DOCTOR_FAIDER,
                })
            }

        } catch (e) {
            toast.error("save Infor Detail Doctor error!");
            console.log(' SAVE_DETAIL_DOCTOR_FAIDER: ', e)
            dispatch({
                type: actionTypes.SAVE_DETAIL_DOCTOR_FAIDER,
            })


        }
    }

}

export const fetchAllScheduleTime = () => {
    return async(dispatch, getState) => {
        try {
            let res = await getAllCodeService('TIME')
                // console.log('res:', res);
            if (res && res.errcode === 0) {
                dispatch({
                    type: actionTypes.FELTCH_ALLCODE_SCHEDULE_TIME_SUCCESS,
                    dataTime: res.data
                })
            } else {
                dispatch({
                    type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAIDER,
                })
            }

        } catch (e) {
            console.log(' FETCH_ALLCODE_SCHEDULE_TIME_FAIDER: ', e)
            dispatch({
                type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAIDER,
            })


        }
    }

}

export const getRequiredDoctorInfor = () => {
    return async(dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_START })
            let resPrice = await getAllCodeService('PRICE');
            let resPayment = await getAllCodeService('PAYMENT');
            let resProvince = await getAllCodeService('PROVINCE');
            let resSpecialty = await getAllSpecialty('SPECIALTY');
            let resClinic = await getAllClinic('CLINIC');

            if (resPrice && resPrice.errcode === 0 &&
                resPayment && resPayment.errcode === 0 &&
                resProvince && resProvince.errcode === 0 &&
                resSpecialty && resSpecialty.errcode === 0 &&
                resClinic && resClinic.errcode === 0) {
                let data = {
                    resPrice: resPrice.data,
                    resPayment: resPayment.data,
                    resProvince: resProvince.data,
                    resSpecialty: resSpecialty.data,
                    resClinic: resClinic.data

                }

                dispatch(fetchRequiredDoctorInforSuccess(data))
            } else {
                dispatch(fetchRequiredDoctorInforFaider());
            }
        } catch (e) {
            dispatch(fetchRequiredDoctorInforFaider());
            console.log('fetchRequiredDoctorInforStart error', e)

        }
    }
}



export const fetchRequiredDoctorInforSuccess = (allrequiredData) => ({
    type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_SUCCESS,
    data: allrequiredData
})


export const fetchRequiredDoctorInforFaider = () => ({
    type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_FAIDER

})