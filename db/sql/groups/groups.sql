CREATE TABLE IF NOT EXISTS groups (
  id UUID DEFAULT uuid_generate_v4() NOT NULL PRIMARY KEY,
  number BIGSERIAL NOT NULL,
  active BOOLEAN NOT NULL,
  created_on TIMESTAMP DEFAULT NOW() NOT NULL,
  updated_on TIMESTAMP DEFAULT NOW() NOT NULL,
  group_id VARCHAR(100) NOT NULL UNIQUE,
  name VARCHAR(150) NOT NULL,
  problem_category UUID REFERENCES problem_category(id) NOT NULL,
  ph_number BIGINT NOT NULL UNIQUE,
  email VARCHAR(150) UNIQUE,
  profile_photo TEXT,
  cover_photo TEXT,
  bio TEXT UNIQUE,
  created_by UUID REFERENCES users(id) NOT NULL,
  updated_by UUID REFERENCES users(id) NOT NULL
  /* created_by UUID REFERENCES specials(id),
   updated_by UUID REFERENCES specials(id),
   created_by_ngo UUID REFERENCES ngos(id),
   updated_by_ngo UUID REFERENCES ngos(id),
   created_by_counsaler UUID REFERENCES counsalers(id),
   updated_by_counsaler UUID REFERENCES counsalers(id)*/
);
/*CREATED UPDATED LOGIC FROM SERVER*/