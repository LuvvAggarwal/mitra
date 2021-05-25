CREATE TABLE IF NOT EXISTS comment_post (
    id UUID DEFAULT uuid_generate_v4() NOT NULL PRIMARY KEY,
    number BIGSERIAL NOT NULL,
    active BOOLEAN NOT NULL,
    created_on TIMESTAMP DEFAULT NOW() NOT NULL,
    updated_on TIMESTAMP DEFAULT NOW() NOT NULL,
    post UUID REFERENCES posts(id) NOT NULL,
    /*    special_id UUID REFERENCES specials(id),
     ngo_id UUID REFERENCES ngos(id),
     counsaler_id UUID REFERENCES counsalers(id),*/
    user_id UUID REFERENCES users(id) NOT NULL,
    comment TEXT NOT NULL
);