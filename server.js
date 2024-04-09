const express = require('express');
const cors = require('cors');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const PORT = 3001;

app.use(cors()); // Enable CORS for all routes

app.get('/csvFiles/:filename', async (req, res) => {
  try {
    const filename = req.params.filename;
    const filePath = path.join(__dirname, 'csvFiles', filename);

    // Check if the file exists
    const fileExists = await fs.access(filePath).then(() => true).catch(() => false);

    if (!fileExists) {
      return res.status(404).json({ error: 'File not found' });
    }

    // Read and send the CSV file content
    const csvContent = await fs.readFile(filePath, 'utf-8');
    res.status(200).json({ data: csvContent });
  } catch (error) {
    console.error('Error handling CSV file request:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
