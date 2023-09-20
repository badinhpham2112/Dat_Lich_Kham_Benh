import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './TableManageUser.scss';
import *as actions from '../../../store/actions';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';
import './ManageDoctor.scss';
import Select from 'react-select';
import { CRUD_ACTIONS, LANGUAGES } from '../../../utils';
import {getDetailInforDoctor} from '../../../services/userservice'


// const options = [
//   { value: 'chocolate', label: 'Chocolate' },
//   { value: 'strawberry', label: 'Strawberry' },
//   { value: 'vanilla', label: 'Vanilla' },
// ];



const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageDoctor extends Component {

    constructor(props){
        super(props);
        this.state = {
            //save to markdown table
            contentHTML: '',
            contentMarkdown: '',
            selectedOption: '',
            description: '',
            listDoctors: [],
            hasOldData: false,
            
            //Save to doctor_infor table
            listPrice: [],
            listPayment: [],
            listProvince: [],
            listClinic: [],
            listSpecialty: [],

            selectedPrice: '',
            selectedPayment: '',
            selectedProvince: '',
            selectedClinic: '',
            selectedSpecialty: '',

            nameClinic: '',
            addressClinic: '',
            note: '',
            clinicId: '',
            specialtyId: ''
            

        }
    }

    componentDidMount() {
        this.props.fetchAllDoctors();
        this.props.getAllRequiredDoctorInfor();
      
       
        
    }
    buildDataInputSelect = (inputdata, type) => {
        let result = [];
        let {language} = this.props;
        if(inputdata && inputdata.length > 0){
            if(type === 'USERS'){
                inputdata.map((item, index) => {
                    let object = {};
                    let labelVi = `${item.lastName} ${item.firstName}`;
                    let labelEn = `${item.firstName} ${item.lastName}`;
                    object.label = language === LANGUAGES.VI ?  labelVi : labelEn;
                    object.value = item.id;
                    result.push(object)
                })
               
            }
            if(type === 'PRICE'){
                inputdata.map((item, index) => {
                    let object = {};
                    let labelVi = `${item.valueVi} VND`;
                    let labelEn = `${item.valueEn} USD`;
                    object.label = language === LANGUAGES.VI ?  labelVi : labelEn;
                    object.value = item.keyMap;
                    result.push(object)
                })
            }
            if(type === 'PAYMENT' || type === 'PROVINCE'){
                inputdata.map((item, index) => {
                    let object = {};
                    let labelVi = `${item.valueVi}`;
                    let labelEn = `${item.valueEn}`;
                    object.label = language === LANGUAGES.VI ?  labelVi : labelEn;
                    object.value = item.keyMap;
                    result.push(object)
                })
            }

            if(type === 'SPECIALTY'){
                inputdata.map((item, index) => {
                    let object = {};
                    object.label = item.name;
                    object.value = item.id;
                    result.push(object)
                })

            }

            if(type === 'CLINIC'){
                inputdata.map((item, index) => {
                    let object = {};
                    object.label = item.name;
                    object.value = item.id;
                    result.push(object)
                })

            }
           
        }
        return result;

    }
    componentDidUpdate(prevProps, prevState, snapshot){
        if(prevProps.allDoctors !== this.props.allDoctors){
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors, 'USERS')
            this.setState({
                listDoctors: dataSelect,

            })
        }
       
        if(prevProps.allrequiredDoctorInfor !== this.props.allrequiredDoctorInfor){
         
            let { resPrice, resPayment, resProvince, resSpecialty, resClinic} = this.props.allrequiredDoctorInfor;
            let dataSelectPrice = this.buildDataInputSelect(resPrice, 'PRICE');
            let dataSelectPayment = this.buildDataInputSelect(resPayment, 'PAYMENT');
            let dataSelectProvince = this.buildDataInputSelect(resProvince, 'PROVINCE');
            let dataSelectSpecialty = this.buildDataInputSelect(resSpecialty, 'SPECIALTY');
            let dataSelectClinic = this.buildDataInputSelect(resClinic, 'CLINIC')
            // console.log('check data: ', dataSelectPrice, dataSelectPayment, dataSelectProvince)
            this.setState({
                listPrice: dataSelectPrice,
                listPayment: dataSelectPayment,
                listProvince: dataSelectProvince,
                listSpecialty: dataSelectSpecialty,
                listClinic: dataSelectClinic
                
            })
        }
        if(prevProps.language !== this.props.language){
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors, 'USERS');
            let { resPrice, resPayment, resProvince} = this.props.allrequiredDoctorInfor;
            let dataSelectPrice = this.buildDataInputSelect(resPrice, 'PRICE');
            let dataSelectPayment = this.buildDataInputSelect(resPayment, 'PAYMENT');
            let dataSelectProvince = this.buildDataInputSelect(resProvince, 'PROVINCE');
            this.setState({
                listDoctors: dataSelect,
                listPrice: dataSelectPrice,
                listPayment: dataSelectPayment,
                listProvince: dataSelectProvince,

            })
        }
       

    }

    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentHTML: html,
            contentMarkdown: text,
        })
       
    }

    handleSaveContentMarkdown = () => {
        let{hasOldData} = this.state;
        this.props.saveDetailDoctor({
            contentHTML: this.state.contentHTML,
            contentMarkdowns: this.state.contentMarkdown,
            description: this.state.description,
            doctorId: this.state.selectedOption.value,
            action: hasOldData === true ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE,

            selectedPrice: this.state.selectedPrice.value,
            selectedPayment: this.state.selectedPayment.value,
            selectedProvince: this.state.selectedProvince.value,
            nameClinic: this.state.nameClinic,
            addressClinic: this.state.addressClinic,
            note: this.state.note,
            clinicId: this.state.selectedClinic && this.state.selectedClinic.value ? this.state.selectedClinic.value: '',
            specialtyId: this.state.selectedSpecialty && this.state.selectedSpecialty.value ? this.state.selectedSpecialty.value: '',
        })
      
    }


    handleChangeSelect = async (selectedOption) => {
        this.setState({ selectedOption });
        let {listPayment, listPrice, listProvince, listClinic, listSpecialty} = this.state;
        let res = await getDetailInforDoctor(selectedOption.value);
        if(res && res.errcode === 0 && res.data && res.data.Markdown){
            let mardown = res.data.Markdown;
            let addressClinic = '';
            let nameClinic = '';
            let note = '';
            let paymentId = '';
            let priceId = '';
            let provinceId = '';
            let specialtyId = '';
            let clinicId = '';
            let selectedPayment = '';
            let selectedPrice = '';
            let selectedProvince = '';
            let selectedSpecialty = '';
            let selectedClinic = '';

            
            if(res.data.Doctor_Infor){
                addressClinic = res.data.Doctor_Infor.addressClinic;
                nameClinic = res.data.Doctor_Infor.nameClinic;
                note = res.data.Doctor_Infor.note;
                paymentId = res.data.Doctor_Infor.paymentId;
                priceId = res.data.Doctor_Infor.priceId;
                provinceId = res.data.Doctor_Infor.provinceId;
                specialtyId = res.data.Doctor_Infor.specialtyId;
                clinicId = res.data.Doctor_Infor.clinicId;
                selectedPayment = listPayment.find(item => {
                    return item && item.value === paymentId;
                })
                selectedPrice = listPrice.find(item => {
                    return item && item.value === priceId;
                })
                selectedProvince = listProvince.find(item => {
                    return item && item.value === provinceId;
                })
                selectedSpecialty = listSpecialty.find(item => {
                    return item && item.value === specialtyId;
                });
                selectedClinic = listClinic.find(item => {
                    return item && item.value === clinicId;
                })
               
            }
            this.setState({
                contentHTML: mardown.contentHTML,
                contentMarkdown: mardown.contentMarkdowns,
                description: mardown.description,
                hasOldData: true,
                addressClinic: addressClinic,
                nameClinic: nameClinic,
                note: note,
                selectedPayment: selectedPayment,
                selectedPrice: selectedPrice,
                selectedProvince: selectedProvince,
                selectedClinic: selectedClinic,
                selectedSpecialty: selectedSpecialty

            })
        }else{
            this.setState({
                contentHTML: '',
                contentMarkdown: '',
                description: '',
                hasOldData: false,
                addressClinic: '',
                nameClinic: '',
                note: '',
                selectedPayment: '',
                selectedPrice: '',
                selectedProvince: '',
                selectedClinic: '',
                selectedSpecialty: '',
            })
        }
        console.log(`check res: `, res)
        
      };

    handleChangeSelectDoctorInfor = async (selectedOption, name) => {
        let stateName = name.name;
        let stateCopy = {...this.state};
        stateCopy[stateName] = selectedOption;
        this.setState({
            ...stateCopy
        })
        console.log('check select onChange: ', selectedOption, stateName)


    }

      handleOnChangeText = (event, id) =>{
        let stateCopy = {...this.state};
        stateCopy[id] = event.target.value;
        this.setState({
            ...stateCopy
            
        })
      }
   
    render() {
        let listDoctors = this.state.listDoctors;
        let {hasOldData, listSpecialty} = this.state;
        console.log("check state: ", this.state)
        
        return (
            <div className='manage-doctor-contentner'>
                <div className='manage-doctor-title'><FormattedMessage id="admin.manage-doctor.title"/></div>
                <div className='More-infor'>
                    <div className='content-left form-group'>
                       
                        <label><FormattedMessage id="admin.manage-doctor.select-doctor"/></label>
                        
                        <Select
                        placeholder={<FormattedMessage id="admin.manage-doctor.select-doctor"/>}
                        value={this.state.selectedOption}
                        onChange={this.handleChangeSelect}
                        options={this.state.listDoctors}
                        
                        />
                    </div>
                    <div className='content-right'>
                         <label><FormattedMessage id="admin.manage-doctor.intro"/></label>
                        <textarea
                        onChange={(event) => this.handleOnChangeText(event, 'description')}
                        value={this.state.description} 
                        className='form-control'>abcd</textarea>
                        
                        
                    </div>
                </div>
                <div className='more-infor-extra row'>
                    <div className='col-4 form-group'>
                        <label><FormattedMessage id="admin.manage-doctor.Price"/></label>
                        <Select
                        placeholder={<FormattedMessage id="admin.manage-doctor.Price"/>}
                        value={this.state.selectedPrice}
                        onChange={this.handleChangeSelectDoctorInfor}
                        options={this.state.listPrice}
                        name="selectedPrice"
                        
                        />

                    </div>

                    <div className='col-4 form-group'>
                        <label><FormattedMessage id="admin.manage-doctor.Payment"/></label>
                        <Select
                        placeholder={<FormattedMessage id="admin.manage-doctor.Payment"/>}
                        value={this.state.selectedPayment}
                        onChange={this.handleChangeSelectDoctorInfor}
                        options={this.state.listPayment}
                        name="selectedPayment"
                        
                        />

                    </div>

                    <div className='col-4 form-group'>
                        <label><FormattedMessage id="admin.manage-doctor.Province"/></label>
                        <Select
                        placeholder={<FormattedMessage id="admin.manage-doctor.Province"/>}
                        value={this.state.selectedProvince}
                        onChange={this.handleChangeSelectDoctorInfor}
                        options={this.state.listProvince}
                        name="selectedProvince"
                        
                        />

                    </div>

                    <div className='col-4 form-group'>
                        <label><FormattedMessage id="admin.manage-doctor.nameClinic"/></label>
                        <input className='form-control'
                        onChange={(event) => this.handleOnChangeText(event, 'nameClinic')}
                        value={this.state.nameClinic}
                        />

                    </div>

                    <div className='col-4 form-group'>
                        <label><FormattedMessage id="admin.manage-doctor.addressClinic"/></label>
                        <input className='form-control' 
                        onChange={(event) => this.handleOnChangeText(event, 'addressClinic')}
                        value={this.state.addressClinic}
                        />

                    </div>

                    <div className='col-4 form-group'>
                        <label><FormattedMessage id="admin.manage-doctor.note"/></label>
                        <input className='form-control'
                        onChange={(event) => this.handleOnChangeText(event, 'note')}
                        value={this.state.note}
                         />

                    </div>

                </div>
                <div className='row'>
                    <div className='col-4 form-group'>
                        <label><FormattedMessage id="admin.manage-doctor.speciality"/></label>
                        <Select
                        placeholder={<FormattedMessage id="admin.manage-doctor.speciality"/>}
                        value={this.state.selectedSpecialty}
                        onChange={this.handleChangeSelectDoctorInfor}
                        options={this.state.listSpecialty}
                        name="selectedSpecialty"
                        
                        />
                    </div>

                    <div className='col-4 form-group'>
                        <label><FormattedMessage id="admin.manage-doctor.select-clinic"/></label>
                        <Select
                        placeholder={<FormattedMessage id="admin.manage-doctor.select-clinic"/>}
                        value={this.state.selectedClinic}
                        onChange={this.handleChangeSelectDoctorInfor}
                        options={this.state.listClinic}
                        name="selectedClinic"
                        
                        />
                    </div>
                </div>
                <div className='manage-doctor-editor'>
                <MdEditor 
                style={{ height: '300px' }} 
                renderHTML={text => mdParser.render(text)} 
                onChange={this.handleEditorChange}
                value={this.state.contentMarkdown}
                />
                </div>
               <button 
               onClick={() => this.handleSaveContentMarkdown()} 
               className={hasOldData === true ? 'save-content-doctor' : 'create-content-doctor'}>
                {hasOldData === true ?
                <span><FormattedMessage id="admin.manage-doctor.save"/></span> : <span><FormattedMessage id="admin.manage-doctor.add"/></span>
                }
               </button>
               
             </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        allDoctors: state.admin.allDoctors,
        language: state.app.language,
        allrequiredDoctorInfor: state.admin.allrequiredDoctorInfor
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctors: () => dispatch(actions.fetchAllDoctors()),
        getAllRequiredDoctorInfor: () => dispatch(actions.getRequiredDoctorInfor()),
        saveDetailDoctor: (data) => dispatch(actions.saveDetailDoctor(data)),   
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
