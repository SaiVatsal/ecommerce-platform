# Login Terminal & Zomato-Style Live Tracking Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement a dedicated Cyberpunk-themed Login page with 3 demo credentials (Admin, Customer, Shipping) and JWT token generation/display, alongside a Zomato-style simulated live order tracking screen that activates when orders are placed, then commit and prepare for GitHub push.

**Architecture:**
- Zustand store (`useStore.js`) expanded to manage `currentUser`, mock JWT tokens (`jwtToken`, `jwtTokenName`), credential authentication, and `activeTrackingOrder`.
- `LoginPage.jsx` provides an interactive authentication terminal with 1-click fill cards for Admin, Customer, and Shipping accounts, plus an encrypted JWT token inspector.
- `LiveOrderTrackingModal.jsx` provides a Zomato-style simulated delivery experience with an animated SVG route map, moving courier bike marker, ETA countdown, delivery partner contact card, and live telemetry log.
- `Navbar.jsx`, `CartDrawer.jsx`, and `OrdersPage.jsx` integrated for unified auth awareness and instant tracking activation upon checkout.

**Tech Stack:** React 18, Vite, Tailwind CSS, Lucide React, Zustand.

---

### Task 1: Extend Zustand Store with Authentication & Tracking State
**Files to modify:** `ecommerce-platform-main/src/store/useStore.js`
- [ ] Add 3 predefined credentials (`admin@kronos.corp` / `admin123`, `customer@kronos.net` / `cust123`, `shipping@kronos.corp` / `ship123`).
- [ ] Add `currentUser`, `jwtTokenName: 'KRONOS_AUTH_JWT_TOKEN'`, `jwtToken` state, and helper to generate mock base64-encoded JWTs.
- [ ] Add `login(email, password)` and `logout()` store actions.
- [ ] Add `activeTrackingOrder` state, `setActiveTrackingOrder(order)`, and `updateOrderStatus(orderId, status)` actions.

---

### Task 2: Create Cyberpunk Login Terminal Page (`LoginPage.jsx`)
**Files to create:** `ecommerce-platform-main/src/pages/LoginPage.jsx`
- [ ] Design terminal header with biometric authentication styling.
- [ ] Email and password form with toggleable visibility and error messaging.
- [ ] Display the 3 Credential Cards (Admin, Customer, Shipping) with 1-click quick login.
- [ ] Display the **JWT Token Name** (`KRONOS_AUTH_JWT_TOKEN`) and generated **JWT Token String** with a one-click copy button.
- [ ] Add active session card when logged in with a "Sign Out" button.

---

### Task 3: Build Zomato-Style Live Order Tracking Component (`LiveOrderTrackingModal.jsx`)
**Files to create:** `ecommerce-platform-main/src/components/LiveOrderTrackingModal.jsx`
- [ ] Interactive SVG vector delivery map with dark grid, route path, fulfillment hub, customer pin, and animated courier bike marker moving along the path.
- [ ] Live ETA countdown banner (*"Arriving in 4 mins"*, *"Rider 300m away"*).
- [ ] 4-Stage stepper with automated status transitions (`Order Confirmed` -> `Dispatched` -> `Out for Delivery` -> `Delivered`).
- [ ] Delivery Partner Card (Agent Marcus Vance, ⭐ 4.98 rating, Hyper-Electric Cargo Bike #KN-404, simulated call & message buttons).
- [ ] Live activity telemetry feed with real-time timestamps.
- [ ] Simulation speed controls (Play/Pause, Fast-Forward to next stage).

---

### Task 4: Upgrade Navbar with Auth Profile & Dynamic Links
**Files to modify:** `ecommerce-platform-main/src/components/Navbar.jsx`
- [ ] Replace static select dropdown with user profile pill showing user avatar, name, and role tag.
- [ ] Add "Sign In" button when guest / "Logout / Switch" when logged in.
- [ ] Conditionally show navigation tabs based on role (Admin sees Admin Analytics, Shipping sees Fleet telemetry, Customer sees Orders & Wishlist).

---

### Task 5: Connect CartDrawer Checkout & OrdersPage to Live Tracker
**Files to modify:** `ecommerce-platform-main/src/components/CartDrawer.jsx`, `ecommerce-platform-main/src/pages/OrdersPage.jsx`
- [ ] In `CartDrawer.jsx`, after order checkout completes, launch `LiveOrderTrackingModal` automatically.
- [ ] In `OrdersPage.jsx`, add a "TRACK LIVE (ZOMATO VIEW)" button on every order card to open the live tracking modal.

---

### Task 6: Wire Routes & Global Modal in `App.jsx`
**Files to modify:** `ecommerce-platform-main/src/App.jsx`
- [ ] Import `LoginPage` and `LiveOrderTrackingModal`.
- [ ] Add `activeTab === 'login'` view.
- [ ] Render `LiveOrderTrackingModal` globally whenever `activeTrackingOrder` is set.

---

### Task 7: Build Verification & Quality Check
**Files to verify:** Whole application
- [ ] Run `npm run build` using Vite to verify zero syntax or build errors.
- [ ] Test login switching between Admin, Customer, and Shipping.
- [ ] Verify JWT token display and copying.
- [ ] Verify checkout and Zomato-style live tracking animation.

---

### Task 8: Git Commit & GitHub Push Setup
**Files to commit:** Entire project repository
- [ ] Initialize git repository inside project directory.
- [ ] Commit all changes with descriptive commit messages.
- [ ] Check existing remotes or configure remote for GitHub push.
