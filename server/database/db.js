const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const bcrypt = require('bcryptjs');

const dbPath = path.join(__dirname, 'youth_empowerment.db');

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Database connection error:', err.message);
  } else {
    console.log('Connected to SQLite database');
  }
});

// Create tables
db.serialize(() => {
  // Users table
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      full_name TEXT NOT NULL,
      role TEXT NOT NULL,
      zone_id TEXT,
      status TEXT DEFAULT 'active',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Zones table
  db.run(`
    CREATE TABLE IF NOT EXISTS zones (
      id TEXT PRIMARY KEY,
      name TEXT UNIQUE NOT NULL,
      code TEXT UNIQUE,
      region TEXT DEFAULT 'Oromia',
      status TEXT DEFAULT 'active',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Thematic Areas table
  db.run(`
    CREATE TABLE IF NOT EXISTS thematic_areas (
      id TEXT PRIMARY KEY,
      name TEXT UNIQUE NOT NULL,
      code TEXT UNIQUE,
      description TEXT,
      status TEXT DEFAULT 'active',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Indicators table
  db.run(`
    CREATE TABLE IF NOT EXISTS indicators (
      id TEXT PRIMARY KEY,
      thematic_area_id TEXT NOT NULL,
      name TEXT NOT NULL,
      code TEXT UNIQUE,
      description TEXT,
      data_type TEXT DEFAULT 'number',
      status TEXT DEFAULT 'active',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (thematic_area_id) REFERENCES thematic_areas(id)
    )
  `);

  // Annual Plans table
  db.run(`
    CREATE TABLE IF NOT EXISTS annual_plans (
      id TEXT PRIMARY KEY,
      zone_id TEXT NOT NULL,
      year INTEGER NOT NULL,
      status TEXT DEFAULT 'draft',
      submitted_date DATETIME,
      approved_date DATETIME,
      rejection_reason TEXT,
      approved_by TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (zone_id) REFERENCES zones(id),
      UNIQUE(zone_id, year)
    )
  `);

  // Annual Plan Data table
  db.run(`
    CREATE TABLE IF NOT EXISTS annual_plan_data (
      id TEXT PRIMARY KEY,
      annual_plan_id TEXT NOT NULL,
      indicator_id TEXT NOT NULL,
      target_male INTEGER DEFAULT 0,
      target_female INTEGER DEFAULT 0,
      target_other INTEGER DEFAULT 0,
      target_total INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (annual_plan_id) REFERENCES annual_plans(id),
      FOREIGN KEY (indicator_id) REFERENCES indicators(id),
      UNIQUE(annual_plan_id, indicator_id)
    )
  `);

  // Quarterly Plans table
  db.run(`
    CREATE TABLE IF NOT EXISTS quarterly_plans (
      id TEXT PRIMARY KEY,
      zone_id TEXT NOT NULL,
      year INTEGER NOT NULL,
      quarter INTEGER NOT NULL,
      status TEXT DEFAULT 'draft',
      submitted_date DATETIME,
      approved_date DATETIME,
      rejection_reason TEXT,
      approved_by TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (zone_id) REFERENCES zones(id),
      UNIQUE(zone_id, year, quarter)
    )
  `);

  // Quarterly Plan Data table
  db.run(`
    CREATE TABLE IF NOT EXISTS quarterly_plan_data (
      id TEXT PRIMARY KEY,
      quarterly_plan_id TEXT NOT NULL,
      indicator_id TEXT NOT NULL,
      target_male INTEGER DEFAULT 0,
      target_female INTEGER DEFAULT 0,
      target_other INTEGER DEFAULT 0,
      target_total INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (quarterly_plan_id) REFERENCES quarterly_plans(id),
      FOREIGN KEY (indicator_id) REFERENCES indicators(id),
      UNIQUE(quarterly_plan_id, indicator_id)
    )
  `);

  // Annual Reports table
  db.run(`
    CREATE TABLE IF NOT EXISTS annual_reports (
      id TEXT PRIMARY KEY,
      zone_id TEXT NOT NULL,
      year INTEGER NOT NULL,
      status TEXT DEFAULT 'draft',
      submitted_date DATETIME,
      approved_date DATETIME,
      rejection_reason TEXT,
      approved_by TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (zone_id) REFERENCES zones(id),
      UNIQUE(zone_id, year)
    )
  `);

  // Annual Report Data table
  db.run(`
    CREATE TABLE IF NOT EXISTS annual_report_data (
      id TEXT PRIMARY KEY,
      annual_report_id TEXT NOT NULL,
      indicator_id TEXT NOT NULL,
      achieved_male INTEGER DEFAULT 0,
      achieved_female INTEGER DEFAULT 0,
      achieved_other INTEGER DEFAULT 0,
      achieved_total INTEGER DEFAULT 0,
      remarks TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (annual_report_id) REFERENCES annual_reports(id),
      FOREIGN KEY (indicator_id) REFERENCES indicators(id),
      UNIQUE(annual_report_id, indicator_id)
    )
  `);

  // Quarterly Reports table
  db.run(`
    CREATE TABLE IF NOT EXISTS quarterly_reports (
      id TEXT PRIMARY KEY,
      zone_id TEXT NOT NULL,
      year INTEGER NOT NULL,
      quarter INTEGER NOT NULL,
      status TEXT DEFAULT 'draft',
      submitted_date DATETIME,
      approved_date DATETIME,
      rejection_reason TEXT,
      approved_by TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (zone_id) REFERENCES zones(id),
      UNIQUE(zone_id, year, quarter)
    )
  `);

  // Quarterly Report Data table
  db.run(`
    CREATE TABLE IF NOT EXISTS quarterly_report_data (
      id TEXT PRIMARY KEY,
      quarterly_report_id TEXT NOT NULL,
      indicator_id TEXT NOT NULL,
      achieved_male INTEGER DEFAULT 0,
      achieved_female INTEGER DEFAULT 0,
      achieved_other INTEGER DEFAULT 0,
      achieved_total INTEGER DEFAULT 0,
      remarks TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (quarterly_report_id) REFERENCES quarterly_reports(id),
      FOREIGN KEY (indicator_id) REFERENCES indicators(id),
      UNIQUE(quarterly_report_id, indicator_id)
    )
  `);

  // Audit Log table
  db.run(`
    CREATE TABLE IF NOT EXISTS audit_logs (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      action TEXT NOT NULL,
      entity_type TEXT,
      entity_id TEXT,
      details TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id)
    )
  `);
});

module.exports = db;
