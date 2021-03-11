import axios from 'axios';

function sendTemplateToAPI(template, callback) {

    axios.post("http://localhost:8081", template, {
        headers: {
          'Content-Type': 'application/json',
        }
      })
        .then((response) => {
            console.log(response);
            callback(response.data.Status, response.data.Message);
        })
        .catch((error) => {
            console.log(error);
            callback('400', 'Check for API Connection!');
        });
}

function sendCommandToAPI(command, callback) {

  let commandElements = command.split(" ").filter(function (el) {
    return el != null && el !== "";
  });
  console.log("Command List "+ commandElements); 
 
  if (commandElements[0] !== "mercury") {
    callback("400", "Command has to start with \"mercury\"");
    return
  } else if (commandElements.length < 4 || commandElements.length > 6) {
    callback("400", "Amount of words does not match requirements");
    return
  } 


  let url = "http://localhost:8081/data/";
  let input;

  if (commandElements[1] === "process") {
    input = {
      "keygroup": commandElements[2],
      "key": commandElements[3],
      "value": commandElements[4]
    }
    if (commandElements.length === 6) {
      input.handler = commandElements[5];
    }

  } else if (commandElements[1] === "get") {
    if (commandElements.length !== 4) {
      callback("400", "Length of get command doesn't match requirements (expected: 4, received " + commandElements.length + ")");
      return
    } 
    url += commandElements[2] + "/" + commandElements[3];
    
  } else {
    callback("400", "Command " + commandElements[1] + " is not found");
    return
  }
  
  if (commandElements[1] === "process") {
    console.log("Post to url " + url);
    console.log("Send input " + input.toString());
    axios.post(url, input)
    .then((response) => {
      console.log(response);
      callback(response.data.Status, response.data.Message);
      return
    })
    .catch((err) => {
      console.log(err);
      callback('400', 'Check for API Connection!');
      return
    })
  } else {
    axios.get(url)
    .then((response) => {
      console.log(response);
      callback(response.data.Status, response.data.Message);
      return
    })
    .catch((err) => {
      console.log(err);
      callback('400', 'Check for API Connection and typos!');
      return
    })
  }


}

export { sendTemplateToAPI, sendCommandToAPI };
