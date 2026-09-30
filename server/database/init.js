const db = require('./db');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs');

// Zone data
const zones = [
  { id: uuidv4(), name: 'Jimma', code: 'JIM' },
  { id: uuidv4(), name: 'Buno Bedele', code: 'BUN' },
  { id: uuidv4(), name: 'IAB', code: 'IAB' },
  { id: uuidv4(), name: 'East Wolega', code: 'EWO' },
  { id: uuidv4(), name: 'West Wolega', code: 'WWO' },
  { id: uuidv4(), name: 'Qelem Wolega', code: 'QWO' },
  { id: uuidv4(), name: 'Horo Guduru Wolega', code: 'HGW' },
  { id: uuidv4(), name: 'Arsi', code: 'ARS' },
  { id: uuidv4(), name: 'West Arsi', code: 'WAR' },
  { id: uuidv4(), name: 'Bale', code: 'BAL' },
  { id: uuidv4(), name: 'East Bale', code: 'EBA' },
  { id: uuidv4(), name: 'Borena', code: 'BOR' },
  { id: uuidv4(), name: 'Guji', code: 'GUJ' },
  { id: uuidv4(), name: 'East Hararge', code: 'EHA' },
  { id: uuidv4(), name: 'West Hararge', code: 'WHA' }
];

// Thematic Areas
const thematicAreas = [
  { id: uuidv4(), name: 'Youth Empowerment, Awareness and Training', code: 'YEAT' },
  { id: uuidv4(), name: 'Institutionalization of Youth Mainstreaming', code: 'IYMU' },
  { id: uuidv4(), name: 'Youth Economic, Social and Political Participation', code: 'YESP' },
  { id: uuidv4(), name: 'Youth Political Leadership and Participation', code: 'YPLP' }
];

// Indicators mapping
const indicators = [
  // YEAT Indicators
  { thematic: 'YEAT', name: 'Illegal migration awareness', code: 'YEAT-001' },
  { thematic: 'YEAT', name: 'Development policy and strategy awareness', code: 'YEAT-002' },
  { thematic: 'YEAT', name: 'Constitution and legal framework awareness', code: 'YEAT-003' },
  { thematic: 'YEAT', name: 'Corruption and ethics awareness', code: 'YEAT-004' },
  { thematic: 'YEAT', name: 'Emotional intelligence training', code: 'YEAT-005' },
  { thematic: 'YEAT', name: 'Drug abuse awareness', code: 'YEAT-006' },
  { thematic: 'YEAT', name: 'HIV/AIDS, STI and Reproductive Health Awareness', code: 'YEAT-007' },
  { thematic: 'YEAT', name: 'Globalization awareness', code: 'YEAT-008' },
  { thematic: 'YEAT', name: 'Agenda 2063 awareness', code: 'YEAT-009' },
  { thematic: 'YEAT', name: 'Climate change awareness', code: 'YEAT-010' },
  { thematic: 'YEAT', name: 'Green legacy awareness', code: 'YEAT-011' },
  { thematic: 'YEAT', name: 'Life skills training', code: 'YEAT-012' },
  { thematic: 'YEAT', name: 'Entrepreneurship training', code: 'YEAT-013' },
  { thematic: 'YEAT', name: 'Youth Participation on World Youth Day', code: 'YEAT-014' },
  { thematic: 'YEAT', name: 'Youth participation on World AIDS Day', code: 'YEAT-015' },
  { thematic: 'YEAT', name: 'Youth participation on Oromia Youth Day', code: 'YEAT-016' },
  { thematic: 'YEAT', name: 'Work and saving culture awareness', code: 'YEAT-017' },
  // IYMU Indicators
  { thematic: 'IYMU', name: 'Awareness for Senior Officials on Youth Mainstreaming', code: 'IYMU-001' },
  { thematic: 'IYMU', name: 'Training for focal persons on Youth Mainstreaming', code: 'IYMU-002' },
  { thematic: 'IYMU', name: 'Youth mainstreaming in sector policies', code: 'IYMU-003' },
  { thematic: 'IYMU', name: 'Corrective feedback to sectors', code: 'IYMU-004' },
  { thematic: 'IYMU', name: 'Evaluation of Youth Mainstreaming Implementation', code: 'IYMU-005' },
  { thematic: 'IYMU', name: 'Analysis of Youth Mainstreaming Performance', code: 'IYMU-006' },
  { thematic: 'IYMU', name: 'Leveling and Ranking of sectors', code: 'IYMU-007' },
  // YESP Indicators
  { thematic: 'YESP', name: 'Jobs created for youth', code: 'YESP-001' },
  { thematic: 'YESP', name: 'Youth shelters provided', code: 'YESP-002' },
  { thematic: 'YESP', name: 'Loans provided', code: 'YESP-003' },
  { thematic: 'YESP', name: 'Land access provided', code: 'YESP-004' },
  { thematic: 'YESP', name: 'Short term Vocational training', code: 'YESP-005' },
  { thematic: 'YESP', name: 'Basic and adult education', code: 'YESP-006' },
  { thematic: 'YESP', name: 'Family planning services for female youth', code: 'YESP-007' },
  // YPLP Indicators
  { thematic: 'YPLP', name: 'Leadership training', code: 'YPLP-001' },
  { thematic: 'YPLP', name: 'Youth members in Zonal Councils', code: 'YPLP-002' },
  { thematic: 'YPLP', name: 'Youth members in Woreda Councils', code: 'YPLP-003' },
  { thematic: 'YPLP', name: 'Youth members in Kebele councils', code: 'YPLP-004' },
  { thematic: 'YPLP', name: 'Youth heads in government sectors', code: 'YPLP-005' },
  { thematic: 'YPLP', name: 'Youth deputy head in government sectors', code: 'YPLP-006' },
  { thematic: 'YPLP', name: 'Youth participation in political decision-making', code: 'YPLP-007' }
];

