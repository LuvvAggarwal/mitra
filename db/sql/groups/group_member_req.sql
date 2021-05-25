CREATE TABLE IF NOT EXISTS group_member_req (
  id UUID DEFAULT uuid_generate_v4() NOT NULL PRIMARY KEY,
  number BIGSERIAL NOT NULL,
  active BOOLEAN NOT NULL,
  created_on TIMESTAMP DEFAULT NOW() NOT NULL,
  updated_on TIMESTAMP DEFAULT NOW() NOT NULL,
  group_id UUID REFERENCES groups(id) NOT NULL,
  request_sender UUID REFERENCES users(id) NOT NULL,
  request_reciever UUID REFERENCES users(id) NOT NULL,
  is_acceptor_admin BOOLEAN NOT NULL,
  request_accepted BOOLEAN NOT NULL
);