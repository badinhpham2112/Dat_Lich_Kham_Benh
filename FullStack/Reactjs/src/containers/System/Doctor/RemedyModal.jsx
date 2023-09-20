import React, { Component } from 'react';
import { connect } from "react-redux";
import './RemedyModal.scss';
import {button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { toast } from "react-toastify";
import moment from 'moment';
import { every } from 'lodash';
import { CommonUtils } from '../../../utils';
class RemedyModal extends Component {
    constructor(props){
        super(props);
        this.state = {
            email: '',
            imgBase64: '',
            
        }
    }
   async componentDidMount(){
    if(this.props.dataModal){
        this.setState({
            email: this.props.dataModal.email
        })
    }
    
   }
   async componentDidUpdate(prevProps, prevStste, snapshot){
    if(prevProps.dataModal !== this.props.dataModal){
        this.setState({
            email: this.props.dataModal.email
        })
    }
   }
   handleOnchangeEmail = (event) => {
    this.setState({
        email: event.target.value
    })
   }

   handleOnChangeImage = async(event) => {
    let data = event.target.files;
    let file = data[0];
    if (file) {
        let Base64 = await CommonUtils.getBase64(file);
        this.setState({
            imgBase64: Base64
        })
    }

}

    handleSendRemedy = () =>{
        this.props.sendRemedy(this.state)
    }   
 
    
    render(){
        let { isOpenModal, closeRemedyModal, dataModal,  sendRemedy } = this.props;
       
       
        // console.log("check dataTime: ", dataTime)
        return (
            <div>
               <Modal isOpen={isOpenModal} 
               className={'booking-Modal-container'} 
               size='md' 
               centered
            //    backdrop={true}
               >
                <div className="modal-header">
                    <h5 className="modal-title">Gữi hóa đơn khám bệnh thành công</h5>
                    <button type="button" className="close" aria-label="Close" onClick={closeRemedyModal}>
                        <span aria-hidden="true">×</span>
                    </button></div>
                <ModalBody>
                    <div className='row'>
                        <div className='col-6 form-group'>
                            
                                <label htmlFor="">Email bệnh nhân</label>
                                <input className='form-control' type="email" value={this.state.email} 
                                onChange={(event) => this.handleOnchangeEmail(event)}/>
                           
                        </div>
                        <div className='col-6 form-group'>
                            
                                <label htmlFor="">Chọn file hóa đơn</label>
                                <input className='form-control-file' type="file" 
                                onChange={(event) => this.handleOnChangeImage(event)}/>
                           
                        </div>
                    </div>

                </ModalBody>
                <ModalFooter>
                    <button color='primary' onClick={() => this.handleSendRemedy()}>send</button>
                    <button color='secondary' onClick={closeRemedyModal}>Cancel</button>
                </ModalFooter>
                
               </Modal>
             
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

export default connect(mapStateToProps, mapDispatchToProps)(RemedyModal);
