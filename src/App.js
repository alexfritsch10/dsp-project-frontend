import iot from './EdgeFog.png';
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

        <UploadForm />

      </header>
    </div>
  );
}

export default App;
