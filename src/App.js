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

        <p>
          Here is an example FReD IaC Input
        </p>
        <img src={example} className="App-example" alt="example IaC Template" />

        <UploadForm />

      </header>
    </div>
  );
}

export default App;
