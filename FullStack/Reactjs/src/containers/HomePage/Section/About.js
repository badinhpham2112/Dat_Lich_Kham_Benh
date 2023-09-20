import React, { Component } from 'react';

import { connect } from 'react-redux';



import { FormattedMessage } from 'react-intl';



class About extends Component {
    

    render() {
        return ( 
            <div className='section-share section-about'>
                <div className='section-about-header'>Truyền thông nói về BookingCare</div>
                <div className='section-about-content'>
                    <div className='content-left'>
                    {/* <iframe width="100%" height="400px" 
                    src="https://www.youtube.com/embed/ctxl6BP7wzI" 
                    title="Chương 102: Mở Đầu Nữ Đế Làm Chính Cung || Xuyên Không Liền Thành Thân Vương Siêu Cấp || SPED Review" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen>

                    </iframe> */}
                    <iframe width="100%" height="400px" 
                    src="https://www.youtube.com/embed/Y_LdLR71fyQ" 
                    title="[s10] Doraemon Phần 25 - Tổng Hợp Bộ Hoạt Hình Doraemon Hay Nhất - POPS Kids" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                    </div>
                    <div className='content-right'>
                        <p>Phim hoat hinh hay nhất thế giới đây mà</p>
                    </div>
                </div>
               
            </div>
      
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        lang: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {

    };

};

export default connect(mapStateToProps, mapDispatchToProps)(About);