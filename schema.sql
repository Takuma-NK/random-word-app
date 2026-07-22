CREATE TABLE IF NOT EXISTS words (
  id SERIAL PRIMARY KEY,
  theme VARCHAR(100) NOT NULL,
  word VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO words (theme, word)
VALUES
  ('未来', '空飛ぶ自動車'),
  ('未来', 'タイムマシン'),
  ('未来', '宇宙エレベーター'),
  ('自然', '海'),
  ('自然', '森林'),
  ('自然', '星空');