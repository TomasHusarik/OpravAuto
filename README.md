# OpravAuto - Vehicle Repair Management System

A full-stack web application for managing vehicle repairs, customers, and service orders. Built with React, TypeScript, Mantine UI, Node.js/Express, and MongoDB.

## Features

- **Customer Management**: Create, view, and manage customer information and their vehicles
- **Order Management**: Create, track, and manage repair orders with service items
- **Vehicle Tracking**: Maintain detailed records of customer vehicles
- **Technician Management**: Manage technicians and assign them to orders
- **PDF Generation**: Generate PDF reports for orders with QR codes
- **Authentication**: Secure login system with role-based access control
- **Email Notifications**: Send access codes to customers via email
- **Responsive Design**: Mobile-friendly interface using Mantine UI

## Project Structure

```
OpravAuto/
├── client/                 # React frontend application
│   ├── src/
│   │   ├── components/     # Reusable React components
│   │   ├── pages/          # Page components
│   │   ├── context/        # React context for auth
│   │   ├── types/          # TypeScript type definitions
│   │   ├── utils/          # Utility functions and API calls
│   │   └── App.tsx         # Main app component
│   ├── package.json
│   └── vite.config.ts
│
└── server/                 # Express backend server
    ├── controllers/        # Route controllers
    ├── models/             # Mongoose models
    ├── routes/             # API routes
    ├── middleware/         # Express middleware
    ├── db/                 # Database connection
    ├── utils/              # Utility functions
    ├── types/              # TypeScript type definitions
    └── server.ts           # Main server file
```

## Tech Stack

### Frontend
- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Mantine UI** - Component library
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **Tabler Icons** - Icon set

### Backend
- **Node.js / Express** - Server framework
- **TypeScript** - Type safety
- **MongoDB / Mongoose** - Database
- **JWT** - Authentication
- **bcrypt** - Password hashing
- **PDFKit** - PDF generation
- **QRCode** - QR code generation
- **Resend** - Email service
- **CORS** - Cross-origin requests

## Getting Started

### Prerequisites
- Node.js 18+ and npm/yarn
- MongoDB database
- Environment variables configured

### Installation

1. **Install backend dependencies**
```bash
cd server
npm install
```

2. **Install frontend dependencies**
```bash
cd client
npm install
```

### Environment Setup

Create a `.env` file in the `server` directory with the following variables:
```
PORT=3000
MONGODB_URI=<your-mongodb-connection-string>
JWT_SECRET=<your-jwt-secret>
RESEND_API_KEY=<your-resend-api-key>
NODE_ENV=development
```

### Running the Application

**Terminal 1 - Start Backend Server**
```bash
cd server
npm start
```
The server will run on `http://localhost:3000`

**Terminal 2 - Start Frontend Development Server**
```bash
cd client
npm run dev
```
The client will run on `http://localhost:5173`

## Available Scripts

### Client
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint

### Server
- `npm start` - Start the server with nodemon (watches for changes)
- `npm test` - Run tests

## API Routes

The backend provides the following main routes:

- `/api/auth` - Authentication (login, logout)
- `/api/customers` - Customer management
- `/api/vehicles` - Vehicle management
- `/api/orders` - Order management
- `/api/items` - Service items
- `/api/technicians` - Technician management
- `/api/helpers` - Helper utilities (PDF generation, QR codes, etc.)

## Authentication

The application uses JWT (JSON Web Tokens) for authentication:
- Users login with their credentials
- JWT token is issued and stored client-side
- Token is sent with requests in the Authorization header
- Role-based access control is implemented via middleware

## Key Features

### Customer Management
- Add and manage customer information
- Track customer vehicles
- View customer order history

### Order Management
- Create new repair orders
- Track order status
- Add service items to orders
- Generate PDF reports with QR codes

### Technician Management
- Manage technician profiles
- Assign technicians to orders

### Email Integration
- Send access codes to customers
- Automated email notifications

## Notes for Development

- **CORS Settings**: Currently set to accept all origins. For production, update the CORS configuration in `server/server.ts` to restrict origins
- **PDF Generation**: Uses PDFKit for creating order reports with QR codes
- **Form Validation**: Uses Mantine Form for client-side validation
- **Type Safety**: Full TypeScript implementation for both client and server

## Authors

Tomáš Husarik, Jan Cinybulk, Vítek Pospíšil, Tomáš Tláskal
