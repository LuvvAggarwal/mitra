CREATE TABLE IF NOT EXISTS specials (
  id UUID NOT NULL PRIMARY KEY,
  number BIGSERIAL NOT NULL,
  active BOOLEAN NOT NULL,
  created_on TIMESTAMP NOT NULL,
  updated_on TIMESTAMP NOT NULL,
  user_id VARCHAR(100) NOT NULL UNIQUE,
  first_name VARCHAR(100) NOT NULL,
  middle_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  occupation VARCHAR(100) NOT NULL,
  problem_category UUID FOREIGN KEY REFERENCES problem_category(id) NOT NULL,
  ph_number BIGINT NOT NULL UNIQUE,
  email VARCHAR(150) UNIQUE,
  profile_photo TEXT UNIQUE,
  cover_photo TEXT UNIQUE,
  bio TEXT UNIQUE,
  address UUID FOREIGN KEY REFERENCES address(id) NOT NULL,
  last_login TIMESTAMP, /**AUTHENTICATION**/
  access_token TEXT NOT NULL UNIQUE,/**AUTHENTICATION**/
  visibility VISIBLITY NOT NULL DEFAULT 'public',/**SETTINGS**/
  theme THEME NOT NULL DEFAULT 'light',/**SETTINGS**/
  notification NOTIFICATION NOT NULL DEFAULT 'standard'/**SETTINGS**/
);