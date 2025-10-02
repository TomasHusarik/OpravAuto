# OpravAuto

A web application for automotive repair services.

## Setup

### Prerequisites
- Node.js (v14 or higher)
- npm
- MongoDB

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd OpravAuto
```

2. Navigate to the server directory:
```bash
cd server
```

3. Install dependencies:
```bash
npm install
```

4. Create a `.env` file in the server directory:
```bash
cp .env.example .env
```

5. Configure your environment variables in `.env`:

### Running the Application

#### Development
```bash
npm start
```

This will start the development server with nodemon, which automatically restarts the server when files change.

#### Production
```bash
npm run build
npm run prod
```

### Project Structure
```
OpravAuto/
├── server/
│   ├── db/
│   │   └── connection.ts
│   ├── utils/
│   │   └── validateEnv.ts
│   ├── server.ts
│   ├── package.json
│   └── tsconfig.json
└── README.md
```

### Available Scripts

- `npm start` - Start development server with nodemon
- `npm run build` - Build TypeScript to JavaScript
- `npm run prod` - Run production server

### Technologies Used

- Node.js
- Express.js
- TypeScript
- MongoDB
-