"use client";
import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import Contact from "@/components/Contact";

export default function ContactPage() {
  return (
    <Layout>
      <section className="pt-32">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="container mx-auto px-6">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 gradient-text">
              Contact Our Team
            </h1>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
              Ready to transform your security with AI? Get in touch with our experts for a personalized consultation and see how SecureVision can protect your business.
            </p>
          </div>
        </motion.div>
        <Contact />
      </section>
    </Layout>
  );
}
