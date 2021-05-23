CREATE TABLE IF NOT EXISTS problem_category (
  id UUID NOT NULL PRIMARY KEY,
  number BIGSERIAL NOT NULL,
  active BOOLEAN NOT NULL,
  created_on TIMESTAMP NOT NULL,
  updated_on TIMESTAMP NOT NULL,
  name varchar(150) NOT NULL,
  description TEXT NOT NULL
);