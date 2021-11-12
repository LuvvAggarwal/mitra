CREATE TABLE IF NOT EXISTS users (
  id UUID DEFAULT uuid_generate_v4() NOT NULL PRIMARY KEY,
  number BIGSERIAL NOT NULL,
  active BOOLEAN NOT NULL,
  created_on TIMESTAMP DEFAULT NOW() NOT NULL,
  updated_on TIMESTAMP DEFAULT NOW() NOT NULL,
  user_id VARCHAR(100) NOT NULL UNIQUE,
  type USER_TYPE NOT NULL,
  first_name VARCHAR(100) DEFAULT '',
  middle_name VARCHAR(100) DEFAULT '',
  last_name VARCHAR(100) DEFAULT '',
  name VARCHAR(250) DEFAULT '',
  occupation VARCHAR(100) DEFAULT '',
  experience INT DEFAULT '0',
  problem_category UUID REFERENCES problem_category(id) NOT NULL,
  registration_code VARCHAR(100),
  help_type UUID REFERENCES help_type(id),
  ph_number BIGINT NOT NULL UNIQUE,
  email VARCHAR(150) UNIQUE,
  profile_photo TEXT UNIQUE,
  cover_photo TEXT UNIQUE,
  bio TEXT UNIQUE,
  address UUID REFERENCES addresses(id) NOT NULL,
  last_login TIMESTAMP,
  /**AUTHENTICATION**/
  access_token TEXT NOT NULL UNIQUE,
  /**AUTHENTICATION**/
  visibility VISIBLITY NOT NULL DEFAULT 'public',
  /**SETTINGS**/
  theme THEME NOT NULL DEFAULT 'light',
  /**SETTINGS**/
  notification NOTIFICATION NOT NULL DEFAULT 'standard'
  /**SETTINGS**/
);
CREATE DOMAIN USER_TYPE VARCHAR(10) CHECK (VALUE IN ('user', 'ngo', 'counsaler'));
CREATE DOMAIN VISIBLITY VARCHAR(10)
     CHECK (VALUE IN ('public', 'friends', 'private'));

CREATE DOMAIN THEME VARCHAR(10)
     CHECK (VALUE IN ('light', 'dark'));

CREATE DOMAIN NOTIFICATION VARCHAR(20)
     CHECK (VALUE IN ('important', 'standard', 'no notification'));