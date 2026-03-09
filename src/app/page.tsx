"use client";

import { useState, FormEvent, useEffect, useRef } from "react";
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

// Animation settings
const fadeUpSettings = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } as const },
};

const cardHover = {
  rest: { borderColor: "#2a2520", y: 0 },
  hover: {
    borderColor: "#c9a96e",
    y: -4,
    boxShadow: "0 0 20px rgba(201, 169, 110, 0.15)",
    transition: { duration: 0.2 } as const,
  },
};

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

// AnimatedCard component
function AnimatedCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial="rest"
      whileHover="hover"
      animate="rest"
      variants={cardHover}
    >
      {children}
    </motion.div>
  );
}

// StatsCounter component
function StatsCounter() {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isInView) {
          setIsInView(true);
        }
      },
      { threshold: 0.5 },
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [isInView]);

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = 10;
      const duration = 2000;
      const increment = end / (duration / 16);

      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);

      return () => clearInterval(timer);
    }
  }, [isInView]);

  return (
    <span ref={ref} className="text-2xl sm:text-3xl font-bold text-foreground">
      {count}+ photographers already signed up
    </span>
  );
}

export default function Home() {
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
    if (!form.fullName.trim()) newErrors.fullName = "Full Name is required";
    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!isValidEmail(form.email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (!form.typeOfShoot) newErrors.typeOfShoot = "Please select a shoot type";
    if (!form.budgetRange) newErrors.budgetRange = "Please select a budget";
    if (form.phoneNumber && !/^\d{10}$/.test(form.phoneNumber)) {
      newErrors.phoneNumber = "Please enter a valid 10-digit number";
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

  const stats = [
    "10+ Photographers",
    "Delhi-NCR",
    "Hourly Bookings",
    "Starting ₹1000",
  ];

  const creatorSteps = [
    {
      num: "1",
      title: "Tell us what you need",
      desc: "Select your shoot type and budget",
    },
    {
      num: "2",
      title: "Get matched with a verified photographer",
      desc: "We connect you with vetted Delhi photographers",
    },
    {
      num: "3",
      title: "Book, shoot, get your content",
      desc: "Show up, shoot, receive your photos next day",
    },
  ];

  const photographerSteps = [
    {
      num: "1",
      title: "Create your profile",
      desc: "Showcase your work and rates",
    },
    {
      num: "2",
      title: "Get discovered by creators",
      desc: "Creators find you directly",
    },
    {
      num: "3",
      title: "Earn on your own schedule",
      desc: "Accept gigs that fit your calendar",
    },
  ];

  const whyCards = [
    {
      icon: "🏢",
      title: "No Agencies",
      desc: "Direct connection. No middlemen.",
    },
    {
      icon: "✓",
      title: "Verified Photographers",
      desc: "Every photographer is vetted.",
    },
    {
      icon: "⏱",
      title: "Book by the Hour",
      desc: "Flexible. Affordable. You decide.",
    },
    {
      icon: "💰",
      title: "Starting ₹1000",
      desc: "Affordable pricing for everyone.",
    },
    {
      icon: "🎁",
      title: "First 3 Bookings Free",
      desc: "Zero commission for photographers.",
    },
    {
      icon: "📍",
      title: "Delhi Focused",
      desc: "Built for the local community.",
    },
  ];

  const shootTypes = [
    { name: "Reels & Short Video", icon: "🎬" },
    { name: "Portraits", icon: "📸" },
    { name: "Product Shoots", icon: "📦" },
    { name: "Brand Content", icon: "💼" },
    { name: "Events", icon: "🎉" },
    { name: "Behind the Scenes", icon: "🎥" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
        <div className="absolute inset-0 gold-glow pointer-events-none" />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              visible: { transition: { staggerChildren: 0.15 } },
            }}
          >
            <motion.h1
              className="font-heading text-4xl sm:text-5xl lg:text-7xl font-bold leading-tight"
              variants={fadeUpSettings}
            >
              Delhi&apos;s Photographers.
              <br />
              <span className="text-gradient">On Demand. By the Hour.</span>
            </motion.h1>

            <motion.p
              className="mt-6 text-lg sm:text-xl text-foreground/70 max-w-2xl mx-auto"
              variants={fadeUpSettings}
            >
              Book verified photographers for reels, portraits and brand shoots.
              Starting ₹1000. No agencies. No minimums.
            </motion.p>

            <motion.div
              className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
              variants={fadeUpSettings}
            >
              <CTAButton href="/creators" variant="primary">
                Find a Photographer
              </CTAButton>
              <CTAButton href="/photographers" variant="secondary">
                Join as Photographer
              </CTAButton>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* STATS BAR */}
      <AnimatedSection>
        <section className="border-y border-gold/30 bg-card/50 py-4">
          <div className="max-w-5xl mx-auto px-4 flex flex-wrap justify-center gap-4 sm:gap-8 md:gap-12 text-sm text-foreground/60">
            {stats.map((stat, i) => (
              <span key={i} className="flex items-center gap-2">
                {stat}
                {i < stats.length - 1 && (
                  <span className="hidden sm:inline text-gold/40">·</span>
                )}
              </span>
            ))}
          </div>
        </section>
      </AnimatedSection>

      {/* HOW IT WORKS */}
      <section className="py-16 sm:py-28 bg-pattern">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-center mb-12 sm:mb-16">
              Simple. Fast. <span className="text-gold">Done.</span>
            </h2>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-10 lg:gap-16">
            <AnimatedSection>
              <div>
                <h3 className="font-heading text-xl font-semibold text-gold mb-6 sm:mb-8 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center text-gold">
                    👤
                  </span>
                  For Creators
                </h3>
                <div className="space-y-5 sm:space-y-6">
                  {creatorSteps.map((step, i) => (
                    <motion.div
                      key={i}
                      className="flex gap-4"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1, duration: 0.4 }}
                    >
                      <div className="step-number bg-gold/10 text-gold border border-gold/30">
                        {step.num}
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground">
                          {step.title}
                        </h4>
                        <p className="text-foreground/60 text-sm mt-1">
                          {step.desc}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection>
              <div>
                <h3 className="font-heading text-xl font-semibold text-gold mb-6 sm:mb-8 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center text-gold">
                    📷
                  </span>
                  For Photographers
                </h3>
                <div className="space-y-5 sm:space-y-6">
                  {photographerSteps.map((step, i) => (
                    <motion.div
                      key={i}
                      className="flex gap-4"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1, duration: 0.4 }}
                    >
                      <div className="step-number bg-gold/10 text-gold border border-gold/30">
                        {step.num}
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground">
                          {step.title}
                        </h4>
                        <p className="text-foreground/60 text-sm mt-1">
                          {step.desc}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* WHY CAMROVA */}
      <section className="py-16 sm:py-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-center mb-4">
              Why Camrova?
            </h2>
            <p className="text-center text-foreground/60 mb-12 sm:mb-16 max-w-xl mx-auto">
              We&apos;re building the future of Delhi&apos;s creator economy.
            </p>
          </AnimatedSection>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {whyCards.map((card, i) => (
              <AnimatedCard
                key={i}
                className="bg-card border border-border rounded-lg p-5 sm:p-6"
              >
                <div className="text-3xl mb-3 sm:mb-4">{card.icon}</div>
                <h3 className="font-heading text-lg font-semibold text-foreground mb-2">
                  {card.title}
                </h3>
                <p className="text-foreground/60 text-sm">{card.desc}</p>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>

      {/* SHOOT TYPES */}
      <section className="py-16 sm:py-28 bg-card/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-center mb-4">
              What can you book?
            </h2>
            <p className="text-center text-foreground/60 mb-8 sm:mb-12">
              From reels to brand shoots — we&apos;ve got you covered.
            </p>
          </AnimatedSection>

          <div className="flex gap-3 sm:gap-4 overflow-x-auto scrollbar-hide pb-4 -mx-4 px-4">
            {shootTypes.map((type, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
                className="flex-shrink-0 w-36 sm:w-48 bg-card border border-border rounded-lg p-4 sm:p-5 text-center card-hover"
              >
                <div className="text-3xl mb-2 sm:mb-3">{type.icon}</div>
                <h3 className="font-medium text-foreground text-xs sm:text-sm">
                  {type.name}
                </h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SOCIAL PROOF */}
      <section className="py-16 sm:py-28 gold-glow">
        <AnimatedSection>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6">
              Join Delhi&apos;s fastest growing
              <br />
              <span className="text-gold">photographer community</span>
            </h2>
            <p className="text-lg sm:text-xl font-bold text-foreground mb-3 sm:mb-4">
              <StatsCounter />
            </p>
            <p className="text-foreground/60">
              Be part of the first wave. Shape the future.
            </p>
          </div>
        </AnimatedSection>
      </section>

      {/* DUAL CTA */}
      <section className="grid md:grid-cols-2">
        <AnimatedSection>
          <div className="bg-card p-8 sm:p-12 lg:p-16 border-b md:border-b-0 md:border-r border-border">
            <h3 className="font-heading text-xl sm:text-2xl lg:text-3xl font-bold text-foreground mb-3 sm:mb-4">
              I need a photographer
            </h3>
            <p className="text-foreground/60 mb-6 sm:mb-8 max-w-sm">
              Book verified Delhi photographers by the hour. Starting ₹1000.
            </p>
            <CTAButton href="/creators" variant="primary">
              Find a Photographer
            </CTAButton>
          </div>
        </AnimatedSection>

        <AnimatedSection>
          <div className="bg-gold p-8 sm:p-12 lg:p-16">
            <h3 className="font-heading text-xl sm:text-2xl lg:text-3xl font-bold text-background mb-3 sm:mb-4">
              I am a photographer
            </h3>
            <p className="text-background/80 mb-6 sm:mb-8 max-w-sm">
              Get discovered. Earn more. First 3 bookings — zero commission.
            </p>
            <button
              onClick={() => (window.location.href = "/photographers")}
              className="inline-flex items-center justify-center px-6 py-3 font-semibold text-sm rounded-lg transition-all duration-300 bg-background text-gold border-2 border-transparent hover:border-background/30 hover:shadow-xl w-full sm:w-auto"
            >
              Join as Photographer
            </button>
          </div>
        </AnimatedSection>
      </section>

      {/* WAITLIST SECTION */}
      <section id="signup" className="py-16 sm:py-28 bg-pattern">
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
              <div className="bg-gold/10 border border-gold/30 rounded-lg p-6">
                <p className="text-gold font-medium">
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
                    className="w-full px-4 py-3 bg-card border border-border rounded-lg text-foreground placeholder:text-foreground/40 focus:border-gold focus:outline-none transition-colors min-h-[48px]"
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
                    className="w-full px-4 py-3 bg-card border border-border rounded-lg text-foreground placeholder:text-foreground/40 focus:border-gold focus:outline-none transition-colors min-h-[48px]"
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
                    className="w-full px-4 py-3 bg-card border border-border rounded-lg text-foreground focus:border-gold focus:outline-none transition-colors min-h-[48px]"
                  >
                    <option value="">Select Shoot Type *</option>
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
                    className="w-full px-4 py-3 bg-card border border-border rounded-lg text-foreground focus:border-gold focus:outline-none transition-colors min-h-[48px]"
                  >
                    <option value="">Budget Range *</option>
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
                    className="w-full px-4 py-3 bg-card border border-border rounded-lg text-foreground placeholder:text-foreground/40 focus:border-gold focus:outline-none transition-colors min-h-[48px]"
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
