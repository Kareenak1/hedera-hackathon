# Backend Setup TODO List

## Initial Setup
- [x] Create backend/package.json with necessary dependencies (express, mongoose, @hashgraph/sdk, cors, dotenv, etc.)
- [x] Create backend/server.js as the main Express server entry point
- [x] Set up basic middleware in server.js (CORS, JSON parsing, error handling)

## Database Configuration
- [x] Create backend/config/database.js for MongoDB connection setup
- [x] Initialize MongoDB connection in server.js

## Models
- [x] Create backend/models/Event.js for Event schema
- [x] Create backend/models/User.js for User schema
- [x] Create backend/models/Ticket.js for Ticket schema
- [x] Create backend/models/Donation.js for Donation schema

## Routes
- [x] Create backend/routes/events.js for event-related endpoints
- [x] Create backend/routes/tickets.js for ticket-related endpoints
- [x] Create backend/routes/donations.js for donation-related endpoints
- [x] Create backend/routes/wallet.js for wallet-related endpoints
- [x] Create backend/routes/users.js for user-related endpoints
- [x] Register all routes in server.js

## Hedera/Web3 Integration
- [x] Create backend/config/hedera.js for Hedera client setup
- [x] Initialize Hedera client in server.js

## Testing and Verification
- [x] Install dependencies using npm install
- [x] Test server startup and basic endpoints
- [x] Verify MongoDB connection
- [x] Confirm Hedera client initialization
- [x] Update frontend to use new API endpoints (future task)
