CREATE TABLE IF NOT EXISTS special_follower_following (
  id UUID NOT NULL PRIMARY KEY,
  number BIGSERIAL NOT NULL,
  active BOOLEAN NOT NULL,
  created_on TIMESTAMP NOT NULL,
  updated_on TIMESTAMP NOT NULL,
  type FOLLOW_TYPE NOT NULL,
  follower UUID REFERENCES specials(id) NOT NULL,
  following_special UUID REFERENCES specials(id),
  following_ngo UUID REFERENCES ngos(id),
  following_counsaler UUID REFERENCES counsalers(id)
);


CREATE DOMAIN FOLLOW_TYPE VARCHAR(10)
     CHECK (VALUE IN ('ngo', 'special', 'counsaler'));

/*
CREATE TABLE IF NOT EXISTS ngo_follower_following (
  id UUID NOT NULL PRIMARY KEY,
  number BIGSERIAL NOT NULL,
  active BOOLEAN NOT NULL,
  created_on TIMESTAMP NOT NULL,
  updated_on TIMESTAMP NOT NULL,
  follower UUID REFERENCES specials(id) NOT NULL,
  following UUID REFERENCES ngos(id) NOT NULL,
);

CREATE TABLE IF NOT EXISTS counsaler_follower_following (
  id UUID NOT NULL PRIMARY KEY,
  number BIGSERIAL NOT NULL,
  active BOOLEAN NOT NULL,
  created_on TIMESTAMP NOT NULL,
  updated_on TIMESTAMP NOT NULL,
  follower UUID REFERENCES specials(id) NOT NULL,
  following UUID REFERENCES counsalers(id) NOT NULL,
);*/