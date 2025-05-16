// server.js
const express = require('express');
const app     = express();
const port    = 3000;

app.use(express.static('public'));

app.get('/vuln', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
      <head><meta charset="utf-8" /><title>Vuln Page</title></head>
      <body>
        <h1>Welcome!</h1>
        <script>
          alert('Hacked!');
          fetch('/log');
        </script>
      </body>
    </html>
  `);
});
app.set('trust proxy', true);

app.get('/log', (req, res) => {
  // Grab the “real” client IP:
  const ip = req.headers['x-forwarded-for'] 
           || req.socket.remoteAddress;

  console.log(`⚠️  Logged IP: ${ip}`);
  res.sendStatus(204);
});

app.listen(port, '0.0.0.0', () => {
    console.log(`Listening on all interfaces at http://0.0.0.0:${port}`);
  });
  
