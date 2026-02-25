# 🏋️ FitMart: Online Fitness & Nutrition E-Commerce Platform

> A comprehensive, high-performance B2C e-commerce ecosystem combining premium fitness hardware, specialized nutrition products, and digital coaching — all in one platform.

![Platform](https://img.shields.io/badge/Platform-Web%20%7C%20PWA-blue)
![Stack](https://img.shields.io/badge/Stack-MERN-green)
![Payment](https://img.shields.io/badge/Payment-Razorpay-0c2a5e)
![License](https://img.shields.io/badge/License-MIT-yellow)
![Status](https://img.shields.io/badge/Status-In%20Development-orange)

---

## 📋 Table of Contents

- [About the Project](#about-the-project)
- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [System Architecture](#system-architecture)
- [Database Schema](#database-schema)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Running the App](#running-the-app)
- [API Overview](#api-overview)
- [Revenue Model](#revenue-model)
- [Roadmap](#roadmap)
- [Team](#team)
- [Contributing](#contributing)
- [License](#license)

---

## 🧠 About the Project

FitMart is a full-stack e-commerce platform built for the modern fitness consumer. It goes beyond simple product sales by integrating **Digital Fitness Plans**, **AI-driven product recommendations**, and **subscription-based coaching** alongside physical product fulfillment.

Built as an academic and entrepreneurial venture at **VESIT, Mumbai**, FitMart addresses the fragmented fitness market by consolidating equipment, nutrition, and personalized coaching into a single, secure digital storefront.

**Target Users:**
- Fitness enthusiasts seeking authentic, curated products
- Home-gym builders looking for end-to-end setup support
- Corporate professionals who need fast, "one-click" health bundles
- Beginners who want guided, goal-oriented shopping experiences

---

## ✨ Key Features

| Feature | Description |
|---|---|
| 🛒 **Integrated Wellness Dashboard** | Manage orders, subscriptions, and workout schedules from one interface |
| 🔐 **Secure Payment Stack** | Razorpay integration with UPI, EMI, SSL encryption & 3D Secure auth |
| 📦 **Smart Inventory Management** | Real-time stock tracking, automated reorder triggers via Zoho/ERPNext |
| 🤖 **AI Recommendation Engine** | Personalized product suggestions based on fitness goals & purchase history |
| 🏆 **FitRewards Loyalty Program** | Earn points on purchases AND fitness milestones; redeem for discounts |
| 📱 **Mobile-First PWA** | Progressive Web App for seamless mobile experience |
| 🔄 **Automated Order Fulfillment** | API-triggered logistics via Shiprocket; real-time WhatsApp/Email tracking |
| 📊 **CRM-Driven Retention** | Automated email journeys via Zoho CRM to maximize customer LTV |

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| **React.js** | Component-based UI framework |
| **Tailwind CSS** | Utility-first responsive styling |
| **HTML5 / JavaScript** | Page structure & client-side interactivity |

### Backend
| Technology | Purpose |
|---|---|
| **Node.js** | Server-side runtime environment |
| **Express.js** | RESTful API framework & routing |

### Database
| Technology | Purpose |
|---|---|
| **MongoDB** | NoSQL database for users, products, orders, subscriptions |
| **Mongoose (ODM)** | Schema-based data modeling for MongoDB |

### Authentication & Security
| Technology | Purpose |
|---|---|
| **Firebase Authentication** | Email/password login with JWT token management |
| **SSL / HTTPS** | Encrypted communication across all endpoints |
| **Cloudflare** | DDoS protection and CDN for fast, secure content delivery |

### Payments & Integrations
| Technology | Purpose |
|---|---|
| **Razorpay** | UPI, credit/debit card, net banking, EMI processing |
| **Zoho CRM / ERPNext** | Customer data, order lifecycle, inventory management |
| **Shiprocket / Delhivery** | Last-mile logistics & shipment tracking |
| **AWS** | Cloud hosting with auto-scaling and high availability |

### Dev Tools
| Tool | Purpose |
|---|---|
| **VS Code** | Primary code editor |
| **Git & GitHub** | Version control and source code management |

---

## 🏗️ System Architecture

FitMart follows a **cloud-based, multi-tier architecture**:

```
┌─────────────────────────────────────────────┐
│               CLIENT LAYER                   │
│    Browser / PWA (React.js + Tailwind CSS)   │
└──────────────────────┬──────────────────────┘
                       │ HTTPS Requests
┌──────────────────────▼──────────────────────┐
│              BACKEND LAYER                   │
│        Node.js + Express.js API Server       │
│  (Auth, Orders, Payments, Subscriptions)     │
└─────┬──────────┬──────────────┬─────────────┘
      │          │              │
┌─────▼───┐  ┌───▼──────┐  ┌───▼─────────────┐
│ MongoDB │  │ Firebase │  │ Third-Party APIs │
│   DB    │  │  Auth    │  │ Razorpay, Zoho,  │
│         │  │          │  │ Shiprocket, AWS  │
└─────────┘  └──────────┘  └─────────────────┘
```

**Key Design Principles:**
- Frontend never directly accesses the database — all reads/writes go through the API server
- Independent scaling of frontend and backend layers
- PCI-DSS compliant payment handling — no card data stored locally
- Cloudflare CDN sits in front of all static assets for speed and DDoS resilience

---

## 🗄️ Database Schema

FitMart uses a **normalized relational-style schema** implemented in MongoDB with Mongoose ODM.

### Core Collections

```
Users
├── _id, name, email, passwordHash
├── role (customer/admin), createdAt
└── → Orders[], Subscriptions[]

Products
├── _id, name, brand, price, description
├── category_id → Categories
├── isAvailable, images[]
└── → Inventory (1:1)

Categories
└── _id, name, description

Inventory
├── product_id → Products
├── quantityAvailable, reorderLevel
└── lastUpdated

Orders
├── _id, user_id → Users
├── orderDate, totalAmount, status
└── → OrderItems[]

OrderItems
├── order_id → Orders
├── product_id → Products
└── quantity, unitPrice

Payments
├── order_id → Orders
├── transactionId (Razorpay), method
├── status (success/failed/pending)
└── paymentDate

FitnessPlans
├── _id, planName, description
├── durationDays, price
└── → Subscriptions[]

Subscriptions
├── user_id → Users
├── plan_id → FitnessPlans
├── startDate, endDate
└── status (active/expired/cancelled)

Admins
└── _id, name, email, passwordHash, role
```

---

## 📁 Project Structure

```
fitmart/
│
├── client/                         # React.js Frontend
│   ├── public/
│   ├── src/
│   │   ├── components/             # Reusable UI components
│   │   │   ├── Navbar/
│   │   │   ├── ProductCard/
│   │   │   ├── Cart/
│   │   │   └── Dashboard/
│   │   ├── pages/                  # Route-level pages
│   │   │   ├── Home.jsx
│   │   │   ├── Shop.jsx
│   │   │   ├── ProductDetail.jsx
│   │   │   ├── Checkout.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   └── Auth/
│   │   ├── context/                # React Context (Cart, Auth)
│   │   ├── hooks/                  # Custom React hooks
│   │   ├── services/               # API call functions (Axios)
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── tailwind.config.js
│   └── package.json
│
├── server/                         # Node.js + Express Backend
│   ├── config/
│   │   ├── db.js                   # MongoDB connection
│   │   └── firebase.js             # Firebase Admin SDK setup
│   ├── models/                     # Mongoose models
│   │   ├── User.js
│   │   ├── Product.js
│   │   ├── Order.js
│   │   ├── Payment.js
│   │   ├── Inventory.js
│   │   ├── FitnessPlan.js
│   │   └── Subscription.js
│   ├── routes/                     # Express route handlers
│   │   ├── auth.routes.js
│   │   ├── product.routes.js
│   │   ├── order.routes.js
│   │   ├── payment.routes.js
│   │   └── subscription.routes.js
│   ├── controllers/                # Business logic
│   ├── middleware/
│   │   ├── authMiddleware.js       # Firebase token verification
│   │   └── errorHandler.js
│   ├── utils/
│   ├── .env.example
│   ├── server.js
│   └── package.json
│
├── .gitignore
├── README.md
└── package.json                    # Root (optional monorepo scripts)
```

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v18 or above)
- [npm](https://www.npmjs.com/) (v9 or above)
- [MongoDB](https://www.mongodb.com/) (local instance or MongoDB Atlas)
- A [Razorpay](https://razorpay.com/) account (for payment integration)
- A [Firebase](https://firebase.google.com/) project (for authentication)

---

### Installation

**1. Clone the repository**

```bash
git clone https://github.com/your-username/fitmart.git
cd fitmart
```

**2. Install server dependencies**

```bash
cd server
npm install
```

**3. Install client dependencies**

```bash
cd ../client
npm install
```

---

### Environment Variables

Create a `.env` file inside the `server/` directory. Use `.env.example` as a template:

```env
# Server
PORT=5000
NODE_ENV=development

# MongoDB
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/fitmart

# Firebase Admin SDK
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n..."
FIREBASE_CLIENT_EMAIL=firebase-adminsdk@your_project.iam.gserviceaccount.com

# Razorpay
RAZORPAY_KEY_ID=rzp_test_XXXXXXXXXXXXXXXX
RAZORPAY_KEY_SECRET=your_razorpay_secret

# JWT / Session (if applicable)
JWT_SECRET=your_super_secret_key

# Cloudflare / AWS (optional for production)
CDN_BASE_URL=https://cdn.fitmart.in
```

Create a `.env` file inside the `client/` directory:

```env
VITE_API_BASE_URL=http://localhost:5000/api
VITE_RAZORPAY_KEY_ID=rzp_test_XXXXXXXXXXXXXXXX
VITE_FIREBASE_API_KEY=your_firebase_web_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
```

> ⚠️ **Never commit your `.env` files.** They are already included in `.gitignore`.

---

### Running the App

**Development mode (run both frontend & backend):**

In one terminal, start the backend:
```bash
cd server
npm run dev
```

In another terminal, start the frontend:
```bash
cd client
npm run dev
```

The React app will be available at `http://localhost:5173` and the API server at `http://localhost:5000`.

---

## 📡 API Overview

All API routes are prefixed with `/api`.

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `POST` | `/api/auth/register` | Register a new user | No |
| `POST` | `/api/auth/login` | Login with Firebase token | No |
| `GET` | `/api/products` | Fetch all products | No |
| `GET` | `/api/products/:id` | Fetch single product | No |
| `GET` | `/api/products?category=supplements` | Filter by category | No |
| `POST` | `/api/orders` | Place a new order | Yes |
| `GET` | `/api/orders/:userId` | Get user's order history | Yes |
| `POST` | `/api/payments/create-order` | Create Razorpay order | Yes |
| `POST` | `/api/payments/verify` | Verify payment signature | Yes |
| `GET` | `/api/plans` | List all fitness plans | No |
| `POST` | `/api/subscriptions` | Subscribe to a fitness plan | Yes |
| `GET` | `/api/subscriptions/:userId` | Get user's active subscriptions | Yes |
| `GET` | `/api/admin/inventory` | View inventory (admin only) | Admin |
| `PUT` | `/api/admin/inventory/:productId` | Update stock level (admin only) | Admin |

> Full API documentation will be available via Postman collection (link TBD).

---

## 💰 Revenue Model

FitMart operates a **diversified revenue strategy**:

| Stream | Details | Margin |
|---|---|---|
| **DTC Product Sales** | Supplements, equipment, wearables | 20–45% |
| **Digital Fitness Subscriptions** | Pro (₹499/mo), Elite (₹1,499/mo) | 85–95% |
| **Service & AMC Fees** | Post-purchase maintenance on gym machinery | Variable |
| **Affiliate & Brand Partnerships** | Featured brand placements | Commission-based |

### Subscription Tiers

| Tier | Price | Benefits |
|---|---|---|
| **Freemium** | Free | Store access + public workout blogs |
| **Pro** | ₹499/month | Personalized nutrition plans + 5% discount on all products |
| **Elite** | ₹1,499/month | 1-on-1 digital coaching + early access to limited equipment drops |

---

## 🗺️ Roadmap

- [x] Project planning & architecture design
- [x] Database schema design
- [x] Tech stack finalization
- [ ] **Q1** — Domain setup, Shopify/WooCommerce config, Zoho CRM integration
- [ ] **Q2** — Vendor onboarding, initial Digital Fitness Plan content
- [ ] **Q3** — Beta launch (VESIT network), payment gateway & logistics testing
- [ ] **Q4** — Full Mumbai launch, Meta/Google Ads, target 10k+ active users
- [ ] **Year 2** — Mobile app (iOS/Android), break-even, CRM optimization
- [ ] **Year 3** — Expansion to Pune, Bangalore, Hyderabad; private-label equipment
- [ ] **Year 4** — Wearable API integration (Apple Health, Google Fit)
- [ ] **Year 5** — FitMart Experience Centers (offline kiosks), preventive healthcare market entry

---

## 👥 Team

| Role | Responsibilities |
|---|---|
| **CEO** | Vision, market strategy, brand partnerships |
| **CTO** | Full-stack development, cybersecurity, API integrations |
| **CMO** | Digital marketing, Google/Meta campaigns, growth |
| **Lead Web Architect** | Backend stability, database management (MongoDB) |
| **Logistics Coordinator** | Supply chain, vendor relations, last-mile delivery |
| **Content & Fitness Specialist** | Digital fitness plans, supplement authenticity verification |
| **Customer Success Executive** | Zoho CRM, refund handling, live chat support |
| **Cybersecurity Consultant** | Penetration testing, business continuity audits |

---

## 🤝 Contributing

Contributions are welcome! Here's how to get started:

1. **Fork** the repository
2. **Create** your feature branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Commit** your changes with a descriptive message:
   ```bash
   git commit -m "feat: add product recommendation engine"
   ```
4. **Push** to your branch:
   ```bash
   git push origin feature/your-feature-name
   ```
5. **Open a Pull Request** and describe what you've changed

### Commit Message Convention
We follow [Conventional Commits](https://www.conventionalcommits.org/):
- `feat:` — new feature
- `fix:` — bug fix
- `docs:` — documentation changes
- `style:` — formatting, no logic change
- `refactor:` — code restructure without feature change
- `test:` — adding or updating tests

---

## 🔒 Security

FitMart takes security seriously. If you discover a vulnerability, please **do not open a public issue**. Instead, email the security team directly.

- All transactions are SSL/TLS encrypted
- Payment data is processed through PCI-DSS compliant Razorpay — no card data is stored on our servers
- Firebase handles authentication tokens securely
- Regular penetration testing is performed by our cybersecurity consultant
- Cloudflare provides DDoS mitigation at the network edge

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

<div align="center">
  <p>Built with ❤️ at <strong>VESIT, Mumbai</strong></p>
  <p>FitMart © 2026 — Redefining Fitness Commerce</p>
</div>