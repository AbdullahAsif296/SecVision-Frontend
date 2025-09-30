import { motion } from "framer-motion";
import { Shield, Camera, Radar, ClockAlert, ScanEye, BellRing } from "lucide-react";

const features = [
  {
    icon: Camera,
    title: "Shoplifting Detection",
    description: "Advanced behavioral analysis detects suspicious shopping patterns and potential theft attempts with 95% accuracy.",
    gradient: "from-primary to-secondary",
  },
  {
    icon: Shield,
    title: "Vandalism Prevention",
    description: "Real-time detection of destructive behavior and property damage attempts to prevent costly incidents.",
    gradient: "from-accent to-primary",
  },
  {
    icon: Radar,
    title: "Crowd Monitoring",
    description: "Intelligent crowd density analysis and unusual gathering detection for public safety management.",
    gradient: "from-secondary to-accent",
  },
  {
    icon: ClockAlert,
    title: "Loitering Detection",
    description: "Identify unusual dwelling patterns and potential security risks in restricted or sensitive areas.",
    gradient: "from-primary to-accent",
  },
  {
    icon: ScanEye,
    title: "Privacy Protection",
    description: "GDPR-compliant processing with automatic face blurring and data anonymization features.",
    gradient: "from-secondary to-primary",
  },
  {
    icon: BellRing,
    title: "Real-time Alerts",
    description: "Instant notifications and automated response systems to minimize response time and prevent incidents.",
    gradient: "from-accent to-secondary",
  },
];

export default function Features() {
  return (
    <section className="py-20 relative">
      {/* Animated backdrop lines */}
      <svg className="pointer-events-none absolute inset-0 -z-10 opacity-20" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
        <defs>
          <linearGradient id="g" x1="0" x2="1" y1="0" y2="0">
            <stop stopColor="#6d28d9" offset="0%"/>
            <stop stopColor="#22d3ee" offset="100%"/>
          </linearGradient>
        </defs>
        <motion.path
          d="M0 100 Q 300 50 600 100 T 1200 100"
          fill="none"
          stroke="url(#g)"
          strokeWidth="2"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />
        <motion.path
          d="M0 200 Q 300 150 600 200 T 1200 200"
          fill="none"
          stroke="url(#g)"
          strokeWidth="2"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          transition={{ duration: 2.2, ease: "easeInOut", delay: 0.2 }}
        />
      </svg>
      <div className="container mx-auto px-6">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
            Advanced AI Detection Capabilities
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our cutting-edge AI algorithms provide real-time detection and analysis of various security threats while maintaining ethical standards.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              className="glassmorphism rounded-xl p-8 transition-transform group will-change-transform"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              data-testid={`feature-${feature.title.toLowerCase().replace(/\s+/g, '-')}`}
            >
              <motion.div
                className={`w-16 h-16 bg-gradient-to-r ${feature.gradient} rounded-lg flex items-center justify-center mb-6`}
                whileHover={{ rotate: 8, scale: 1.06 }}
                transition={{ type: "spring", stiffness: 300, damping: 18 }}
              >
                <feature.icon className="w-8 h-8 text-white" />
              </motion.div>
              <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
              <p className="text-muted-foreground">
                {feature.description}
              </p>
              <motion.div
                className="mt-6 h-1 w-0 bg-gradient-to-r from-primary to-secondary rounded-full"
                whileInView={{ width: "60%" }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
