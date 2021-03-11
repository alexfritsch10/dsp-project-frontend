import React,{Component} from 'react';
import { Checkmark } from 'react-checkmark';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import { sendTemplateToAPI } from './apiConnection';

class UploadForm extends Component {

    state = {
        // Initially, no file is selected
        selectedFile: null,
        apiResponseStatus: null,
        apiResponseMessage: null,
        noFileSelectedError: null
    };

    // On file select (from the pop up)
    onFileChange = event => {
        this.setState({ selectedFile: event.target.files[0] });
        this.setState({ noFileSelectedError: null });
    };

    // On file upload (click the upload button)
    onFileUpload = () => {
        if(!this.state.selectedFile) {
            this.setState({ noFileSelectedError: 'No file is selected!' });
            return
        }
        const reader = new FileReader();
        reader.onload = async (file) => {
            const template = (file.target.result);
            sendTemplateToAPI(template, (status, message) => {
                this.setState({ apiResponseStatus: status });
                this.setState({ apiResponseMessage: message });
            });            
        };
        reader.readAsText(this.state.selectedFile);
    };

    

    // file data to be displayed after file upload is complete
    fileData = () => {

        // schema was validated and could be processed by API 
        if(this.state.apiResponseStatus && this.state.apiResponseStatus === '200') {
            return (
                <div>
                    <h2>Deployment Information:</h2>
                    <p>Status: {this.state.apiResponseStatus}</p>
                    <p>Message: {this.state.apiResponseMessage}</p>
                    <Checkmark size='large' color='green'/>
                </div>
            );
        // schema was either not valid or could not be processed by the API
        } else if(this.state.apiResponseStatus) {
            return (
                <div>
                    <h2>Deployment Information:</h2>
                    <p>Status: {this.state.apiResponseStatus}</p>
                    <p>Message: {this.state.apiResponseMessage}</p>
                    <HighlightOffIcon color='secondary' fontSize='large'/>

                </div>
            );
        } else if(this.state.noFileSelectedError) {
            return (
                <div>
                    <p>Error: {this.state.noFileSelectedError}</p>
                </div>
            );
        }
    };

    render() {
        return (
            <div>
                <h3>
                    Upload JSON File to deploy Fog infrastructure!
                </h3>
                <div>
                    <input type="file" onChange={this.onFileChange}/>
                    <button onClick={this.onFileUpload}>
                        Upload!
                    </button>
                </div>
                {this.fileData()}
            </div>
        );
    }
}
export default UploadForm;