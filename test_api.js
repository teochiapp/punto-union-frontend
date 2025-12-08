const axios = require('axios');
const fs = require('fs');

const API_URL = 'http://localhost:1337/api';

async function test() {
  const output = [];
  
  try {
    output.push('Fetching products...');
    const url = `${API_URL}/productos?filters[categorias][id][$eq]=34&populate=*`;
    output.push(`URL: ${url}`);
    
    // Test connection first
    try {
        const res = await axios.get(url);
        output.push(`Response status: ${res.status}`);
        
        const data = res.data;
        output.push(`Type of res.data: ${typeof data}`);
        
        if (data) {
             output.push(`res.data keys if object: ${Object.keys(data || {}).join(', ')}`);
             
             if (data.data) {
                 output.push(`data.data length: ${data.data.length}`);
                 if (data.data.length > 0) {
                     const firstItem = data.data[0];
                     // Safely stringify
                     output.push(`First item structure: ${JSON.stringify(firstItem, null, 2)}`);
                 }
             } else {
                 output.push('data.data is missing');
                 output.push(`Full data: ${JSON.stringify(data, null, 2)}`);
             }
        } else {
             output.push('res.data is null/undefined');
        }
    } catch (innerErr) {
        output.push(`Request failed: ${innerErr.message}`);
        if (innerErr.response) {
            output.push(`Status: ${innerErr.response.status}`);
            try {
                output.push(`Data: ${JSON.stringify(innerErr.response.data)}`);
            } catch (e) {
                output.push('Could not stringify response data');
            }
        }
        output.push(innerErr.stack);
    }
  } catch (err) {
    output.push(`Fatal Error: ${err.message}`);
    output.push(err.stack);
  }

  try {
    fs.writeFileSync('test_output.txt', output.join('\n'));
  } catch (e) {
      console.error('Could not write file');
  }
}

test();
