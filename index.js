const express = require('express');
const bodyParser = require('body-parser');
const { exec } = require('child_process');

const app = express();
const port = 3000;

// Middleware to parse JSON request bodies
app.use(bodyParser.json());

// POST endpoint to accept JSON data
app.post('/', (req, res) => {
  const requestData = req.body;
  const {number, message} = requestData;
  console.log(message.replace(" ", "\\ "))

  const command = `sh /home/garrett/sms/sms.sh ${number} "${message.replace(" ", "\\ ")}"`;
// Execute the command
exec(command, (error, stdout, stderr) => {
  if (error) {
    console.error(`Error: ${error.message}`);
    return;
  }

  if (stderr) {
    console.error(`Stderr: ${stderr}`);
    return;
  }

  console.log(`Command output:\n${stdout}`);
});
  res.json({ message: 'Received JSON data:', data: requestData });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
