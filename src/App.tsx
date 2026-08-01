/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import Background from './components/Background';
import Header from './components/Header';
import Hero from './components/Hero';
import Mission from './components/Mission';
import Stats from './components/Stats';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Journey from './components/Journey';
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
        <Journey />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
