# Design Specification: Authentication Terminal (Login) & Zomato-Style Live Order Tracking

**Date:** 2026-11-11  
**Project:** KRONOS Engineered E-Commerce Platform  
**Status:** Approved by User  

---

## 1. Overview
This specification details the addition of:
1. A dedicated, aesthetic **Login Page (Access Terminal)** matching the KRONOS dark-and-lime cyberpunk design language.
2. Three predefined demo credentials displayed on the login page:
   - **Admin** (`admin@kronos.corp`)
   - **Customer** (`customer@kronos.net`)
   - **Shipping / Logistics** (`shipping@kronos.corp`)
3. A mock **JWT Token** generation and display mechanism showing the JWT token name and token string upon authentication.
4. An interactive **Zomato-style Fake Live Order Tracking** modal/system that triggers when an order is placed and is also accessible from the orders list, complete with a live-moving courier on a tactical grid map, ETA countdown, driver contact card, and real-time status progression.

---

## 2. Authentication System & Credentials

### 2.1 Demo Accounts
The login page provides clear cards and 1-click sign-in buttons for 3 roles:
1. **Admin Identity**
   - **Email:** `admin@kronos.corp`
   - **Password:** `admin123`
   - **Role:** `admin`
   - **Privileges:** Full access to Executive Admin Analytics, inventory controls, and system telemetry.
2. **Customer Identity**
   - **Email:** `customer@kronos.net`
   - **Password:** `cust123`
   - **Role:** `customer`
   - **Privileges:** Shopping catalog, customized cart, wishlist, and personal order tracking.
3. **Shipping / Courier Identity**
   - **Email:** `shipping@kronos.corp`
   - **Password:** `ship123`
   - **Role:** `shipping`
   - **Privileges:** Real-time dispatch hub, fleet telemetry, and active order delivery controls.

### 2.2 JWT Token Architecture
- **Token Name:** `KRONOS_AUTH_JWT_TOKEN` (stored in `localStorage` & application state).
- **Mock Token Generator:** Generates a realistic base64-encoded mock JWT:
  `header.payload.signature` containing `sub`, `email`, `role`, `iat`, and `exp`.
- **Display on Login Page:**
  - Displays the active **Token Name** (`KRONOS_AUTH_JWT_TOKEN`) and the generated **JWT Token String** in a styled cryptographic terminal box once authenticated.
  - Quick "Copy Token" button for developer inspection.

### 2.3 User Experience & Routing
- New `activeTab = 'login'` added to navigation.
- Top Navbar displays:
  - If unauthenticated: "SIGN IN" button with key icon.
  - If authenticated: User profile badge with avatar, email, role badge (`ADMIN`, `CUSTOMER`, `SHIPPING`), and "SWITCH / LOGOUT" button.
- Dynamic navigation links based on role (Admin sees Admin Analytics, Shipping sees Fleet Dispatch, Customer sees Orders & Wishlist).

---

## 3. Zomato-Style Live Order Tracking

### 3.1 Trigger & Accessibility
- **Automatic Trigger:** Opens immediately upon checkout in `CartDrawer.jsx` when user clicks "PAY & INSTANT CHECKOUT".
- **On-Demand Trigger:** Can be reopened at any time from `OrdersPage.jsx` by clicking "TRACK LIVE DELIVERY" on any order.

### 3.2 Key Components of the Zomato Tracking Modal
1. **Interactive Tactical Delivery Map (SVG Animated)**:
   - Dark theme vector grid map with street lines and city blocks (Neo-Veridia Sector 9).
   - Origin marker: *Kronos Fulfillment Hub*.
   - Destination marker: *Customer Delivery Address*.
   - **Moving Courier Marker:** Delivery bike/drone icon with pulsing neon lime radar ping moving smoothly along the route path toward the customer's location.
2. **Live ETA & Status Tracker**:
   - Header with countdown: e.g., *"Arriving in 4 mins"* -> *"Rider 400m away"* -> *"Arrived!"*.
   - Dynamic 4-stage stepper:
     1. `Order Confirmed & Hub Packaging`
     2. `Assigned to Courier Driver`
     3. `Out for Delivery (Rider in Transit)`
     4. `Delivered to Doorstep`
   - Fast-Forward simulation controls (Pause, Resume, Skip to Next Stage) so users can test the full delivery flow instantly.
3. **Delivery Partner Card (Zomato-Style)**:
   - Driver Name: *Agent Marcus Vance*
   - Rating: ⭐ *4.98 (1,420 deliveries)*
   - Vehicle: *Kronos Hyper-Electric Cargo Bike #KN-404*
   - Interactive buttons: "Call Driver", "Message", and "Safety Shield Verified".
4. **Live Telemetry & Activity Feed**:
   - Timestamped live updates scrolling as delivery progresses:
     - `[00:01]` Order accepted & verified by Kronos Depot.
     - `[00:04]` Dispatched with Courier Marcus Vance.
     - `[00:08]` Rider passing Sector 9 Central Expressway.
     - `[00:15]` Approaching dropoff destination.

---

## 4. State Management (`src/store/useStore.js`)
- Store extensions:
  - `currentUser`: `{ id, name, email, role, avatar, token }`
  - `jwtToken`: Mock JWT string
  - `jwtTokenName`: `'KRONOS_AUTH_JWT_TOKEN'`
  - `activeTrackingOrder`: Current order object loaded into the live tracking modal
  - `login(email, password)`: Validates credentials, sets user, creates JWT, saves to storage.
  - `logout()`: Clears user and token.
  - `updateOrderStatus(orderId, newStatus)`: Synchronizes tracking stages with the Orders list.

---

## 5. Verification Plan
1. **Login Page Test:**
   - Verify UI rendering with Kronos dark/lime styling.
   - Click each of the 3 credentials (Admin, Customer, Shipping) -> confirm quick auto-fill and successful login.
   - Verify that the JWT token name (`KRONOS_AUTH_JWT_TOKEN`) and generated JWT token display correctly.
   - Verify that Admin role unlocks Admin Analytics, and logout resets the session.
2. **Checkout & Zomato Tracking Test:**
   - Add item to cart and proceed to checkout.
   - Confirm immediate launch of the Zomato-style live tracking modal.
   - Confirm courier icon moves along the route, ETA counts down, status advances, and driver card displays.
   - Confirm order in "Track Orders" page updates to match the tracking status.
