# Bus Management System - Frontend

Bus management system built with React 18 + TypeScript for the CIVA technical challenge.

## Features

- ✅ React 18 with TypeScript
- ✅ JWT Authentication
- ✅ State management with useState and useEffect
- ✅ Bus table with pagination
- ✅ Detailed modal for each bus
- ✅ Reusable components
- ✅ Clean and scalable architecture
- ✅ Robust error handling

## Technologies Used

- **Frontend**: React 18, TypeScript, React Router DOM
- **HTTP Client**: Axios
- **Styling**: Custom CSS3
- **Architecture**: Clean Architecture + Custom Hooks

## Installation and Usage

### Prerequisites
- Node.js (v16 or higher)
- npm
- Backend running on `http://localhost:8080`

### Installation
```bash
git clone [your-repository]
cd bus-frontend
npm install
```

### Environment Variables
Create `.env` file in the root:
```
REACT_APP_API_BASE_URL=http://localhost:8080/api/v1
```

### Run in Development
```bash
npm start
```

The application will be available at `http://localhost:3000`

### Production Build
```bash
npm run build
```

## Test Credentials

- **Username**: admin
- **Password**: admin123

## Functionalities

### Dashboard
- Real-time fleet statistics
- Active/inactive bus counters
- Quick navigation to bus management

### Bus Management
- Paginated list of all buses
- Filtering and search
- Detailed modal with complete information
- Visual states (active/inactive)

### Authentication
- JWT login
- Route protection
- Automatic logout on token expiration

## Frontend Architecture

```
src/
├── components/
│   ├── ui/                 # Reusable components
│   ├── features/           # Feature-specific components
│   └── layout/            # Application layout
├── hooks/                 # Custom hooks
├── services/              # API services
├── types/                 # TypeScript definitions
├── pages/                 # Main pages
└── utils/                 # Utilities
```

## Consumed API Endpoints

- `POST /auth/login` - Authentication
- `GET /bus` - Bus list (paginated)
- `GET /bus/{id}` - Specific bus details

## Available Scripts

- `npm start` - Development server
- `npm test` - Run tests
- `npm run build` - Production build
- `npm run lint` - Code analysis

## Developed by

Angel Antonio Cancho Corilla for the CIVA technical challenge

---

This project demonstrates a complete implementation of modern frontend with React 18, TypeScript, JWT authentication, and clean architecture following development best practices.
