CREATE TABLE IF NOT EXISTS groups (
  id UUID NOT NULL PRIMARY KEY,
  number BIGSERIAL NOT NULL,
  active BOOLEAN NOT NULL,
  created_on TIMESTAMP NOT NULL,
  updated_on TIMESTAMP NOT NULL,
  group_id VARCHAR(100) NOT NULL UNIQUE,
  name VARCHAR(150) NOT NULL,
  problem_category UUID FOREIGN KEY REFERENCES problem_category(id),
  ph_number BIGINT NOT NULL UNIQUE,
  email VARCHAR(150) UNIQUE,
  profile_photo TEXT UNIQUE,
  cover_photo TEXT UNIQUE,
  bio TEXT UNIQUE,
  created_by UUID FOREIGN KEY REFERENCES specials(id),
  updated_by UUID FOREIGN KEY REFERENCES specials(id),
  created_by_ngo UUID FOREIGN KEY REFERENCES ngos(id),
  created_by_ngo UUID FOREIGN KEY REFERENCES ngos(id),
  updated_by_counsaler UUID FOREIGN KEY REFERENCES counsalers(id),
  updated_by_counsaler UUID FOREIGN KEY REFERENCES counsalers(id)
) ;
/*CREATED UPDATED LOGIC FROM SERVER*/