import React, { useState, useEffect, useRef } from 'react';
import { Howl } from 'howler';
import { Volume2, VolumeX } from 'lucide-react';
import { motion } from 'motion/react';
import Magnetic from './Magnetic';

const AUDIO_URL = 'https://actions.google.com/sounds/v1/ambiences/forest_morning_with_birds.ogg';

export default function AudioToggle() {
  const [isPlaying, setIsPlaying] = useState(false);
  const soundRef = useRef<Howl | null>(null);

  useEffect(() => {
    soundRef.current = new Howl({
      src: [AUDIO_URL],
      loop: true,
      volume: 0,
      html5: true, // Good for long streaming audio
    });

    return () => {
      soundRef.current?.unload();
    };
  }, []);

  const toggleAudio = () => {
    if (!soundRef.current) return;

    if (isPlaying) {
      soundRef.current.fade(0.5, 0, 2000);
      setTimeout(() => {
        soundRef.current?.pause();
      }, 2000);
    } else {
      soundRef.current.play();
      soundRef.current.fade(0, 0.5, 3000);
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <Magnetic>
        <button
          onClick={toggleAudio}
          className="flex items-center gap-3 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full px-5 py-3 text-sm font-light tracking-wide shadow-2xl transition-all duration-500 hover:bg-white/10 hover:border-white/20 group"
          aria-label="Toggle ambient sound"
        >
          <span className="w-5 h-5 flex items-center justify-center">
            {isPlaying ? (
              <Volume2 className="w-5 h-5 text-primary opacity-80 group-hover:opacity-100 transition-opacity" />
            ) : (
              <VolumeX className="w-5 h-5 text-foreground opacity-50 group-hover:opacity-80 transition-opacity" />
            )}
          </span>
          <span className={`font-mono text-xs uppercase tracking-widest ${isPlaying ? "text-primary opacity-90" : "text-foreground opacity-50"} group-hover:opacity-100 transition-opacity`}>
            {isPlaying ? 'Immersed' : 'Immerse'}
          </span>
        </button>
      </Magnetic>
    </div>
  );
}
