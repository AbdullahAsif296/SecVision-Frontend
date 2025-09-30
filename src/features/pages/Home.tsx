"use client";

import Layout from "@/components/Layout";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import Pricing from "@/components/Pricing";
import About from "@/components/About";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <Layout>
      <Hero />
      <Features />
      <HowItWorks />
      <Pricing />
      <About />
      <Contact />
    </Layout>
  );
}
