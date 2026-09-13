# TourGuide Pro — Full Stack Tour Guide Platform

A MERN-stack tour booking platform with maps, real-time chat, and role-based dashboards (Traveler / Guide / Admin).

## Stack
- Frontend: React (Vite) + Tailwind CSS + React Router + Leaflet (maps) + Socket.io-client
- Backend: Node.js + Express + MongoDB (Mongoose) + JWT auth + Socket.io
- Payments: mock endpoint included — swap in Razorpay/Stripe for production

## Project Structure
```
tourguide-app/
├── server/     # Express API + Socket.io
└── client/     # React frontend (Vite)
```

## Setup

### 1. Backend
```bash
cd server
npm install
cp .env.example .env   # then edit MONGO_URI and JWT_SECRET
npm run dev
```
Runs on http://localhost:5000

### 2. Frontend
```bash
cd client
npm install
cp .env.example .env
npm run dev
```
Runs on http://localhost:5173

### 3. Database
Use a local MongoDB instance or a free MongoDB Atlas cluster. Put the connection string in `server/.env` as `MONGO_URI`.

## Core Flows Implemented
- **Auth**: register/login as `traveler` or `guide`, JWT stored client-side.
- **Tours**: guides create/edit/delete tour packages; travelers browse & search with category filters.
- **Booking + Real Payments**: traveler books a tour → real Razorpay Checkout opens → payment signature is verified server-side → status becomes `confirmed`.
- **My Bookings**: travelers see all their bookings with live status and a link to chat once confirmed.
- **Map**: each tour detail page renders a Leaflet map pinned to the tour's lat/lng.
- **Chat**: real-time messaging per booking via Socket.io, persisted in MongoDB.
- **Guide Dashboard**: create, **edit**, and **delete** tour packages; view incoming bookings; jump into chat.
- **Admin Dashboard**: view all tours (extend with guide verification / bans as needed).
- **Toast notifications**: success/error feedback across the app instead of silent actions.
- **Redesigned UI**: gradient brand theme, hero search section, category chips, card hover effects, skeleton loaders.

## Setting Up Razorpay (test mode)
1. Sign up free at https://dashboard.razorpay.com/ → switch to **Test Mode**.
2. Go to Settings → API Keys → Generate Test Key. Copy the Key ID and Key Secret.
3. Put them in `server/.env` as `RAZORPAY_KEY_ID` and `RAZORPAY_KEY_SECRET`.
4. Put the Key ID (not the secret) in `client/.env` as `VITE_RAZORPAY_KEY_ID`.
5. In test mode, use card `4111 1111 1111 1111`, any future expiry, and any CVV to simulate a successful payment.

## Next Steps to Extend
1. Add image upload via Cloudinary for tour photos and user avatars (currently uses a plain image URL field).
2. Add guide verification workflow (admin approves before guide can publish tours).
3. Add pagination/infinite scroll on the tour listing.
4. Add unit tests (Jest) for controllers and integration tests for routes.
5. Deploy: frontend → Vercel, backend → Render/Railway, DB → MongoDB Atlas.

## Environment Variables

**server/.env**
```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret
CLIENT_URL=http://localhost:5173
```

**client/.env**
```
VITE_API_URL=http://localhost:5000/api
VITE_SOCKET_URL=http://localhost:5000
```
