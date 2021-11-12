CREATE TABLE IF NOT EXISTS notifications (
  id UUID DEFAULT uuid_generate_v4() NOT NULL PRIMARY KEY,
  number BIGSERIAL NOT NULL,
  active BOOLEAN NOT NULL,
  created_on TIMESTAMP DEFAULT NOW() NOT NULL,
  updated_on TIMESTAMP DEFAULT NOW() NOT NULL,
  event UUID REFERENCES events(id) NOT NULL,
  sender UUID REFERENCES users(id) NOT NULL,
  recipient UUID REFERENCES users(id) NOT NULL,
  /*sender_special UUID REFERENCES specials(id),
   recipient_special UUID REFERENCES specials(id),
   sender_ngo UUID REFERENCES ngos(id),
   recipient_ngo UUID REFERENCES ngos(id),
   sender_counsaler UUID REFERENCES counsalers(id),
   recipient_counsaler UUID REFERENCES counsalers(id),*/
  message TEXT NOT NULL,
  seen BOOLEAN NOT NULL
);