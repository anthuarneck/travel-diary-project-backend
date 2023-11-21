DROP DATABASE IF EXISTS travel_diary_dev;

CREATE DATABASE travel_diary_dev;

\c travel_diary_dev;

CREATE TABLE travel_users (
    id SERIAL PRIMARY KEY,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE destinations (
    id SERIAL PRIMARY KEY,
    destination_name TEXT NOT NULL,
    image_url TEXT
)

CREATE TABLE memories (
    id SERIAL PRIMARY KEY,
    rating INTEGER CHECK (rating >= 0 AND rating <= 5),
    cost DECIMAL NOT NULL,
    review TEXT,
    experiences TEXT,
    date TEXT, 
    travel_user_id INTEGER REFERENCES travel_users (id) ON DELETE CASCADE,
    destination_id INTEGER REFERENCES destinations (id) ON DELETE CASCADE,
    UNIQUE (travel_user_id, destination_id)
)