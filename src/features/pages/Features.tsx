"use client";
import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import { Shield, AlertTriangle, Users, MapPin, Eye, Zap, Camera, Brain, Clock, Lock } from "lucide-react";

const allFeatures = [
  {
    icon: Shield,
    title: "Shoplifting Detection",
    description: "Advanced behavioral analysis detects suspicious shopping patterns and potential theft attempts with 95% accuracy.",
    details: "Our AI system analyzes customer movement patterns, item interactions, and behavioral cues to identify potential shoplifting activities. The system learns from historical data and continuously improves its detection capabilities.",
    gradient: "from-primary to-secondary",
  },
  {
    icon: AlertTriangle,
    title: "Vandalism Prevention",
    description: "Real-time detection of destructive behavior and property damage attempts to prevent costly incidents.",
    details: "Identifies aggressive movements, object throwing, graffiti attempts, and other destructive behaviors before significant damage occurs. Instant alerts enable rapid response.",
    gradient: "from-accent to-primary",
  },
  {
    icon: Users,
    title: "Crowd Monitoring",
    description: "Intelligent crowd density analysis and unusual gathering detection for public safety management.",
    details: "Monitor crowd density in real-time, detect overcrowding situations, and identify unusual gathering patterns that might indicate safety concerns or security threats.",
    gradient: "from-secondary to-accent",
  },
  {
    icon: MapPin,
    title: "Loitering Detection",
    description: "Identify unusual dwelling patterns and potential security risks in restricted or sensitive areas.",
    details: "Detects when individuals remain in specific areas longer than normal patterns suggest, particularly useful for securing sensitive zones and preventing unauthorized access.",
    gradient: "from-primary to-accent",
  },
  {
    icon: Eye,
    title: "Privacy Protection",
    description: "GDPR-compliant processing with automatic face blurring and data anonymization features.",
    details: "Built-in privacy protection ensures compliance with international data protection laws while maintaining security effectiveness through advanced anonymization techniques.",
    gradient: "from-secondary to-primary",
  },
  {
    icon: Zap,
    title: "Real-time Alerts",
    description: "Instant notifications and automated response systems to minimize response time and prevent incidents.",
    details: "Multi-channel alert system supports email, SMS, mobile app notifications, and integration with existing security systems for immediate incident response.",
    gradient: "from-accent to-secondary",
  },
  {
    icon: Camera,
    title: "Multi-Camera Integration",
    description: "Seamlessly integrate with existing camera infrastructure and support for various camera types.",
    details: "Compatible with most IP cameras, CCTV systems, and security hardware. No need for expensive camera replacements.",
    gradient: "from-primary to-secondary",
  },
  {
    icon: Brain,
    title: "Machine Learning Engine",
    description: "Continuously learning AI that adapts to your specific environment and improves over time.",
    details: "Our proprietary machine learning algorithms learn from your specific environment, reducing false positives and improving detection accuracy over time.",
    gradient: "from-accent to-primary",
  },
  {
    icon: Clock,
    title: "24/7 Monitoring",
    description: "Round-the-clock automated surveillance with intelligent filtering to reduce alert fatigue.",
    details: "Continuous monitoring with smart filtering that distinguishes between genuine threats and normal activities, ensuring you only receive relevant alerts.",
    gradient: "from-secondary to-accent",
  },
  {
    icon: Lock,
    title: "Secure Data Handling",
    description: "Enterprise-grade security for all video data and AI processing with end-to-end encryption.",
    details: "Military-grade encryption, secure cloud storage, and compliance with industry security standards ensure your data remains protected at all times.",
    gradient: "from-primary to-accent",
  },
];

export default function Features() {
  return (
    <Layout>
      <section className="min-h-screen pt-32 pb-20">
        <div className="container mx-auto px-6">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6 gradient-text">
              Complete AI Security Features
            </h1>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
              Discover all the powerful capabilities that make SecureVision the most comprehensive AI surveillance solution available today.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {allFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                className="glassmorphism rounded-xl p-8 hover:scale-105 transition-transform group"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                data-testid={`feature-detail-${feature.title.toLowerCase().replace(/\s+/g, '-')}`}
              >
                <div className={`w-16 h-16 bg-gradient-to-r ${feature.gradient} rounded-lg flex items-center justify-center mb-6 group-hover:animate-pulse-slow`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-semibold mb-4">{feature.title}</h3>
                <p className="text-muted-foreground mb-4">
                  {feature.description}
                </p>
                <p className="text-sm text-muted-foreground">
                  {feature.details}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
