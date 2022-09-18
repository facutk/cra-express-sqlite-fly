CREATE TABLE IF NOT EXISTS users (
  user_id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
  date_created DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  phone TEXT,
  cel TEXT NOT NULL,
  email TEXT NOT NULL,
  address TEXT,
  address_extra TEXT,
  comment TEXT,
  modified_date DATETIME NOT NULL
);

CREATE TABLE IF NOT EXISTS jobs (
  job_id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
  user_id INTEGER NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  status TEXT,
  start_date DATETIME,
  end_date DATETIME,
  amount TEXT,
  FOREIGN KEY (user_id)
  	REFERENCES users (user_id)
);
