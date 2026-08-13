import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import Magnetic from './Magnetic';

export default function AudioToggle() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const sourceRef = useRef<AudioBufferSourceNode | null>(null);

  const initAudio = () => {
    if (audioCtxRef.current) return;
    
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    const ctx = new AudioContext();
    audioCtxRef.current = ctx;

    // Create 5 seconds of noise buffer
    const bufferSize = ctx.sampleRate * 5; 
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    
    // Generate deep brown noise (sounds like ocean/wind)
    let lastOut = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      data[i] = (lastOut + (0.02 * white)) / 1.02;
      lastOut = data[i];
      data[i] *= 3.5; 
    }

    const noiseSource = ctx.createBufferSource();
    noiseSource.buffer = buffer;
    noiseSource.loop = true;

    // Filter to make it a low rumble
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 400; 
    
    const gainNode = ctx.createGain();
    gainNode.gain.value = 0; // Start muted

    noiseSource.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(ctx.destination);

    noiseSource.start();

    sourceRef.current = noiseSource;
    gainNodeRef.current = gainNode;
  };

  const toggleAudio = () => {
    if (!audioCtxRef.current) {
      initAudio();
    }
    
    const ctx = audioCtxRef.current;
    const gain = gainNodeRef.current;
    
    if (!ctx || !gain) return;

    if (ctx.state === 'suspended') {
      ctx.resume();
    }

    const now = ctx.currentTime;
    
    // Cancel any scheduled changes
    gain.gain.cancelScheduledValues(now);
    
    if (isPlaying) {
      // Fade out
      gain.gain.setValueAtTime(gain.gain.value, now);
      gain.gain.linearRampToValueAtTime(0, now + 2);
    } else {
      // Fade in
      gain.gain.setValueAtTime(gain.gain.value, now);
      gain.gain.linearRampToValueAtTime(0.8, now + 3);
    }
    
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    return () => {
      if (audioCtxRef.current) {
        audioCtxRef.current.close();
      }
    };
  }, []);

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
