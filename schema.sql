CREATE TABLE IF NOT EXISTS quotes (
  id INTEGER PRIMARY KEY,
  quote VARCHAR(256),
  author VARCHAR(64),
  year VARCHAR(64),
  addedBy VARCHAR(64),
  dailyUsed BOOLEAN
);
