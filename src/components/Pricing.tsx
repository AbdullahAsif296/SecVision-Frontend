"use client";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check, Sparkles } from "lucide-react";
import Link from "next/link";

const plans = [
  {
    name: "Starter",
    price: "$99",
    description: "Perfect for small businesses",
    features: [
      "Up to 5 cameras",
      "Basic threat detection",
      "Email alerts",
      "30-day video storage",
      "24/7 support",
    ],
    isPopular: false,
  },
  {
    name: "Professional",
    price: "$299",
    description: "Ideal for growing businesses",
    features: [
      "Up to 25 cameras",
      "Advanced AI detection",
      "SMS & email alerts",
      "90-day video storage",
      "Custom reporting",
      "Priority support",
    ],
    isPopular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For large organizations",
    features: [
      "Unlimited cameras",
      "AI + human verification",
      "Multi-channel alerts",
      "Unlimited storage",
      "API integration",
      "Dedicated support",
    ],
    isPopular: false,
  },
];

export default function Pricing() {
  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-6">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
            Choose Your Plan
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Flexible pricing options designed to scale with your security needs, from small businesses to enterprise operations.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              className={`glassmorphism rounded-2xl p-8 hover:scale-105 transition-transform relative ${
                plan.isPopular ? "border-2 border-primary" : ""
              }`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              data-testid={`pricing-plan-${plan.name.toLowerCase()}`}
            >
              {plan.isPopular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <motion.span 
                    className="bg-gradient-to-r from-primary to-secondary text-white px-6 py-2 rounded-full text-sm font-semibold flex items-center gap-1.5 shadow-lg"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200 }}
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    Most Popular
                  </motion.span>
                </div>
              )}
              
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-4">{plan.name}</h3>
                <div className="text-4xl font-bold text-primary mb-2">
                  {plan.price}
                  <span className="text-lg text-muted-foreground">/month</span>
                </div>
                <p className="text-muted-foreground">{plan.description}</p>
              </div>
              
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, idx) => (
                  <motion.li 
                    key={feature} 
                    className="flex items-center"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    viewport={{ once: true }}
                  >
                    <div className="w-5 h-5 rounded-full bg-accent/20 flex items-center justify-center mr-3 flex-shrink-0">
                      <Check className="w-3 h-3 text-accent" />
                    </div>
                    <span className="text-sm">{feature}</span>
                  </motion.li>
                ))}
              </ul>
              
              {plan.name === "Enterprise" ? (
                <Link href="/contact">
                  <Button 
                    variant="outline" 
                    className="w-full py-3 border-primary text-primary hover:bg-primary hover:text-white transition-colors"
                    data-testid={`button-contact-sales`}
                  >
                    Contact Sales
                  </Button>
                </Link>
              ) : (
                <Link href="/demo">
                  <Button 
                    className={`w-full py-3 font-semibold transition-transform ${
                      plan.isPopular 
                        ? "bg-gradient-to-r from-primary to-secondary text-white hover:scale-105" 
                        : "border border-primary text-primary hover:bg-primary hover:text-white"
                    }`}
                    variant={plan.isPopular ? "default" : "outline"}
                    data-testid={`button-start-trial-${plan.name.toLowerCase()}`}
                  >
                    Start Free Trial
                  </Button>
                </Link>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
