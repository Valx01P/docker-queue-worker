import { pool } from './database.js';

const initDB = async () => {
  const createUserTableQuery = `
    CREATE TABLE IF NOT EXISTS users (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      role VARCHAR(20) CHECK (role IN ('owner', 'admin', 'member')) NOT NULL,
      google_id VARCHAR(255),
      github_id VARCHAR(255),
      email VARCHAR(255) UNIQUE NOT NULL,
      first_name VARCHAR(100),
      last_name VARCHAR(100),
      user_name VARCHAR(50) UNIQUE,
      icon_url TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      is_subscribed_to_emails BOOLEAN DEFAULT FALSE
    );
  `;

  const createEventTableQuery = `
    CREATE TABLE IF NOT EXISTS events (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      name VARCHAR(255) NOT NULL,
      details TEXT,
      cover_image_url TEXT,
      posted_by UUID NOT NULL REFERENCES users(id) ON DELETE SET NULL,
      latitude DECIMAL(9, 6),
      longitude DECIMAL(9, 6),
      date DATE NOT NULL,
      start_time TIME NOT NULL,
      end_time TIME NOT NULL,
      address TEXT,
      people_going INTEGER DEFAULT 0,
      type VARCHAR(20) CHECK (type IN ('in-person', 'virtual')) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  const createEmailTemplateTableQuery = `
    CREATE TABLE IF NOT EXISTS email_templates (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      template_name VARCHAR(255) NOT NULL,
      subject VARCHAR(255) NOT NULL,
      html_content TEXT NOT NULL,
      created_by UUID NOT NULL REFERENCES users(id) ON DELETE SET NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  try {
    await pool.query(createUserTableQuery);
    await pool.query(createEventTableQuery);
    await pool.query(createEmailTemplateTableQuery);
    console.log("Database initialized successfully!");
  } catch (error) {
    console.error("Error initializing database:", error);
  }
};

export default initDB;
