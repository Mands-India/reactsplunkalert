To install the package, run:
npm install react-splunk-log

To use the package :
const reactSplunkLog = require('react-splunk-log');

Configure Splunk HEC:
Before using the function, you need to configure your Splunk HEC settings:
splunkToken: Your Splunk HEC token.
splunkHost: Your Splunk host address.
splunkIndex: The Splunk index where you want to log the events.


Use the reactSplunkLog function to log an event:
const splunkToken = 'your-splunk-token'; // Replace with your actual Splunk HEC token
const splunkHost = 'your-splunk-host'; // Replace with your actual Splunk host address
const splunkIndex = 'your-splunk-index'; // Replace with your Splunk index name
const errorMessage = "This is a log message for testing";

reactSplunkLog(splunkHost, splunkToken, splunkIndex, errorMessage)
    .then(response => {
        console.log(response);
    })
    .catch(error => {
        console.error('Error:', error);
    });
