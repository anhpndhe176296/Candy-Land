const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json({ limit: '50mb' }));
app.use(express.static('public'));
app.use(cors()); // Enable CORS

app.post('/upload', (req, res) => {
  const { data } = req.body;

  if (!data) {
    return res.status(400).json({ success: false, message: 'No data provided' });
  }

  const id = Date.now();
  const filePath = `/uploads/${id}`;

  const uploadsDir = path.join(__dirname, 'public/uploads');
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }

  fs.writeFileSync(path.join(__dirname, `public${filePath}`), Buffer.from(data, 'base64'));

  const url = `http://localhost:8888${filePath}`;

  res.status(201).json({ success: true, url });
});

app.listen(8888, () => {
  console.log('Server is running on http://localhost:8888');
});
