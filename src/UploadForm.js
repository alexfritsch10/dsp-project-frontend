import React,{Component} from 'react'; 
import { validateJSONSchema } from './validateJSONSchema';
  
class UploadForm extends Component { 
    

    state = { 
      // Initially, no file is selected 
      selectedFile: null,
      schemaValid: null,
      schemaMessage: null
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
        this.setState({ schemaValid: validity.valid });
        this.setState({ schemaMessage: validity.message });
        
      };
      reader.readAsText(this.state.selectedFile);
      
     
      // Request made to the backend api 
      // Send formData object 
      // axios.post("api/uploadfile", formData); 
    }; 

     
    // File content to be displayed after 
    // file upload is complete 
    fileData = () => { 
     
      if (this.state.selectedFile && !this.state.schemaMessage) { 
          
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
      } else if(this.state.schemaMessage) {
        return ( 
          <div> 
            <h2>Schema Details:</h2> 
            <p>Schema Valid: {this.state.schemaValid.toString()}</p> 
            <p>Message: {this.state.schemaMessage}</p>
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
                <input type="file" onChange={this.onFileChange} /> 
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