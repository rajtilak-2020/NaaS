fetch('https://no.krajtilak.in/api/no')
  .then(response => response.json())
  .then(data => console.log('Excuse: ', data.reason))
  .catch(error => console.error('Error:', error));