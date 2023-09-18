const express = require('express');
const bodyParser = require('body-parser');
const { exec } = require('child_process');

const app = express();
const port = 3006;

// Middleware to parse JSON request bodies
app.use(bodyParser.json());



async function execute(number, message) {
    return new Promise((resolve, reject) => {
        const command = `sh /home/garrett/Public/sms/sms.sh ${number} "${message}"`;
        // Execute the command
        exec(command, (error, stdout, stderr) => {
            if (error) {
                console.error(`Error: ${error.message}`);
                reject();
            }
            
            if (stderr) {
                console.error(`Stderr: ${stderr}`);
                reject();
            }
            
            console.log(`Command output:\n${stdout}`);
            resolve();
        });
    });
}


// POST endpoint to accept JSON data
app.post('/', (req, res) => {
    const requestData = req.body;
    const {number, message} = requestData;
    // console.log(message.replace(" ", "\\ "))

    // await execute(number, message);
    queue.push(async () => {
        try {

            console.log('Task 1 started');
            await execute(number, message.replace(/ /g, '\\ '));
            res.json({ message: 'Received JSON data:', data: requestData });
            await new Promise((resolve, reject) => {setTimeout(resolve, 500)});
            console.log('Task 1 finished');
        } catch (error) {
            res.json({ message: 'ERROR', data: requestData });
            console.error(error);
        }
    });

});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});




class PromiseQueue {
    constructor() {
      this.queue = [];
      this.isProcessing = false;
    }
  
    async push(promiseFunction) {
      this.queue.push(promiseFunction);
      if (!this.isProcessing) {
        await this.processQueue();
      }
    }
  
    async processQueue() {
      if (this.queue.length === 0) {
        this.isProcessing = false;
        return;
      }
  
      this.isProcessing = true;
      const nextPromiseFunction = this.queue.shift();
      
      try {
        await nextPromiseFunction();
      } catch (error) {
        console.error('An error occurred:', error);
      }
  
      await this.processQueue();
    }
  }
  
  // Example usage:
  const queue = new PromiseQueue();
  
  

