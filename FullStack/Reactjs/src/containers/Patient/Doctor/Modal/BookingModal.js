import React, { Component } from 'react';
import { connect } from "react-redux";
import './BookingModal.scss';
import { Modal } from 'reactstrap';
import { FormattedMessage } from 'react-intl';
import ProFileDoctor from '../ProFileDoctor';
import _ from 'lodash';
import DatePicker from '../../../../components/Input/DatePicker';
import * as action from '../../../../store/actions'
import { LANGUAGES } from '../../../../utils';
import Select from 'react-select';
import {postPatientBookAppointment} from '../../../../services/userservice';
import { toast } from "react-toastify";
import moment from 'moment';
class BookingModal extends Component {
    constructor(props){
        super(props);
        this.state = {
            fullname: '',
            phoneNumber: '',
            address: '',
            reason: '',
            birthday: '',
            selectedGender: '',
            doctorId: '',
            genders: '',
            timeType: '',
            language: ''
        }
    }
   async componentDidMount(){
    this.props.getGenders();
   
    
   }
   
   builDataGender = (data) => {
    let result = [];
     let language = this.props.language;
     if(data && data.length > 0){
        data.map(item => {
            let object = {};
            object.label = language === LANGUAGES.VI ? item.valueVi : item.valueEn;
            object.value = item.keyMap;
            result.push(object);
        })

     }
     return result;
   }

   async componentDidUpdate(prevProps, prevStste, snapshot){
        if(this.props.language !== prevProps.language){
            this.setState({
                genders: this.builDataGender(this.props.genders)
            })
        } 
        if(this.props.genders !== prevProps.genders){
            this.setState({
                genders: this.builDataGender(this.props.genders)
            })
        }
        if(this.props.dataTime !== prevProps.dataTime){
            if(this.props.dataTime && !_.isEmpty(this.props.dataTime)){
               let doctorId = this.props.dataTime.doctorId;
               let timeType = this.props.dataTime.timeType;
               this.setState({
                doctorId: doctorId,
                timeType: timeType
               })
            }
        }
    }

    handleOnChangeInput = (event, id) => {
        let valueInput = event.target.value;
        let stateCopy = {...this.state};
        stateCopy[id] = valueInput;
        this.setState({
            ...stateCopy
        })
    }

    handleOnchangeDatePicker = (date) => {
        this.setState({
            birthday: date[0]
        })

    }

    handleChangeSelect = (selectedOption) => {
        this.setState({
            selectedGender: selectedOption
        })

    }
    handleConfirmBooking = async () => {
        //validate input
        // !data.email || !data.doctorId || !data.date || !data.timeType
        let date = new Date(this.state.birthday).getTime();
        let timeString = this.buildTimBooking(this.props.dataTime);
        let doctorName =this.buildoctorName(this.props.dataTime);
    
        let res = await postPatientBookAppointment({
            fullname: this.state.fullname,
            phoneNumber: this.state.phoneNumber,
            email: this.state.email,
            address: this.state.address,
            reason: this.state.reason,
            date: this.props.dataTime.date,
            birthday: date,
            selectedGender: this.state.selectedGender.value,
            doctorId: this.state.doctorId,
            timeType: this.state.timeType,
            language: this.props.language,
            timeString: timeString,
            doctorName: doctorName

           
        })
        if(res && res.errcode === 0){
            toast.success("Booking a new appointment succeed!");
            this.props.closeBookingModal();
        }else {
            toast.error("Booking a new appointment error!");
        }
       
        // console.log('check confirm button', this.state)
    }


    buildTimBooking = (dataTime) =>{
        let {language} = this.props;
        if(dataTime && !_.isEmpty(dataTime)){
            let time = language === LANGUAGES.VI ? 
            dataTime.timeTypeData.valueVi :  dataTime.timeTypeData.valueEn;

            let date = LANGUAGES === LANGUAGES.VI ? 
            moment.unix(+dataTime.date / 1000).locale('en').format('ddd - MM/DD/YYYY'):
            moment.unix(+dataTime.date / 1000).format('dddd - DD/MM/YYYY') 

            return `${time} - ${date}`
        }
        return ''
        }

