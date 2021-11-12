CREATE TABLE IF NOT EXISTS events (
  id UUID DEFAULT uuid_generate_v4() NOT NULL PRIMARY KEY,
  number BIGSERIAL NOT NULL,
  active BOOLEAN NOT NULL,
  created_on TIMESTAMP DEFAULT NOW() NOT NULL,
  updated_on TIMESTAMP DEFAULT NOW() NOT NULL,
  name VARCHAR(150) NOT NULL,
  message TEXT NOT NULL
);

INSERT INTO events
  ( active,name,message)
VALUES
(true,'like','liked you post'),
(true,'comment','commented on your post'),
(true,'share','shared your post'),
(true,'new_follow','started following you'),
(true,'new_member','requested to join group'),
(true,'whatsapp','sent a message to you on whatsapp'),
(true,'group_membership_request','requested you to join'),
(true,'group_membership_approved','your request to join group is approved'),
(true,'group_post_approved','your post has been approved');