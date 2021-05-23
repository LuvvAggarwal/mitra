CREATE TABLE IF NOT EXISTS share_post (
    id UUID NOT NULL PRIMARY KEY,
    number BIGSERIAL NOT NULL,
    active BOOLEAN NOT NULL,
    created_on TIMESTAMP NOT NULL,
    updated_on TIMESTAMP NOT NULL,
    post UUID REFERENCES posts(id) NOT NULL,
    special_id UUID REFERENCES specials(id),
    ngo_id UUID REFERENCES ngos(id),
    counsaler_id UUID REFERENCES counsalers(id),
    shared_on VARCHAR(50) NOT NULL,
    share_link TEXT NOT NULL
);