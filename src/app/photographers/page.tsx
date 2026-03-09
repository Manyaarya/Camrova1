"use client";

import { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTAButton from "@/components/CTAButton";

interface PhotographerFormData {
  fullName: string;
  email: string;
  phoneNumber: string;
  portfolioLink: string;
  experienceLevel: string;
  hourlyRate: string;
  shootTypes: string[];
  reelCreator: string;
  area: string;
  availability: string[];
  bio: string;
  heardFrom: string;
}

// Area options
const areaOptions = [
  "South Delhi",
  "North Delhi",
  "East Delhi",
  "West Delhi",
  "Central Delhi",
  "Noida",
  "Gurugram",
  "Faridabad",
  "Ghaziabad",
];

// Availability options
const availabilityOptions = [
  "Weekday Mornings",
  "Weekday Evenings",
  "Weekends",
  "Flexible / Anytime",
];

// Shoot type options
const shootTypeOptions = [
  "Reels & Short Video",
  "Portraits",
  "Product Photography",
  "Brand Content",
  "Events",
  "Behind the Scenes",
];

// How did you hear options
const heardFromOptions = [
  "Instagram",
  "Someone referred me",
  "Twitter / X",
  "WhatsApp",
  "Google",
  "Other",
];

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

export default function PhotographersPage() {
  const [form, setForm] = useState<PhotographerFormData>({
    fullName: "",
    email: "",
    phoneNumber: "",
    portfolioLink: "",
    experienceLevel: "",
    hourlyRate: "",
    shootTypes: [],
    reelCreator: "",
    area: "",
    availability: [],
    bio: "",
    heardFrom: "",
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
    if (!form.portfolioLink.trim())
      newErrors.portfolioLink = "Portfolio link is required";
    if (!form.experienceLevel)
      newErrors.experienceLevel = "Select experience level";
    if (!form.hourlyRate) newErrors.hourlyRate = "Select your hourly rate";
    if (!form.area) newErrors.area = "Select your area in Delhi";
    if (form.shootTypes.length === 0)
      newErrors.shootTypes = "Select at least one shoot type";
    if (!form.reelCreator)
      newErrors.reelCreator = "Select whether you can shoot Reels";
    if (!form.heardFrom)
      newErrors.heardFrom = "Select how you heard about Camrova";
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
        body: JSON.stringify({ type: "photographer", ...form }),
      });
      if (response.ok) {
        setSuccess(true);
        setForm({
          fullName: "",
          email: "",
          phoneNumber: "",
          portfolioLink: "",
          experienceLevel: "",
          hourlyRate: "",
          shootTypes: [],
          reelCreator: "",
          area: "",
          availability: [],
          bio: "",
          heardFrom: "",
        });
        setTimeout(() => setSuccess(false), 5000);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleShootTypeToggle = (type: string) => {
    setForm((prev) => ({
      ...prev,
      shootTypes: prev.shootTypes.includes(type)
        ? prev.shootTypes.filter((t) => t !== type)
        : [...prev.shootTypes, type],
    }));
  };

  const handleAvailabilityToggle = (option: string) => {
    setForm((prev) => ({
      ...prev,
      availability: prev.availability.includes(option)
        ? prev.availability.filter((a) => a !== option)
        : [...prev.availability, option],
    }));
  };

  const benefits = [
    {
      icon: "🔍",
      title: "Get Discovered",
      desc: "Creators find you directly. No cold DMs.",
    },
    {
      icon: "💰",
      title: "Earn More",
      desc: "Hourly gigs that fit your schedule.",
    },
    {
      icon: "🎁",
      title: "Zero Commission",
      desc: "First 3 bookings are free. You keep it all.",
    },
    {
      icon: "📁",
      title: "Build Your Profile",
      desc: "Showcase your work properly.",
    },
  ];

  const gigTypes = [
    { icon: "🎬", name: "Reels & short video content" },
    { icon: "📸", name: "Creator portraits & headshots" },
    { icon: "📦", name: "Product photography" },
    { icon: "💼", name: "Brand content shoots" },
    { icon: "🎉", name: "Small events" },
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
              Turn your camera
              <br />
              <span className="text-gradient">into a career.</span>
            </motion.h1>
            <motion.p
              className="mt-6 text-lg text-foreground/70 max-w-xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              Get discovered by Delhi&apos;s content creators. Earn on your
              schedule. Keep 100% for your first 3 bookings.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-10"
            >
              <CTAButton href="#signup" variant="primary">
                Join Early Access
              </CTAButton>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="py-16 sm:py-28">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <h2 className="font-heading text-3xl font-bold text-center mb-4">
              Why join Camrova?
            </h2>
            <p className="text-center text-foreground/60 mb-12 sm:mb-16">
              Join Delhi&apos;s fastest growing photographer community.
            </p>
          </AnimatedSection>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {benefits.map((benefit, i) => (
              <AnimatedCard
                key={i}
                delay={i * 0.1}
                className="bg-card border border-border rounded-lg p-5 sm:p-6 text-center"
              >
                <div className="text-4xl mb-3 sm:mb-4">{benefit.icon}</div>
                <h3 className="font-heading text-lg font-semibold text-foreground mb-2">
                  {benefit.title}
                </h3>
                <p className="text-foreground/60 text-sm">{benefit.desc}</p>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>

      {/* ZERO COMMISSION HIGHLIGHT */}
      <section className="py-12 sm:py-16 bg-gold">
        <AnimatedSection>
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-background mb-3 sm:mb-4">
                Your first 3 bookings on Camrova — zero commission.
              </h2>
              <p className="text-background/80 text-lg">
                You keep everything. That&apos;s our promise to early
                photographers.
              </p>
            </motion.div>
          </div>
        </AnimatedSection>
      </section>

      {/* WHAT GIGS LOOK LIKE */}
      <section className="py-16 sm:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <h2 className="font-heading text-3xl font-bold text-center mb-10 sm:mb-12">
              What kind of shoots?
            </h2>
          </AnimatedSection>
          <div className="space-y-3 sm:space-y-4">
            {gigTypes.map((gig, i) => (
              <AnimatedCard
                key={i}
                delay={i * 0.05}
                className="bg-card border border-border rounded-lg p-4 sm:p-5 flex items-center gap-3 sm:gap-4"
              >
                <span className="text-2xl">{gig.icon}</span>
                <span className="text-foreground text-sm sm:text-base">
                  {gig.name}
                </span>
              </AnimatedCard>
            ))}
          </div>
          <div className="mt-6 sm:mt-8 text-center text-foreground/60 text-sm sm:text-base">
            <p>Duration: 1–4 hours typically</p>
            <p>Price range: You set your own rate</p>
          </div>
        </div>
      </section>

      {/* SIGNUP FORM */}
      <section id="signup" className="py-16 sm:py-28 bg-pattern">
        <AnimatedSection>
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-heading text-3xl font-bold text-center mb-4">
              Join our first photographers
            </h2>
            <p className="text-center text-foreground/60 mb-8 sm:mb-10">
              Be part of the founding team. Shape the future of Camrova.
            </p>

            {success ? (
              <div className="bg-gold/10 border border-gold/30 rounded-lg p-6 sm:p-8 text-center max-w-md mx-auto">
                <p className="text-gold text-lg font-medium mb-2">
                  We&apos;ll be in touch within 24 hours.
                </p>
                <p className="text-foreground/60">Welcome to Camrova 📸</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name and Email */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <input
                      type="text"
                      placeholder="Full Name *"
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
                      <p className="text-red-400 text-xs mt-1">
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                {/* Phone */}
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

                {/* Portfolio Link */}
                <div>
                  <input
                    type="url"
                    placeholder="Instagram or Portfolio Link *"
                    value={form.portfolioLink}
                    onChange={(e) =>
                      setForm({ ...form, portfolioLink: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-card border border-border rounded-lg text-foreground placeholder:text-foreground/40 focus:border-gold focus:outline-none min-h-[48px]"
                  />
                  {errors.portfolioLink && (
                    <p className="text-red-400 text-xs mt-1">
                      {errors.portfolioLink}
                    </p>
                  )}
                </div>

                {/* Area in Delhi */}
                <div>
                  <select
                    value={form.area}
                    onChange={(e) => setForm({ ...form, area: e.target.value })}
                    className="w-full px-4 py-3 bg-card border border-border rounded-lg text-foreground focus:border-gold focus:outline-none min-h-[48px]"
                  >
                    <option value="">Area in Delhi *</option>
                    {areaOptions.map((area) => (
                      <option key={area} value={area}>
                        {area}
                      </option>
                    ))}
                  </select>
                  {errors.area && (
                    <p className="text-red-400 text-xs mt-1">{errors.area}</p>
                  )}
                </div>

                {/* Experience Level and Hourly Rate */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <select
                      value={form.experienceLevel}
                      onChange={(e) =>
                        setForm({ ...form, experienceLevel: e.target.value })
                      }
                      className="w-full px-4 py-3 bg-card border border-border rounded-lg text-foreground focus:border-gold focus:outline-none min-h-[48px]"
                    >
                      <option value="">Experience Level *</option>
                      <option value="Beginner">Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Pro">Pro</option>
                    </select>
                    {errors.experienceLevel && (
                      <p className="text-red-400 text-xs mt-1">
                        {errors.experienceLevel}
                      </p>
                    )}
                  </div>
                  <div>
                    <select
                      value={form.hourlyRate}
                      onChange={(e) =>
                        setForm({ ...form, hourlyRate: e.target.value })
                      }
                      className="w-full px-4 py-3 bg-card border border-border rounded-lg text-foreground focus:border-gold focus:outline-none min-h-[48px]"
                    >
                      <option value="">Your hourly rate *</option>
                      <option value="500-1000">₹500 - ₹1000</option>
                      <option value="1000-2000">₹1000 - ₹2000</option>
                      <option value="2000+">₹2000+</option>
                    </select>
                    {errors.hourlyRate && (
                      <p className="text-red-400 text-xs mt-1">
                        {errors.hourlyRate}
                      </p>
                    )}
                  </div>
                </div>

                {/* Shoot Types - Multi-select Checkboxes */}
                <div>
                  <label className="block text-sm text-foreground/70 mb-2">
                    Shoot Types *
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {shootTypeOptions.map((type) => (
                      <motion.button
                        key={type}
                        type="button"
                        onClick={() => handleShootTypeToggle(type)}
                        className={`px-3 sm:px-4 py-2 rounded-lg text-sm transition-colors ${
                          form.shootTypes.includes(type)
                            ? "bg-gold text-background"
                            : "bg-card border border-border text-foreground/70 hover:border-gold"
                        }`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {type}
                      </motion.button>
                    ))}
                  </div>
                  {errors.shootTypes && (
                    <p className="text-red-400 text-xs mt-1">
                      {errors.shootTypes}
                    </p>
                  )}
                </div>

                {/* Can you shoot Reels/Video? */}
                <div>
                  <label className="block text-sm text-foreground/70 mb-2">
                    Can you shoot Reels/Video? *
                  </label>
                  <div className="flex gap-3 sm:gap-4">
                    {["Yes", "No", "Sometimes"].map((option) => (
                      <motion.button
                        key={option}
                        type="button"
                        onClick={() =>
                          setForm({ ...form, reelCreator: option })
                        }
                        className={`flex-1 px-4 sm:px-6 py-2 sm:py-3 rounded-lg text-sm transition-colors min-h-[48px] ${
                          form.reelCreator === option
                            ? "bg-gold text-background"
                            : "bg-card border border-border text-foreground/70 hover:border-gold"
                        }`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {option}
                      </motion.button>
                    ))}
                  </div>
                  {errors.reelCreator && (
                    <p className="text-red-400 text-xs mt-1">
                      {errors.reelCreator}
                    </p>
                  )}
                </div>

                {/* Availability - Multi-select Checkboxes */}
                <div>
                  <label className="block text-sm text-foreground/70 mb-2">
                    Availability
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {availabilityOptions.map((option) => (
                      <motion.button
                        key={option}
                        type="button"
                        onClick={() => handleAvailabilityToggle(option)}
                        className={`px-3 sm:px-4 py-2 rounded-lg text-sm transition-colors ${
                          form.availability.includes(option)
                            ? "bg-gold text-background"
                            : "bg-card border border-border text-foreground/70 hover:border-gold"
                        }`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {option}
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Short Bio */}
                <div>
                  <textarea
                    placeholder="Tell creators about your style and experience... (optional)"
                    value={form.bio}
                    onChange={(e) =>
                      setForm({ ...form, bio: e.target.value.slice(0, 200) })
                    }
                    rows={3}
                    className="w-full px-4 py-3 bg-card border border-border rounded-lg text-foreground placeholder:text-foreground/40 focus:border-gold focus:outline-none min-h-[100px] resize-none"
                  />
                  <p className="text-foreground/40 text-xs mt-1 text-right">
                    {form.bio.length}/200 characters
                  </p>
                </div>

                {/* How did you hear about Camrova? */}
                <div>
                  <select
                    value={form.heardFrom}
                    onChange={(e) =>
                      setForm({ ...form, heardFrom: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-card border border-border rounded-lg text-foreground focus:border-gold focus:outline-none min-h-[48px]"
                  >
                    <option value="">How did you hear about Camrova? *</option>
                    {heardFromOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  {errors.heardFrom && (
                    <p className="text-red-400 text-xs mt-1">
                      {errors.heardFrom}
                    </p>
                  )}
                </div>

                <CTAButton
                  type="submit"
                  variant="primary"
                  fullWidth
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Apply to Join"}
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
