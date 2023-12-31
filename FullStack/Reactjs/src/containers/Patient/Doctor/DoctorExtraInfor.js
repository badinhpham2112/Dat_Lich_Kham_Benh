import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import HomeHeader from '../../HomePage/HomeHeader';
import './DoctorExtraInfor.scss';
import { LANGUAGES } from '../../../utils';
import {getExtraInforDoctorById} from '../../../services/userservice';
import NumberFormat from 'react-number-format';
import { FormattedMessage } from 'react-intl';
class DoctorExtraInfor extends Component {
    constructor(props){
        super(props);
        this.state = {
          isShowDetailInfor: false,
          extraInfor: {}

        }
    }
   async componentDidMount(){
    if(this.props.doctorIdFromParent){
        let  res = await getExtraInforDoctorById(this.props.doctorIdFromParent);
        if(res && res.errcode === 0){
        this.setState({
            extraInfor: res.data
        })
    }
    
    }
    
   }
   

   async componentDidUpdate(prevProps, prevStste, snapshot){
        if(this.props.language !== prevProps.language){

        } 
        if(this.props.doctorIdFromParent !== prevProps.doctorIdFromParent){
            let  res = await getExtraInforDoctorById(this.props.doctorIdFromParent);
            if(res && res.errcode === 0){
                this.setState({
                    extraInfor: res.data
                })
            }
        
    }
}

    showHiDetailInfor = (status) => {
        this.setState({
            isShowDetailInfor: status
        })

    }
    
    render(){
      let {isShowDetailInfor, extraInfor} = this.state;
      let {language} = this.props
    //   console.log('check state : ', this.state)
        return (
            <div className='doctor-extra-infor-contentner'>
                <div className='content-up'>
                    <div className='text-address'><FormattedMessage id = "patient.extra-infor-doctor.text-address"/></div>
                    <div className='name-clinic'>{extraInfor && extraInfor.nameClinic ? extraInfor.nameClinic : ''}</div>
                    <div className='detail-address'>{extraInfor && extraInfor.addressClinic ? extraInfor.addressClinic : ''}</div>
       
                </div>
                
                <div className='content-down'>

                    {isShowDetailInfor === false &&
                    <div className='short-infor'>
                       <FormattedMessage id = "patient.extra-infor-doctor.price"/>
                        {extraInfor && extraInfor.priceTypeData && language === LANGUAGES.VI
                        &&
                        
                            <NumberFormat
                            className='currency'
                            value={extraInfor.priceTypeData.valueVi}
                            displayType={'text'}
                            thousandSeparator={true}
                            suffix={'VND'}
                        
                            />

                     
                      
                        }
                         {extraInfor && extraInfor.priceTypeData && language === LANGUAGES.EN
                        &&
                        
                            <NumberFormat
                            className='currency'
                            value={extraInfor.priceTypeData.valueEn}
                            displayType={'text'}
                            thousandSeparator={true}
                            suffix={'$'}
                        
                            />

                       
                      
                        }
                        <span className='detail' onClick={() => {this.showHiDetailInfor(true)}}><FormattedMessage id = "patient.extra-infor-doctor.detail"/> </span>
                    </div>
                    }
                    {isShowDetailInfor === true &&
                    <>
                    <div className='title-price'><FormattedMessage id = "patient.extra-infor-doctor.price"/></div>
                    <div className='detail-infor'>
                        <div className='price'>
                            <span className='left'><FormattedMessage id = "patient.extra-infor-doctor.price"/></span>
                            <span className='right'>
                            {extraInfor && extraInfor.priceTypeData && language === LANGUAGES.VI
                        &&
                        
                            <NumberFormat
                            className='currency'
                            value={extraInfor.priceTypeData.valueVi}
                            displayType={'text'}
                            thousandSeparator={true}
                            suffix={'VND'}
                        
                            />

                     
                      
                        }
                         {extraInfor && extraInfor.priceTypeData && language === LANGUAGES.EN
                        &&
                        
                            <NumberFormat
                            className='currency'
                            value={extraInfor.priceTypeData.valueEn}
                            displayType={'text'}
                            thousandSeparator={true}
                            suffix={'$'}
                        
                            />

                       
                      
                        }
                            </span>
                        </div>

                         <div className='note'>
                            <div>{extraInfor && extraInfor.note ? extraInfor.note : ''}</div>
                        </div>

                    </div>
                    <div className='payment'>
                        <div>
                            <FormattedMessage id = "patient.extra-infor-doctor.payment"/>
                            {extraInfor && extraInfor.paymentTypeData && language === LANGUAGES.VI
                             ? extraInfor.paymentTypeData.valueVi : ''}
                            {extraInfor && extraInfor.paymentTypeData && language === LANGUAGES.EN
                             ? extraInfor.paymentTypeData.valueEn : ''}
                        </div>
                    </div>
                   <div className='hide-price'>
                    <span onClick={() => {this.showHiDetailInfor(false)}}> <FormattedMessage id = "patient.extra-infor-doctor.hide-price"/></span>
                    </div>
                    
                
                    </>
                    
                    }

                </div>
             
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtraInfor);
