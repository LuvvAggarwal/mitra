CREATE TABLE IF NOT EXISTS group_member_map (
  id UUID NOT NULL PRIMARY KEY,
  number BIGSERIAL NOT NULL,
  active BOOLEAN NOT NULL,
  created_on TIMESTAMP NOT NULL,
  updated_on TIMESTAMP NOT NULL,
  group_id UUID REFERENCES groups(id) NOT NULL,
  special_id UUID REFERENCES specials(id),
  ngo_id UUID REFERENCES ngos(id),
  counsaler_id UUID REFERENCES counsalers(id)
);
/*
 CREATE TABLE IF NOT EXISTS group_ngo_member_map (
 id UUID NOT NULL PRIMARY KEY,
 number BIGSERIAL NOT NULL,
 active BOOLEAN NOT NULL,
 created_on TIMESTAMP NOT NULL,
 updated_on TIMESTAMP NOT NULL,
 group UUID REFERENCES groups(id) NOT NULL,
 ngo UUID REFERENCES ngos(id) NOT NULL
 ) ;
 
 CREATE TABLE IF NOT EXISTS group_counsalers_member_map (
 id UUID NOT NULL PRIMARY KEY,
 number BIGSERIAL NOT NULL,
 active BOOLEAN NOT NULL,
 created_on TIMESTAMP NOT NULL,
 updated_on TIMESTAMP NOT NULL,
 group UUID REFERENCES groups(id) NOT NULL,
 counsaler UUID REFERENCES counsalers(id) NOT NULL
 ) ;*/