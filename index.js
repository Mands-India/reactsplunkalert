
let https;
if (typeof window === 'undefined') {
  // In Node.js environment
  https = require('https');
} else {
  // In browser environment
  https = require('https-browserify');
}
async function reactSplunkLog(splunkHost, splunkToken, splunkIndex, errorMessage){
    
        const eventData = {
            event: {
                "message": errorMessage,
                "index": splunkIndex 
            }
        };
        
        const options = {
            hostname: splunkHost,
            port: '8088',
            path: '/services/collector',
            method: 'POST',
            headers: {
                'Authorization': `Splunk ${splunkToken}`,
                'Content-Type': 'application/json',
            },
            agent: new https.Agent({
                rejectUnauthorized: false
            })
        };
    
        try {
            const responseBody = await new Promise((resolve, reject) => {
                const req = https.request(options, (res) => {
                    let responseBody = '';
                    res.on('data', (d) => {
                        responseBody += d.toString();
                    });
                    res.on('end', () => {
                        const responseObj = {
                            text: JSON.parse(responseBody).text,
                            statusCode: res.statusCode
                        };
                        resolve(responseObj);
                    });
                });
                req.on('error', (error) => {
                    reject(error);
                });
                req.write(JSON.stringify(eventData));
                req.end();
            });
            
            return responseBody;
        } catch (error) {
            console.error('Final Error:', error);
            return error;
        }
    }
    
    module.exports = reactSplunkLog
    
    // Configuration for Splunk HEC
    // const splunkToken = '49ab878e-f598-40a2-a3cb-c6db21c867a5'; // Replace with your actual Splunk HEC token
    // const splunkHost = 'prd-p-0h1oa.splunkcloud.com'; // Replace with your actual Splunk host address
    // const splunkIndex = 'testsplunkmessage'; // Replace with your Splunk index name
    // const errorMessage = "This is my log data for check and test";
    
    // reactSplunkLog(splunkHost, splunkToken, splunkIndex, errorMessage)
    //     .then(response => {
    //         console.log(response);
    //     })
    //     .catch(error => {
    //         console.error('Error:', error);
    // });
    