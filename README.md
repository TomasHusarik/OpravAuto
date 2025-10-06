# OpravAuto - Car Repair Management System

A full-stack application for managing car repair services, built with React, TypeScript, Node.js, Express, and MongoDB.

## 🚀 Features

- **Customer Management**: Add, edit, and manage customer information
- **Vehicle Management**: Track vehicles with detailed specifications
- **Technician Management**: Manage repair technicians and their information
- **Work Order Management**: Create and track repair orders
- **Authentication**: Secure login system
- **Responsive UI**: Modern interface built with Mantine UI

## 📁 Project Structure

```
OpravAuto/
├── README.md
├── client/                          # React Frontend
│   ├── eslint.config.js
│   ├── index.html
│   ├── package.json
│   ├── tsconfig.app.json
│   ├── tsconfig.json
│   ├── tsconfig.node.json
│   ├── vite.config.ts
│   ├── public/
│   │   ├── opravAuto.png
│   │   └── vite.svg
│   └── src/
│       ├── App.tsx
│       ├── index.css
│       ├── main.tsx
│       ├── postcss.config.cjs
│       ├── assets/
│       │   ├── opravAuto.png
│       │   └── react.svg
│       ├── components/
│       │   ├── mantine/             # Mantine UI Components
│       │   │   ├── ActionToggle.module.css
│       │   │   ├── ActionToggle.tsx
│       │   │   ├── NavbarSimple.module.css
│       │   │   └── NavbarSimple.tsx
│       │   └── orders/              # Order-related components
│       ├── context/
│       │   └── AuthContext.tsx      # Authentication context
│       ├── pages/
│       │   ├── Customers.tsx        # Customer management page
│       │   ├── Login.tsx            # Login page
│       │   └── Orders.tsx           # Orders management page
│       ├── types/
│       │   ├── Customer.ts          # Customer type definitions
│       │   ├── Technician.ts        # Technician type definitions
│       │   └── Vehicle.ts           # Vehicle type definitions
│       └── utils/
│           ├── api.ts               # API utilities
│           ├── authTypes.ts         # Authentication types
│           └── helpers.ts           # Helper functions
└── server/                          # Node.js Backend
    ├── package.json
    ├── server.ts                    # Main server file
    ├── tsconfig.json
    ├── controllers/
    │   ├── customers.controller.ts
    │   ├── technicians.controller.ts
    │   ├── vehicles.controller.ts
    │   └── workOrders.controller.ts
    ├── db/
    │   └── connection.ts            # Database connection
    ├── middleware/
    │   └── middleware.ts            # CORS and body parsing
    ├── models/
    │   ├── Customer.ts              # Customer model
    │   ├── Technician.ts            # Technician model
    │   ├── Vehicle.ts               # Vehicle model
    │   └── WorkOrder.ts             # Work order model
    ├── routes/
    │   ├── customers.routes.ts
    │   ├── technicians.routes.ts
    │   ├── vehicles.routes.ts
    │   └── workOrders.routes.ts
    └── utils/
        ├── errorMessages.ts         # Error message utilities
        └── validateEnv.ts           # Environment validation
```

## 🛠️ Tech Stack

### Frontend
- **React 19** - UI framework
- **TypeScript** - Type safety
- **Mantine UI** - Component library
- **Vite** - Build tool
- **React Router** - Navigation
- **Axios** - HTTP client

### Backend
- **Node.js** - Runtime environment
- **Express** - Web framework
- **TypeScript** - Type safety
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcrypt** - Password hashing
- **CORS** - Cross-origin requests

## 📋 Prerequisites

Before running this application, make sure you have the following installed:

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **MongoDB** (local installation or MongoDB Atlas)
- **Git**

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/TomasHusarik/OpravAuto.git
cd OpravAuto
```

### 2. Environment Setup

Create a `.env` file in the `server` directory:

```bash
cd server
touch .env
```

Add the following environment variables to `.env`:

```env
# Database
MONGODB_URI=mongodb://localhost:27017/opravauto
# or for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/opravauto

# Server
PORT=5000
NODE_ENV=development

# JWT
JWT_SECRET=your-super-secret-jwt-key-here

# CORS Origins (if needed)
FRONTEND_URL=http://localhost:5173
```

### 3. Install Dependencies

#### Install Server Dependencies
```bash
cd server
npm install
```

#### Install Client Dependencies
```bash
cd ../client
npm install
```

### 4. Start the Application

#### Start the Server (Backend)
```bash
cd server
npm start
```
The server will start on `http://localhost:5000`

