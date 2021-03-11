import iot from './Images/EdgeFog.png';
import example from './Images/ExampleSchema.png'
import './App.css';
import UploadForm from './UploadForm';
import CliInstruction from './CliInstruction';
import GUI from './GUI';
import React from 'react';
import MercuryInteraction from './MercuryInteraction';

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
              if(document.getElementById('GUI').style.display === 'block') {
                document.getElementById('GUI').style.display = 'none';
              }
            }}>
              Upload
            </button>
            <button className="dropbtn" onClick={() => {
              if(document.getElementById('GUI').style.display === 'none') {
                document.getElementById('GUI').style.display = 'block';
              } else {
                document.getElementById('GUI').style.display = 'none';
              }
              if(document.getElementById('CliInstruction').style.display === 'block') {
                document.getElementById('CliInstruction').style.display = 'none';
              }
              if(document.getElementById('UploadForm').style.display === 'block') {
                document.getElementById('UploadForm').style.display = 'none';
              }
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
              if(document.getElementById('GUI').style.display === 'block') {
                document.getElementById('GUI').style.display = 'none';
              }
            }}>
              CLI
            </button>
            <button className="dropbtn" onClick={() => {
              if(document.getElementById('Interaction').style.display === 'none') {
                document.getElementById('Interaction').style.display = 'block';
              } else {
                document.getElementById('Interaction').style.display = 'none';
              }
            }}>
              Interaction
            </button>
        </div>

        <div className="dropdown">
          <button className="dropbtn" onClick= {() => {
              if(document.getElementById('ExIaC').style.display === 'none') {
                document.getElementById('ExIaC').style.display = 'block';
              } else {
                document.getElementById('ExIaC').style.display = 'none';
              }
          }}> 
            Here is an example FReD IaC Input
          </button> 

          <div id={"ExIaC"} className="dropdown-content" style={{display: 'none'}}> 
            <img src={example} className="App-example" alt="example-IaC"/>
          </div> 
        </div>

        <div id={"UploadForm"} style={{display: 'none'}} className="formUpload">
          <UploadForm />
        </div>   

        <div id={"GUI"} className="gui" style={{display: 'none'}}>
          <GUI />
        </div>

        <div id={"CliInstruction"} style={{display: 'none'}} className="cliIn">
          <CliInstruction />
        </div> 
          
        <div id={"Interaction"} style={{display: 'none'}} className="cliIn">
          <MercuryInteraction />
        </div>
        
        
      </header>
    </div>
  );
}


export default App;
