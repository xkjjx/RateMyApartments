-- Create the 'area' table
CREATE TABLE area (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255)
);

-- Create the 'apartments' table
CREATE TABLE apartments (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    address VARCHAR(255),
    description TEXT
);

-- Create the 'area_apartments' table with foreign keys referencing 'area' and 'apartments' tables
CREATE TABLE area_apartments (
    area_id INT,
    apartment_id INT,
    FOREIGN KEY (area_id) REFERENCES area(id),
    FOREIGN KEY (apartment_id) REFERENCES apartments(id)
);

-- Create the 'users' table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255),
    verified BOOLEAN DEFAULT FALSE
);

-- Create the 'reviews' table with foreign keys referencing 'apartments', 'area', and 'users' tables
CREATE TABLE reviews (
    id SERIAL PRIMARY KEY,
    apartment_id INT,
    user_id INT,
    title VARCHAR(255),
    rating INT CHECK (rating >= 1 AND rating <= 5),
    content TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (apartment_id) REFERENCES apartments(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);