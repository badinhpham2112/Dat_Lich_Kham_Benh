import React, { Component } from 'react';
import { connect } from "react-redux";
import './ManageSchedule.scss'
import { FormattedMessage } from 'react-intl';
import Select from 'react-select';
import *as actions from '../../../store/actions';
import { CRUD_ACTIONS, LANGUAGES, dateFormat } from '../../../utils';
import DatePicker from '../../../components/Input/DatePicker';
import moment from 'moment';
import { toast } from "react-toastify";
import _ from 'lodash';
import {saveBulkScheduleDoctor} from '../../../services/userservice'

class ManageSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listDoctors: [],
            selectedDoctor: {},
            currentDate: new Date(),
            rangeTime: [],

        }
    }
    componentDidMount() {
        this.props.fetchAllDoctors();  
        this.props.fetchAllScheduleTime();
        
    }
    buildDataInputSelect = (inputdata) => {
        let result = [];
        let {language} = this.props;
        if(inputdata && inputdata.length > 0){
            inputdata.map((item, index) => {
                let object = {};
                let labelVi = `${item.lastName} ${item.firstName}`;
                let labelEn = `${item.firstName} ${item.lastName}`;
                object.label = language === LANGUAGES.VI ? labelVi : labelEn;
                object.value = item.id;
                result.push(object)
            })
           
        }
        return result;

    }
    componentDidUpdate(prevProps, prevState, snapshot){
        if(prevProps.allDoctors !== this.props.allDoctors){
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors)
            this.setState({
                listDoctors: dataSelect,
            })
        }
        if(prevProps.allScheduleTime !== this.props.allScheduleTime){
            let data = this.props.allScheduleTime;
            if(data && data.length > 0){
                    data.map(item => {
                    item.isSelected = false;
                    return item;
                })

               
            }
            this.setState({
                rangeTime: data
            })
        }
    }
    handleChangeSelect = async (selectedOption) => {
        this.setState({ selectedDoctor: selectedOption })
        
      };
    handleOnchangeDatePicker = (date) =>{
        this.setState({
            currentDate: date[0],
        })

    }
    handleClickBtnTime = (time) => {
        let {rangeTime} = this.state;
        if(rangeTime && rangeTime.length > 0){
            rangeTime = rangeTime.map(item => {
                if(item.id === time.id) item.isSelected = !item.isSelected;
                return item;
            })
           this.setState({
            rangeTime: rangeTime
           })
        }
    }

    handleSaveSchedule = async () => {
        let {rangeTime, selectedDoctor, currentDate} = this.state;
        let result = [];
        if(!currentDate){
            toast.error("Invalid date!");
            return;
        }
        if(selectedDoctor && _.isEmpty(selectedDoctor)){
            toast.error("Invalid selectedDoctor!");
           
        }
        // let formatedDate =  moment(currentDate).format(dateFormat.SEND_TO_SERVER);
       
        // let formatedDate =  moment(currentDate).unix();
        let formatedDate = new Date(currentDate).getTime();
        if( rangeTime && rangeTime.length > 0) {
            let selectedTime = rangeTime.filter(item => item.isSelected === true);
            if(rangeTime && rangeTime.length > 0){
                selectedTime.map((time, index) => {
                    let object = {}
                    object.doctorId = selectedDoctor.value;
                    object.date = formatedDate;
                    object.timeType = time.keyMap;
                    result.push(object)
                })
                
            }else{
                toast.error("Invalid selected Time!");
                return;
            }
        }
        let res = await saveBulkScheduleDoctor({
            arrSchedule: result,
            doctorId: selectedDoctor.value,
            date: formatedDate,
        })
       if(res && res.errcode === 0){
        toast.success('Save infor');
       }else{
        toast.error('error saveBulkScheduleDoctor');
        console.log('error saveBulkScheduleDoctor >>> res: ', res);

       }
    }
    render() {
    // console.log('check state :', this.state)
    // console.log('check props : ', this.props)
    let {rangeTime} = this.state;
    let {language} = this.props;
    let yesterday = new Date(new Date().setDate(new Date().getDate()-1));
    // console.log('check range time: ', rangeTime)
        return (
            <div className='manage-schedule-container'>
                <div className='m-s-title'>
                    <FormattedMessage id="manage-schedule.title" />
                </div> 
                <div className='container'>
                    <div className='row'>
                        <div className='col-6 form-group'>
                            <label><FormattedMessage id="manage-schedule.choose-doctor" /></label>
                            <Select
                            placeholder={<FormattedMessage id="manage-schedule.choose-doctor"/>}
                            value={this.state.selectedDoctor}
                            onChange={this.handleChangeSelect}
                            options={this.state.listDoctors}
                            
                        />  
                        </div>
                        <div className='col-6 form-group'>
                            <label><FormattedMessage id="manage-schedule.choose-date" /></label>
                            <DatePicker 
                            className='form-control'
                            onChange={this.handleOnchangeDatePicker}
                            value={this.state.currentDate}
                            minDate={yesterday}
                            />
                        </div>
                        <div className='col-12 pick-hour-container'>
                            {rangeTime && rangeTime.length > 0 &&
                            rangeTime.map((item, index) => {
                                return (
                                    <button 
                                    className={item.isSelected === true ? 'btn btn-schedule active' : "btn btn-schedule"}
                                    key={index}
                                    onClick={() => this.handleClickBtnTime(item)}
                                    >
                                        {language = LANGUAGES.VI ? item.valueVi : item.valueEn}</button>
                                )

                            })}
                        </div>
                        <div className='col-12'>
                            <button className='btn btn-primary btn-save-schedule'
                            onClick={() => this.handleSaveSchedule()}><FormattedMessage id="manage-schedule.save" /></button>
                        </div>
                    </div>
                </div>
            </div>
              
            
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn, 
        allDoctors: state.admin.allDoctors,
        language: state.app.language,
        allScheduleTime: state.admin.allScheduleTime,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctors: () => dispatch(actions.fetchAllDoctors()),
        fetchAllScheduleTime: () => dispatch(actions.fetchAllScheduleTime()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
