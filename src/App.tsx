/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { Suspense } from 'react';
import { TooltipProvider } from '@/components/ui/tooltip';
import Header from './components/Header';
import Hero from './components/Hero';
import Mission from './components/Mission';
import Stats from './components/Stats';
import Skills from './components/Skills';
import Projects from './components/Projects';
import GitHubActivity from './components/GitHubActivity';
import Blog from './components/Blog';
import Journey from './components/Journey';
import Certifications from './components/Certifications';
import Contact from './components/Contact';
import Footer from './components/Footer';

// New Immersive Components
import SmoothScroll from './components/layout/SmoothScroll';
import CustomCursor from './components/ui/CustomCursor';
import Scene from './components/canvas/Scene';

function App() {
  return (
    <TooltipProvider>
      <SmoothScroll>
        <div 
          className="relative min-h-screen font-sans text-foreground overflow-x-hidden selection:bg-primary/30 selection:text-primary"
          style={{ backgroundColor: '#0f1714' }}
        >
          <div className="noise-overlay" />
          <CustomCursor />
          
          <Suspense fallback={<div className="fixed inset-0 z-0 bg-[#0f1714]" />}>
            <Scene />
          </Suspense>
          
          {/* Navigation */}
          <Header />

          {/* Main Content */}
          <main className="relative z-10 pt-20 mix-blend-normal">
            <Hero />
            <Mission />
            <Stats />
            <Skills />
            <Projects />
            <GitHubActivity />
            <Blog />
            <Journey />
            <Certifications />
            <Contact />
          </main>

          {/* Footer */}
          <Footer />
        </div>
      </SmoothScroll>
    </TooltipProvider>
  );
}

export default App;
