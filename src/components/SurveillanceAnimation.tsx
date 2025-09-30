"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export default function SurveillanceAnimation() {
  const [phase, setPhase] = useState<'idle' | 'approach' | 'lookAround' | 'grab' | 'conceal' | 'detected' | 'flee'>('idle');
  const [scanAngle, setScanAngle] = useState(0);

  useEffect(() => {
    const runSequence = async () => {
      // Phase 1: Idle/Walking
      setPhase('idle');
      await new Promise(r => setTimeout(r, 1000));
      
      // Phase 2: Approach shelf
      setPhase('approach');
      await new Promise(r => setTimeout(r, 2000));
      
      // Phase 3: Look around nervously (suspicious behavior)
      setPhase('lookAround');
      await new Promise(r => setTimeout(r, 2000));
      
      // Phase 4: Quickly grab item
      setPhase('grab');
      await new Promise(r => setTimeout(r, 1000));
      
      // Phase 5: Conceal item (ALERT!)
      setPhase('conceal');
      await new Promise(r => setTimeout(r, 500));
      
      // Phase 6: Detection
      setPhase('detected');
      await new Promise(r => setTimeout(r, 3000));
      
      // Phase 7: Try to flee
      setPhase('flee');
      await new Promise(r => setTimeout(r, 2000));
    };

    runSequence();
    const interval = setInterval(runSequence, 12000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const scanInterval = setInterval(() => {
      setScanAngle(prev => {
        if (phase === 'detected') return 0; // Focus on suspect
        return (prev + 0.8) % 360;
      });
    }, 50);
    return () => clearInterval(scanInterval);
  }, [phase]);

  const isDetected = phase === 'detected' || phase === 'flee';

  // Calculate person position based on phase
  const getPersonX = () => {
    switch(phase) {
      case 'idle': return -150;
      case 'approach': return 0;
      case 'lookAround': return 0;
      case 'grab': return 0;
      case 'conceal': return 0;
      case 'detected': return 0;
      case 'flee': return 100;
      default: return 0;
    }
  };

  return (
    <div className="relative w-full h-full bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 rounded-2xl overflow-hidden shadow-2xl">
      {/* Subtle tech grid */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(#8b5cf6 1px, transparent 1px), linear-gradient(90deg, #8b5cf6 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }} />
      </div>

      <svg viewBox="0 0 1400 900" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
        <defs>
          {/* Filters */}
          <filter id="glow">
            <feGaussianBlur stdDeviation="5" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>

          <filter id="softShadow">
            <feGaussianBlur in="SourceAlpha" stdDeviation="6"/>
            <feOffset dx="0" dy="8" result="offsetblur"/>
            <feComponentTransfer>
              <feFuncA type="linear" slope="0.35"/>
            </feComponentTransfer>
            <feMerge>
              <feMergeNode/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>

          {/* Gradients */}
          <radialGradient id="scanGradient">
            <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.5" />
            <stop offset="60%" stopColor="#7c3aed" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#6d28d9" stopOpacity="0" />
          </radialGradient>

          <linearGradient id="alertGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ef4444" />
            <stop offset="100%" stopColor="#b91c1c" />
          </linearGradient>

          <linearGradient id="cameraMetallic" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4b5563" />
            <stop offset="50%" stopColor="#1f2937" />
            <stop offset="100%" stopColor="#111827" />
          </linearGradient>
        </defs>

        {/* Floor */}
        <path 
          d="M 150 700 L 1250 700 L 1100 850 L 300 850 Z" 
          fill="#0f172a" 
          opacity="0.4" 
        />

        {/* Store Shelves with better depth */}
        {/* Left Shelf */}
        <g filter="url(#softShadow)">
          {/* Shelf structure */}
          <path d="M 200 450 L 400 420 L 400 650 L 200 680 Z" fill="#1e293b" />
          <path d="M 400 420 L 480 440 L 480 670 L 400 650 Z" fill="#0f172a" />
          <path d="M 200 450 L 400 420 L 480 440 L 280 470 Z" fill="#334155" />
          
          {/* Products - stacked naturally */}
          <g opacity="0.95">
            <rect x="220" y="480" width="45" height="55" fill="#f59e0b" rx="3" />
            <rect x="275" y="485" width="40" height="50" fill="#3b82f6" rx="3" />
            <rect x="325" y="478" width="48" height="58" fill="#10b981" rx="3" />
            <rect x="383" y="483" width="42" height="53" fill="#ef4444" rx="3" />
            
            <rect x="225" y="560" width="42" height="48" fill="#8b5cf6" rx="3" />
            <rect x="277" y="565" width="45" height="45" fill="#ec4899" rx="3" />
            <rect x="332" y="558" width="48" height="52" fill="#06b6d4" rx="3" />
          </g>
        </g>

        {/* Right Shelf */}
        <g filter="url(#softShadow)">
          <path d="M 920 430 L 1120 420 L 1120 650 L 920 660 Z" fill="#1e293b" />
          <path d="M 1120 420 L 1200 440 L 1200 670 L 1120 650 Z" fill="#0f172a" />
          <path d="M 920 430 L 1120 420 L 1200 440 L 1000 450 Z" fill="#334155" />
          
          <g opacity="0.95">
            <rect x="940" y="470" width="48" height="58" fill="#06b6d4" rx="3" />
            <rect x="998" y="475" width="45" height="53" fill="#f97316" rx="3" />
            <rect x="1053" y="468" width="50" height="60" fill="#a855f7" rx="3" />
            
            <rect x="945" y="555" width="45" height="50" fill="#14b8a6" rx="3" />
            <rect x="1000" y="560" width="42" height="48" fill="#eab308" rx="3" />
            <rect x="1052" y="553" width="48" height="55" fill="#f43f5e" rx="3" />
          </g>
        </g>

        {/* Professional CCTV Dome Camera */}
        <g filter="url(#softShadow)">
          {/* Ceiling plate */}
          <ellipse cx="200" cy="120" rx="45" ry="12" fill="#374151" />
          <rect x="185" y="120" width="30" height="25" fill="#4b5563" rx="3" />
          
          {/* Camera rotation pivot */}
          <motion.g
            animate={{
              rotate: phase === 'detected' ? 0 : scanAngle / 8,
            }}
            transition={{ duration: 0.5 }}
            style={{ transformOrigin: "200px 150px" }}
          >
            {/* Dome housing */}
            <ellipse cx="200" cy="145" rx="55" ry="30" fill="url(#cameraMetallic)" opacity="0.3" />
            <ellipse cx="200" cy="145" rx="52" ry="28" fill="#1a1a1a" opacity="0.7" />
            
            {/* Camera body inside dome */}
            <ellipse cx="200" cy="150" rx="35" ry="20" fill="url(#cameraMetallic)" />
            
            {/* Lens assembly */}
            <ellipse cx="200" cy="150" rx="25" ry="15" fill="#0f172a" />
            <ellipse cx="200" cy="150" rx="20" ry="12" fill="#1e40af" opacity="0.8" filter="url(#glow)" />
            
            {/* Lens reflection */}
            <ellipse cx="195" cy="146" rx="8" ry="5" fill="white" opacity="0.7" />
            <ellipse cx="193" cy="144" rx="4" ry="2" fill="white" opacity="0.95" />
            
            {/* Status indicator */}
            <motion.circle
              cx="200"
              cy="170"
              r="4"
              fill={isDetected ? "#ef4444" : "#22c55e"}
              filter="url(#glow)"
              animate={{
                opacity: isDetected ? [1, 0.3, 1] : [0.7, 1, 0.7],
              }}
              transition={{
                duration: isDetected ? 0.3 : 1.5,
                repeat: Infinity,
              }}
            />
          </motion.g>
        </g>

        {/* Scanning cone */}
        <motion.path
          d="M 200 150 L 300 800 L 1000 800 L 500 150 Z"
          fill="url(#scanGradient)"
          animate={{
            opacity: [0.15, 0.3, 0.15],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
          }}
        />

        {/* Active scan line */}
        <motion.line
          x1="200"
          y1="150"
          x2={300 + Math.sin(scanAngle * Math.PI / 180) * 300}
          y2="800"
          stroke="#8b5cf6"
          strokeWidth="2"
          opacity="0.5"
          filter="url(#glow)"
        />

        {/* Person Animation - Much closer to shelf when grabbing */}
        <motion.g
          animate={{
            x: getPersonX(),
          }}
          transition={{ duration: 2, ease: "easeInOut" }}
        >
          {/* Shadow */}
          <ellipse 
            cx={phase === 'lookAround' ? 380 : phase === 'grab' ? 320 : 380}
            cy="730" 
            rx="50" 
            ry="15" 
            fill="black" 
            opacity="0.3"
          />

          {/* Alert tracking box */}
          <AnimatePresence>
            {isDetected && (
              <motion.g
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
              >
                <motion.rect
                  x={phase === 'grab' ? 260 : 320}
                  y="500"
                  width="140"
                  height="230"
                  fill="none"
                  stroke="url(#alertGrad)"
                  strokeWidth="4"
                  rx="70"
                  filter="url(#glow)"
                  animate={{
                    strokeWidth: [4, 6, 4],
                  }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                />
                
                {/* Corner brackets */}
                {[[265, 505], [395, 505], [265, 725], [395, 725]].map(([x, y], i) => (
                  <motion.g key={i}>
                    <line x1={x} y1={y} x2={x + (i % 2 ? -15 : 15)} y2={y} stroke="#ef4444" strokeWidth="3" />
                    <line x1={x} y1={y} x2={x} y2={y + (i < 2 ? 15 : -15)} stroke="#ef4444" strokeWidth="3" />
                  </motion.g>
                ))}
              </motion.g>
            )}
          </AnimatePresence>

          {/* Person - positioned closer to shelf when grabbing */}
          <motion.g
            animate={{
              x: phase === 'grab' ? -60 : 0, // Move much closer to shelf
            }}
            transition={{ duration: 0.8 }}
          >
            {/* Head with nervous looking animation */}
            <motion.circle 
              cx="380" 
              cy="550" 
              r="32" 
              fill="#64748b"
              animate={{
                x: phase === 'lookAround' ? [-5, 5, -5, 0] : 0,
              }}
              transition={{ duration: 2, repeat: phase === 'lookAround' ? Infinity : 0 }}
            />
            
            {/* Eyes showing nervous behavior */}
            {phase === 'lookAround' && (
              <motion.g
                animate={{
                  x: [-3, 3, -3, 0],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <circle cx="372" cy="545" r="3" fill="#1e293b" />
                <circle cx="388" cy="545" r="3" fill="#1e293b" />
              </motion.g>
            )}

            {/* Neck */}
            <rect x="368" y="578" width="24" height="18" fill="#64748b" />

            {/* Body */}
            <path 
              d="M 380 596 Q 360 620 355 670 L 355 700 L 405 700 L 405 670 Q 400 620 380 596 Z" 
              fill="#475569" 
            />

            {/* Left arm - reaches for item */}
            <motion.path
              d={
                phase === 'grab' 
                  ? "M 360 615 Q 280 600 250 610" // Reaching to shelf
                  : phase === 'conceal' || phase === 'detected' || phase === 'flee'
                  ? "M 360 615 Q 350 640 355 665" // Hiding item close to body
                  : phase === 'lookAround'
                  ? "M 360 615 Q 345 635 340 655" // Nervous gesture
                  : "M 360 615 Q 350 645 345 670" // Normal
              }
              fill="none"
              stroke="#475569"
              strokeWidth="20"
              strokeLinecap="round"
              transition={{ duration: 0.5 }}
            />

            {/* Right arm */}
            <motion.path
              d={
                phase === 'lookAround'
                  ? "M 400 615 Q 420 630 425 650" // Nervous gesture
                  : "M 400 615 Q 410 645 415 670"
              }
              fill="none"
              stroke="#475569"
              strokeWidth="20"
              strokeLinecap="round"
              transition={{ duration: 0.5 }}
            />

            {/* Legs with walking animation */}
            <motion.path
              d="M 365 700 L 360 730"
              stroke="#475569"
              strokeWidth="18"
              strokeLinecap="round"
              animate={{
                d: (phase === 'idle' || phase === 'approach' || phase === 'flee')
                  ? ["M 365 700 L 360 730", "M 365 700 L 365 730", "M 365 700 L 360 730"]
                  : "M 365 700 L 365 730"
              }}
              transition={{ duration: 0.6, repeat: (phase === 'idle' || phase === 'approach' || phase === 'flee') ? Infinity : 0 }}
            />
            <motion.path
              d="M 395 700 L 400 730"
              stroke="#475569"
              strokeWidth="18"
              strokeLinecap="round"
              animate={{
                d: (phase === 'idle' || phase === 'approach' || phase === 'flee')
                  ? ["M 395 700 L 400 730", "M 395 700 L 395 730", "M 395 700 L 400 730"]
                  : "M 395 700 L 395 730"
              }}
              transition={{ duration: 0.6, repeat: (phase === 'idle' || phase === 'approach' || phase === 'flee') ? Infinity : 0, delay: 0.3 }}
            />
          </motion.g>

          {/* Stolen item - appears during grab and stays */}
          <AnimatePresence>
            {(phase === 'grab' || phase === 'conceal' || phase === 'detected' || phase === 'flee') && (
              <motion.g
                initial={{ 
                  opacity: 0, 
                  x: phase === 'grab' ? -80 : 0,
                  y: phase === 'grab' ? -50 : 0,
                }}
                animate={{ 
                  opacity: 1,
                  x: phase === 'grab' ? -20 : (phase === 'conceal' || phase === 'detected' || phase === 'flee') ? 0 : -20,
                  y: phase === 'grab' ? -20 : (phase === 'conceal' || phase === 'detected' || phase === 'flee') ? 40 : -20,
                }}
                transition={{ duration: 0.8 }}
              >
                <rect x="325" y="635" width="50" height="60" fill="#f59e0b" rx="4" filter="url(#softShadow)" />
                <rect x="330" y="642" width="40" height="10" fill="#fbbf24" />
                <text x="350" y="675" textAnchor="middle" fontSize="18" fill="#78350f" fontWeight="bold">$$$</text>
              </motion.g>
            )}
          </AnimatePresence>
        </motion.g>

        {/* Alert System */}
        <AnimatePresence>
          {isDetected && (
            <>
              {/* Main alert */}
              <motion.g
                initial={{ scale: 0, y: -100 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
              >
                <circle cx="700" cy="380" r="65" fill="url(#alertGrad)" filter="url(#glow)" />
                
                <motion.path
                  d="M 700 345 L 665 420 L 735 420 Z"
                  fill="white"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 0.6, repeat: Infinity }}
                  style={{ transformOrigin: "700px 385px" }}
                />
                
                <line x1="700" y1="365" x2="700" y2="395" stroke="white" strokeWidth="8" strokeLinecap="round" />
                <circle cx="700" cy="408" r="5" fill="white" />
              </motion.g>

              <motion.text
                x="700"
                y="320"
                textAnchor="middle"
                fontSize="32"
                fontWeight="bold"
                fill="#ef4444"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                filter="url(#glow)"
              >
                SHOPLIFTING DETECTED!
              </motion.text>

              {/* Particle burst */}
              {[...Array(16)].map((_, i) => {
                const angle = (i / 16) * Math.PI * 2;
                const dist = 90;
                return (
                  <motion.circle
                    key={i}
                    cx={380}
                    cy={620}
                    r="5"
                    fill="#ef4444"
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: [0, 1, 0],
                      x: Math.cos(angle) * dist,
                      y: Math.sin(angle) * dist,
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      delay: i * 0.06,
                    }}
                  />
                );
              })}
            </>
          )}
        </AnimatePresence>

        {/* HUD */}
        <g>
          <text x="40" y="45" fontSize="18" fill="#64748b" fontFamily="monospace" fontWeight="600">
            CAM-01 | LIVE
          </text>
          <motion.circle
            cx="160"
            cy="40"
            r="5"
            fill="#ef4444"
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          />
          
          <text x="40" y="75" fontSize="16" fill="#475569" fontFamily="monospace">
            {new Date().toLocaleTimeString()}
          </text>

          {/* Status */}
          <motion.rect
            x="1100"
            y="30"
            width="260"
            height="60"
            rx="30"
            fill={isDetected ? "#7f1d1d" : "#064e3b"}
            fillOpacity="0.95"
            filter="url(#softShadow)"
          />
          <text
            x="1230"
            y="68"
            textAnchor="middle"
            fontSize="20"
            fontWeight="bold"
            fill={isDetected ? "#ef4444" : "#22c55e"}
          >
            {isDetected ? "⚠ THREAT DETECTED" : "✓ MONITORING"}
          </text>

          {/* Confidence meter */}
          {isDetected && (
            <g>
              <rect x="1100" y="110" width="260" height="35" rx="17" fill="#1e293b" fillOpacity="0.9" />
              <motion.rect
                x="1105"
                y="115"
                width="0"
                height="25"
                rx="12"
                fill="#ef4444"
                initial={{ width: 0 }}
                animate={{ width: 250 }}
                transition={{ duration: 1.5 }}
              />
              <text x="1230" y="135" textAnchor="middle" fontSize="14" fill="white" fontWeight="700">
                CONFIDENCE: 98%
              </text>
            </g>
          )}
        </g>
      </svg>
    </div>
  );
}