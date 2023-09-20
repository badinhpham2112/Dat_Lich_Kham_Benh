
import React, { Component } from 'react';

import { connect } from 'react-redux';

import './Specialty.scss'
import { getAllHandbook } from '../../../services/userservice';
import { FormattedMessage } from 'react-intl';
import { divide } from 'lodash';
import Slider from "react-slick";
import { getAllSpecialty } from '../../../services/userservice';
import { withRouter } from 'react-router';
import OutStandingDoctor from './OutStandingDoctor';


class Handbook extends Component {
    constructor(props){
        super(props)
        this.state = {
            dataHandbook: []
        }
    }

    async componentDidMount(){
        let res = await getAllHandbook();
        console.log('check res: ', res)
        if(res && res.errcode === 0){
            this.setState({
                dataHandbook: res.data ? res.data : []
            })
            
        }
    }

    handleViewDetailHandbook = (item) => {
        if(this.props.history){
           
            this.props.history.push(`/detail-handbook/${item.id}`);
        }
        
    }
    

    render() {
        let {dataHandbook} = this.state;
        return ( 
            <div className='section-share section-Handbook'>
                <div className='section-container'>
                    <div className='section-header'>
                        <span className='title-section'>Cẩm nang</span>
                        <button className='btn-section'>Xem thêm</button>
                   </div>
                    <div className='section-body'>
                    <Slider {...this.props.settings}>
                        {dataHandbook && dataHandbook.length > 0 && dataHandbook.map((item, index) =>{
                            return(
                                <div className='section-customize handbook-child' key={index}
                                 onClick={() => this.handleViewDetailHandbook(item)}>
                               
                                <div className='bg-img section-handbook' 
                                style={{ backgroundImage: `url(${item.image})`}}/>
                                <span className='specialty-name'>{item.name}</span>
                                </div>
                            )
                        })}
                      
                    </Slider>

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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Handbook));