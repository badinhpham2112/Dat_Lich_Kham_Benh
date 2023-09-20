import actionTypes from '../actions/actionTypes';

const initialState = {
    isLoadingGender: false,
    genders: [],
    roles: [],
    positions: [],
    users: [],
    topdoctors: [],
    allDoctors: [],
    allScheduleTime: [],
    allrequiredDoctorInfor: [],
}

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_GENDER_START:
            state.isLoadingGender = true;
            return {
                ...state,

            }

        case actionTypes.FETCH_GENDER_SUCCESS:
            state.genders = action.data;
            state.isLoadingGender = false;
            return {
                ...state,

            }

        case actionTypes.FETCH_GENDER_FAIDER:
            state.genders = [];
            state.isLoadingGender = true;
            return {
                ...state,

            }


        case actionTypes.FETCH_POSITION_START:
            return {
                ...state,

            }

        case actionTypes.FETCH_POSITION_SUCCESS:
            state.positions = action.data;
            return {
                ...state,

            }

        case actionTypes.FETCH_POSITION_FAIDER:
            state.positions = [];
            state.isLoadingGender = true;
            return {
                ...state,

            }

        case actionTypes.FETCH_ROLE_START:
            return {
                ...state,

            }

        case actionTypes.FETCH_ROLE_SUCCESS:
            state.roles = action.data;
            return {
                ...state,

            }

        case actionTypes.FETCH_ROLE_FAIDER:
            state.roles = [];
            state.isLoadingGender = true;
            return {
                ...state,

            }

        case actionTypes.FETCH_ALL_USERS_SUCCESS:
            state.users = action.users;
            return {
                ...state,

            }


        case actionTypes.FETCH_ALL_USERS_FAIDER:
            state.users = [];
            state.isLoadingGender = true;
            return {
                ...state,

            }

        case actionTypes.FETCH_TOP_DOCTOR_SUCCESS:
            state.topdoctors = action.dataDoctors;
            state.isLoadingGender = true;
            return {
                ...state,

            }


        case actionTypes.FETCH_TOP_DOCTOR_FAIDE:
            state.topdoctors = [];
            state.isLoadingGender = true;
            return {
                ...state,

            }



        case actionTypes.FETCH_ALL_DOCTORS_SUCCESS:
            state.allDoctors = action.dataDr;
            return {
                ...state,

            }



        case actionTypes.FETCH_ALL_DOCTORS_FAIDER:
            state.allDoctors = [];
            state.isLoadingGender = true;
            return {
                ...state,

            }

        case actionTypes.FELTCH_ALLCODE_SCHEDULE_TIME_SUCCESS:
            state.allScheduleTime = action.dataTime;
            return {
                ...state,

            }



        case actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAIDER:
            state.allScheduleTime = [];
            state.isLoadingGender = true;
            return {
                ...state,

            }



        case actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_SUCCESS:
            state.allrequiredDoctorInfor = action.data;
            console.log('check Fet required doctor Data: ', action)
            return {
                ...state,

            }



        case actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_FAIDER:
            state.allrequiredDoctorInfor = [];
            state.isLoadingGender = true;
            return {
                ...state,

            }
        default:
            return state;
    }
}

export default adminReducer;