# Youth Empowerment Reporting Platform

A comprehensive platform for tracking and reporting youth empowerment initiatives across 15 zones in Oromia region.

## Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/nathanmelenkovisky-ux/youth-empowerment-reporting-platform.git
   cd youth-empowerment-reporting-platform
   ```

2. **Install backend dependencies**
   ```bash
   npm install
   ```

3. **Initialize the database**
   ```bash
   npm run init-db
   ```

4. **Setup environment variables**
   ```bash
   cp .env.example .env
   ```

5. **Install frontend dependencies**
   ```bash
   cd client
   npm install
   cd ..
   ```

6. **Start the application**
   ```bash
   npm run dev
   ```

   The app will be available at:
   - Frontend: http://localhost:3000
   - Backend: http://localhost:5000

## Default Login Credentials

### Regional Admin
- Email: admin@regional.gov
- Password: admin123

### Zone User (Jimma)
- Email: zone@jimma.gov
- Password: zone123

## Platform Features

### For Zone Users
- Annual and Quarterly plan data entry
- Report submission
- Data entry by sex (Male/Female/Other)
- Multi-thematic area tracking

### For Regional Admin
- Plan and report approval/rejection
- Automatic report generation for each zone
- Zone comparisons and analytics
- Strengths and weaknesses identification
- General summary reports

## Platform Modules

1. **Youth Empowerment, Awareness & Training**
2. **Institutionalization of Youth Mainstreaming**
3. **Youth Economic, Social & Political Participation**
4. **Youth Political Leadership & Participation**

## Project Structure

```
├── server/
│   ├── database/
│   ├── routes/
│   ├── controllers/
│   ├── middleware/
│   └── index.js
├── client/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── App.js
│   └── package.json
└── README.md
```
