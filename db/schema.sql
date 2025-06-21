-- Create the database if it doesn't already exist
CREATE DATABASE IF NOT EXISTS password_manager;

-- Switch to the password_manager database
USE password_manager;

-- Create the credentials table
CREATE TABLE IF NOT EXISTS credentials (
  id INT AUTO_INCREMENT PRIMARY KEY,       -- Unique ID for each record
  user_id INT,                             -- (Optional) Link to user, used in multi-user systems
  role VARCHAR(100),                       -- Role or relationship (e.g., Me, Mom, Dad)
  platform VARCHAR(100),                   -- Platform name (e.g., Gmail, Instagram)
  account_username VARCHAR(255),           -- The account username or login ID
  account_password TEXT,                   -- The (possibly encrypted) password
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP 
              ON UPDATE CURRENT_TIMESTAMP, -- Tracks last modification time automatically

  -- FOREIGN KEY (user_id) REFERENCES users(id)
  -- Optional: Enforce link to a users table if using multi-user setup
);