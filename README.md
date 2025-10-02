# OpravAuto

A web application for automotive repair services.

## Setup

### Prerequisites
- Node.js (v14 or higher)
- npm
- MongoDB
- React

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd OpravAuto
```
### Backend Setup

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

### Frontend Setup

1. Navigate to the client directory:
```bash
cd client
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

### Project Structure
```
OpravAuto/
├── server/          # Backend API (Node.js + Express + TypeScript)
│   ├── db/
│   │   └── connection.ts
│   ├── utils/
│   │   └── validateEnv.ts
│   ├── server.ts
│   ├── package.json
│   └── tsconfig.json
├── client/          # Frontend (React + Vite + TypeScript)
│   ├── public/
│   ├── src/
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── assets/
│   ├── package.json
│   ├── vite.config.ts
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
- React
