import React, { Component } from 'react';
import { connect } from "react-redux";
import './VerifyEmail.scss';
import { FormattedMessage } from 'react-intl';
import {postVerifyBookAppointment} from '../../services/userservice';
import HomeHeader from '../HomePage/HomeHeader';
class VerifyEmail extends Component {
    constructor(props){
        super(props);
        this.state = {
            statusVerify: false,
            errcode: 0
        }
    }
   async componentDidMount(){
    if(this.props.location && this.props.location.search){
        let urlParams = new URLSearchParams(this.props.location.search);
        let token = urlParams.get('token');
        let doctorId = urlParams.get('doctorId');
        console.log('check token: ', token)
        console.log('check doctorId: ', doctorId);
        let res = await postVerifyBookAppointment({
            token: token,
            doctorId: doctorId

        })
        if(res && res.errcode === 0){
            this.setState({
                statusVerify: true,
                errcode: res.errcode
            })
        }else{
            this.setState({
                statusVerify: true,
                errcode: res && res.errcode ? res.errcode : -1
            })
           
        }
    }
    
    
   }
   

   async componentDidUpdate(prevProps, prevStste, snapshot){
        if(this.props.language !== prevProps.language){

        } 
       
}

 
    
    render(){
        console.log('check state: ', this.state)
    let {statusVerify, errcode} = this.state;
        return (
            <>
            <HomeHeader/>
            <div className="verify-email-container">
            {statusVerify === false ?
            <div>
                Loading data...
            </div>
            :
            <div>
                {errcode === 0 ? 
                <div>Xác nhận lịch hẹn thành công!</div> :
                <div>Lịch hẹn đã được khởi tạo từ trước hoạc lịch hẹn không tồn tại!</div>  
            }
            </div>
        }
            </div>
           
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

export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmail);
