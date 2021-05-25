CREATE TABLE IF NOT EXISTS group_member_map (
  id UUID DEFAULT uuid_generate_v4() NOT NULL PRIMARY KEY,
  number BIGSERIAL NOT NULL,
  active BOOLEAN NOT NULL,/*active false if user just requested*/
  created_on TIMESTAMP DEFAULT NOW() NOT NULL,
  updated_on TIMESTAMP DEFAULT NOW() NOT NULL,
  group_id UUID REFERENCES groups(id) NOT NULL,
  user_id UUID REFERENCES users(id) NOT NULL,
  is_admin BOOLEAN NOT NULL
  /*special_id UUID REFERENCES specials(id),
   ngo_id UUID REFERENCES ngos(id),
   counsaler_id UUID REFERENCES counsalers(id)*/
);
/*
 CREATE TABLE IF NOT EXISTS group_ngo_member_map (
 id UUID DEFAULT uuid_generate_v4() NOT NULL PRIMARY KEY, number BIGSERIAL NOT NULL,
 active BOOLEAN NOT NULL,
 created_on TIMESTAMP DEFAULT NOW() NOT NULL, updated_on TIMESTAMP DEFAULT NOW()  NOT NULL,
 group UUID REFERENCES groups(id) NOT NULL,
 ngo UUID REFERENCES ngos(id) NOT NULL
 ) ;
 
 CREATE TABLE IF NOT EXISTS group_counsalers_member_map (
 id UUID DEFAULT uuid_generate_v4() NOT NULL PRIMARY KEY, number BIGSERIAL NOT NULL,
 active BOOLEAN NOT NULL,
 created_on TIMESTAMP DEFAULT NOW() NOT NULL, updated_on TIMESTAMP DEFAULT NOW()  NOT NULL,
 group UUID REFERENCES groups(id) NOT NULL,
 counsaler UUID REFERENCES counsalers(id) NOT NULL
 ) ;*/