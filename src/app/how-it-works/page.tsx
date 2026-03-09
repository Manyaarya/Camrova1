"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTAButton from "@/components/CTAButton";

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

// FAQ Item component
function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      className="bg-card border border-border rounded-lg overflow-hidden"
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3 }}
    >
      <button
        className="w-full p-4 text-left flex justify-between items-center min-h-[60px]"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-medium text-foreground pr-4">{question}</span>
        <motion.span
          className="text-gold text-xl flex-shrink-0"
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.2 }}
        >
          +
        </motion.span>
      </button>
      <motion.div
        initial={false}
        animate={{
          height: isOpen ? "auto" : 0,
          opacity: isOpen ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <p className="px-4 pb-4 text-foreground/60 text-sm">{answer}</p>
      </motion.div>
    </motion.div>
  );
}

export default function HowItWorksPage() {
  const creatorSteps = [
    {
      num: "1",
      title: "Submit your shoot requirements",
      desc: "Tell us what you need — shoot type, location, date, and budget.",
    },
    {
      num: "2",
      title: "Camrova matches you with a verified photographer",
      desc: "We connect you with vetted photographers who fit your needs.",
    },
    {
      num: "3",
      title: "Confirm booking & shoot details",
      desc: "Review the photographer's profile, portfolio, and confirm your booking.",
    },
    {
      num: "4",
      title: "Show up. Shoot. Get content next day.",
      desc: "Meet your photographer, get your shoot done. Receive your photos within 24 hours.",
    },
    {
      num: "5",
      title: "Leave a review",
      desc: "Share your experience to help other creators find the best photographers.",
    },
  ];

  const photographerSteps = [
    {
      num: "1",
      title: "Sign up and create your profile",
      desc: "Add your details, portfolio, rates, and availability.",
    },
    {
      num: "2",
      title: "Camrova lists you to creators",
      desc: "Your profile becomes visible to Delhi's creator community.",
    },
    {
      num: "3",
      title: "Get matched with relevant shoots",
      desc: "Receive notifications for shoots that match your style and rates.",
    },
    {
      num: "4",
      title: "Confirm booking. Show up. Shoot.",
      desc: "Coordinate with the creator and deliver great content.",
    },
    {
      num: "5",
      title: "Get paid. Build your reputation.",
      desc: "Receive payment directly. Build reviews and grow your profile.",
    },
  ];

  const trustItems = [
    {
      icon: "✓",
      title: "Verified photographer profiles",
      desc: "Every photographer goes through our vetting process.",
    },
    {
      icon: "⭐",
      title: "Reviews after every shoot",
      desc: "Transparent ratings help you choose with confidence.",
    },
    {
      icon: "💬",
      title: "Direct communication before booking",
      desc: "Chat with photographers before you book.",
    },
    {
      icon: "💰",
      title: "Transparent pricing always",
      desc: "No hidden fees. What you see is what you pay.",
    },
  ];

  const faqs = [
    {
      question: "How do I find a photographer?",
      answer:
        "Simply tell us what you need — shoot type, budget, and date. We'll match you with verified photographers in Delhi.",
    },
    {
      question: "How much does it cost?",
      answer:
        "Prices start from ₹1000/hour. You pay the photographer directly with no hidden fees or platform markup.",
    },
    {
      question: "Are photographers verified?",
      answer:
        "Yes! Every photographer on Camrova goes through our vetting process. We verify their portfolio and experience.",
    },
    {
      question: "What if I need to cancel?",
      answer:
        "You can cancel up to 24 hours before the shoot. We work with photographers to be flexible.",
    },
    {
      question: "How does payment work?",
      answer:
        "Payment is made directly to the photographer after the shoot is completed. We facilitate the connection, not the payment.",
    },
    {
      question: "Which areas in Delhi are covered?",
      answer:
        "We cover all of Delhi-NCR including South Delhi, North Delhi, Gurgaon, Noida, and more.",
    },
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
              How Camrova <span className="text-gradient">Works</span>
            </motion.h1>
            <motion.p
              className="mt-6 text-lg text-foreground/70 max-w-xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              Simple for creators. Rewarding for photographers.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* FOR CREATORS */}
      <section className="py-16 sm:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <h2 className="font-heading text-3xl font-bold text-center mb-4">
              For Creators
            </h2>
            <p className="text-center text-foreground/60 mb-12 sm:mb-16">
              Book your perfect photographer in 5 easy steps.
            </p>
          </AnimatedSection>

          <div className="space-y-5 sm:space-y-6">
            {creatorSteps.map((step, i) => (
              <motion.div
                key={i}
                className="flex gap-4 sm:gap-6"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
              >
                <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-full bg-gold text-background flex items-center justify-center font-bold text-lg flex-shrink-0">
                  {step.num}
                </div>
                <div className="pt-1 sm:pt-2">
                  <h3 className="font-semibold text-lg text-foreground">
                    {step.title}
                  </h3>
                  <p className="text-foreground/60 mt-1 text-sm sm:text-base">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FOR PHOTOGRAPHERS */}
      <section className="py-16 sm:py-28 bg-card/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <h2 className="font-heading text-3xl font-bold text-center mb-4">
              For Photographers
            </h2>
            <p className="text-center text-foreground/60 mb-12 sm:mb-16">
              Turn your passion into income in 5 easy steps.
            </p>
          </AnimatedSection>

          <div className="space-y-5 sm:space-y-6">
            {photographerSteps.map((step, i) => (
              <motion.div
                key={i}
                className="flex gap-4 sm:gap-6"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
              >
                <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-full bg-gold text-background flex items-center justify-center font-bold text-lg flex-shrink-0">
                  {step.num}
                </div>
                <div className="pt-1 sm:pt-2">
                  <h3 className="font-semibold text-lg text-foreground">
                    {step.title}
                  </h3>
                  <p className="text-foreground/60 mt-1 text-sm sm:text-base">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TRUST & SAFETY */}
      <section className="py-16 sm:py-28">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <h2 className="font-heading text-3xl font-bold text-center mb-4">
              You&apos;re in safe hands.
            </h2>
            <p className="text-center text-foreground/60 mb-12 sm:mb-16">
              We&apos;ve built trust into every step of the process.
            </p>
          </AnimatedSection>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {trustItems.map((item, i) => (
              <AnimatedCard
                key={i}
                delay={i * 0.1}
                className="bg-card border border-border rounded-lg p-5 sm:p-6 text-center"
              >
                <div className="text-3xl mb-3">{item.icon}</div>
                <h3 className="font-semibold text-foreground mb-2 text-sm sm:text-base">
                  {item.title}
                </h3>
                <p className="text-foreground/60 text-xs sm:text-sm">
                  {item.desc}
                </p>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>

      {/* COMMISSION STRUCTURE */}
      <section className="py-16 sm:py-28 bg-card/30">
        <AnimatedSection>
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-heading text-3xl font-bold text-center mb-8 sm:mb-12">
              Commission Structure
            </h2>
            <div className="bg-card border border-border rounded-lg overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left p-3 sm:p-4 font-semibold text-foreground text-sm sm:text-base">
                      Bookings
                    </th>
                    <th className="text-left p-3 sm:p-4 font-semibold text-foreground text-sm sm:text-base">
                      Commission
                    </th>
                    <th className="text-left p-3 sm:p-4 font-semibold text-foreground text-sm sm:text-base">
                      Note
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border">
                    <td className="p-3 sm:p-4 text-foreground text-sm sm:text-base">
                      First 3 bookings
                    </td>
                    <td className="p-3 sm:p-4">
                      <span className="px-3 py-1 rounded-full text-sm bg-gold/20 text-gold">
                        0%
                      </span>
                    </td>
                    <td className="p-3 sm:p-4 text-foreground/60 text-xs sm:text-sm">
                      You keep 100%
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3 sm:p-4 text-foreground text-sm sm:text-base">
                      After 3 bookings
                    </td>
                    <td className="p-3 sm:p-4">
                      <span className="px-3 py-1 rounded-full text-sm bg-foreground/10 text-foreground/70">
                        Small platform fee
                      </span>
                    </td>
                    <td className="p-3 sm:p-4 text-foreground/60 text-xs sm:text-sm">
                      We only earn when you earn
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-center text-foreground/60 mt-4 sm:mt-6 text-sm">
              We only earn when you earn.
            </p>
          </div>
        </AnimatedSection>
      </section>

      {/* FAQ */}
      <section className="py-16 sm:py-28">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <h2 className="font-heading text-3xl font-bold text-center mb-8 sm:mb-12">
              Frequently Asked Questions
            </h2>
          </AnimatedSection>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <FAQItem key={i} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="grid md:grid-cols-2">
        <AnimatedSection>
          <div className="bg-card p-8 sm:p-12 lg:p-16 border-b md:border-b-0 md:border-r border-border text-center">
            <h3 className="font-heading text-xl sm:text-2xl font-bold text-foreground mb-3 sm:mb-4">
              I need a photographer
            </h3>
            <p className="text-foreground/60 mb-6 sm:mb-8">
              Find verified Delhi photographers for your next shoot.
            </p>
            <CTAButton href="/creators" variant="primary">
              Find a Photographer
            </CTAButton>
          </div>
        </AnimatedSection>

        <AnimatedSection>
          <div className="bg-gold p-8 sm:p-12 lg:p-16 text-center">
            <h3 className="font-heading text-xl sm:text-2xl font-bold text-background mb-3 sm:mb-4">
              I&apos;m a photographer
            </h3>
            <p className="text-background/80 mb-6 sm:mb-8">
              Join Camrova and start earning on your schedule.
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

      <Footer />
    </div>
  );
}
