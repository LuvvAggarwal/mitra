CREATE TABLE IF NOT EXISTS comment_post (
    id UUID NOT NULL PRIMARY KEY,
    number BIGSERIAL NOT NULL,
    active BOOLEAN NOT NULL,
    created_on TIMESTAMP NOT NULL,
    updated_on TIMESTAMP NOT NULL,
    post UUID REFERENCES posts(id) NOT NULL,
    special_id UUID REFERENCES specials(id),
    ngo_id UUID REFERENCES ngos(id),
    counsaler_id UUID REFERENCES counsalers(id),
    comment TEXT NOT NULL
);