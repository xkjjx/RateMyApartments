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
    description TEXT,
    google_maps_link VARCHAR(255),
    apple_maps_link VARCHAR(255),
    area_id INT,
    FOREIGN KEY (area_id) REFERENCES area(id)
);

-- Create the 'users' table
CREATE TABLE users (
    id SERIAL PRIMARY KEY DEFAULT 0,
    name VARCHAR(255),
    email VARCHAR(255),
    verified BOOLEAN DEFAULT FALSE,
    password VARCHAR(255),
    admin BOOLEAN DEFAULT FALSE
);

CREATE TABLE sessions (
    id SERIAL PRIMARY KEY,
    user_id INT,
    token VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Create the 'reviews' table with foreign keys referencing 'apartments', 'area', and 'users' tables
CREATE TABLE reviews (
    id SERIAL PRIMARY KEY,
    apartment_id INT,
    user_id INT DEFAULT 0,
    title VARCHAR(255),
    rating INT CHECK (rating >= 1 AND rating <= 5),
    content TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (apartment_id) REFERENCES apartments(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET DEFAULT
);

CREATE TABLE leases (
    id SERIAL PRIMARY KEY,
    review_id INT,
    sign_date DATE,
    start_date DATE,
    end_date DATE,
    rent DECIMAL(10, 2),
    floorplan_id INT,
    water_included BOOLEAN,
    electricity_included BOOLEAN,
    parking_cost DECIMAL(10, 2) DEFAULT NULL,
    parking_covered BOOLEAN,
    FOREIGN KEY (review_id) REFERENCES reviews(id) ON DELETE CASCADE,
    FOREIGN KEY (floorplan_id) REFERENCES floorplans(id) ON DELETE CASCADE
);

CREATE TABLE floorplans (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    description TEXT,
    image VARCHAR(255),
    apartment_id INT,
    num_bedrooms INT,
    FOREIGN KEY (apartment_id) REFERENCES apartments(id) ON DELETE CASCADE
);
