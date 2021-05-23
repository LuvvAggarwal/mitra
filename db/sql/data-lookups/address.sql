CREATE TABLE IF NOT EXISTS addresses (
  id UUID NOT NULL PRIMARY KEY,
  number BIGSERIAL NOT NULL,
  active BOOLEAN NOT NULL,
  created_on TIMESTAMP NOT NULL,
  updated_on TIMESTAMP NOT NULL,
  street varchar(150) NOT NULL,
  pin_code INT,
  city UUID REFERENCES cities(id) NOT NULL
);