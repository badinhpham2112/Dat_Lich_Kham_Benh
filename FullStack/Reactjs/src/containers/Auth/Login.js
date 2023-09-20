import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";
import * as actions from "../../store/actions";
import './Login.scss';
import { FormattedMessage } from 'react-intl';
import  { handleLoginApi }  from '../../services/userservice';
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            isShowPassword: false,
            errMessage: ''
        }
        
    }
    handleOnChangeInputUsername = (event) => {
        this.setState({
            username: event.target.value
        })

    }   
     handleOnChangeInputPassword = (event) => {
        this.setState({
            password: event.target.value
        })
    }

    handleLogin = async () => {
        this.setState({
            errMessage: ''
        })

    try{
        let data = await handleLoginApi(this.state.username, this.state.password);
        if(data && data.errcode !== 0){
            this.setState({
                errMessage: data.message,
                
            })
        }
        if(data && data.errcode === 0){
            this.props.userLoginSuccess(data.user);
            console.log('login succeeds')
        }

    }catch(error){
            if(error.response){
                if(error.response.data){
                     this.setState({
                        errMessage: error.response.data.message

            })

                }
            }
            console.log('phamdinhba12345', error.response)
            //  this.setState({
            //     errMessage: e.message

            // })
        }
     }

    handleShowHidepassword = () => {
        this.setState({
            isShowPassword: !this.state.isShowPassword
        })
    }

    handleKeyDown = (event) => {
        console.log('check keyDown', event)
        if(event.key === 'Enter' || event.keyCode === 13){
            this.handleLogin();
        }
    }

    render() {

        return (
            <div className='login-backgroud'>
                <div className='login-container'>
                    <div className='login-content row'>
                        <div className='col-12 text-login'>Login</div>
                            <div className='col-12 form-group login-input'>
                                <label>Username:</label>
                                <input type="text" 
                                className='form-control' 
                                placeholder='Enter your usename'
                                value={this.state.username} 
                                onChange={(event) => this.handleOnChangeInputUsername(event)}/>
                        </div>
                        <div className='col-12 form-group login-input'>
                                <label>Password:</label>
                                <div className='custom-input-password'>
                                <input type={this.state.isShowPassword? 'text' : 'password'} 
                                className='form-control' 
                                placeholder='Enter your passwprd'
                                onChange={(event) => (this.handleOnChangeInputPassword(event))}
                                onKeyDown={(event) => this.handleKeyDown(event)}
                                />
                                <span 
                                onClick={() => {this.handleShowHidepassword() }}
                                ><i className={this.state.isShowPassword? 'far fa-eye' : 'fas fa-eye-slash'}></i></span>
                                </div>
    
                        </div>
                        <div className='col-12' style={{ color : 'red' }}>
                            {this.state.errMessage}
                        </div>
                        <div className='col-12'>
                        <button className=' btn-login' onClick ={() =>{ this.handleLogin() }}>Login</button>
                        </div>
                        <div className='col-12'>
                            <span className='Forgot-password'>Forgot your Password</span>
                        </div>
                        <div className='col-12 text-center mt-3'>
                            <span className='text-other-login'>Or Login with</span>
                        </div>
                        <div className='col-12 social-login'>
                            <i className="fab fa-google google"></i>
                            <i className="fab fa-facebook-square facebook"></i>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
     // userLoginFail: () => dispatch(actions.adminLoginFail()),
        userLoginSuccess: (userInfo) => dispatch(actions.userLoginSuccess(userInfo))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
