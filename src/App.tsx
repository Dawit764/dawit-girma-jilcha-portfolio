/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { Suspense } from 'react';
import Background from './components/Background';
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
  );
}

export default App;
