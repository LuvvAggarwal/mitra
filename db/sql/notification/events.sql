CREATE TABLE IF NOT EXISTS events (
  id UUID NOT NULL PRIMARY KEY,
  number BIGSERIAL NOT NULL,
  active BOOLEAN NOT NULL,
  created_on TIMESTAMP NOT NULL,
  updated_on TIMESTAMP NOT NULL,
  name VARCHAR(150) NOT NULL,
  message TEXT NOT NULL
) ;