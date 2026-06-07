# Uclose Co. — Premium E-Commerce Platform

A modern, responsive, single-page e-commerce web application built with React and Vite. This project demonstrates a premium shopping experience featuring minimalist design aesthetics, custom scroll animations, dynamic product filtering, and a comprehensive checkout process.

---

## Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [Technology Stack](#technology-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Development Server](#development-server)
  - [Building for Production](#building-for-production)
- [Project Structure](#project-structure)
- [Usage & Architecture Notes](#usage--architecture-notes)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

Uclose Co. is designed as a template for high-end fashion or accessories brands. It provides a seamless user journey from product discovery to order tracking, prioritizing user experience through smooth transitions and a mobile-first responsive design.

## Key Features

- **Premium UI/UX:** Clean, modern design aesthetics tailored for high-end brands.
- **Smooth Animations:** Custom scroll-reveal effects utilizing the Intersection Observer API, smooth page transitions, and buttery-smooth inertia scrolling powered by Lenis.
- **Responsive Layout:** Designed mobile-first to ensure pixel-perfect rendering across all device sizes.
- **Product Catalog:** Dynamic product grids with category filtering and detailed single-product views.
- **Shopping Cart Management:** Persistent shopping cart utilizing `localStorage` with size/quantity selection and real-time calculation.
- **Secure Checkout Flow:** Restricted cart and checkout access, requiring user authentication to place orders.
- **Order Tracking:** Post-purchase order tracking feature allowing users to view delivery timelines and purchased items using their generated Order ID.
- **User Dashboard:** Comprehensive 'My Account' page displaying user profiles (with dynamic avatars via Dicebear API), total expenditure, and localized recent order histories.
- **Dynamic Filtering:** URL-based filtering and sorting for product collections (e.g., Best Sellers, New Arrivals).
- **State Management:** Centralized application state management for Authentication and Cart functionality using React Context API.

## Technology Stack

| Category        | Technology                                                                |
| --------------- | ------------------------------------------------------------------------- |
| **Framework**   | [React 18](https://react.dev/)                                            |
| **Build Tool**  | [Vite](https://vitejs.dev/)                                               |
| **Routing**     | [React Router v6](https://reactrouter.com/)                               |
| **Styling**     | [Tailwind CSS](https://tailwindcss.com/)                                  |
| **Icons**       | [Heroicons](https://heroicons.com/) (SVG Integrations)                    |
| **Scrolling**   | [Lenis](https://lenis.darkroom.engineering/)                              |
| **Components**  | `react-phone-number-input`                                                |

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Ensure you have the following installed on your local development environment:

- [Node.js](https://nodejs.org/) (v16.x or later recommended)
- npm (comes with Node.js) or yarn / pnpm

### Installation

1. Clone the repository to your local machine:
   ```bash
   git clone <repository-url>
   cd Uclose
   ```

2. Install the required dependencies:
   ```bash
   npm install
   ```

### Development Server

To start the local development server with Hot Module Replacement (HMR) enabled:

```bash
npm run dev
```

Navigate to the local URL provided in your terminal (typically `http://localhost:5173` or `http://localhost:5174`) to view the application in your browser.

### Building for Production

To create an optimized, minified production build:

```bash
npm run build
```

The compiled output will be generated within the `dist/` directory, ready to be deployed to your preferred hosting provider.

## Project Structure

The repository is organized as follows:

```text
/src
├── assets/          # Static assets and global styling (index.css)
├── components/      # Reusable UI components (Navbar, Footer, ProductSection, etc.)
├── context/         # React Context providers (AuthContext.jsx, CartContext.jsx)
├── hooks/           # Custom React hooks (e.g., useScrollReveal.js)
├── pages/           # Individual route views (HomePage, AccountPage, OrderTrackingPage, etc.)
├── App.jsx          # Application entry point and routing configuration
└── main.jsx         # React DOM rendering
```

## Usage & Architecture Notes

- **Data Persistence:** The application currently utilizes the browser's native `localStorage` API to mock backend database functionality. This handles user sessions, cart contents, and simulated order histories.
- **Mock Payment System:** The checkout process includes a simulated payment gateway. It offers various payment methods (Stripe, PayPal, Google Pay, COD, Wallet) but does NOT process actual transactions or deduct real money. It simply simulates a 2-second processing delay before confirming the order.
- **Authentication Simulation:** A mock login/registration system is implemented via `AuthContext`. You must utilize the "Log In" feature to view the cart, access the user dashboard, and proceed to the checkout flow.
- **Order Tracking Testing:** Upon completing a checkout, a pseudo-random Order ID is generated. Users can utilize this ID, alongside the email address provided during checkout, to securely test the tracking page functionality. Note that you must be logged in to access the order tracking page.
- **User Accounts (Local):** The newly implemented 'My Account' page pulls data localized to the logged-in email. Orders checked out under a specific email are bound to that respective pseudo-account in `localStorage`.

## Contributing

Contributions are welcome. Please open an issue first to discuss what you would like to change.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.
