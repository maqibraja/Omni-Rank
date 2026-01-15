# Omni Rank - All-in-One SEO & Viral Growth Platform

[![React](https://img.shields.io/badge/React-19.2.0-blue)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-7.2.4-646CFF)](https://vitejs.dev/)
[![Express.js](https://img.shields.io/badge/Express.js-5.2.1-%23404d59.svg)](http://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Node.js](https://img.shields.io/badge/Node.js-20.x-green)](https://nodejs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1.18-38B2AC)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Omni Rank is a comprehensive SEO and viral growth SaaS platform that combines the power of Semrush, Ahrefs, and Screaming Frog in a single interface. Designed for digital marketers, agencies, and businesses looking to dominate search rankings and accelerate growth.

## 🚀 Features

### SEO Tools
- **Keyword Magic**: Advanced keyword research and discovery
- **Rank Tracker**: Monitor keyword positions across search engines
- **Site Audit**: Comprehensive technical SEO analysis
- **Backlink Miner**: Find and analyze competitor backlinks
- **Competitor Gap Analysis**: Identify opportunities in competitor strategies

### Growth Tools
- **Trend Surfer**: Discover trending topics and viral content opportunities
- **Viral Loop**: Create and track viral growth campaigns
- **AI Optimization**: Automated content and SEO optimization
- **Voice Search**: Optimize for voice search queries
- **Press Release Distribution**: Amplify content reach

### Agency Features
- **Agency Mode**: White-label capabilities for agencies
- **Client Management**: Manage multiple client accounts
- **Reporting**: Generate professional reports for clients

## 🛠️ Technologies Stack

### Frontend
- **React 19.2.0**: Modern component-based UI framework
- **Vite 7.2.4**: Fast build tool and development server
- **Tailwind CSS 4.1.18**: Utility-first CSS framework
- **Framer Motion**: Smooth animations and micro-interactions
- **Recharts**: Beautiful data visualization
- **Lucide React**: Consistent iconography
- **React Router DOM**: Client-side routing

### Backend
- **Node.js**: JavaScript runtime environment
- **Express.js 5.2.1**: Web application framework
- **MongoDB**: NoSQL document database
- **Mongoose**: MongoDB object modeling
- **JSON Web Tokens (JWT)**: Authentication mechanism
- **bcryptjs**: Password hashing
- **Axios**: HTTP client for API requests
- **Cheerio**: Server-side HTML parsing (for web scraping)

### Development & Utilities
- **Dotenv**: Environment variable management
- **CORS**: Cross-Origin Resource Sharing
- **Express Async Handler**: Simplified async error handling
- **Nodemon**: Automatic server restart during development
- **Concurrently**: Run multiple commands simultaneously

### Styling & UX
- **Glassmorphism Design**: Modern glass-like UI elements
- **Dark Theme**: Eye-friendly dark interface optimized for long sessions
- **Responsive Layout**: Works seamlessly on all devices
- **Animations**: Smooth transitions and interactive elements

## 📊 Dashboard Overview

The platform features a comprehensive dashboard with:
- Real-time traffic analytics
- SEO health scoring
- Keyword ranking trends
- Traffic source distribution
- Top-performing keywords
- Site audit results
- Viral trend alerts

## 🏗️ Project Structure

```
├── public/              # Static assets
├── src/                 # Frontend source code
│   ├── assets/          # Images, icons, and static files
│   ├── components/      # Reusable UI components
│   │   ├── Header.jsx
│   │   └── Sidebar.jsx
│   ├── pages/           # Feature-specific pages
│   │   ├── Dashboard.jsx
│   │   ├── KeywordMagic.jsx
│   │   ├── BacklinkMiner.jsx
│   │   ├── CompetitorGap.jsx
│   │   ├── RankTracker.jsx
│   │   ├── SiteAudit.jsx
│   │   ├── TrendSurfer.jsx
│   │   ├── ViralLoop.jsx
│   │   ├── PressRelease.jsx
│   │   ├── AIOptimization.jsx
│   │   ├── VoiceSearch.jsx
│   │   └── AgencyMode.jsx
│   ├── App.jsx          # Main application component
│   ├── main.jsx         # Application entry point
│   └── index.css        # Global styles and custom properties
├── server/              # Backend source code
│   ├── config/          # Configuration files
│   │   └── db.js        # Database connection
│   ├── controllers/     # Request handlers
│   ├── middleware/      # Custom middleware
│   ├── models/          # Mongoose schemas
│   │   └── User.js      # User model
│   ├── routes/          # API route definitions
│   │   ├── authRoutes.js
│   │   └── toolRoutes.js
│   └── index.js         # Server entry point
├── .env.example         # Environment variables template
├── package.json         # Dependencies and scripts
├── vite.config.js       # Vite configuration
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18.x or later
- MongoDB (local installation or cloud Atlas)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/omni-rank.git
cd omni-rank
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env` file in the root directory with the following:
```env
NODE_ENV=development
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

4. Start the development servers:
```bash
# Run frontend and backend concurrently
npm run dev:all
```

Or run them separately:
```bash
# Terminal 1: Start frontend
npm run dev

# Terminal 2: Start backend
npm run server
```

5. Open your browser and navigate to `http://localhost:5173`

### Available Scripts

- `npm run dev`: Start frontend development server with hot reload
- `npm run server`: Start backend server with nodemon
- `npm run dev:all`: Start both frontend and backend concurrently
- `npm run build`: Build frontend for production
- `npm run preview`: Preview production build locally
- `npm run lint`: Lint code with ESLint

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user info

### SEO Tools
- `POST /api/tools/audit` - Perform site audit
- `POST /api/tools/keywords` - Get keyword suggestions
- `POST /api/tools/rank` - Check keyword rankings

All protected routes require JWT authentication in the Authorization header.

## 🎨 Design System

The platform follows a consistent design system with:

### Color Palette
- Primary: #6366f1 (Indigo)
- Accent: #22d3ee (Cyan)
- Success: #10b981 (Emerald)
- Warning: #f59e0b (Amber)
- Danger: #ef4444 (Red)
- Background: #0a0a0f (Dark)

### Typography
- Font Family: Inter (with fallbacks)
- Responsive scaling for optimal readability

### Components
- Glass cards with backdrop filters
- Animated hover effects
- Gradient accents
- Consistent spacing and sizing

## 📱 Responsive Design

Omni Rank is fully responsive and adapts to:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (320px - 767px)

Features include collapsible sidebar on mobile and adaptive grid layouts.

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🐛 Issues & Support

If you encounter any issues or have questions, please file an issue on the GitHub repository.

## 🙏 Acknowledgments

- Built with React and Vite for optimal performance
- Icons by Lucide React
- Charts by Recharts
- Styling with Tailwind CSS
- Animations by Framer Motion
- Powered by Node.js and MongoDB

---

Made with ❤️ for digital marketers and SEO professionals worldwide.