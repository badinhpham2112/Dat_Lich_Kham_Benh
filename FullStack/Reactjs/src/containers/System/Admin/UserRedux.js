import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { LANGUAGES, CRUD_ACTIONS, CommonUtils } from '../../../utils';
import * as action from '../../../store/actions';
import './UserRedux.scss';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import TableManageUser from './TableManageUser';

// import Lightbox from 'react-image-lightbox';
// import 'react-image-lightbox/style.css'; // This only needs to be imported once in your app

class UserRedux extends Component {
 

    constructor (props) {
        super(props);
        this.state = {
                genderArr: [],
                positionArr: [],
                roleArr: [],
                previewImgURL: '',
                isOpen: false,

                // kiem tra xem da tao nguoi dung hay chua 
                // isUserCreated: false,

                // CAC THONG TIN CAN LUU THONG TIN NGUOI DUNG
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                phoneNumber: '',
                address: '',
                gender: '',
                position: '',
                role: '',
                avarta: '',
    
                userEditId: '',
                action: '',
        }
    }

    async componentDidMount() {
        this.props.getGenderStart();
        this.props.getPositionStart();
        this.props.getRoleStart();
        // try {
        //     let res = await getAllCodeService('gender');
        //     if(res && res.errcode === 0){
        //         this.setState({
        //             genderArr: res.data
        //         })
        //     }
        //     console.log('Ba check res: ', res)

        // } catch (e) {
        //     console.log(e)

        // }

        // try {
        //     let res = await getAllCodeService('position');
        //     if(res && res.errcode === 0){
        //         this.setState({
        //             positionArr: res.data
        //         })
        //     }

        // } catch (e) {
        //     console.log(e);

        // }
        // try {
        //     let res = await getAllCodeService('role');
        //     if(res && res.errcode === 0){
        //         this.setState({
        //             roleArr: res.data
        //         })
        //     }

        // } catch (e) {
        //     console.log(e);

        // }
    }



    componentDidUpdate(prevProps, prevState) {
        if (prevProps.genderredux !== this.props.genderredux) {
            let arrGenders = this.props.genderredux;
            this.setState({
                genderArr: arrGenders,
                gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].keyMap : ''
            })
        }

        if (prevProps.positionredux !== this.props.positionredux) {
            let arrPositions = this.props.positionredux
            this.setState({
                positionArr: arrPositions,
                position: arrPositions && arrPositions.length > 0 ? arrPositions[0].keyMap : ''
            })
        }


        if (prevProps.roleredux !== this.props.roleredux) {
            let arrRoles = this.props.roleredux
            this.setState({
                roleArr: arrRoles,
                role: arrRoles && arrRoles.length > 0 ? arrRoles[0].keyMap : ''
            })
        }

