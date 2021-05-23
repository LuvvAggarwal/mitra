CREATE TABLE IF NOT EXISTS special_follower_following (
  id UUID NOT NULL PRIMARY KEY,
  number BIGSERIAL NOT NULL,
  active BOOLEAN NOT NULL,
  created_on TIMESTAMP NOT NULL,
  updated_on TIMESTAMP NOT NULL,
  follower UUID FOREIGN KEY REFERENCES specials(id) NOT NULL,
  following UUID FOREIGN KEY REFERENCES specials(id) NOT NULL,
);

CREATE TABLE IF NOT EXISTS ngo_follower_following (
  id UUID NOT NULL PRIMARY KEY,
  number BIGSERIAL NOT NULL,
  active BOOLEAN NOT NULL,
  created_on TIMESTAMP NOT NULL,
  updated_on TIMESTAMP NOT NULL,
  follower UUID FOREIGN KEY REFERENCES specials(id) NOT NULL,
  following UUID FOREIGN KEY REFERENCES ngos(id) NOT NULL,
);

CREATE TABLE IF NOT EXISTS counsaler_follower_following (
  id UUID NOT NULL PRIMARY KEY,
  number BIGSERIAL NOT NULL,
  active BOOLEAN NOT NULL,
  created_on TIMESTAMP NOT NULL,
  updated_on TIMESTAMP NOT NULL,
  follower UUID FOREIGN KEY REFERENCES specials(id) NOT NULL,
  following UUID FOREIGN KEY REFERENCES counsalers(id) NOT NULL,
);