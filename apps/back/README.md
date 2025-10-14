# Backend API

Backend API built with [Hono](https://hono.dev/).

## Getting Started

Install dependencies:

```bash
yarn install
```

Run the development server:

```bash
yarn dev
```

The server will start on [http://localhost:3001](http://localhost:3001).

## Available Scripts

- `yarn dev` - Start the development server with hot reload
- `yarn build` - Build the production bundle
- `yarn start` - Start the production server
- `yarn clean` - Remove build artifacts

## API Endpoints

- `GET /` - Welcome message
- `GET /api/health` - Health check endpoint
