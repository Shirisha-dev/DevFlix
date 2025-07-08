# DevFlix - Netflix-Themed Portfolio Showcase

A beautiful, accessible portfolio showcase webpage inspired by Netflix's design language, featuring React and Angular portfolio cards with smooth hover animations and full keyboard navigation support.

## 🎯 Features

### Design & UI
- **Netflix-inspired theme** with dark background and red accent colors
- **Responsive design** that works on all device sizes
- **Smooth hover animations** with scale effects and glowing borders
- **Gradient overlays** and modern card layouts
- **Professional typography** with proper visual hierarchy

### Accessibility (WCAG Compliant)
- **Full keyboard navigation** support (Tab, Enter, Space)
- **Screen reader compatibility** with comprehensive ARIA labels
- **Skip to main content** link for assistive technologies
- **High contrast focus indicators** for better visibility
- **Semantic HTML structure** with proper landmarks
- **Descriptive alt text** and labels for all interactive elements

### Interactive Elements
- **Clickable portfolio cards** that open external links in new tabs
- **Hover effects** with color transitions and scaling animations
- **Keyboard activation** using Enter or Space keys
- **Visual feedback** with progress bars and state changes

## 🛠️ Technologies Used

- **React 18** - Modern component-based UI library
- **TypeScript** - Type-safe JavaScript development
- **Tailwind CSS** - Utility-first CSS framework for styling
- **Lucide React** - Beautiful, customizable icon library
- **Vite** - Fast build tool and development server
- **ESLint** - Code linting and quality assurance

## 📁 Project Structure

```
src/
├── App.tsx          # Main application component
├── main.tsx         # React application entry point
├── index.css        # Global styles and Tailwind imports
└── vite-env.d.ts    # TypeScript environment definitions

config/
├── tailwind.config.js    # Tailwind CSS configuration
├── postcss.config.js     # PostCSS configuration
├── tsconfig.json         # TypeScript configuration
├── vite.config.ts        # Vite build configuration
└── eslint.config.js      # ESLint linting rules
```

## 🚀 Getting Started

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd devflix-portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   Navigate to `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build production-ready application
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint code quality checks

## 🎨 Customization

### Adding New Portfolio Cards

To add more portfolio cards, modify the cards section in `src/App.tsx`:

```tsx
<article
  onClick={() => handleCardClick('YOUR_URL_HERE', 'Project Title')}
  onKeyDown={(e) => handleKeyDown(e, 'YOUR_URL_HERE', 'Project Title')}
  className="group relative bg-gradient-to-br from-gray-900 to-black..."
  // ... rest of the card structure
>
  {/* Card content */}
</article>
```

### Changing Colors

The color scheme uses Tailwind CSS classes. Key colors:
- **Primary brand**: `red-600` (Netflix red)
- **React card**: `blue-600` 
- **Angular card**: `red-600`
- **Background**: `black` and `gray-900`

### Modifying Animations

Hover animations are controlled by these Tailwind classes:
- `hover:scale-105` - Card scaling effect
- `hover:border-red-500` - Border color change
- `hover:shadow-2xl hover:shadow-red-500/20` - Glowing shadow
- `transition-all duration-300` - Smooth transitions

## ♿ Accessibility Features

### Keyboard Navigation
- **Tab** - Navigate between interactive elements
- **Enter/Space** - Activate portfolio cards
- **Skip link** - Jump directly to main content

### Screen Reader Support
- Semantic HTML landmarks (`header`, `main`, `footer`)
- ARIA labels for all interactive elements
- Descriptive text for technology tags
- Clear indication of external links

### Visual Accessibility
- High contrast focus indicators
- Proper heading hierarchy (h1 → h2 → h3)
- Sufficient color contrast ratios
- Scalable text and responsive design

## 🔗 Portfolio Links

- **React Portfolio**: [https://shirisha-portfolio.vercel.app/](https://shirisha-portfolio.vercel.app/)
- **Angular Portfolio**: [https://shirisha-angular-portfolio.vercel.app//](https://shirisha-angular-portfolio.vercel.app/)

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

Created with ❤️ for showcasing modern web development skills.

---

**Note**: This project demonstrates modern React development practices, accessibility compliance, and responsive design principles suitable for production use.