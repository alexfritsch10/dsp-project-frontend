import iot from './EdgeFog.png';
import example from './ExampleSchema.png'
import './App.css';
import UploadForm from './UploadForm';
import CliInstruction from './CliInstruction';
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
          Welcome to the DSP!
        </p>
        <div className="tableOfContent">
            <button className="dropbtn" onClick= {() => {
              if(document.getElementById('UploadForm').style.display === 'none') {
                document.getElementById('UploadForm').style.display = 'block';
              } else {
                document.getElementById('UploadForm').style.display = 'none';
              }
              if(document.getElementById('CliInstruction').style.display === 'block') {
                document.getElementById('CliInstruction').style.display = 'none';
              }
              
            }}>
              Upload
            </button>
            <button className="dropbtn" id={"GUI"} onClick={(e) => {
              e.preventDefault();
              window.location.href='http://localhost:63342/dsp-project-frontend/src/ui.html?_ijt=fle0dghui7kt9m5oo13hguvdul';
            }}>
              GUI
            </button>
            <button className="dropbtn" onClick= {() => {
              if(document.getElementById('CliInstruction').style.display === 'none') {
                document.getElementById('CliInstruction').style.display = 'block';
              } else {
                document.getElementById('CliInstruction').style.display = 'none';
              }
              if(document.getElementById('UploadForm').style.display === 'block') {
                document.getElementById('UploadForm').style.display = 'none';
              }
              
            }}>
              CLI
            </button>
        </div>

        <div class="dropdown">
          <button class="dropbtn"> 
            Here is an example FReD IaC Input
          </button> 

          <div class="dropdown-content"> 
            <img src={example} className="App-example" alt="example-IaC"/>
          </div> 
        </div>

        <div id={"UploadForm"} style={{display: 'none'}}>
          <UploadForm />
        </div>   
          
        <div id={"CliInstruction"} style={{display: 'none'}}>
          <CliInstruction />
        </div>    
        

      </header>
    </div>
  );
}


export default App;
