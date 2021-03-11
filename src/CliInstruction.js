import React, {Component} from 'react';

class CliInstruction extends Component { 

    render() {
        return(
            <div>
                <h3>
                    Mercury CLI Instruction
                </h3>
                <p> 
                    Clone the repository from this <a href="https://github.com/alexfritsch10/dsp-cli" target="_blank" rel="noreferrer">Github Link</a>.
                    Change to the new folder with 'cd dsp-cli'. 
                    Execute the command 'pip3 install .', to add the new CLI tool to the library of your existing CLI tools.<br/>
                    Go to the folder where the JSON file to be uploaded is located.
                    Then run 'mercury deploy $fileName', where the fileName is the name of the JSON file or the file path.
                    If the JSON file is correctly formatted, the infrastructure gets immediately deployed on FReD and tinyFaaS.
                    Look at the Interaction Section to see all other supported commands
                    
                </p>
            </div>
          );

    }
}

export default CliInstruction;

