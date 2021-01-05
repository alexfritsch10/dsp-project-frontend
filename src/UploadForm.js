import React,{Component} from 'react'; 
import { validateJSONSchema } from './validateJSONSchema';
import axios from 'axios';
import { Checkmark } from 'react-checkmark';
  
class UploadForm extends Component { 
    

    state = { 
      // Initially, no file is selected 
      selectedFile: null,
      schemaValid: null,
      schemaMessage: null,
      JSONFile: null,
      apiResponseMessage: null,
      apiCallCounter: 0
    }; 
     
    // On file select (from the pop up) 
    onFileChange = event => { 
     
      // Update the state 
      this.setState({ selectedFile: event.target.files[0] }); 
     
    }; 
     
    // On file upload (click the upload button) 
    onFileUpload = () => { 
      
      const reader = new FileReader();
      reader.onload = async (file) => { 
        const text = (file.target.result);
        const validity = validateJSONSchema(text);
        console.log(validity.valid);
        console.log(validity.message);
        this.setState({ JSONFile: text});
        this.setState({ schemaValid: validity.valid });
        this.setState({ schemaMessage: validity.message });
        
        
      };
      reader.readAsText(this.state.selectedFile);
    }; 

    componentDidUpdate() {
      if(this.state.apiCallCounter < 1 && this.state.schemaValid && this.state.schemaValid.toString() === 'true' && !this.state.apiResponseStatus && !this.state.apiResponseMessage) {
        this.setState({ apiCallCounter: 1 });
        
        console.log('API is going to be called');
        axios.post("http://localhost:80", this.state.JSONFile, {
          headers: {
            'Content-Type': 'application/json',
          }
        })
          .then((response) => {
              console.log(response);
              this.setState({ apiResponseStatus: response.data.Status});
              console.log(this.state.apiResponseStatus);
              console.log(typeof this.state.apiResponseStatus);
              this.setState({ apiResponseMessage: response.data.Message});
          })
          .catch((error) => {
              if (error.response) {
                  console.log(error.response.data);
                  console.log(error.response.status);
                  console.log(error.response.headers);
              } else if (error.request) {
                  console.log(error.request);
              } else {
                  console.log('Error', error.message);
              }
              console.log(error.config);
              this.setState({ apiResponseStatus: '400'});
              this.setState({ apiResponseMessage: 'Deployment was unsuccessful!'});
          });
        
      }
    }

     
    // File content to be displayed after 
    // file upload is complete 
    fileData = () => { 
     
      if (this.state.selectedFile && !this.state.schemaMessage && !this.state.apiResponseMessage) { 
          
        return ( 
          <div> 
            <h2>File Details:</h2> 
            <p>File Name: {this.state.selectedFile.name}</p> 
            <p>File Type: {this.state.selectedFile.type}</p> 
            <p> 
              Last Modified:{" "} 
              {this.state.selectedFile.lastModifiedDate.toDateString()} 
            </p> 
          </div> 
        ); 
      } else if(this.state.schemaMessage && this.state.schemaValid.toString() === 'false' && !this.state.apiResponseMessage) {
        return ( 
          <div> 
            <h2>Schema Details:</h2> 
            <p>Schema Valid: {this.state.schemaValid.toString()}</p> 
            <p>Message: {this.state.schemaMessage}</p>
          </div> 
        ); 
      } else if(this.state.apiResponseMessage) {
        if(this.state.apiResponseStatus === '200') {
          return ( 
            <div> 
              <h2>Schema Deployment Status</h2> 
              <p>{this.state.apiResponseMessage}</p>
              <Checkmark size='large' color='green'/>
            </div> 
          ); 
        } else {
          return ( 
            <div> 
              <h2>Schema Deployment Status</h2> 
              <p>{this.state.apiResponseMessage}</p>
            </div> 
          ); 
        }
        
      }
    }; 
     
    render() { 
      if(!this.state.apiResponseMessage) {
        return ( 
          <div> 
              <h3> 
                Upload JSON File to deploy Fog infrastructure! 
              </h3> 
              <div> 
                  <input type="file" onChange={this.onFileChange} /> 
                  <button onClick={this.onFileUpload}> 
                    Upload! 
                  </button> 
              </div> 
            {this.fileData()} 
          </div> 
        ); 
      } else {
        return( 
          <div>
            {this.fileData()}
          </div>
        );

      }
    } 
  } 
  
  export default UploadForm; 