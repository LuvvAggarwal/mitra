CREATE TABLE IF NOT EXISTS addresses (
  id UUID DEFAULT uuid_generate_v4() NOT NULL PRIMARY KEY,
  number BIGSERIAL NOT NULL,
  active BOOLEAN NOT NULL,
  created_on TIMESTAMP DEFAULT NOW() NOT NULL,
  updated_on TIMESTAMP DEFAULT NOW()  NOT NULL,
  street varchar(150) NOT NULL,
  pin_code INT,
  city UUID REFERENCES cities(id) NOT NULL
);