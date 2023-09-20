import React, { Component } from 'react';
import { connect } from "react-redux";
import './ManagePatient.scss';
import DatePicker from '../../../components/Input/DatePicker';
import { getListPatientForDoctor, postSendRemedy } from '../../../services/userservice';
import { FormattedDate } from 'react-intl';
import moment from 'moment';
import { LANGUAGES } from '../../../utils';
import RemedyModal from './RemedyModal';
import { toast } from 'react-toastify';
import LoadingOverlay from 'react-loading-overlay';


class ManagePatient extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentDate: moment(new Date()).startOf('day').valueOf(),
            dataPatient: [],
            isOpenRemedyModal: false,
            dataModal: {},
            isShowLoading: false
           

        }
    }
    async componentDidMount() {
        
        this.getDataPatient()

       
    

    }
    getDataPatient = async () =>{
        let { user } = this.props;
        let { currentDate} = this.state;
        let FormattedDate = new Date(currentDate).getTime();
        let res = await getListPatientForDoctor({
            doctorId: user.id,
            date: FormattedDate
        })
        if(res && res.errcode === 0){
            this.setState({
                dataPatient: res.data
            })
        }

    }
    handleOnchangeDatePicker = (date) =>{
        this.setState({
            currentDate: date[0],
        }, async () => {
           
            this.getDataPatient()
        })

    }

    handleBtnConfirm = (item) => {
       let data = {
        doctorId: item.doctorId,
        patientId: item.patientId,
        email: item.patientData.email,
        timeType: item.timeType, 
        patientName: item.patientData.firstName
       }

       this.setState({
        isOpenRemedyModal: true,
        dataModal: data
       })
    
    }
    closeRemedyModal = () => {
        this.setState({
            isOpenRemedyModal: false,
            dataModal: {}
        })
    }

    sendRemedy = async (datachild) => {
        let {dataModal} = this.state;
        this.setState({
            isShowLoading: true
        })

      
        let res = await postSendRemedy({

            email: datachild.email,
            imgBase64: datachild.imgBase64, // lấy được 2 trường email và imgBase64
            doctorId: dataModal.doctorId,
            patientId: dataModal.patientId,

            timeType: dataModal.timeType,
            language: this.props.language,
            patientName: dataModal.patientName

        });
        if(res && res.errcode === 0){
            this.setState({isShowLoading: false})
            toast.success('Send Remydy success!');
            this.closeRemedyModal()
           
            await this.getDataPatient();
           
        }else{
            this.setState({isShowLoading: false})
            toast.error('Something wrongs....!');
        }
      
    }
    render() {
        console.log('check state: ', this.state);
        let {dataPatient,  isOpenRemedyModal, dataModal} = this.state;
        let language = this.props;
        
        return (
            
            <>
               <LoadingOverlay
            active={this.state.isShowLoading}
            spinner
            text='Loading...'
            >

            
            <div className='manage-patient-container'>
                <div className='m-p-title'>
                    Quản lý bệnh nhân khám bệnh
                </div>
                <div className='manage-patient-body row'>
                    <div className='col-4 form-group'>
                        <label>Chọn ngày tháng</label>
                        <DatePicker 
                            className='form-control'
                            onChange={this.handleOnchangeDatePicker}
                            value={this.state.currentDate}
                           
                        />
                    </div>
                    <div className='col-12 table-manage-patient'>
                    <table style={{width: '100%'}}>
                        <tbody>
                        <tr>
                            <th>STT</th>
                            <td>Thời gian</td>
                            <th>Họ và Tên</th>
                            <th>Địa chỉ</th>
                            <th>Giới tính</th>
                            <th>Action</th>
                        </tr>
                        {dataPatient && dataPatient.length > 0 ? dataPatient.map((item, index) => {
                            let time = language === LANGUAGES.VI ? 
                            item.timeTypeDataPatient.valueEn : item.timeTypeDataPatient.valueVi;
                            let gender = language === LANGUAGES.VI ?
                            item.patientData.genderData.valueEn : item.patientData.genderData.valueVi;
                            return(
                                <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{time}</td>
                                <td>{item.patientData.firstName}</td>
                                <td>{item.patientData.address}</td>
                                <td>{gender}</td>
                                <td>
                                    <button className='mp-btn-confirm' onClick={() => this.handleBtnConfirm(item)}>Xác nhận</button>
                                </td>
                            </tr>
                            )
                           
                        })
                        :
                        <tr>
                            <td colSpan="6" style={{textAlign: "center"}}>Không có bệnh nhân nào</td> 

                        </tr>
                    }
                       
                        </tbody>
                        
                    </table>

                    </div>
                </div>
            </div>

            <RemedyModal
             isOpenModal = {isOpenRemedyModal}
             dataModal = {dataModal}
             closeRemedyModal = {this.closeRemedyModal}
             sendRemedy = {this.sendRemedy}
            />
            </LoadingOverlay>

         
            </>
              
            
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        user: state.user.userInfo,
    };
};

const mapDispatchToProps = dispatch => {
    return {
       
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);
