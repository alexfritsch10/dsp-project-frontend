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

export default sendTemplateToAPI;
