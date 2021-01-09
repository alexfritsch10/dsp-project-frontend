import iot from './EdgeFog.png';
import example from './ExampleSchema.png'
import './App.css';
import UploadForm from './UploadForm';
import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

// function hideUploadForm() {
//   document.getElementById('uploadFormContainer').style.display = ""
// }

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={iot} className="App-logo" alt="logo" />
        <p>
          Welcome to the DSP Frontend!
        </p>
        <div className="tableOfContent">
            <button className="dropbtn"onClick={(e) => {
              e.preventDefault();
              window.location.href='#scollTo';
            }}>
              Upload
            </button>
            <button className="dropbtn" id={"GUI"} onClick={(e) => {
              e.preventDefault();
              window.location.href='http://localhost:63342/dsp-project-frontend/src/ui.html?_ijt=fle0dghui7kt9m5oo13hguvdul';
            }}>
              GUI
            </button>
            <button className="dropbtn">
              CLI
            </button>

          <div className="dropdown-content">
            <img src={example} className="App-example" alt="example-IaC"/>
          </div>
        </div>

        <div class="dropdown">
          <button class="dropbtn"> 
            Here is an example FReD IaC Input
          </button> 

          <div class="dropdown-content"> 
            <img src={example} className="App-example" alt="example-IaC"/>
          </div> 
        </div>
        <br/>
        <br id={"scollTo"}/>

        <UploadForm />

        <div id = "instruction">
          <h3>
            Mercury CLI Instruction
          </h3>
          <p> 
            Clone the repository from this <a href="https://github.com/alexfritsch10/dsp-cli" target="_blank" rel="noreferrer">Github Link</a>.
            <br/>
            Change to the new folder with 'cd dsp-cli'. 
            <br/>
            Execute the command 'pip3 install .', to add the new CLI tool to the library of your existing CLI tools.
            <br/>
            Go to the folder where the JSON file to be uploaded is located.
            <br/> 
            Then run 'mercury deploy $fileName', where the fileName is the name of the JSON file or the file path.
            <br/>
            If the JSON file is correctly formatted, the infrastructure gets immediately deployed on FReD and tinyFaaS.
            </p>
        </div>

      </header>
    </div>
  );
}

export default App;
