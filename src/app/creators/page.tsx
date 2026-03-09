"use client";

import { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTAButton from "@/components/CTAButton";

interface FormData {
  fullName: string;
  email: string;
  typeOfShoot: string;
  budgetRange: string;
  phoneNumber: string;
}

// AnimatedSection component
function AnimatedSection({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// AnimatedCard with hover effect
function AnimatedCard({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.4 }}
      whileHover={{
        borderColor: "#c9a96e",
        y: -4,
        boxShadow: "0 0 20px rgba(201, 169, 110, 0.15)",
        transition: { duration: 0.2 },
      }}
    >
      {children}
    </motion.div>
  );
}

export default function CreatorsPage() {
  const [form, setForm] = useState<FormData>({
    fullName: "",
    email: "",
    typeOfShoot: "",
    budgetRange: "",
    phoneNumber: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const isValidEmail = (email: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!form.fullName.trim()) newErrors.fullName = "Name is required";
    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!isValidEmail(form.email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (!form.typeOfShoot) newErrors.typeOfShoot = "Select a shoot type";
    if (!form.budgetRange) newErrors.budgetRange = "Select your budget";
    if (form.phoneNumber && !/^\d{10}$/.test(form.phoneNumber)) {
      newErrors.phoneNumber = "Enter a valid 10-digit number";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "creator", ...form }),
      });
      if (response.ok) {
        setSuccess(true);
        setForm({
          fullName: "",
          email: "",
          typeOfShoot: "",
          budgetRange: "",
          phoneNumber: "",
        });
        setTimeout(() => setSuccess(false), 5000);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const painPoints = [
    {
      title: "Your friend promised to shoot. Ghosted for 3 weeks.",
      emoji: "👻",
    },
    {
      title: "Studio quoted ₹15,000 minimum. For a 1 hour reel.",
      emoji: "💸",
    },
    {
      title: "Random guy on Instagram. No portfolio. No trust.",
      emoji: "😬",
    },
    {
      title: "Ended up using front camera. Again.",
      emoji: "📱",
    },
  ];

  const howItWorks = [
    {
      step: "1",
      title: "Tell us your shoot type & budget",
      desc: "Choose what you need — reels, portraits, product, brand content.",
    },
    {
      step: "2",
      title: "We match you with a verified photographer",
      desc: "Our team vets every photographer. You get the best.",
    },
    {
      step: "3",
      title: "Book, shoot, get your content next day",
      desc: "Show up. Shoot. We'll deliver your photos within 24 hours.",
    },
  ];

  const shootTypes = [
    { name: "Reels", icon: "🎬" },
    { name: "Portraits", icon: "📸" },
    { name: "Product", icon: "📦" },
    { name: "Brand", icon: "💼" },
    { name: "Events", icon: "🎉" },
    { name: "Behind the Scenes", icon: "🎥" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* HERO */}
      <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-32 gold-glow">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              visible: { transition: { staggerChildren: 0.15 } },
            }}
          >
            <motion.h1
              className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Stop asking friends.
              <br />
              <span className="text-gradient">Book a pro.</span>
            </motion.h1>
            <motion.p
              className="mt-6 text-lg text-foreground/70 max-w-xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              Verified Delhi photographers, available by the hour. Affordable.
              Reliable. Fast.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-10"
            >
              <CTAButton href="#waitlist" variant="primary">
                Find Your Photographer
              </CTAButton>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* PAIN POINTS */}
      <section className="py-16 sm:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <h2 className="font-heading text-3xl font-bold text-center mb-10 sm:mb-12">
              Sound familiar?
            </h2>
          </AnimatedSection>
          <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
            {painPoints.map((point, i) => (
              <AnimatedCard
                key={i}
                delay={i * 0.1}
                className="bg-card border border-border rounded-lg p-4 sm:p-5 flex items-start gap-3"
              >
                <span className="text-2xl">{point.emoji}</span>
                <p className="text-foreground/80 text-sm">{point.title}</p>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-16 sm:py-28 bg-card/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <h2 className="font-heading text-3xl font-bold text-center mb-12 sm:mb-16">
              How it works
            </h2>
          </AnimatedSection>
          <div className="space-y-6 sm:space-y-8">
            {howItWorks.map((item, i) => (
              <motion.div
                key={i}
                className="flex gap-4 sm:gap-6"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.4 }}
              >
                <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-full bg-gold text-background flex items-center justify-center font-bold text-lg flex-shrink-0">
                  {item.step}
                </div>
                <div className="pt-1 sm:pt-2">
                  <h3 className="font-semibold text-lg text-foreground">
                    {item.title}
                  </h3>
                  <p className="text-foreground/60 mt-1 text-sm sm:text-base">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SHOOT TYPES */}
      <section className="py-16 sm:py-28">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <h2 className="font-heading text-3xl font-bold text-center mb-4">
              What are you shooting?
            </h2>
            <p className="text-center text-foreground/60 mb-8 sm:mb-12">
              Pick what you need. We&apos;ll find the right photographer.
            </p>
          </AnimatedSection>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {shootTypes.map((type, i) => (
              <AnimatedCard
                key={i}
                delay={i * 0.05}
                className="bg-card border border-border rounded-lg p-4 sm:p-5 flex items-center gap-3 sm:gap-4"
              >
                <span className="text-2xl sm:text-3xl">{type.icon}</span>
                <span className="font-medium text-foreground text-sm sm:text-base">
                  {type.name}
                </span>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="py-16 sm:py-28 bg-card/30">
        <AnimatedSection>
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-heading text-3xl font-bold mb-5 sm:mb-6">
              Transparent pricing. No surprises.
            </h2>
            <p className="text-lg text-foreground/70">
              Delhi photographers on Camrova start from{" "}
              <span className="text-gold font-bold">₹1000/hour</span>.
              <br />
              No hidden fees. No agency markup.
              <br />
              You pay the photographer directly.
            </p>
          </div>
        </AnimatedSection>
      </section>

      {/* WAITLIST CTA */}
      <section id="waitlist" className="py-16 sm:py-28 gold-glow">
        <AnimatedSection>
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-heading text-3xl sm:text-4xl font-bold mb-4">
              Ready to book your shoot?
            </h2>
            <p className="text-foreground/60 mb-8 sm:mb-10">
              Join the waitlist. We&apos;ll match you with the perfect
              photographer within 24 hours.
            </p>

            {success ? (
              <div className="bg-gold/10 border border-gold/30 rounded-lg p-6 sm:p-8 max-w-md mx-auto">
                <p className="text-gold text-lg font-medium">
                  Thanks! We&apos;ll be in touch soon. 📸
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="space-y-4 text-left max-w-md mx-auto"
              >
                <div>
                  <input
                    type="text"
                    placeholder="Your Name *"
                    value={form.fullName}
                    onChange={(e) =>
                      setForm({ ...form, fullName: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-card border border-border rounded-lg text-foreground placeholder:text-foreground/40 focus:border-gold focus:outline-none min-h-[48px]"
                  />
                  {errors.fullName && (
                    <p className="text-red-400 text-xs mt-1">
                      {errors.fullName}
                    </p>
                  )}
                </div>
                <div>
                  <input
                    type="email"
                    placeholder="Email *"
                    value={form.email}
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-card border border-border rounded-lg text-foreground placeholder:text-foreground/40 focus:border-gold focus:outline-none min-h-[48px]"
                  />
                  {errors.email && (
                    <p className="text-red-400 text-xs mt-1">{errors.email}</p>
                  )}
                </div>
                <div>
                  <select
                    value={form.typeOfShoot}
                    onChange={(e) =>
                      setForm({ ...form, typeOfShoot: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-card border border-border rounded-lg text-foreground focus:border-gold focus:outline-none min-h-[48px]"
                  >
                    <option value="">Shoot Type *</option>
                    <option value="Reels">Reels</option>
                    <option value="Portraits">Portraits</option>
                    <option value="Product">Product</option>
                    <option value="Brand Content">Brand Content</option>
                    <option value="Events">Events</option>
                    <option value="Other">Other</option>
                  </select>
                  {errors.typeOfShoot && (
                    <p className="text-red-400 text-xs mt-1">
                      {errors.typeOfShoot}
                    </p>
                  )}
                </div>
                <div>
                  <select
                    value={form.budgetRange}
                    onChange={(e) =>
                      setForm({ ...form, budgetRange: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-card border border-border rounded-lg text-foreground focus:border-gold focus:outline-none min-h-[48px]"
                  >
                    <option value="">Budget *</option>
                    <option value="Under 2000">Under ₹2000</option>
                    <option value="2000-5000">₹2000 - ₹5000</option>
                    <option value="5000+">₹5000+</option>
                  </select>
                  {errors.budgetRange && (
                    <p className="text-red-400 text-xs mt-1">
                      {errors.budgetRange}
                    </p>
                  )}
                </div>
                <div>
                  <input
                    type="tel"
                    placeholder="Phone (optional)"
                    value={form.phoneNumber}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        phoneNumber: e.target.value
                          .replace(/\D/g, "")
                          .slice(0, 10),
                      })
                    }
                    maxLength={10}
                    className="w-full px-4 py-3 bg-card border border-border rounded-lg text-foreground placeholder:text-foreground/40 focus:border-gold focus:outline-none min-h-[48px]"
                  />
                  {errors.phoneNumber && (
                    <p className="text-red-400 text-xs mt-1">
                      {errors.phoneNumber}
                    </p>
                  )}
                </div>
                <CTAButton
                  type="submit"
                  variant="primary"
                  fullWidth
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Join Waitlist"}
                </CTAButton>
              </form>
            )}
          </div>
        </AnimatedSection>
      </section>

      <Footer />
    </div>
  );
}
