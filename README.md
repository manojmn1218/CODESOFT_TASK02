# 🍽️ DineDesk

**Good food, simply served.**

A full-stack restaurant ordering and table reservation platform built with Next.js, PostgreSQL, and Prisma.

> Built as a student portfolio project for CODSOFT internship.

---

## Features

- **Menu browsing** — View dishes by category with images and descriptions
- **Cart system** — Add/remove items, adjust quantities, persistent cart
- **Online ordering** — Checkout with delivery or pickup options
- **Order tracking** — Track order status with a progress indicator
- **Table reservations** — Book a table with date, time, and guest count
- **Staff dashboard** — View and manage orders, update statuses, see reservations

## Tech Stack

| Layer    | Technology                    |
|----------|-------------------------------|
| Frontend | Next.js 16, React 19, Tailwind CSS 4 |
| Backend  | Next.js API Routes            |
| Database | PostgreSQL, Prisma ORM        |
| Auth     | bcrypt + HTTP-only cookies    |

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL (installed and running)

### 1. Clone and Install

```bash
git clone <your-repo-url>
cd codesoft_task2
npm install
```

### 2. Set Up the Database

Create a PostgreSQL database:

```sql
CREATE DATABASE dinedesk;
```

Copy the environment file and update your database URL:

```bash
cp .env.example .env
```

Edit `.env` with your PostgreSQL credentials:

```
DATABASE_URL="postgresql://postgres:your_password@localhost:5432/dinedesk"
```

### 3. Run Migrations and Seed

```bash
npx prisma db push
npm run seed
```

This creates all tables and seeds the database with:
- 16 menu items
- 1 staff account

### 4. Start the Dev Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)


Staff dashboard: [http://localhost:3000/staff/login](http://localhost:3000/staff/login)

## Pages

| Page             | URL            | Description                    |
|------------------|----------------|--------------------------------|
| Home             | `/`            | Landing page with popular dishes |
| Menu             | `/menu`        | Full menu with category filter |
| Cart             | `/cart`        | Shopping cart                  |
| Checkout         | `/checkout`    | Order form + simulated payment |
| Reservations     | `/reservation` | Table booking form             |
| Track Order      | `/orders`      | Order status tracking          |
| Staff Login      | `/staff/login` | Staff authentication           |
| Staff Dashboard  | `/staff`       | Order & reservation management |

## API Endpoints

| Method | Endpoint             | Description              |
|--------|----------------------|--------------------------|
| GET    | `/api/menu`          | Get all menu items       |
| POST   | `/api/orders`        | Create a new order       |
| GET    | `/api/orders`        | Get all orders (staff)   |
| GET    | `/api/orders/:id`    | Get order by ID          |
| PATCH  | `/api/orders/:id`    | Update order status      |
| POST   | `/api/reservations`  | Create a reservation     |
| GET    | `/api/reservations`  | Get all reservations     |
| POST   | `/api/auth/login`    | Staff login              |
| POST   | `/api/auth/logout`   | Staff logout             |

## Project Structure

```
├── app/
│   ├── page.js              # Home
│   ├── menu/page.js         # Menu
│   ├── cart/page.js          # Cart
│   ├── checkout/page.js      # Checkout
│   ├── reservation/page.js   # Table reservation
│   ├── orders/page.js        # Order tracking
│   ├── staff/
│   │   ├── page.js           # Dashboard
│   │   └── login/page.js     # Staff login
│   └── api/                  # API routes
├── components/               # Reusable UI components
├── context/                  # React Context (cart state)
├── lib/                      # Utilities (Prisma client, menu data)
├── prisma/                   # Schema + seed
└── public/images/            # Food images
```

## Environment Variables

| Variable      | Description                  |
|---------------|------------------------------|
| DATABASE_URL  | PostgreSQL connection string |
| STAFF_SECRET  | Session encryption secret    |

---

Built by Manoj | CODSOFT Internship
