CREATE TABLE IF NOT EXISTS atachment_post_map (
    id UUID DEFAULT uuid_generate_v4() NOT NULL PRIMARY KEY,
    number BIGSERIAL NOT NULL,
    active BOOLEAN NOT NULL,
    created_on TIMESTAMP DEFAULT NOW() NOT NULL,
    updated_on TIMESTAMP DEFAULT NOW() NOT NULL,
    type ATTACHMENT_TYPE NOT NULL,
    post UUID REFERENCES posts(id) NOT NULL,
    url TEXT NOT NULL
);
CREATE DOMAIN ATTACHMENT_TYPE VARCHAR(10) CHECK (
    VALUE IN ('image', 'video', 'excel', 'docx', 'pdf')
);