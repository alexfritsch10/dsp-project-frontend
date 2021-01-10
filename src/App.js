import iot from './EdgeFog.png';
import example from './ExampleSchema.png'
import './App.css';
import UploadForm from './UploadForm';
import CliInstruction from './CliInstruction';
import React from 'react';

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
          <button class="dropbtn" onClick= {() => {
              if(document.getElementById('ExIaC').style.display === 'none') {
                document.getElementById('ExIaC').style.display = 'block';
              } else {
                document.getElementById('ExIaC').style.display = 'none';
              }
          }}> 
            Here is an example FReD IaC Input
          </button> 

          <div id={"ExIaC"} class="dropdown-content" style={{display: 'none'}}> 
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
