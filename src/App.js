import iot from './EdgeFog.png';
import example from './ExampleSchema.png'
import './App.css';
import UploadForm from './UploadForm';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={iot} className="App-logo" alt="logo" />
        <p>
          Welcome to the DSP Frontend!
        </p>

        <div class="dropdown">
          <button class="dropbtn"> 
            Here is an example FReD IaC Input
          </button> 

          <div class="dropdown-content"> 
            <img src={example} class="App-example" alt="example-IaC"/>
          </div> 
        </div>

        <UploadForm />

        <div>
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
