import React, { Component } from 'react';
import { connect } from "react-redux";
import './DefaultClass.scss';
import { LANGUAGES } from '../../../utils';
import { FormattedMessage } from 'react-intl';
class DefaultClass extends Component {
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
            <div className='doctor-extra-infor-contentner'>
                
             
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

export default connect(mapStateToProps, mapDispatchToProps)(DefaultClass);
