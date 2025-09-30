"use client";
import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import { Target, Eye, Users } from "lucide-react";

const values = [
  {
    icon: Target,
    title: "Our Mission",
    description: "To create AI-powered security solutions that protect businesses while respecting human privacy and dignity.",
  },
  {
    icon: Eye,
    title: "Our Vision",
    description: "A world where advanced security technology enhances safety without compromising individual rights and freedoms.",
  },
  {
    icon: Users,
    title: "Our Values",
    description: "Transparency, ethical AI development, privacy protection, and commitment to creating positive social impact.",
  },
];

const team = [
  {
    name: "Sarah Chen",
    role: "CEO & Co-founder",
    description: "Former VP of AI at leading security firm with 15 years of experience in computer vision and machine learning applications for security.",
    image: "https://images.unsplash.com/photo-1494790108755-2616c27b0eaa?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
  },
  {
    name: "Dr. Michael Rodriguez",
    role: "CTO & Co-founder",
    description: "PhD in Machine Learning from MIT, previously led AI research at major tech companies with focus on ethical AI development.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
  },
  {
    name: "Emily Zhang",
    role: "Head of Privacy Engineering",
    description: "Privacy law expert and engineer ensuring GDPR compliance and ethical AI practices. Former consultant for European Data Protection Board.",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
  },
  {
    name: "David Kim",
    role: "VP of Engineering",
    description: "20+ years in software engineering with expertise in scalable AI systems and real-time video processing architectures.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
  },
  {
    name: "Dr. Lisa Thompson",
    role: "Head of AI Research",
    description: "PhD in Computer Vision from Stanford, published researcher in ethical AI and bias detection in machine learning systems.",
    image: "https://images.unsplash.com/photo-1507101105822-7472b28e22ac?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
  },
  {
    name: "Marcus Johnson",
    role: "VP of Sales",
    description: "Former security industry executive with deep understanding of enterprise security needs and 12 years in B2B technology sales.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
  },
];

export default function AboutPage() {
  return (
    <Layout>
      <section className="min-h-screen pt-32 pb-20">
        <div className="container mx-auto px-6">
          {/* Hero Section */}
          <motion.div 
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6 gradient-text">
              About SecureVision
            </h1>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
              Leading the future of ethical AI surveillance with cutting-edge technology that prioritizes both security and privacy. We&apos;re building the next generation of intelligent security systems.
            </p>
          </motion.div>

          {/* Mission, Vision, Values */}
          <div className="grid lg:grid-cols-3 gap-8 mb-20">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                className="glassmorphism rounded-xl p-8 text-center hover:scale-105 transition-transform"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                data-testid={`value-${value.title.toLowerCase().replace(/\s+/g, '-')}`}
              >
                <div className="w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center mx-auto mb-6">
                  <value.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-semibold mb-4">{value.title}</h3>
                <p className="text-muted-foreground">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Company Story */}
          <motion.div 
            className="glassmorphism rounded-2xl p-12 mb-20"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">Our Story</h2>
                <p className="text-lg text-muted-foreground mb-6">
                  SecureVision was founded in 2020 by a team of AI researchers and security experts who recognized the need for more intelligent, ethical surveillance solutions. After witnessing the limitations and privacy concerns of traditional security systems, we set out to create technology that could protect businesses while respecting individual privacy.
                </p>
                <p className="text-lg text-muted-foreground mb-6">
                  Our breakthrough came when we developed proprietary algorithms that could detect suspicious behavior patterns without invasive facial recognition or personal data collection. This innovation allowed us to create the first truly privacy-compliant AI surveillance system.
                </p>
                <div className="grid grid-cols-3 gap-6 text-center">
                  <div>
                    <div className="text-2xl font-bold text-primary mb-1">2020</div>
                    <div className="text-sm text-muted-foreground">Founded</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-accent mb-1">$50M</div>
                    <div className="text-sm text-muted-foreground">Funding Raised</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-secondary mb-1">500+</div>
                    <div className="text-sm text-muted-foreground">Customers</div>
                  </div>
                </div>
              </div>
              <div className="glassmorphism rounded-xl p-6">
                <img 
                  src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
                  alt="SecureVision headquarters and team" 
                  className="rounded-lg w-full h-auto" 
                />
              </div>
            </div>
          </motion.div>

          {/* Team Section */}
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h2 className="text-4xl font-bold mb-6 gradient-text">Meet Our Team</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our diverse team of experts combines decades of experience in AI, security, privacy law, and business to deliver cutting-edge solutions.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                className="glassmorphism rounded-xl p-8 text-center hover:scale-105 transition-transform"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                data-testid={`team-member-${member.name.toLowerCase().replace(/\s+/g, '-')}`}
              >
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-32 h-32 rounded-full mx-auto mb-6 object-cover" 
                />
                <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                <p className="text-accent mb-4 font-medium">{member.role}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{member.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
