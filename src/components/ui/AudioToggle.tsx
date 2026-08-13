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

    const bufferSize = ctx.sampleRate * 5; 
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    
    // Generate white noise for the water
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noiseSource = ctx.createBufferSource();
    noiseSource.buffer = buffer;
    noiseSource.loop = true;

    // 1. Deep flow (Base rumble of the stream)
    const lowpass = ctx.createBiquadFilter();
    lowpass.type = 'lowpass';
    lowpass.frequency.value = 400;

    // 2. Bubbling / Gurgling (Trickling water)
    const bandpass = ctx.createBiquadFilter();
    bandpass.type = 'bandpass';
    bandpass.frequency.value = 1000;
    bandpass.Q.value = 3.0; // Resonance to create distinct pitch

    // Modulate the bandpass frequency to create the "gurgle"
    const lfo = ctx.createOscillator();
    lfo.type = 'sine';
    lfo.frequency.value = 0.5; // Speed of the gurgle
    
    const lfoGain = ctx.createGain();
    lfoGain.gain.value = 600; // Sweep range (400Hz to 1600Hz)

    lfo.connect(lfoGain);
    lfoGain.connect(bandpass.frequency);
    lfo.start();

    // Master gain for the whole stream
    const gainNode = ctx.createGain();
    gainNode.gain.value = 0; // Start muted

    // Split noise into both filters
    noiseSource.connect(lowpass);
    noiseSource.connect(bandpass);

    // Recombine into master gain
    lowpass.connect(gainNode);
    bandpass.connect(gainNode);
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