        if (prevProps.listusers !== this.props.listusers) {
            let arrGenders = this.props.genderredux;
            let arrPositions = this.props.positionredux;
            let arrRoles = this.props.roleredux;
            this.setState({
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                phoneNumber: '',
                address: '',
                gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].keyMap : '',
                position: arrPositions && arrPositions.length > 0 ? arrPositions[0].keyMap : '',
                role: arrRoles && arrRoles.length > 0 ? arrRoles[0].keyMap : '',
                avarta: '',
                action: CRUD_ACTIONS.CREATE,
                previewImgURL: '',
            })
        }
    }

    handleOnChangeImage = async(event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            let Base64 = await CommonUtils.getBase64(file);
            console.log('check Image: ', Base64)
            let objectUrl = URL.createObjectURL(file)
            this.setState({
                previewImgURL: objectUrl,
                avarta: Base64
            })
        }

    }

    openPreViewImage = () => {
        if (!this.state.previewImgURL) return;
        this.setState({
            isOpen: true

        })
    }


    handleSaveUSer = () => {
        let isValid = this.checkValidateInput();
        if (isValid === false) return;
        let { action } = this.state; //let action = this.state.action
        if (action === CRUD_ACTIONS.CREATE) {
            //fire redux create user
            this.props.createNewUser({
                email: this.state.email,
                password: this.state.password,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                address: this.state.address,
                phonenumber: this.state.phoneNumber,
                gender: this.state.gender,
                roleId: this.state.role,
                positionId: this.state.position,
                avarta: this.state.avarta,
            })
        }
        if (action === CRUD_ACTIONS.EDIT) {
            //fire redux edit user
            this.props.editAUserRedux({
                id: this.state.userEditId,
                email: this.state.email,
                password: this.state.password,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                address: this.state.address,
                phonenumber: this.state.phoneNumber,
                gender: this.state.gender,
                roleId: this.state.role,
                positionId: this.state.position,
                avarta: this.state.avarta

            })

        }

    }
    checkValidateInput = () => {
        let isValid = true;
        let arrCheck = ['email', 'password', 'firstName', 'lastName',
            'phoneNumber', 'address'
        ];
        for (let i = 0; i < arrCheck.length; i++) {
            if (!this.state[arrCheck[i]]) {
                isValid = false;
                alert('this input is required: ' + arrCheck[i])
                break;
            }
        }
        return isValid;

    }

    onChangeInput = (event, id) => {
        let copyState = {...this.state }
        copyState[id] = event.target.value;
        this.setState({
            ...copyState
        })
    }

    handleEditUserFromParent = (user) => {
        let imageBase64 = '';
        if (user.image) {
            imageBase64 = new Buffer(user.image, 'base64').toString('binary')

        }
        this.setState({
            email: user.email,
            password: 'HARDCODE',
            firstName: user.firstName,
            lastName: user.lastName,
            phoneNumber: user.phonenumbe,
            address: user.address,
            gender: user.gender,
            position: user.positionId,
            role: user.roleId,
            avarta: '',
            previewImgURL: imageBase64,
            action: CRUD_ACTIONS.EDIT,
            userEditId: user.id,

        })
    }

    render() {
        let genders = this.state.genderArr;
        let positions = this.state.positionArr;
        let roles = this.state.roleArr;
        let language = this.props.language;
        let isGetGenders = this.props.isLoadingGender;
        // console.log('Ba check gender props from redux: ', this.props.genderredux);
        // console.log('Ba check position props from redux: ', this.props.positionredux);
        // console.log('Ba check role props from redux: ', this.props.roleredux);

        let {
            email,
            password,
            firstName,
            lastName,
            phoneNumber,
            address,
            gender,
            position,
            role,
            avarta
        } = this.state

        return (
            <div className='user-redux-container'>
                <div className='title'>
                Learn Redux - React với Phạm Đình Ba
                </div>
                 <div className="user-redux-body" >
                    <div className='container'>
                        <div className='row'>
                            {/* HIEN THI CHU THEM MOI NGUOI DUNG */}
                            <div className='col-12 my-3'><FormattedMessage id='manage-user.add'/></div>
                            <div className='col-12'>{isGetGenders === true ? 'Loading genders' : ''}</div>
               
                            <div className = 'col-3' >
                                <label ><FormattedMessage id = "manage-user.email"/></label> 
                                <input
                                 className = 'form-control'
                                 type = 'email'
                                 value = { email }
                                 onChange = {(event) => { this.onChangeInput(event, 'email') } }
                                 disabled = { this.state.action === CRUD_ACTIONS.EDIT ? true : false }
                            /> 
                             </div> 
                             <div className = 'col-3' >
                                <label> <FormattedMessage id = "manage-user.password" /> </label> 
                                <input className = 'form-control'
                                 type = 'password'
                                 value = { password }
                                 onChange = {(event) => { this.onChangeInput(event, 'password') } }
                                 disabled = { this.state.action === CRUD_ACTIONS.EDIT ? true : false }/>
                            </div>
                            <div className = 'col-3' >
                                <label> <FormattedMessage id = "manage-user.first-name" /> </label> 
                                <input className = 'form-control'
                                 type = 'text'
                                 value = { firstName }
                                 onChange = {(event) => { this.onChangeInput(event, 'firstName') } }/>
                            </div>
                            <div className = 'col-3' >
                                <label> <FormattedMessage id = "manage-user.last-name" /> </label>
                                <input className = 'form-control'
                                 type = 'text'
                                 value = { lastName }
                                 onChange = {(event) => { this.onChangeInput(event, 'lastName') } }/>
                             </div> 

                            {/* Dong 2 */}

                            <div className='col-3'>
                                <label><FormattedMessage id='manage-user.phone-number'/></label>
                                <input className='form-control' type='text'
                                value={phoneNumber}
                                onChange={(event) => {this.onChangeInput (event, 'phoneNumber')}}
                                
                                />
                             </div>
                             <div className='col-9'>
                                <label><FormattedMessage id='manage-user.address'/></label>
                                <input className='form-control' type='text'
                                  value={address}
                                  onChange={(event) => {this.onChangeInput (event, 'address')}}
                                
                                />
                             </div>

                             {/* Dong 3 */}
                             <div className = 'col-3'>
                                <label> <FormattedMessage id = "manage-user.gender" /> </label>
                                <select className = "form-control"
                                 value = { gender }
                                 onChange = {(event) => { this.onChangeInput(event, 'gender') } }> 
                                 {genders && genders.length > 0 && genders.map((item, index) => {
                                 //console.log('check item', index)
                            return ( <option key = { index }
                                 value = { item.keyMap } > { language === LANGUAGES.VI ? item.valueVi : item.valueEn } </option>
                                        )
                                    })
                                    }
 
                                 </select>
                             </div>
                             <div className = 'col-3' >
                                <label > < FormattedMessage id = "manage-user.position" /> </label> 
                                <select className = "form-control"
                                 value = { position }
                                 onChange = {(event) => { this.onChangeInput(event, 'position') } }> 
                                 {positions && positions.length && positions.map((item, index) => {
                             return (
                                <option key = { index }
                                 value = { item.keyMap } > { language === LANGUAGES.VI ? item.valueVi : item.valueEn } </option>

                                            // <option  key = {index}>{item.valueVn}</option>
                                            )
                                    })
                                    }
 
                                 </select>
                             </div>
                             <div className = 'col-3' >
                                <label > < FormattedMessage id = "manage-user.role" /> </label> 
                                <select className = "form-control"
                                 value = { role }
                                 onChange = {(event) => { this.onChangeInput(event, 'role')}}> 
                                 {roles && roles.length && roles.map((item, index) => {
                            return ( 
                                <option key = { index } value = { item.keyMap }> 
                                {language === LANGUAGES.VI ? item.valueVi : item.valueEn } 
                                </option>
                                            // <option  key = {index}>{item.valueVn}</option>
                                            )
                                    })
                                    }
 
                                 </select>
                             </div>
                             <div className='col-3'>
                                <label><FormattedMessage id='manage-user.image'/></label>
                                <div className='preview-img-container'>
                                    <input id='previewImg' type='file' hidden
                                    
                                    onChange={(event) => this.handleOnChangeImage(event)}
                                    
                                    />
                                    <label className='label-upload' htmlFor='previewImg'>Tải ảnh<i className='fas fa-upload'></i></label>
                                    <div className='preview-image'
                                    
                                    style={{backgroundImage: `url(${this.state.previewImgURL})` }}
                                    onClick={() => this.openPreviewImage()}
                                    
                                    >


                                    </div>
                                </div>
                                 
                             </div>
                             <div className='col-12 my-3'>

                                   <button className= {this.state.action === CRUD_ACTIONS.EDIT ? 'btn btn-warning' :  'btn btn-primary' } 
                                   onClick = {() => this.handleSaveUSer()}
                                   >
                                       
                                       { this.state.action === CRUD_ACTIONS.EDIT ?
                                        <FormattedMessage id='manage-user.edit'/> 
                                        :
                                        <FormattedMessage id='manage-user.save'/>
                                    }
                                    
                                   </button>
                             </div>
                             
                             <div  className='col-12 mb-5'>
                                   <TableManageUser
                                   handleEditUserFromParentKey = {this.handleEditUserFromParent}
                                   action= {this.state.action}
                                   />
                             </div> 

                        </div>

                    </div>
                
                
                </div>
                  
            {this.state.isOpen === true  && 
                <Lightbox
                mainSrc={this.state.previewImgURL} 
                onCloseRequest={() => this.setState({ isOpen: false })} 

          />
            } 

            </div>
             
        )
    }

}

const mapStateToProps = state => {
    return {
        // Truyen gender vao adminActions
        language: state.app.language,
        genderredux: state.admin.genders,
        positionredux: state.admin.positions,
        roleredux: state.admin.roles,

        isLoadingGender: state.admin.isLoadingGender,
        listusers: state.admin.users,

    };
};

const mapDispatchToProps = dispatch => {
    return {
        // CAC BIEN LAY TU KHOA TU FILE ADMINREDUCER
        getGenderStart: () => dispatch(action.fetchGenderStart()), 
        getPositionStart: () => dispatch(action.fetchPositionStart()), 
        getRoleStart: () => dispatch(action.fetchRoleStart()), 
        createNewUser: (data) => dispatch(action.createNewUser(data)), 
        fetchUserRedux: () => dispatch(action.fetchAllUsersStart()),
        editAUserRedux : (data) => dispatch(action.editAUser(data))

        // processLogout: () => dispatch(actions.processLogout()), 
        // changeLanguageAppRedux: (language) => dispatch(actions.changeLanguageApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);