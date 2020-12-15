const express = require('express');
const router = express.Router();
const fs = require('fs');
const PORT = process.env.PORT || 5000;

//rawURL
router.post('/', async (req, res) => {
  try {
    const rawUrl = req.body.url;
    const hostname = req.hostname;
    const shortcode = Math.random().toString(36).substr(2, 6);
    const shortURL = `http://${hostname}:${PORT}/${shortcode}`;

    const urls = { rawUrl, shortURL };
    fs.writeFile('db.json', JSON.stringify(urls), (err) => {
      if (err) throw err;
      console.log('Data written to file');
    });
    fs.readFile('db.json', (err, data) => {
      if (err) throw err;
      let urls = JSON.parse(data);
      res.json(urls.shortURL);
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//shortcode
router.get('/:shortcode', async (req, res) => {
  try {
    fs.readFile('db.json', (err, data) => {
      if (err) throw err;
      let urls = JSON.parse(data);
      res.writeHead(301, {
        Location: urls.rawUrl,
      });
      res.end();
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