        buildoctorName = (dataTime) => {
            let {language} = this.props;
            if(dataTime && !_.isEmpty(dataTime)){
                let name = language === LANGUAGES.VI ?
                `${dataTime.doctorData.lastName} ${dataTime.doctorData.firstName}`
                :
                `${dataTime.doctorData.firstName} ${dataTime.doctorData.lastName} `
    
                return name;
            }
            return ''
        }
 
    
    render(){
        let { isOpenModal, closeBookingModal, dataTime } = this.props;
        let doctorId = '';
        if(dataTime && !_.isEmpty(dataTime)){
            doctorId = dataTime.doctorId;
        }
       
        // console.log("check dataTime: ", dataTime)
        return (
            <div>
               <Modal isOpen={isOpenModal} 
               className={'booking-Modal-container'} 
               size='lg' 
               centered
            //    backdrop={true}
               >
                <div className='booking-modal-content'>
                    <div className='booking-modal-header'>
                        <span className='left'><FormattedMessage id = "patient.Booking-madal.title"/></span>
                        <span className='right' onClick={closeBookingModal}><i className='fas fa-times'></i></span>
                    </div>
                    <div className='booking-modal-body container'>
                        {/* {JSON.stringify(dataTime)} */}
                        <div className='doctor-infor'>
                            <ProFileDoctor
                            doctorId = {doctorId}
                            isShowDescriptionDoctor={false}
                            dataTime={dataTime}
                            isShowLinkDetail = {false}
                            isShowPrice={true}
                            />
                        </div>
                        
                        <div className='row'>
                            <div className='col-6 form-group'>
                                <label><FormattedMessage id = "patient.Booking-madal.fullname"/></label>
                                <input className='form-control'
                                       value={this.state.fullname}
                                       onChange={(event) => this.handleOnChangeInput(event, 'fullname')}
                                />
                            </div>
                            <div className='col-6 form-group'>
                                <label><FormattedMessage id = "patient.Booking-madal.phoneNumber"/></label>
                                <input className='form-control'
                                       value={this.state.phoneNumber}
                                       onChange={(event) => this.handleOnChangeInput(event, 'phoneNumber')}

                                />
                            </div>
                            <div className='col-6 form-group'>
                                <label><FormattedMessage id = "patient.Booking-madal.email"/></label>
                                <input className='form-control'
                                       value={this.state.email}
                                       onChange={(event) => this.handleOnChangeInput(event, 'email')}
                                />
                            </div>
                            <div className='col-6 form-group'>
                                <label><FormattedMessage id = "patient.Booking-madal.address"/></label>
                                <input className='form-control'
                                       value={this.state.address}
                                       onChange={(event) => this.handleOnChangeInput(event, 'address')}
                                />
                            </div>
                            <div className='col-12 form-group'>
                                <label><FormattedMessage id = "patient.Booking-madal.reason"/></label>
                                <input className='form-control'
                                       value={this.state.reason}
                                       onChange={(event) => this.handleOnChangeInput(event, 'reason')}
                                />
                            </div>
                            <div className='col-6 form-group'>
                                <label><FormattedMessage id = "patient.Booking-madal.birthday"/></label>
                                <DatePicker 
                                    className='form-control'
                                    onChange={this.handleOnchangeDatePicker}
                                    // value={this.state.currentDate}
                                    minDate={this.state.birthday}
                                />
                            
                            </div>
                            <div className='col-6 form-group'>
                                <label><FormattedMessage id = "patient.Booking-madal.genders"/></label>
                                <Select
                                value={this.state.selectedGender}
                                onChange={this.handleChangeSelect}
                                options={this.state.genders}
                                
                                />
                            </div>
                        </div>
                    </div>
                    <div className='booking-modal-footer'>
                        <button className='btn-booking-confirm'
                        onClick={() => this.handleConfirmBooking()}><FormattedMessage id = "patient.Booking-madal.confirm"/></button>
                        <button className='btn-booking-cancel'
                        onClick={closeBookingModal}><FormattedMessage id = "patient.Booking-madal.cancel"/></button>
                    </div>
                </div>
               </Modal>
             
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        genders: state.admin.genders,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenders: () => dispatch(action.fetchGenderStart()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