// Initialize database
const initDB = () => {
  return new Promise((resolve, reject) => {
    // Insert zones
    zones.forEach(zone => {
      db.run(
        'INSERT OR IGNORE INTO zones (id, name, code, region) VALUES (?, ?, ?, ?)',
        [zone.id, zone.name, zone.code, 'Oromia'],
        (err) => {
          if (err) console.error('Error inserting zone:', err);
        }
      );
    });

    // Insert thematic areas
    const thematicMap = {};
    thematicAreas.forEach(area => {
      thematicMap[area.code] = area.id;
      db.run(
        'INSERT OR IGNORE INTO thematic_areas (id, name, code, description) VALUES (?, ?, ?, ?)',
        [area.id, area.name, area.code, area.name],
        (err) => {
          if (err) console.error('Error inserting thematic area:', err);
        }
      );
    });

    // Insert indicators
    indicators.forEach(ind => {
      const id = uuidv4();
      const thematicId = thematicAreas.find(t => t.code === ind.thematic)?.id;
      db.run(
        'INSERT OR IGNORE INTO indicators (id, thematic_area_id, name, code, description, data_type) VALUES (?, ?, ?, ?, ?, ?)',
        [id, thematicId, ind.name, ind.code, ind.name, 'number'],
        (err) => {
          if (err) console.error('Error inserting indicator:', err);
        }
      );
    });

    // Insert default users
    const salt = bcrypt.genSaltSync(10);
    const adminPassword = bcrypt.hashSync('admin123', salt);
    const zonePassword = bcrypt.hashSync('zone123', salt);

    // Regional Admin
    const adminId = uuidv4();
    db.run(
      'INSERT OR IGNORE INTO users (id, email, password, full_name, role, status) VALUES (?, ?, ?, ?, ?, ?)',
      [adminId, 'admin@regional.gov', adminPassword, 'Regional Administrator', 'admin', 'active'],
      (err) => {
        if (err) console.error('Error inserting admin:', err);
      }
    );

    // Zone Users (one per zone)
    zones.forEach(zone => {
      const userId = uuidv4();
      db.run(
        'INSERT OR IGNORE INTO users (id, email, password, full_name, role, zone_id, status) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [userId, `zone@${zone.code.toLowerCase()}.gov`, zonePassword, `${zone.name} Coordinator`, 'zone', zone.id, 'active'],
        (err) => {
          if (err) console.error('Error inserting zone user:', err);
        }
      );
    });

    setTimeout(() => {
      console.log('Database initialized successfully!');
      resolve();
    }, 1000);
  });
};

if (require.main === module) {
  initDB().then(() => {
    process.exit(0);
  }).catch(err => {
    console.error('Failed to initialize database:', err);
    process.exit(1);
  });
}

module.exports = { initDB };
