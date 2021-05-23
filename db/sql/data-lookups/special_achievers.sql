CREATE TABLE IF NOT EXISTS special_achievers (
  id UUID NOT NULL PRIMARY KEY,
  number BIGSERIAL NOT NULL,
  active BOOLEAN NOT NULL,
  created_on TIMESTAMP NOT NULL,
  updated_on TIMESTAMP NOT NULL,
  first_name VARCHAR(100) NOT NULL,
  middle_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  achievement TEXT NOT NULL,
  problem_category UUID FOREIGN KEY REFERENCES problem_category(id) NOT NULL,
);