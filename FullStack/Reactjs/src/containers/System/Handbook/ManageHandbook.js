import React, { Component } from 'react';
import { connect } from "react-redux";
import './ManageHandbook.scss';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import { LANGUAGES,  CommonUtils  } from '../../../utils';
import { FormattedMessage } from 'react-intl';
import {CreateNewHandbook} from '../../../services/userservice';
import { toast } from "react-toastify";
const mdParser = new MarkdownIt(/* Markdown-it options */);
class ManageHandbook extends Component {
    constructor(props){
        super(props);
        this.state = {
            name: '',
            imageBase64: '',
            descriptionHTML: '',
            descriptionMarkdown: '',

        }
    }
   async componentDidMount(){
   
   
    
   }
   

   async componentDidUpdate(prevProps, prevStste, snapshot){
        if(this.props.language !== prevProps.language){

        } 
       
}
    handleOnChangeInput = (event, id) => {
        let stateCopy = {...this.state}
        stateCopy[id] = event.target.value;
        this.setState({
            ...stateCopy
        })

    }
    handleEditorChange = ({ html, text }) => {
        this.setState({
            descriptionHTML: html,
            descriptionMarkdown: text,
        })
       
    }
    handleChangeImage = async(event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            let Base64 = await CommonUtils.getBase64(file);
            this.setState({
                imageBase64: Base64,
              
            })
        }

    }

    handleSaveNewHandbook = async () => {
        let res = await CreateNewHandbook(this.state);
        if(res && res.errcode === 0){
            toast.success("Add new specialty succeed!");
            this.setState({
                name: '',
                imageBase64: '',
                descriptionHTML: '',
                descriptionMarkdown: '',
    
            })
        }else{
            toast.error("Add new specialty error!");
            console.log('check res: ', res)
        }
    }

 
    
    render(){
     
        return (
            <div className="manage-handbook-container">
            <div className="ms-title">Quản lý cẩm nang</div>

            <div className="add-new-handbook row">
                <div className="col-6 form-group">
                    <label>Tên cẩm nang</label>
                    <input className="form-control" type="text" value={this.state.name}
                    onChange={(event) => this.handleOnChangeInput(event, 'name')}
                    />
                </div>
                <div className="col-6 form-group">
                    <label>Ảnh cẩm nang</label>
                    <input className="form-control-file" type="file" 
                           onChange={(event) => this.handleChangeImage(event)} 
                    />
                </div>
                <div className="col-12">
                    <MdEditor 
                    style={{ height: '300px' }} 
                    renderHTML={text => mdParser.render(text)} 
                    onChange={this.handleEditorChange}
                    value={this.state.descriptionMarkdown}
            />
                </div>

                <div className="col-12">
                    <button className="btn-save-handbook"
                            onClick={() => this.handleSaveNewHandbook()}>Save</button>
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageHandbook);
