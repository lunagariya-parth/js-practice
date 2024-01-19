// Write a JavaScript a function that makes an HTTP GET request and returns a Promise that resolves with the response data.

function make_Get_Request(url) {
    return new Promise((resolve, reject) => {
      fetch(url)
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then(data => resolve(data))
        .catch(error => reject(error));
    });
  }
  
  make_Get_Request('https://example.com/data')
    .then(data => {
      console.log('Response data:', data);
    })
    .catch(error => {
      console.log('Error:', error.message);
    });
  