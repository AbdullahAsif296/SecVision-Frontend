import { motion } from "framer-motion";
import { Video, Brain, Bell, ArrowRight } from "lucide-react";

const steps = [
  {
    icon: Video,
    title: "Camera Feed Input",
    description: "Live video streams from your existing security cameras are securely processed in real-time.",
    gradient: "from-primary to-secondary",
  },
  {
    icon: Brain,
    title: "AI Processing",
    description: "Advanced machine learning algorithms analyze behavior patterns and detect potential security threats.",
    gradient: "from-accent to-primary",
  },
  {
    icon: Bell,
    title: "Instant Alerts",
    description: "Immediate notifications are sent to security teams with detailed incident reports and recommended actions.",
    gradient: "from-secondary to-accent",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-20 relative">
      {/* Animated connectors background */}
      <svg className="pointer-events-none absolute inset-0 -z-10 opacity-30" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
        <defs>
          <linearGradient id="h" x1="0" x2="1" y1="0" y2="0">
            <stop stopColor="#8b5cf6" offset="0%"/>
            <stop stopColor="#06b6d4" offset="100%"/>
          </linearGradient>
        </defs>
        <motion.circle cx="15%" cy="25%" r="3" fill="url(#h)" initial={{ scale: 0 }} whileInView={{ scale: 1 }} transition={{ duration: 0.6 }} />
        <motion.circle cx="50%" cy="40%" r="3" fill="url(#h)" initial={{ scale: 0 }} whileInView={{ scale: 1 }} transition={{ duration: 0.6, delay: 0.2 }} />
        <motion.circle cx="85%" cy="55%" r="3" fill="url(#h)" initial={{ scale: 0 }} whileInView={{ scale: 1 }} transition={{ duration: 0.6, delay: 0.4 }} />
        <motion.path d="M15% 25% C 30% 30%, 40% 35%, 50% 40%" stroke="url(#h)" strokeWidth="2" fill="none" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} transition={{ duration: 1, ease: "easeInOut" }} />
        <motion.path d="M50% 40% C 60% 45%, 70% 50%, 85% 55%" stroke="url(#h)" strokeWidth="2" fill="none" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} transition={{ duration: 1, ease: "easeInOut", delay: 0.2 }} />
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
            How SecureVision Works
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our intelligent surveillance system processes video feeds through advanced AI algorithms to detect and prevent security incidents.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-12 items-center">
          {steps.map((step, index) => (
            <div key={step.title} className="relative">
              <motion.div 
                className="text-center group"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                data-testid={`how-it-works-step-${index + 1}`}
              >
                <div className="glassmorphism rounded-2xl p-8 mb-6 transition-transform">
                  <motion.div
                    className={`w-20 h-20 bg-gradient-to-r ${step.gradient} rounded-full flex items-center justify-center mx-auto mb-6`}
                    whileHover={{ scale: 1.08, rotate: -6 }}
                    transition={{ type: "spring", stiffness: 280, damping: 18 }}
                  >
                    <step.icon className="w-10 h-10 text-white" />
                  </motion.div>
                  <h3 className="text-2xl font-semibold mb-4">{step.title}</h3>
                  <p className="text-muted-foreground">
                    {step.description}
                  </p>
                  <motion.div className="mt-6 h-px bg-gradient-to-r from-primary to-secondary" initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} style={{ transformOrigin: "left" }} transition={{ duration: 0.8, ease: "easeOut" }} />
                </div>
              </motion.div>
              
              {/* Arrow between steps */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-6 transform -translate-y-1/2 z-10">
                  <ArrowRight className="w-8 h-8 text-accent" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
