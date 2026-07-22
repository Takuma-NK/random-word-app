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


app.post('/api/words', async (req, res) => {
  try {
    const { theme, word } = req.body;

    if (!theme || !word) {
      return res.status(400).json({
        error: 'themeとwordは必須です'
      });
    }

    const result = await pool.query(
      `INSERT INTO words (theme, word)
       VALUES ($1, $2)
       RETURNING id, theme, word, created_at`,
      [theme, word]
    );

    console.log('追加したデータ:', result.rows[0]);

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: '単語の追加に失敗しました'
    });
  }
  
});

// 単語一覧取得API
app.get('/api/words', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT id, theme, word, created_at FROM words ORDER BY id'
    );

    res.json(result.rows);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: '単語一覧の取得に失敗しました'
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:3000`);
});