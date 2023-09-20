import React, { Component } from 'react';
import { connect } from "react-redux";
import './Information.scss';
import logo from '../../../assets/Logo/Logo.svg'
import { LANGUAGES } from '../../../utils';
import { FormattedMessage } from 'react-intl';
class Information extends Component {
    constructor(props){
        super(props);
        this.state = {

        }
    }
   async componentDidMount(){
   
   
    
   }
   

   async componentDidUpdate(prevProps, prevStste, snapshot){
        if(this.props.language !== prevProps.language){

        } 
       
}

 
    
    render(){
     
        return (
            <div className='section-share section-information'>
                 <div className='section-container'>
                    <div className='home-information-content'>
                        <div className='left-content'>
                            <img className="header-logo" src={logo}/>
                            <div className="company-HN">
                                <h2>Công ty cổ phần Công nghệ Bookingcare</h2>
                                <p>
                                    <span>
                                        <i class="far fa-map-marker-alt"></i>
                                    </span>
                                    Lô B4/D21, Khu đô thị mới Cầu Giấy, Phường Dịch Vọng Hậu, Quận Cầu Giấy, Thành phố Hà Nội, Việt Nam
                                </p>
                                <p>
                                    <i class="fa-solid fa-check"></i>
                                    ĐKKD số: 0106790291. Sở KHĐT Hà Nội cấp ngày 16/03/2015
                                </p>

                            </div>
                        </div>
                        <div className='center-content'>
                            <li>Liên hệ hợp tác</li>
                            <li>Danh bạ y tế</li>
                            <li>Sức khỏe doanh nghiệp</li>
                            <li>Gói chuyển đổi số doanh nghiệp</li>
                            <li>Tuyển dụng</li>
                            <li>Câu hỏi thường gặp</li>
                            <li>Điều khoản sử dụng</li>
                            <li>Chính sách bảo mật</li>
                            <li>Quy trình giải quyết khiếu nại</li>
                            <li>Quy chế hoạt động</li>
                            
                        </div>
                        <div className='right-content'>
                            <div className='ds'>
                                <p>Trụ sở tại Hà Nội</p>
                                Lô B4/D21, Khu đô thị mới Cầu Giấy, Phường Dịch Vọng Hậu, Quận Cầu Giấy, Thành phố Hà Nội, Việt Nam
                            </div>
                           
                            <div className='ds'>
                                <p>Văn Phòng tại TP Hồ Chí Minh</p>
                                Số 01, Hồ Bá Kiện, Phường 15, Quận 10
                            </div>
                            <div className='ds'>
                                <p>Hộ trợ khách hàng</p>
                                support@bookingcare.vn (7h30 - 18h)
                            </div>
                            <div className='ds'>
                                <p>Hotline</p>
                                024-7301-2468 (7h30 - 18h)
                              

                            </div>
                            
                           
                            
                        </div>
                    </div>
                    
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

export default connect(mapStateToProps, mapDispatchToProps)(Information);
