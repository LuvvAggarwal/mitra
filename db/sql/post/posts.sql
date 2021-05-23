/*USER POST AND GROUP POST IN SAME TABLE*/
CREATE TABLE IF NOT EXISTS posts (
  id UUID NOT NULL PRIMARY KEY,
  number BIGSERIAL NOT NULL,
  active BOOLEAN NOT NULL,
  created_on TIMESTAMP NOT NULL,
  updated_on TIMESTAMP NOT NULL,
  type POST_TYPE NOT NULL,
  title VARCHAR(200) NOT NULL,
  description TEXT NOT NULL,
  keyword TEXT,
  visibility VISIBLITY NOT NULL,
  group_id UUID REFERENCES groups(id),
  special_id UUID REFERENCES specials(id),
  counsaler_id UUID REFERENCES counsalers(id),
  approved BOOLEAN
) ;

CREATE DOMAIN POST_TYPE VARCHAR(10)
     CHECK (VALUE IN ('text', 'multi-media', 'document'));