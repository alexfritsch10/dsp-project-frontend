import iot from './images/EdgeFog.png';
import example from './images/ExampleSchema.png'
import './App.css';
import UploadForm from './UploadForm';
import CliInstruction from './CliInstruction';
import React from 'react';
import NodesDragDrop from './NodesDragDrop';

function App() {

  return (
    <div className="App">
      <header className="App-header">
        <img src={iot} className="App-logo" alt="logo" />
        <p>
          Welcome to the FogStore!
        </p>
        <div className="tableOfContent">
            <button className="dropbtn" onClick={() => {
              if(document.getElementById('UploadForm').style.display === 'none') {
                document.getElementById('UploadForm').style.display = 'block';
              } else {
                document.getElementById('UploadForm').style.display = 'none';
              }
              if(document.getElementById('CliInstruction').style.display === 'block') {
                document.getElementById('CliInstruction').style.display = 'none';
              }
              if(document.getElementById('DragAndDrop').style.display === 'block') {
                document.getElementById('DragAndDrop').style.display = 'none';
              }
            }}>
              Upload
            </button>
            <button className="dropbtn" id={"GUI"} onClick={() => {
              if(document.getElementById('DragAndDrop').style.display === 'none') {
                document.getElementById('DragAndDrop').style.display = 'block';
              } else {
                document.getElementById('DragAndDrop').style.display = 'none';
              }
              if(document.getElementById('UploadForm').style.display === 'block') {
                document.getElementById('UploadForm').style.display = 'none';
              }
              if(document.getElementById('CliInstruction').style.display === 'block') {
                document.getElementById('CliInstruction').style.display = 'none';
              }
            }}>
              GUI
            </button>
            <button className="dropbtn" onClick={() => {
              if(document.getElementById('CliInstruction').style.display === 'none') {
                document.getElementById('CliInstruction').style.display = 'block';
              } else {
                document.getElementById('CliInstruction').style.display = 'none';
              }
              if(document.getElementById('UploadForm').style.display === 'block') {
                document.getElementById('UploadForm').style.display = 'none';
              }
              if(document.getElementById('DragAndDrop').style.display === 'block') {
                document.getElementById('DragAndDrop').style.display = 'none';
              }
            }}>
              CLI
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

        <div id={"UploadForm"} style={{display: 'none'}}>
          <UploadForm />
        </div>   
        
        <div id={"DragAndDrop"} style={{display: 'none'}}>
          <NodesDragDrop keyGroupName='Juicer'/>
        </div>   

        <div id={"CliInstruction"} style={{display: 'none'}}>
          <CliInstruction />
        </div>    
        

      </header>
    </div>
  );
}


export default App;
