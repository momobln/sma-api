# Security Shifts Ledger – Backend API

A backend system for managing  work shifts, built with >>Node.js + Express + TypeScript + Prisma + PostgreSQL>>.  
It provides REST APIs for user registration, authentication, shift management, and total hours calculation.

## Tech Stack
**Node.js / Express** — REST API server
**TypeScript** — 
**Prisma ORM** — Database ORM for PostgreSQL
**JWT (jsonwebtoken)** — Authentication and route protection
**bcryptjs** — Password hashing
**Zod** — Data validation
**Helmet + CORS + Morgan** — Security and logging middleware**

## Installation & Setup

### 1. Clone the project
```bash
git clone https://github.com/momobln/sma-api.git 
cd sma-api

**Install dependencies
npm install

3. Environment variables

**Create.env file in the project root:**

DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/sma_db"
JWT_SECRET="supersecretkey"
PORT=4000

Project Structure:

src/
     index.ts               # Entry point of the server
     routes/
       auth.ts              # Register & login routes
       guards.ts            # Guards list (protected)
       shifts.ts            # CRUD for shifts + total hours
     middleware/
       requireAuth.ts       # JWT authentication middleware
     validators/
         guardSchemas.ts    # Validation for register/login
         shiftSchemas.ts    # Validation for shift creation/update
     prisma/
         schema.prisma      # Database schema (Prisma)


##API Endpoints:

  Method   Endpoint                    Description                          

  POST      /api/auth/register         Register a new user                  
  POST     /api/auth/login             Login and receive a JWT token        
  GET      /api/auth/private           Test protected route (JWT required)  

##Shifts

  Method     Endpoint                       Description                    Protected  

  TPOST      /api/shifts                      Create new shift                  Y          
  TGETT      /api/shifts                      Get all shifts                    N          
  TPUTT      /api/shifts/:id                  Update user’s own shift           Y          
  TDELETET   /api/shifts/:id                  Delete user’s own shift           Y         
  TGETT      /api/shifts/my/total-hours       Calculate total worked hours      Y


##Database Relations (Prisma Schema)
Guard → has many Shifts
Shift → belongs to one Guard 


