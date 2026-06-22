const express = require('express');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static('public'));

// テーマ一覧取得API
app.get('/api/themes', (req, res) => {
  const themes = [
    { id: 1, name: '未来', description: 'SFや近未来に関するテーマ' },
    { id: 2, name: '自然', description: '自然や環境に関するテーマ' },
    { id: 3, name: 'ホラー', description: '恐怖や不気味さに関するテーマ' }
  ];

  res.json(themes);
});

// 単語生成API
app.post('/api/generate', (req, res) => {
  const { theme, count } = req.body;

  const newRequest = { theme, count };

  console.log('受け取ったデータ:', newRequest);

  res.json(newRequest);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:3000`);
});