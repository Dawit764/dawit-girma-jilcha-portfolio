/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { Suspense } from 'react';
import Background from './components/Background';
import Header from './components/Header';
import Hero from './components/Hero';

// Lazy load below-the-fold components to improve initial load speed
const Mission = React.lazy(() => import('./components/Mission'));
const Stats = React.lazy(() => import('./components/Stats'));
const Skills = React.lazy(() => import('./components/Skills'));
const Projects = React.lazy(() => import('./components/Projects'));
const GitHubActivity = React.lazy(() => import('./components/GitHubActivity'));
const Blog = React.lazy(() => import('./components/Blog'));
const Journey = React.lazy(() => import('./components/Journey'));
const Contact = React.lazy(() => import('./components/Contact'));
const Footer = React.lazy(() => import('./components/Footer'));

// Minimal spinner that doesn't block or flash violently
const SectionLoader = () => (
  <div className="w-full h-24 flex items-center justify-center opacity-50">
    <div className="w-6 h-6 border-2 border-[var(--color-primary)] border-t-transparent rounded-full animate-spin"></div>
  </div>
);

function App() {
  return (
    <div className="relative min-h-screen bg-[var(--color-background)] font-sans text-white overflow-hidden selection:bg-[var(--color-primary)] selection:text-[var(--color-background)]">
      {/* Global Background Layer */}
      <Background />
      
      {/* Navigation */}
      <Header />

      {/* Main Content */}
      <main className="relative z-10">
        <Hero />
        
        {/* Suspense boundary for everything below the fold */}
        <Suspense fallback={<SectionLoader />}>
          <Mission />
          <Stats />
          <Skills />
          <Projects />
          <GitHubActivity />
          <Blog />
          <Journey />
          <Contact />
        </Suspense>
      </main>

      {/* Footer */}
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </div>
  );
}

export default App;