#### Start the Client (Frontend)
```bash
cd client
npm run dev
```
The client will start on `http://localhost:5173`

## 📱 Usage

1. **Access the Application**: Open your browser and navigate to `http://localhost:5173`

2. **Login**: Use the login page to authenticate (if authentication is implemented)

3. **Navigation**: Use the sidebar to navigate between different sections:
   - **Customers**: Manage customer information
   - **Orders**: Handle work orders and repairs
   - **Vehicles**: Track vehicle details

## 🔧 Available Scripts

### Server Scripts
```bash
cd server
npm start          # Start development server with nodemon
npm run test       # Run tests (not implemented yet)
```

### Client Scripts
```bash
cd client
npm run dev        # Start development server
npm run build      # Build for production
npm run lint       # Run ESLint
npm run preview    # Preview production build
```

## 🗄️ Database Models

### Customer
- Personal information (name, email, phone)
- Address details
- Contact preferences

### Vehicle
- Make, model, year
- VIN, color, mileage
- Engine type, transmission
- Owner reference
- Service notes

### Technician
- Personal information
- Specializations
- Contact details

### Work Order
- Customer and vehicle references
- Service description
- Status tracking
- Cost estimation

## 🌐 API Endpoints

### Base URL: `http://localhost:5000/api`

#### Vehicles
- `GET /vehicles/get-vehicles/:ownerId` - Get vehicles by owner
- `GET /vehicles/get-vehicle/:id` - Get single vehicle
- `POST /vehicles/add-vehicle` - Add new vehicle
- `PUT /vehicles/update-vehicle/:id` - Update vehicle
- `DELETE /vehicles/delete-vehicle/:id` - Soft delete vehicle

#### Technicians
- `GET /technicians` - Get all technicians
- `POST /technicians` - Add new technician
- `PUT /technicians/:id` - Update technician
- `DELETE /technicians/:id` - Delete technician

#### Customers (routes to be implemented)
- `GET /customers` - Get all customers
- `POST /customers` - Add new customer
- `PUT /customers/:id` - Update customer
- `DELETE /customers/:id` - Delete customer

#### Work Orders (routes to be implemented)
- `GET /work-orders` - Get all work orders
- `POST /work-orders` - Create new work order
- `PUT /work-orders/:id` - Update work order
- `DELETE /work-orders/:id` - Delete work order

## 🔒 Authentication

The application uses JWT (JSON Web Tokens) for authentication. Make sure to include the token in the Authorization header for protected routes:

```javascript
Authorization: Bearer <your-jwt-token>
```

## 🎨 Styling

The application uses Mantine UI components with custom CSS modules for styling. Main style files:
- `client/src/index.css` - Global styles
- `client/src/components/mantine/*.module.css` - Component-specific styles

## 🔧 Development

### Adding New Features

1. **Backend**: Add models, controllers, and routes in respective directories
2. **Frontend**: Create components in `src/components` and pages in `src/pages`
3. **Types**: Define TypeScript interfaces in `src/types`

### Path Aliases

Both client and server use path aliases for cleaner imports:

**Client aliases:**
- `@/*` → `./src/*`
- `@pages/*` → `./src/pages/*`
- `@components/*` → `./src/components/*`
- `@assets/*` → `./src/assets/*`
- `@types/*` → `./src/types/*`
- `@context/*` → `./src/context/*`

**Server aliases:**
- `@utils/*` → `./utils/*`
- `@models/*` → `./models/*`
- `@routes/*` → `./routes/*`
- `@controllers/*` → `./controllers/*`
- `@middleware/*` → `./middleware/*`
- `@db/*` → `./db/*`

## 🐛 Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Ensure MongoDB is running
   - Check connection string in `.env`
   - Verify network connectivity for Atlas

2. **Port Already in Use**
   - Change port in `.env` file
   - Kill existing processes on the port

3. **Module Not Found Errors**
   - Run `npm install` in both client and server directories
   - Clear node_modules and reinstall if needed

4. **CORS Errors**
   - Check CORS configuration in `server/middleware/middleware.ts`
   - Ensure frontend URL is in allowed origins

## 📄 License

This project is licensed under the ISC License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📞 Support

For support and questions, please open an issue on the GitHub repository.
