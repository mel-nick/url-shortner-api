const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 5000;
const app = express();

// Init Middleware
app.use(
  express.json({
    extended: false,
  })
);

//define routes
app.use('/:shortcode', require('./routes/api/url'));
app.use('/', require('./routes/api/url'));

//serve statisc assets
// app.use(express.static(path.join(__dirname, '/client/build')));

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname + '/client/build/index.html'));
// });

//app listen
app.listen(PORT, (req, res) => {
  console.log(`Server is listening on port: ${PORT}`);
});
