const express = require('express');
const pool = require('./db');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static('public'));

// テーマ一覧取得API
app.get('/api/themes', async (req, res) => {
  const result = await pool.query(
    'SELECT DISTINCT theme FROM words ORDER BY theme'
  );

  res.json(result.rows);
});

// 単語生成API
app.post('/api/generate', async (req, res) => {

  const { theme, count } = req.body;

  console.log({ theme, count });

  const result = await pool.query(
    'SELECT word FROM words WHERE theme = $1 ORDER BY RANDOM() LIMIT $2',
    [theme, count]
  );

  res.json(result.rows);

});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:3000`);
});