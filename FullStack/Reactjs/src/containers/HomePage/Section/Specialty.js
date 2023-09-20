import React, { Component } from 'react';

import { connect } from 'react-redux';

import './Specialty.scss'

import { FormattedMessage } from 'react-intl';
import { divide } from 'lodash';
import Slider from "react-slick";
import { getAllSpecialty } from '../../../services/userservice';
import { withRouter } from 'react-router';
import OutStandingDoctor from './OutStandingDoctor';


class Specialty extends Component {
    constructor(props){
        super(props)
        this.state = {
            dataSpecialty: []
        }
    }

    async componentDidMount(){
        let res = await getAllSpecialty();
        console.log('check res: ', res)
        if(res && res.errcode === 0){
            this.setState({
                dataSpecialty: res.data ? res.data : []
            })
            
        }
    }

    handleViewDetailSpecialty = (item) => {
        if(this.props.history){
           
            this.props.history.push(`/detail-specialty/${item.id}`);
        }
        
    }
    

    render() {
        let {dataSpecialty} = this.state
        return ( 
            <div className='section-share section-specialty'>
                <div className='section-container'>
                    <div className='section-header'>
                        <span className='title-section'><FormattedMessage id = "homepage.speciality" /></span>
                        <button className='btn-section'><FormattedMessage id = "homepage.more-infor" /></button>
                    </div>
                    <div className='section-body'>
                    <Slider {...this.props.settings}>
                        {dataSpecialty && dataSpecialty.length > 0 && dataSpecialty.map((item, index) =>{
                            return(
                                <div className='section-customize specialty-child' key={index} onClick={() => this.handleViewDetailSpecialty(item)}>
                               
                                <div className='bg-img section-specialty' 
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Specialty));