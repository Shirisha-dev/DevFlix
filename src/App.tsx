import React, { useState, useEffect } from 'react';
import { ExternalLink, Code, Terminal, ArrowLeft, Home, AlertCircle } from 'lucide-react';

interface PortfolioSite {
  url: string;
  title: string;
  type: 'react' | 'angular';
}

function App() {
  const [currentSite, setCurrentSite] = useState<PortfolioSite | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleCardClick = (url: string, title: string, type: 'react' | 'angular') => {
    setCurrentSite({ url, title, type });
    setIsLoading(true);
    setHasError(false);
  };

  const handleKeyDown = (event: React.KeyboardEvent, url: string, title: string, type: 'react' | 'angular') => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleCardClick(url, title, type);
    }
  };

  const handleBackClick = () => {
    setCurrentSite(null);
    setIsLoading(false);
    setHasError(false);
  };

  const handleBackKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleBackClick();
    }
  };

  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  const handleIframeError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  const openInNewTab = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  // If viewing a portfolio site, show iframe view
  if (currentSite) {
    return (
      <div className="h-screen bg-black text-white flex flex-col overflow-hidden">
        {/* Skip to main content link for screen readers */}
        <a 
          href="#iframe-content" 
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-red-600 text-white px-4 py-2 rounded-md z-50 focus:outline-none focus:ring-2 focus:ring-white"
        >
          Skip to portfolio content
        </a>

        {/* Header with back button */}
        <header className="px-4 sm:px-8 py-4 border-b border-gray-800 flex-shrink-0" role="banner">
          <div className="flex items-center justify-between max-w-6xl mx-auto">
            <div className="flex items-center space-x-4">
       
              
              <div className="flex items-center space-x-2" onClick={handleBackClick} onKeyDown={handleBackKeyDown}>
                <div 
                  className="w-6 h-6 bg-red-600 rounded flex items-center justify-center"
                  aria-hidden="true" 
                >
                  <Code className="w-4 h-4 text-white" />
                </div>
                <span className="text-lg font-bold text-red-600">DevFlix</span>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div 
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  currentSite.type === 'react' ? 'bg-blue-600' : 'bg-red-600'
                }`}
                aria-hidden="true"
              >
                {currentSite.type === 'react' ? (
                  <Code className="w-4 h-4 text-white" />
                ) : (
                  <Terminal className="w-4 h-4 text-white" />
                )}
              </div>
              <div>
                <h1 className="text-lg font-bold text-white">{currentSite.title}</h1>
                <p className={`text-xs ${
                  currentSite.type === 'react' ? 'text-blue-400' : 'text-red-400'
                }`}>
                  {currentSite.type === 'react' ? 'React Portfolio' : 'Angular Portfolio'}
                </p>
              </div>
              
              <button
                onClick={() => openInNewTab(currentSite.url)}
                className="p-2 text-gray-400 hover:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-black rounded"
                aria-label={`Open ${currentSite.title} in new tab`}
                title="Open in new tab"
              >
                <ExternalLink className="w-4 h-4" />
              </button>
            </div>
          </div>
        </header>

        {/* Portfolio iframe */}
        <main className="flex-1 relative overflow-hidden" role="main">
          {hasError ? (
            <div className="flex items-center justify-center w-full h-full bg-gray-900">
              <div className="text-center p-8 max-w-md">
                <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
                <h2 className="text-xl font-bold text-white mb-2">Unable to Load Portfolio</h2>
                <p className="text-gray-400 mb-6">
                  This portfolio site cannot be displayed within DevFlix due to security restrictions.
                </p>
                <div className="space-y-3">
                  <button
                    onClick={() => openInNewTab(currentSite.url)}
                    className="w-full px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-900"
                  >
                    Open in New Tab
                  </button>
                  <button
                    onClick={handleBackClick}
                    className="w-full px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-900"
                  >
                    Back to DevFlix
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <>
              <iframe
                id="iframe-content"
                src={currentSite.url}
                className="w-full h-full border-0 block"
                title={`${currentSite.title} - Portfolio showcase`}
                loading="lazy"
                onLoad={handleIframeLoad}
                onError={handleIframeError}
                aria-label={`${currentSite.title} portfolio content`}
              />
              
              {/* Loading overlay */}
              {isLoading && (
                <div className="absolute inset-0 bg-black flex items-center justify-center z-10">
                  <div className="text-center">
                    <div className="w-8 h-8 border-2 border-red-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-400">Loading portfolio...</p>
                  </div>
                </div>
              )}
            </>
          )}
        </main>

        {/* Quick navigation footer */}
        <footer className="px-4 sm:px-8 py-3 border-t border-gray-800 bg-gray-900/50 flex-shrink-0" role="contentinfo">
          <div className="flex items-center justify-between max-w-6xl mx-auto">
            <div className="flex items-center space-x-4">
              <button
                onClick={handleBackClick}
                onKeyDown={handleBackKeyDown}
                className="flex items-center space-x-1 text-gray-400 hover:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-900 rounded px-2 py-1"
                aria-label="Return to DevFlix home"
              >
                <Home className="w-3 h-3" aria-hidden="true" />
                <span className="text-xs">Home</span>
              </button>
            </div>
            
            <div className="flex items-center space-x-4">
              <p className="text-xs text-gray-500">
                Viewing in DevFlix
              </p>
              <button
                onClick={() => openInNewTab(currentSite.url)}
                className="text-xs text-gray-400 hover:text-white transition-colors duration-200 focus:outline-none focus:ring-1 focus:ring-red-500 rounded px-2 py-1"
              >
                Open in new tab
              </button>
            </div>
          </div>
        </footer>
      </div>
    );
  }

  // Main DevFlix page
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Skip to main content link for screen readers */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-red-600 text-white px-4 py-2 rounded-md z-50 focus:outline-none focus:ring-2 focus:ring-white"
      >
        Skip to main content
      </a>

      {/* Header */}
      <header className="px-8 py-6" role="banner">
        <div className="flex items-center space-x-2">
          <div 
            className="w-8 h-8 bg-red-600 rounded flex items-center justify-center"
            aria-hidden="true"
          >
            <Code className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-red-600">DevFlix</h1>
        </div>
      </header>

      {/* Main Content */}
      <main 
        id="main-content"
        className="px-8 py-12" 
        role="main"
        aria-label="Portfolio collection showcase"
      >
        <div className="max-w-6xl mx-auto">
          {/* Title Section */}
          <section className="text-center mb-16" aria-labelledby="portfolio-heading">
            <h2 
              id="portfolio-heading"
              className="text-5xl font-bold mb-4 bg-gradient-to-r from-red-600 to-red-400 bg-clip-text text-transparent"
            >
              Portfolio Collection
            </h2>
            <p 
              className="text-xl text-gray-300 max-w-2xl mx-auto"
              aria-describedby="portfolio-heading"
            >
              Explore my development journey through React and Angular projects
            </p>
          </section>

          {/* Cards Container */}
          <section 
            className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto"
            aria-label="Portfolio projects"
            role="region"
          >
            {/* React Card */}
            <article
              onClick={() => handleCardClick('https://shirisha-portfolio.vercel.app/', 'React Portfolio', 'react')}
              onKeyDown={(e) => handleKeyDown(e, 'https://shirisha-portfolio.vercel.app/', 'React Portfolio', 'react')}
              className="group relative bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-lg overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105 hover:border-red-500 hover:shadow-2xl hover:shadow-red-500/20 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-black"
              role="button"
              tabIndex={0}
              aria-label="View React portfolio within DevFlix"
              aria-describedby="react-description"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-cyan-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden="true"></div>
              
              <div className="relative p-8">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <div 
                      className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center"
                      aria-hidden="true"
                    >
                      <Code className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white">React</h3>
                      <p className="text-blue-400 text-sm" aria-label="Technology category">Modern Frontend</p>
                    </div>
                  </div>
                  <div className="text-gray-400 group-hover:text-white transition-colors duration-200" aria-hidden="true">
                    <span className="text-xs">View in DevFlix</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <p 
                    id="react-description"
                    className="text-gray-300 leading-relaxed"
                  >
                    Explore my React portfolio showcasing modern component-based architecture, 
                    hooks, and responsive design patterns.
                  </p>
                  
                  <div 
                    className="flex flex-wrap gap-2"
                    role="list"
                    aria-label="Technologies used"
                  >
                    <span className="px-3 py-1 bg-blue-600/20 text-blue-400 rounded-full text-sm" role="listitem">React</span>
                    <span className="px-3 py-1 bg-blue-600/20 text-blue-400 rounded-full text-sm" role="listitem">TypeScript</span>
                    <span className="px-3 py-1 bg-blue-600/20 text-blue-400 rounded-full text-sm" role="listitem">Modern UI</span>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-800">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400" aria-hidden="true">Click to explore</span>
                    <div 
                      className="w-8 h-1 bg-blue-600 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
                      aria-hidden="true"
                    ></div>
                  </div>
                </div>
              </div>
            </article>

            {/* Angular Card */}
            <article
              onClick={() => handleCardClick('https://shirisha-angular-portfolio.vercel.app/', 'Angular Portfolio', 'angular')}
              onKeyDown={(e) => handleKeyDown(e, 'https://shirisha-angular-portfolio.vercel.app/', 'Angular Portfolio', 'angular')}
              className="group relative bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-lg overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105 hover:border-red-500 hover:shadow-2xl hover:shadow-red-500/20 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-black"
              role="button"
              tabIndex={0}
              aria-label="View Angular portfolio within DevFlix"
              aria-describedby="angular-description"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-red-600/10 to-pink-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden="true"></div>
              
              <div className="relative p-8">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <div 
                      className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center"
                      aria-hidden="true"
                    >
                      <Terminal className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white">Angular</h3>
                      <p className="text-red-400 text-sm" aria-label="Technology category">Enterprise Framework</p>
                    </div>
                  </div>
                  <div className="text-gray-400 group-hover:text-white transition-colors duration-200" aria-hidden="true">
                    <span className="text-xs">View in DevFlix</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <p 
                    id="angular-description"
                    className="text-gray-300 leading-relaxed"
                  >
                    Discover my Angular portfolio featuring enterprise-grade applications, 
                    services, and scalable architecture solutions.
                  </p>
                  
                  <div 
                    className="flex flex-wrap gap-2"
                    role="list"
                    aria-label="Technologies used"
                  >
                    <span className="px-3 py-1 bg-red-600/20 text-red-400 rounded-full text-sm" role="listitem">Angular</span>
                    <span className="px-3 py-1 bg-red-600/20 text-red-400 rounded-full text-sm" role="listitem">TypeScript</span>
                    <span className="px-3 py-1 bg-red-600/20 text-red-400 rounded-full text-sm" role="listitem">Enterprise</span>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-800">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400" aria-hidden="true">Click to explore</span>
                    <div 
                      className="w-8 h-1 bg-red-600 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
                      aria-hidden="true"
                    ></div>
                  </div>
                </div>
              </div>
            </article>
          </section>

          {/* Bottom Section */}
          <section className="text-center mt-16" aria-label="Usage instructions">
            <p className="text-gray-400 text-sm">
              Click on any card to view the portfolio within DevFlix
            </p>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer 
        className="px-8 py-6 border-t border-gray-800 mt-16" 
        role="contentinfo"
      >
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-400 text-sm">
            &copy; 2025 DevFlix - Portfolio Collection
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;