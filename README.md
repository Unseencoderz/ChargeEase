# ⚡ ChargeEase

<div align="center">

![ChargeEase Logo](https://img.shields.io/badge/⚡-ChargeEase-orange?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEzIDEwVjNMNDE0aDd2N2w5LTExaC03eiIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPC9zdmc+)

<!-- Once you upload your custom logo, replace the above with: -->
<!-- ![ChargeEase Logo](./frontend/src/assets/logos/chargeease-logo-primary.png) -->

**Find your nearest EV charging spot with ease**

*Discover over 1 million charging stations worldwide!*

[![React](https://img.shields.io/badge/React-19.0.0-61DAFB?style=flat&logo=react&logoColor=white)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7.2-3178C6?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.2.0-646CFF?style=flat&logo=vite&logoColor=white)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.1.1-06B6D4?style=flat&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=flat&logo=node.js&logoColor=white)](https://nodejs.org/)

</div>

---

## 📋 Table of Contents

- [🌟 Overview](#-overview)
- [✨ Features](#-features)
- [🛠️ Tech Stack](#️-tech-stack)
- [🚀 Getting Started](#-getting-started)
- [📂 Project Structure](#-project-structure)
- [🎯 Usage](#-usage)
- [🔧 Development](#-development)
- [📱 Screenshots](#-screenshots)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)

---

## 🌟 Overview

**ChargeEase** is a comprehensive EV (Electric Vehicle) charging station finder that helps drivers locate, book, and manage their charging sessions. With access to over 1 million charging stations worldwide, ChargeEase makes electric vehicle ownership convenient and stress-free.

### 🎯 Mission
To accelerate the adoption of electric vehicles by making charging infrastructure easily accessible and user-friendly for everyone.

---

## ✨ Features

### 🔍 **Smart Search**
- 📍 Location-based charging station discovery
- 📅 Real-time availability checking
- 🔌 Filter by connector types and charging speeds
- 📏 Distance and price sorting

### 🏆 **Curated Content**
- 🌟 Popular destinations with charging facilities
- ⭐ Top-rated charging spots with user reviews
- 🎯 Personalized recommendations

### 👥 **Charging Club**
- 💳 Exclusive member deals and discounts
- 📲 Real-time notifications for charging availability
- 🎁 Loyalty rewards program
- 📊 Usage analytics and insights

### 🔐 **User Management**
- 👤 Secure user authentication
- 📱 Account management
- 📈 Charging history tracking
- ⚙️ Personalized settings

---

## 🛠️ Tech Stack

### **Frontend**
| Technology | Version | Purpose |
|------------|---------|---------|
| ![React](https://img.shields.io/badge/-React-61DAFB?style=flat&logo=react&logoColor=white) | 19.0.0 | UI Framework |
| ![TypeScript](https://img.shields.io/badge/-TypeScript-3178C6?style=flat&logo=typescript&logoColor=white) | 5.7.2 | Type Safety |
| ![Vite](https://img.shields.io/badge/-Vite-646CFF?style=flat&logo=vite&logoColor=white) | 6.2.0 | Build Tool |
| ![TailwindCSS](https://img.shields.io/badge/-Tailwind-06B6D4?style=flat&logo=tailwindcss&logoColor=white) | 4.1.1 | Styling |
| ![Framer Motion](https://img.shields.io/badge/-Framer%20Motion-0055FF?style=flat&logo=framer&logoColor=white) | 12.9.2 | Animations |
| ![React Router](https://img.shields.io/badge/-React%20Router-CA4245?style=flat&logo=react-router&logoColor=white) | 7.5.2 | Routing |
| ![React Icons](https://img.shields.io/badge/-React%20Icons-61DAFB?style=flat&logo=react&logoColor=white) | 5.5.0 | Icons |

### **Backend**
| Technology | Version | Purpose |
|------------|---------|---------|
| ![Node.js](https://img.shields.io/badge/-Node.js-339933?style=flat&logo=node.js&logoColor=white) | Latest | Runtime |
| ![Express](https://img.shields.io/badge/-Express-000000?style=flat&logo=express&logoColor=white) | Latest | Web Framework |

### **Development Tools**
| Tool | Purpose |
|------|---------|
| ![ESLint](https://img.shields.io/badge/-ESLint-4B32C3?style=flat&logo=eslint&logoColor=white) | Code Linting |
| ![Git](https://img.shields.io/badge/-Git-F05032?style=flat&logo=git&logoColor=white) | Version Control |

---

## 🚀 Getting Started

### 📋 Prerequisites

Make sure you have the following installed:

- ![Node.js](https://img.shields.io/badge/Node.js->=18.0.0-339933?style=flat&logo=node.js&logoColor=white)
- ![npm](https://img.shields.io/badge/npm->=8.0.0-CB3837?style=flat&logo=npm&logoColor=white) or ![yarn](https://img.shields.io/badge/yarn->=1.22.0-2C8EBB?style=flat&logo=yarn&logoColor=white)

### ⚡ Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/chargeease.git
   cd chargeease
   ```

2. **Install Frontend Dependencies**
   ```bash
   cd frontend
   npm install
   ```

3. **Install Backend Dependencies**
   ```bash
   cd ../backend
   npm install
   ```

4. **Start Development Servers**
   
   **Backend** (Terminal 1):
   ```bash
   cd backend
   npm start
   # Server runs on http://localhost:5000
   ```
   
   **Frontend** (Terminal 2):
   ```bash
   cd frontend
   npm run dev
   # App runs on http://localhost:5173
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173` to see the application in action! 🎉

---

## 📂 Project Structure

```
chargeease/
├── 📁 frontend/                 # React TypeScript frontend
│   ├── 📁 public/              # Static assets
│   ├── 📁 src/
│   │   ├── 📁 components/      # React components
│   │   │   ├── 📁 home/        # Home page components
│   │   │   │   ├── ⚡ Hero.tsx           # Main hero section
│   │   │   │   ├── 🔍 SearchBar.tsx     # Charging station search
│   │   │   │   ├── 🏆 PopularDestinations.tsx
│   │   │   │   ├── ⭐ TopRatedSpots.tsx
│   │   │   │   ├── 👥 ChargingClub.tsx  # Membership section
│   │   │   │   ├── 📝 signup.tsx        # User registration
│   │   │   │   └── 🔐 login.tsx         # User authentication
│   │   │   └── 📁 layout/      # Layout components
│   │   ├── 📁 assets/          # Images, icons, etc.
│   │   ├── 🎯 App.tsx           # Main app component
│   │   ├── 🏠 Home.tsx          # Home page
│   │   └── 🎨 index.css         # Global styles
│   ├── 📄 package.json         # Frontend dependencies
│   ├── ⚙️ vite.config.ts       # Vite configuration
│   └── 📘 tsconfig.json        # TypeScript configuration
├── 📁 backend/                 # Express.js backend
│   ├── 🖥️ server.js            # Main server file
│   └── 📄 package.json         # Backend dependencies
├── 📚 README.md               # Project documentation
└── 🔧 .gitignore             # Git ignore rules
```

---

## 🎯 Usage

### 🔍 **Finding Charging Stations**

1. **Search by Location**: Enter your desired location in the search bar
2. **Set Dates**: Choose your check-in and check-out dates
3. **Specify Details**: Add number of drivers
4. **Search**: Click the search button to find available stations

### 🌟 **Exploring Features**

- **Popular Destinations**: Browse trending locations with EV-friendly amenities
- **Top Rated Spots**: Discover highly-rated charging stations based on user reviews
- **Charging Club**: Join for exclusive deals and real-time availability updates

### 👤 **Account Management**

- **Sign Up**: Create a new account for personalized features
- **Login**: Access your dashboard and charging history
- **Profile**: Manage your preferences and vehicle information

---

## 🔧 Development

### 📜 Available Scripts

#### Frontend Scripts
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

#### Backend Scripts
```bash
npm start        # Start the server
npm run dev      # Start with nodemon (if configured)
```

### 🎨 **Styling Guidelines**

The project uses **TailwindCSS** for styling with a focus on:
- 🎨 Modern, clean design
- 📱 Mobile-first responsive approach
- 🌙 Dark theme with orange accents
- ⚡ Smooth animations with Framer Motion

### 🧩 **Component Architecture**

- **Atomic Design**: Components are organized by complexity
- **Reusability**: Common components are shared across pages
- **Type Safety**: Full TypeScript coverage for better development experience

---

## 📱 Screenshots & Visuals

<div align="center">

### 🏠 **Home Page**
*Main landing page with hero section and search functionality*

![Home Page](./frontend/src/assets/screenshots/home-page.png)
<!-- Alternative: Upload your home page screenshot to ./frontend/src/assets/screenshots/home-page.png -->

### 🔍 **Search Interface**
*Advanced search with location, dates, and driver preferences*

![Search Interface](./frontend/src/assets/screenshots/search-interface.png)
<!-- Alternative: Upload your search interface screenshot to ./frontend/src/assets/screenshots/search-interface.png -->

### 🏆 **Popular Destinations**
*Curated list of trending EV-friendly locations*

![Popular Destinations](./frontend/src/assets/screenshots/popular-destinations.png)
<!-- Alternative: Upload your popular destinations screenshot to ./frontend/src/assets/screenshots/popular-destinations.png -->

### 👥 **Charging Club**
*Membership benefits and exclusive offers*

![Charging Club](./frontend/src/assets/screenshots/charging-club.png)
<!-- Alternative: Upload your charging club screenshot to ./frontend/src/assets/screenshots/charging-club.png -->

### 🎨 **App Demo**
*Watch ChargeEase in action*

![App Demo](./frontend/src/assets/screenshots/app-demo.gif)
<!-- Upload your app demo GIF to ./frontend/src/assets/screenshots/app-demo.gif -->

</div>

---

## 🖼️ **Logo & Branding**

<div align="center">

### ⚡ ChargeEase Logo Variations

| **Primary Logo** | **Icon Only** | **Light Version** |
|:---:|:---:|:---:|
| ![Primary Logo](./frontend/src/assets/logos/chargeease-logo-primary.png) | ![Icon](./frontend/src/assets/logos/chargeease-icon.png) | ![Light Logo](./frontend/src/assets/logos/chargeease-logo-light.png) |

### 🎨 **Brand Colors**
- **Primary Orange**: `#F97316` 🟠
- **Dark Background**: `#374151` ⚫
- **Light Text**: `#FFFFFF` ⚪
- **Gray Accent**: `#6B7280` 🔘

</div>

---

## 📤 **Adding Images & Assets**

To add your project images and logos to this README:

### 📁 **Directory Structure**
```
frontend/src/assets/
├── 📁 screenshots/          # App screenshots
│   ├── home-page.png
│   ├── search-interface.png
│   ├── popular-destinations.png
│   ├── charging-club.png
│   └── app-demo.gif
├── 📁 logos/               # Brand logos
│   ├── chargeease-logo-primary.png
│   ├── chargeease-icon.png
│   └── chargeease-logo-light.png
└── 📁 icons/               # App icons
    ├── favicon.ico
    └── app-icon.png
```

### 📸 **Upload Instructions**
1. Take screenshots of your app's main features
2. Create/design your logos and icons
3. Upload them to the appropriate directories above
4. The README will automatically display them!

### 📏 **Recommended Image Sizes**
- **Screenshots**: 800px wide (PNG format)
- **Logos**: 200-400px wide (PNG/SVG format)
- **Icons**: 64px, 128px, 256px (PNG/ICO format)
- **Demo GIF**: Max 5MB, 800px wide

---

## 🤝 Contributing

We love contributions! Here's how you can help make ChargeEase even better:

### 🌟 **How to Contribute**

1. **Fork the repository**
2. **Create your feature branch**
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add some AmazingFeature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/AmazingFeature
   ```
5. **Open a Pull Request**

### 📝 **Contribution Guidelines**

- 🧪 Write tests for new features
- 📖 Update documentation as needed
- 🎨 Follow the existing code style
- 💬 Use clear, descriptive commit messages

### 🐛 **Bug Reports**

Found a bug? Please open an issue with:
- 📝 Clear description of the problem
- 🔄 Steps to reproduce
- 💻 Your environment details
- 📷 Screenshots (if applicable)

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

<div align="center">

### 🌟 **Star this repository if you found it helpful!**

[![GitHub stars](https://img.shields.io/github/stars/yourusername/chargeease?style=social)](https://github.com/yourusername/chargeease/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/yourusername/chargeease?style=social)](https://github.com/yourusername/chargeease/network)

---

**Made with ⚡ by the ChargeEase Team**

*Accelerating the future of electric mobility* 🚗💚

</div>