import React, { Component } from 'react';
import { connect } from "react-redux";
import './DetailHandbook.scss';
import { LANGUAGES } from '../../../utils';
import { FormattedMessage } from 'react-intl';
import HomeHeader from '../../HomePage/HomeHeader';
import DoctorSchedule from '../Doctor/DoctorSchedule';
import DoctorExtraInfor from '../Doctor/DoctorExtraInfor';
import ProFileDoctor from '../Doctor/ProFileDoctor';
import { getDetailHandbookById, getAllCodeService } from '../../../services/userservice';
import _, { every } from 'lodash';
class DetailHandbook extends Component {
    constructor(props){
        super(props);
        this.state = {
            arrDoctorId: [],
            dataDetailHandbook: {},

        }
    }
   async componentDidMount(){
    if(this.props.match && this.props.match.params && this.props.match.params.id){
        let id = this.props.match.params.id;
        let res = await getDetailHandbookById({
            id: id,
        });
        
        if(res && res.errcode === 0){
            let data = res.data;
            let arrDoctorId = [];
            if(data && !_.isEmpty(res.data)){
                let arr = data.doctorClinic;
                if(arr && arr.length > 0){
                    arr.map(item => {
                        arrDoctorId.push(item.doctorId)

                    })
                   
                }
            }
            this.setState({
                dataDetailHandbook: res.data,
                arrDoctorId: arrDoctorId,
              
            })
        }
        
       }
   
    
   }

   
   

   async componentDidUpdate(prevProps, prevStste, snapshot){
        if(this.props.language !== prevProps.language){

        } 
       }
 
    
    render(){
    let {arrDoctorId, dataDetailHandbook} = this.state;
    console.log('check state: ', this.state);
    let {language} = this.props
        return (
            <div className="detail-handbook-container">
            <HomeHeader/>
            <div className="detail-handbook-body">
            <div className="description-handbook">
                {dataDetailHandbook && !_.isEmpty(dataDetailHandbook) &&
                <>
                <div>{dataDetailHandbook.name}</div>
                <div dangerouslySetInnerHTML={{__html: dataDetailHandbook.descriptionHTML}}></div>
                </>
            }
            </div>

            
          
            {arrDoctorId && arrDoctorId.length > 0 && arrDoctorId.map((item, index) =>{
                return(
                    <div className="each-doctor" key={index}>
                        <div className="dt-content-left">
                            <div className="profile-doctor">
                                <ProFileDoctor
                                 doctorId = {item}
                                 isShowDescriptionDoctor={true}
                                 isShowLinkDetail = {true}
                                 isShowPrice={false}
                                //  dataTime={dataTime}
                                 />
                            </div>
                        </div>
                        <div className="dt-content-right">
                            <div className='doctor-schedule'>
                                <DoctorSchedule
                                doctorIdFromParent = {item}
                            
                                />
                             

                            </div>
                              
                            <div className='doctor-extrainfor'>
                                <DoctorExtraInfor
                                doctorIdFromParent = {item}
                                />

                            </div>
                           

                    </div>
                    
                </div>




                 
       
                )
            })}
           
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailHandbook);
