import { motion } from "framer-motion";

const team = [
  {
    name: "Sarah Chen",
    role: "CEO & Co-founder",
    description: "Former VP of AI at leading security firm with 15 years of experience in computer vision.",
    image: "https://images.unsplash.com/photo-1494790108755-2616c27b0eaa?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
  },
  {
    name: "Dr. Michael Rodriguez",
    role: "CTO & Co-founder",
    description: "PhD in Machine Learning from MIT, previously led AI research at major tech companies.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
  },
  {
    name: "Emily Zhang",
    role: "Head of Privacy Engineering",
    description: "Privacy law expert and engineer ensuring GDPR compliance and ethical AI practices.",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
  },
];

export default function About() {
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
            About SecureVision
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Leading the future of ethical AI surveillance with cutting-edge technology that prioritizes both security and privacy.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-bold mb-6">Our Mission</h3>
            <p className="text-lg text-muted-foreground mb-6">
              SecureVision was founded on the principle that advanced security technology should enhance safety without compromising human dignity or privacy. We believe in creating AI systems that are transparent, ethical, and focused on preventing non-violent crimes.
            </p>
            <p className="text-lg text-muted-foreground mb-8">
              Our team of AI researchers, security experts, and privacy advocates work together to develop solutions that meet the highest standards of both effectiveness and ethical responsibility.
            </p>
            <div className="grid grid-cols-2 gap-6">
              <motion.div 
                className="text-center p-4 rounded-lg glassmorphism"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">99.2%</div>
                <div className="text-sm text-muted-foreground">Detection Accuracy</div>
              </motion.div>
              <motion.div 
                className="text-center p-4 rounded-lg glassmorphism"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="text-3xl font-bold bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent mb-2">500+</div>
                <div className="text-sm text-muted-foreground">Businesses Protected</div>
              </motion.div>
            </div>
          </motion.div>
          
          <motion.div 
            className="glassmorphism rounded-2xl p-8"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <img 
              src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
              alt="Modern office building representing SecureVision headquarters" 
              className="rounded-xl w-full h-auto" 
            />
          </motion.div>
        </div>

        {/* Team Section */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl font-bold mb-4">Meet Our Team</h3>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Experienced professionals dedicated to advancing ethical AI surveillance technology.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {team.map((member, index) => (
            <motion.div
              key={member.name}
              className="glassmorphism rounded-xl p-6 text-center hover:scale-105 transition-transform"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              data-testid={`team-member-${member.name.toLowerCase().replace(/\s+/g, '-')}`}
            >
              <img 
                src={member.image} 
                alt={member.name} 
                className="w-24 h-24 rounded-full mx-auto mb-4 object-cover" 
              />
              <h4 className="text-xl font-semibold mb-2">{member.name}</h4>
              <p className="text-accent mb-2">{member.role}</p>
              <p className="text-sm text-muted-foreground">{member.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
