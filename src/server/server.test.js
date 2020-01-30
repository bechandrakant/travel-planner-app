const fetch = require("node-fetch");

// If server is running this test should pass
test ('If server is up and running', () => {
  fetch('http://localhost:8000/')
    .then(res => res.json())
    .then(data => expect(data).not.toBeNull())
})