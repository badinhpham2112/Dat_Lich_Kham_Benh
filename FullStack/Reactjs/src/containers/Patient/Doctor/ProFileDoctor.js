import React, { Component } from 'react';
import { connect } from "react-redux";
import './ProFileDoctor.scss';
import { FormattedMessage } from 'react-intl';
import {getProfileDoctorById} from '../../../services/userservice'
import { result } from 'lodash';
import { LANGUAGES } from '../../../utils';
import NumberFormat from 'react-number-format';
import _ from 'lodash'
import moment from 'moment';
import { Link } from 'react-router-dom';
class ProFileDoctor extends Component {
    constructor(props){
        super(props);
        this.state = {
            dataProfile: {}
        }
    }
   async componentDidMount(){
    let data = await this.getInforDoctor(this.props.doctorId);
    this.setState({
        dataProfile: data
    })
   
   }
   
   getInforDoctor = async (id) => {
    let result = {};
    if(id){
        let res = await getProfileDoctorById(id);
        if(res && res.errcode === 0){
            result = res.data;
        }
    }
    return result;
   }

   async componentDidUpdate(prevProps, prevStste, snapshot){
        if(this.props.language !== prevProps.language){

        } 
        // if(this.props.doctorId !== prevProps.doctorId){
        //     this.getInforDoctor(this.props.doctorId);
        // }
       
}
    renderTimeBooking = (dataTime) =>{
        let {language} = this.props;
        if(dataTime && !_.isEmpty(dataTime)){
            let time = language === LANGUAGES.VI ? 
            dataTime.timeTypeData.valueVi :  dataTime.timeTypeData.valueEn;

            let date = LANGUAGES === LANGUAGES.VI ? 
            moment.unix(+dataTime.date / 1000).locale('en').format('ddd - MM/DD/YYYY'):
            moment.unix(+dataTime.date / 1000).format('dddd - DD/MM/YYYY') 
           
            return(
                <>
                <div>{time} - {date}</div>
                <div><FormattedMessage id = "patient.Booking-madal.priceBooking"/></div>
                </>
            )
        }
        return <></>
        }
       
 
    
    render(){
        let { dataProfile } = this.state;
        let {language, isShowDescriptionDoctor, dataTime, isShowPrice,  isShowLinkDetail, doctorId } = this.props

        let nameVi = '', nameEn = '';
        if(dataProfile && dataProfile.positionData){
            nameVi = `${dataProfile.positionData.valueVi},  ${dataProfile.lastName} ${dataProfile.firstName}`;
            nameEn = `${dataProfile.positionData.valueEn}, ${dataProfile.firstName} ${dataProfile.lastName}`;
            // console.log('check props : ', dataTime);
            }
        return (
            <div className='profile-doctor-container'>
                <div className='intro-doctor'>
                    <div className='content-left' style={{ background: `url(${dataProfile && dataProfile.image ? dataProfile.image : ''})`}}>

                </div>
                <div className='content-right'>
                    <div className='up'>
                        {language === LANGUAGES.VI ? nameVi : nameEn}
                    </div>
                    <div className='dow'>
                        {isShowDescriptionDoctor === true ?
                        <>
                        {dataProfile.Markdown && dataProfile.Markdown.description 
                        && 
                        <span>
                            {dataProfile.Markdown.description}
                        </span>}
                        </>
                        :
                        <>
                        {this.renderTimeBooking(dataTime)}
                        </>
                        }
                       
                    </div>
                </div>
            </div>
            {isShowLinkDetail === true && 
            <div className="view-detail-doctor" >
                {/* <a href={`/detail-doctor/${doctorId}`}></a>  */}
                <Link to={`/detail-doctor/${doctorId}`}>Xem thêm</Link>
            </div>}
            {isShowPrice === true &&
            <div className="price">
            <FormattedMessage id = "patient.Booking-madal.price"/> 
                {dataProfile && dataProfile.Doctor_Infor && language === LANGUAGES.VI &&
                
                 <NumberFormat
                            className='currency'
                            value={ dataProfile.Doctor_Infor.priceTypeData.valueVi }
                            displayType={'text'}
                            thousandSeparator={true}
                            suffix={'VND'}

                    />
                
                 }
                
                {dataProfile && dataProfile.Doctor_Infor && language === LANGUAGES.EN &&
                  
                 <NumberFormat
                 className='currency'
                 value={dataProfile.Doctor_Infor.priceTypeData.valueEn}
                 displayType={'text'}
                 thousandSeparator={true}
                 suffix={'$'}
             
                 />
                 
                 }
            </div>
            }
            
            </div>
         
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

export default connect(mapStateToProps, mapDispatchToProps)(ProFileDoctor);
