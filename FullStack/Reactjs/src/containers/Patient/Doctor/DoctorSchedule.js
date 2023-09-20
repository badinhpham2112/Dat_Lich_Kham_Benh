import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import HomeHeader from '../../HomePage/HomeHeader';
import './DoctorSchedule.scss';
import moment from 'moment';
import localization from 'moment/locale/vi';
import { LANGUAGES } from '../../../utils';
import {getScheduleDoctorByDate} from '../../../services/userservice';
import { FormattedMessage } from 'react-intl';
import BookingModal from './Modal/BookingModal';



class DoctorSchedule extends Component {
    constructor(props){
        super(props);
        this.state = {
          allDay: [],
          allValableTime: [],
          isOpenModalBooking: false,
          dataScheduleTimeModal: {}

        }
    }
   async componentDidMount(){
    let {language} = this.props;
    let allDay = this.getArrDays(language);
    if(this.props.doctorIdFromParent){
        let res = await getScheduleDoctorByDate(this.props.doctorIdFromParent, allDay[0].value);
        this.setState({
            allValableTime: res.data ? res.data : []
        })
    }
   
    if(allDay && allDay.length > 0){
        
        this.setState({
            allDay: allDay,
        })
    }
   
    
   }
   capitalizeFirstLetter(string){
    return string.charAt(0).toUpperCase() + string.slice(1);
   }
     getArrDays = (language) => {
        let allDay = []
        for(let i = 0; i < 7; i++){
            let object = {};
            if(language === LANGUAGES.VI){
                if(i === 0){
                    let ddMM = moment(new Date()).format('DD/MM');
                    let today = `Hôm nay - ${ddMM}`;
                    object.label = today;
                }else{
                    let labelVi = moment(new Date()).add(i, 'days').format('dddd - DD/MM');
                    object.label = this.capitalizeFirstLetter(labelVi)
                }
            }else{
                if(i === 0){
                    let ddMM = moment(new Date()).format('DD/MM');
                    let today = `Today - ${ddMM}`;
                    object.label = today;
                }else{
                    object.label = moment(new Date()).add(i, 'days').locale('en').format('ddd - DD/MM');
                }
               
            }
            
            object.value = moment(new Date()).add(i, 'days').startOf('day').valueOf();
            allDay.push(object);
        }
        
       return allDay;
     }

   async componentDidUpdate(prevProps, prevStste, snapshot){
        if(this.props.language !== prevProps.language){
           let allDay = this.getArrDays(this.props.language);
           this.setState({
            allDay: allDay,
           })
           }
        if(this.props.doctorIdFromParent !== prevProps.doctorIdFromParent){
            let allDay = this.getArrDays(this.props.language);
            let res = await getScheduleDoctorByDate(this.props.doctorIdFromParent, allDay[0].value);
            this.setState({
                allValableTime: res.data ? res.data : []
            })

        }
        }
    handleOnChangeSelect = async (event) => {
        if(this.props.doctorIdFromParent  && this.props.doctorIdFromParent !== -1){
            let doctorId = this.props.doctorIdFromParent;
            let date = event.target.value;
            let res = await getScheduleDoctorByDate(doctorId, date);
            
            if(res && res.errcode ===0){
                this.setState({
                    allValableTime: res.data ? res.data : []
                })
            }
            console.log('check res Schedule from react: ', res)
        }
        
    }

    handleClickScheduleTime = (time) => {
        this.setState({
            isOpenModalBooking: true,
            dataScheduleTimeModal: time
        })
        console.log('check time: ', time);
    }
    closeBookingModal = () => {
        this.setState({
            isOpenModalBooking: false
        })
    }
    render(){
       let {allDay, allValableTime, isOpenModalBooking, dataScheduleTimeModal} = this.state;
       let { language } = this.props;
        return (
            <>
            <div className='doctor-schedule-contentner'>
                <div className='all-schedule'>
                <select onChange={(event) => this.handleOnChangeSelect(event)}>
                    {allDay && allDay.length > 0 &&
                    allDay.map((item, index) => {
                        return(
                            <option value={item.value} key={index}>{item.label}</option>
                           
                        )
                    })}
                   
                </select>
                </div>
                <div className='all-available-time'>
                    <div className='text-calendar'>
                        <i className='fas fa-calendar-alt'><span><FormattedMessage id="patient.detail-doctor.schedule"/></span></i>
                    </div>
                    <div className='time-content'>
                       {allValableTime && allValableTime.length > 0 ?
                       <>
                       <div className='time-content-btns'>
                       {allValableTime.map((item, index) => {
                        let timeDisplay = language === LANGUAGES.VI ? item.timeTypeData.valueVi : item.timeTypeData.valueEn;
                        return(
                            <button 
                            key={index} 
                            className={language === LANGUAGES.VI ? 'btn-vie': 'btn-en'}
                            onClick={() => this.handleClickScheduleTime(item)}
                            >
                                {timeDisplay}
                            </button>
                        )
                       })}
                        </div>

                       <div className='book-free'>
                        <span><FormattedMessage id="patient.detail-doctor.choose"/><i className='far fa-hand-point-up'></i> <FormattedMessage id="patient.detail-doctor.book-free"/></span>

                       </div>
                       </> 
                    :
                    <div className='no-schedule'><FormattedMessage id="patient.detail-doctor.no-schedule"/></div>
                    }
                       
                        
                    </div>
                </div>
            </div>
            <BookingModal
            isOpenModal = {isOpenModalBooking} 
            closeBookingModal = {this.closeBookingModal}
            dataTime = {dataScheduleTimeModal}
            />
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
