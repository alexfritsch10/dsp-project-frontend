import React, {Component} from 'react';
import { sendCommandToAPI } from './apiConnection';
import './App.css';

class MercuryInteraction extends Component { 
    constructor(props) {
        super(props);
    
        this.state = {
          command: "",
          apiResponseStatus: "",
          apiResponseMessage: ""
        }
      }
    
      handleInputChanged(event) {
        this.setState({
            command: event.target.value
        });
      }
    
      handleButtonClicked() {
        let command = this.state.command;
        this.setState({ apiResponseMessage: "Processing" });

        sendCommandToAPI(command, (status, message) => {
            this.setState({ apiResponseStatus: status });
            this.setState({ apiResponseMessage: message });
            console.log("Got Status " + status);
            console.log("Got Message " + message);

        }); 
        console.log(command);
      }
    
      render() {
        return  (
          <div>
            <p>
                Here you can interact with the deployed infratructure. <br/>
                At the moment, there are two kinds of commands, that can be excuted.
            </p>
            <ol>
                <li>mercury process <span>{"{keygroupName} {dataKey} {dataValue} {handlerName}"}</span></li>
                <p>
                    With this one, you can insert new keyValue pairs into existing keygroup
                    and pass the handlerName to call a function on the new data item. If you
                    do not pass a handler name, the data is just stored within FReD.
                </p>
                
                <li>mercury get <span>{"{keygroupName} {dataKey}"}</span></li>
                <p>
                    With this one, you can get existing data values for a specific key from a keygroup.
                </p>
               
            </ol>
            <label className="command-label">
                Command:
                <input className="command-line" type="text" value={this.state.command} onChange={this.handleInputChanged.bind(this)}/>
            </label>
            <button className="command-button" type="submit" onClick={this.handleButtonClicked.bind(this)}>
              Execute
            </button>
            {this.state.apiResponseMessage}
          </div>
        );
      }
}

export default MercuryInteraction;

