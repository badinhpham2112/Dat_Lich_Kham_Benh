import React, { Component } from 'react';

import { connect } from 'react-redux';



import { FormattedMessage } from 'react-intl';



class HomeFooter extends Component {
    

    render() {
        return ( 
            <div className='home-footer'>
                <p>&copy; 2023 Học lập trình fullStack với Phạm đình ba.More information, please visit my youtube channal.
                    <a target='_blank' href='https://www.youtube.com/watch?v=Y_LdLR71fyQ'>
                        &#8594; click here &#8592;
                    </a>
                </p>
                
               
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);