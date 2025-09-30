"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useRef } from "react";

// SSR-safe dynamic import with no SSR
const SurveillanceAnimation = dynamic(() => import("./SurveillanceAnimation"), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
    </div>
  ),
});

export default function Hero() {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, -120]);

  return (
    <section ref={ref} className="min-h-screen flex items-center relative overflow-hidden pt-24">
      <div className="absolute inset-0 hero-gradient opacity-10"></div>

      <div className="container mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        {/* Left: Copy */}
        <div className="text-center lg:text-left order-2 lg:order-1 space-y-5">
          {/* Badge */}
          <motion.div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glassmorphism border border-primary/20"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            <span className="text-xs font-medium">AI-Powered Security</span>
          </motion.div>

          {/* Headline */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-[1.1] tracking-tight">
              <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                AI-Powered
              </span>
              <span className="block mt-1.5 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-500 bg-clip-text text-transparent">
                Smart Surveillance
              </span>
              <span className="block mt-1.5 text-foreground/90 text-3xl sm:text-4xl lg:text-5xl xl:text-6xl">
                for Non-Violent Crime Detection
              </span>
            </h1>
          </motion.div>
          
          {/* Description */}
          <motion.p 
            className="text-base sm:text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-xl mx-auto lg:mx-0"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Revolutionary AI technology that detects{" "}
            <span className="text-foreground font-semibold">shoplifting</span>,{" "}
            <span className="text-foreground font-semibold">vandalism</span>, and{" "}
            <span className="text-foreground font-semibold">suspicious behavior</span>{" "}
            in real-time while respecting privacy and human dignity.
          </motion.p>
          
          {/* CTA Buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start items-center pt-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <Link href="/demo" className="w-full sm:w-auto">
              <Button 
                size="lg" 
                className="w-full sm:w-auto px-8 py-5 bg-gradient-to-r from-primary to-secondary text-white rounded-xl font-bold text-base hover:scale-105 hover:shadow-2xl hover:shadow-primary/50 transition-all duration-300"
                data-testid="button-start-trial"
              >
                Start Free Trial
                <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Button>
            </Link>
            <Button 
              size="lg" 
              variant="outline" 
              className="w-full sm:w-auto px-8 py-5 glassmorphism border-2 border-primary/30 text-foreground rounded-xl font-bold text-base hover:scale-105 hover:border-primary/60 hover:bg-primary/5 transition-all duration-300"
              data-testid="button-watch-demo"
            >
              <svg className="mr-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Watch Demo
            </Button>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            className="flex flex-wrap items-center justify-center lg:justify-start gap-6 pt-4 text-xs text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <div className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="font-medium">GDPR Compliant</span>
            </div>
            <div className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="font-medium">99.2% Accuracy</span>
            </div>
            <div className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="font-medium">24/7 Monitoring</span>
            </div>
          </motion.div>
        </div>

        {/* Right: Surveillance Animation */}
        <motion.div 
          style={{ y: parallaxY }} 
          className="order-1 lg:order-2 relative h-[40vh] sm:h-[50vh] lg:h-[70vh]"
        >
          <div className="absolute inset-0 glassmorphism rounded-2xl p-4 border border-primary/10">
            <SurveillanceAnimation />
          </div>
          
          {/* Ambient glow accents */}
          <motion.div 
            className="absolute -top-10 -left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl pointer-events-none -z-10"
            animate={{ 
              y: [0, -20, 0],
              opacity: [0.2, 0.4, 0.2]
            }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div 
            className="absolute -bottom-10 -right-10 w-96 h-96 bg-secondary/20 rounded-full blur-3xl pointer-events-none -z-10"
            animate={{ 
              y: [0, -20, 0],
              opacity: [0.2, 0.35, 0.2]
            }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 3 }}
          />
        </motion.div>
      </div>
    </section>
  );
}
