"use client";

import { useState, FormEvent } from "react";

interface StudentFormData {
  fullName: string;
  email: string;
  typeOfShoot: string;
  budgetRange: string;
  phoneNumber: string;
}

interface PhotographerFormData {
  fullName: string;
  email: string;
  experienceLevel: string;
  portfolioLink: string;
  interestedInPaidGigs: string;
  phoneNumber: string;
}

export default function Home() {
  const [studentForm, setStudentForm] = useState<StudentFormData>({
    fullName: "",
    email: "",
    typeOfShoot: "",
    budgetRange: "",
    phoneNumber: "",
  });

  const [photographerForm, setPhotographerForm] =
    useState<PhotographerFormData>({
      fullName: "",
      email: "",
      experienceLevel: "",
      portfolioLink: "",
      interestedInPaidGigs: "",
      phoneNumber: "",
    });

  const [isStudentSubmitting, setIsStudentSubmitting] = useState(false);
  const [isPhotographerSubmitting, setIsPhotographerSubmitting] =
    useState(false);
  const [studentSuccess, setStudentSuccess] = useState(false);
  const [photographerSuccess, setPhotographerSuccess] = useState(false);
  const [studentErrors, setStudentErrors] = useState<Record<string, string>>(
    {},
  );
  const [photographerErrors, setPhotographerErrors] = useState<
    Record<string, string>
  >({});

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const isValidEmail = (email: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validateStudentForm = (): boolean => {
    const errors: Record<string, string> = {};
    if (!studentForm.fullName.trim()) errors.fullName = "Full Name is required";
    if (!studentForm.email.trim()) {
      errors.email = "Email is required";
    } else if (!isValidEmail(studentForm.email)) {
      errors.email = "Please enter a valid email address";
    }
    if (!studentForm.typeOfShoot)
      errors.typeOfShoot = "Please select a shoot type";
    if (!studentForm.budgetRange)
      errors.budgetRange = "Please select a budget range";
    if (
      studentForm.phoneNumber.trim() &&
      !/^\d{10}$/.test(studentForm.phoneNumber)
    ) {
      errors.phoneNumber = "Please enter a valid 10-digit phone number";
    }
    setStudentErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validatePhotographerForm = (): boolean => {
    const errors: Record<string, string> = {};
    if (!photographerForm.fullName.trim())
      errors.fullName = "Full Name is required";
    if (!photographerForm.email.trim()) {
      errors.email = "Email is required";
    } else if (!isValidEmail(photographerForm.email)) {
      errors.email = "Please enter a valid email address";
    }
    if (!photographerForm.experienceLevel)
      errors.experienceLevel = "Please select experience level";
    if (!photographerForm.portfolioLink.trim())
      errors.portfolioLink = "Portfolio Link is required";
    if (!photographerForm.interestedInPaidGigs)
      errors.interestedInPaidGigs = "Please select an option";
    if (
      photographerForm.phoneNumber.trim() &&
      !/^\d{10}$/.test(photographerForm.phoneNumber)
    ) {
      errors.phoneNumber = "Please enter a valid 10-digit phone number";
    }
    setPhotographerErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleStudentSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validateStudentForm()) return;
    setIsStudentSubmitting(true);
    try {
      const response = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "student", ...studentForm }),
      });
      if (response.ok) {
        setStudentSuccess(true);
        setStudentForm({
          fullName: "",
          email: "",
          typeOfShoot: "",
          budgetRange: "",
          phoneNumber: "",
        });
        setTimeout(() => setStudentSuccess(false), 5000);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsStudentSubmitting(false);
    }
  };

  const handlePhotographerSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validatePhotographerForm()) return;
    setIsPhotographerSubmitting(true);
    try {
      const response = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "photographer", ...photographerForm }),
      });
      if (response.ok) {
        setPhotographerSuccess(true);
        setPhotographerForm({
          fullName: "",
          email: "",
          experienceLevel: "",
          portfolioLink: "",
          interestedInPaidGigs: "",
          phoneNumber: "",
        });
        setTimeout(() => setPhotographerSuccess(false), 5000);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsPhotographerSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <span className="text-2xl font-semibold text-gray-900">
              Camrova
            </span>
            <div className="hidden md:flex items-center space-x-8">
              <button
                onClick={() => scrollToSection("hero")}
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection("why")}
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                Why Camrova
              </button>
              <button
                onClick={() => scrollToSection("benefits")}
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                Benefits
              </button>
              <button
                onClick={() => scrollToSection("signup")}
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                Join
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        id="hero"
        className="min-h-screen flex items-center justify-center pt-16"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-6">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900">
              Find talented photographers in Delhi. Or get discovered as one.
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
              Camrova is building a platform where photographers can showcase
              their work and get discovered for shoots. Starting with Delhi
              photographers.
            </p>
            <p className="text-sm text-gray-500">
              Use your Instagram as your portfolio.
            </p>
            <p className="text-sm text-gray-500">
              Join the first photographers helping shape Camrova.
            </p>
            <div className="pt-8">
              <button
                onClick={() => scrollToSection("signup")}
                className="px-8 py-4 bg-gray-900 text-white font-medium rounded-full hover:bg-gray-800 transition-all transform hover:scale-105 shadow-lg"
              >
                Join Early Access
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Why Camrova Section */}
      <section
        id="why"
        className="min-h-[50vh] flex items-center justify-center py-20 bg-white"
      >
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-semibold text-gray-900 mb-6">
            Why Camrova?
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            Many photographers rely only on Instagram or referrals to get work.
            Camrova aims to make it easier for photographers to be discovered
            and connect with people who need photoshoots.
          </p>
        </div>
      </section>

      {/* Benefits Section */}
      <section
        id="benefits"
        className="min-h-[50vh] flex items-center justify-center py-20 bg-gray-50"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-semibold text-gray-900">
              Benefits
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Card 1 */}
            <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100 text-center">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-6 h-6 text-gray-700"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
              <h3 className="font-medium text-gray-900">
                Create a photographer profile
              </h3>
            </div>
            {/* Card 2 */}
            <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100 text-center">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-6 h-6 text-gray-700"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="font-medium text-gray-900">Showcase your work</h3>
            </div>
            {/* Card 3 */}
            <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100 text-center">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-6 h-6 text-gray-700"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <h3 className="font-medium text-gray-900">
                Get discovered for shoots
              </h3>
            </div>
            {/* Card 4 */}
            <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100 text-center">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-6 h-6 text-gray-700"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h3 className="font-medium text-gray-900">
                Be part of the first Camrova community
              </h3>
            </div>
          </div>
        </div>
      </section>

      {/* Signup Section */}
      <section
        id="signup"
        className="min-h-screen flex items-center justify-center py-20 bg-white"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-semibold text-gray-900 mb-4">
              Join Early Access
            </h2>
            <p className="text-gray-600 max-w-xl mx-auto">
              Camrova is currently onboarding early photographers and people
              looking for shoots.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Student Form */}
            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100">
              <div className="text-center mb-6">
                <h3 className="text-xl font-semibold text-gray-900">
                  I need a Photographer
                </h3>
              </div>
              {studentSuccess ? (
                <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
                  <svg
                    className="w-12 h-12 text-green-500 mx-auto mb-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <h3 className="text-xl font-medium text-gray-900 mb-2">
                    Thanks for joining early.
                  </h3>
                  <p className="text-gray-600">
                    We're building Camrova with our first community.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleStudentSubmit} className="space-y-4">
                  <div>
                    <label
                      htmlFor="studentFullName"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="studentFullName"
                      value={studentForm.fullName}
                      onChange={(e) =>
                        setStudentForm({
                          ...studentForm,
                          fullName: e.target.value,
                        })
                      }
                      className={`w-full px-4 py-3 bg-white border rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all ${studentErrors.fullName ? "border-red-500" : "border-gray-200"}`}
                      placeholder="Enter your full name"
                    />
                    {studentErrors.fullName && (
                      <p className="mt-1 text-sm text-red-500">
                        {studentErrors.fullName}
                      </p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="studentEmail"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="studentEmail"
                      value={studentForm.email}
                      onChange={(e) =>
                        setStudentForm({
                          ...studentForm,
                          email: e.target.value,
                        })
                      }
                      className={`w-full px-4 py-3 bg-white border rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all ${studentErrors.email ? "border-red-500" : "border-gray-200"}`}
                      placeholder="Enter your email address"
                    />
                    {studentErrors.email && (
                      <p className="mt-1 text-sm text-red-500">
                        {studentErrors.email}
                      </p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="typeOfShoot"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Type of Shoot <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="typeOfShoot"
                      value={studentForm.typeOfShoot}
                      onChange={(e) =>
                        setStudentForm({
                          ...studentForm,
                          typeOfShoot: e.target.value,
                        })
                      }
                      className={`w-full px-4 py-3 bg-white border rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all ${studentErrors.typeOfShoot ? "border-red-500" : "border-gray-200"}`}
                    >
                      <option value="">Select type of shoot</option>
                      <option value="Event">Event</option>
                      <option value="Portfolio">Portfolio</option>
                      <option value="Reels">Reels</option>
                      <option value="Birthday">Birthday</option>
                      <option value="Other">Other</option>
                    </select>
                    {studentErrors.typeOfShoot && (
                      <p className="mt-1 text-sm text-red-500">
                        {studentErrors.typeOfShoot}
                      </p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="budgetRange"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Budget Range <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="budgetRange"
                      value={studentForm.budgetRange}
                      onChange={(e) =>
                        setStudentForm({
                          ...studentForm,
                          budgetRange: e.target.value,
                        })
                      }
                      className={`w-full px-4 py-3 bg-white border rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all ${studentErrors.budgetRange ? "border-red-500" : "border-gray-200"}`}
                    >
                      <option value="">Select budget range</option>
                      <option value="Under 2000">Under 2000</option>
                      <option value="2000-5000">2000-5000</option>
                      <option value="5000+">5000+</option>
                    </select>
                    {studentErrors.budgetRange && (
                      <p className="mt-1 text-sm text-red-500">
                        {studentErrors.budgetRange}
                      </p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="studentPhone"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Phone Number{" "}
                      <span className="text-gray-400">(optional)</span>
                    </label>
                    <input
                      type="tel"
                      id="studentPhone"
                      value={studentForm.phoneNumber}
                      onChange={(e) =>
                        setStudentForm({
                          ...studentForm,
                          phoneNumber: e.target.value.replace(/\D/g, ""),
                        })
                      }
                      maxLength={10}
                      className={`w-full px-4 py-3 bg-white border rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all ${studentErrors.phoneNumber ? "border-red-500" : "border-gray-200"}`}
                      placeholder="Enter 10-digit phone number"
                    />
                    {studentErrors.phoneNumber && (
                      <p className="mt-1 text-sm text-red-500">
                        {studentErrors.phoneNumber}
                      </p>
                    )}
                  </div>
                  <button
                    type="submit"
                    disabled={isStudentSubmitting}
                    className="w-full px-8 py-4 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center"
                  >
                    {isStudentSubmitting ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Submitting...
                      </>
                    ) : (
                      "Submit"
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* Photographer Form */}
            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100">
              <div className="text-center mb-6">
                <h3 className="text-xl font-semibold text-gray-900">
                  I am a Photographer
                </h3>
              </div>
              {photographerSuccess ? (
                <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
                  <svg
                    className="w-12 h-12 text-green-500 mx-auto mb-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <h3 className="text-xl font-medium text-gray-900 mb-2">
                    Thanks for joining early.
                  </h3>
                  <p className="text-gray-600">
                    We're building Camrova with our first community.
                  </p>
                </div>
              ) : (
                <form onSubmit={handlePhotographerSubmit} className="space-y-4">
                  <div>
                    <label
                      htmlFor="photographerFullName"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="photographerFullName"
                      value={photographerForm.fullName}
                      onChange={(e) =>
                        setPhotographerForm({
                          ...photographerForm,
                          fullName: e.target.value,
                        })
                      }
                      className={`w-full px-4 py-3 bg-white border rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all ${photographerErrors.fullName ? "border-red-500" : "border-gray-200"}`}
                      placeholder="Enter your full name"
                    />
                    {photographerErrors.fullName && (
                      <p className="mt-1 text-sm text-red-500">
                        {photographerErrors.fullName}
                      </p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="photographerEmail"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="photographerEmail"
                      value={photographerForm.email}
                      onChange={(e) =>
                        setPhotographerForm({
                          ...photographerForm,
                          email: e.target.value,
                        })
                      }
                      className={`w-full px-4 py-3 bg-white border rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all ${photographerErrors.email ? "border-red-500" : "border-gray-200"}`}
                      placeholder="Enter your email address"
                    />
                    {photographerErrors.email && (
                      <p className="mt-1 text-sm text-red-500">
                        {photographerErrors.email}
                      </p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="experienceLevel"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Experience Level <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="experienceLevel"
                      value={photographerForm.experienceLevel}
                      onChange={(e) =>
                        setPhotographerForm({
                          ...photographerForm,
                          experienceLevel: e.target.value,
                        })
                      }
                      className={`w-full px-4 py-3 bg-white border rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all ${photographerErrors.experienceLevel ? "border-red-500" : "border-gray-200"}`}
                    >
                      <option value="">Select experience level</option>
                      <option value="Beginner">Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Professional">Professional</option>
                    </select>
                    {photographerErrors.experienceLevel && (
                      <p className="mt-1 text-sm text-red-500">
                        {photographerErrors.experienceLevel}
                      </p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="portfolioLink"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Instagram or Portfolio Link{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="url"
                      id="portfolioLink"
                      value={photographerForm.portfolioLink}
                      onChange={(e) =>
                        setPhotographerForm({
                          ...photographerForm,
                          portfolioLink: e.target.value,
                        })
                      }
                      className={`w-full px-4 py-3 bg-white border rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all ${photographerErrors.portfolioLink ? "border-red-500" : "border-gray-200"}`}
                      placeholder="https://instagram.com/yourprofile or portfolio URL"
                    />
                    {photographerErrors.portfolioLink && (
                      <p className="mt-1 text-sm text-red-500">
                        {photographerErrors.portfolioLink}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Interested in Paid Gigs?{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <div className="flex gap-6">
                      <label className="flex items-center cursor-pointer">
                        <input
                          type="radio"
                          name="paidGigs"
                          value="Yes"
                          checked={
                            photographerForm.interestedInPaidGigs === "Yes"
                          }
                          onChange={(e) =>
                            setPhotographerForm({
                              ...photographerForm,
                              interestedInPaidGigs: e.target.value,
                            })
                          }
                          className="w-4 h-4 text-gray-900 bg-white border-gray-300 focus:ring-gray-900"
                        />
                        <span className="ml-2 text-gray-700">Yes</span>
                      </label>
                      <label className="flex items-center cursor-pointer">
                        <input
                          type="radio"
                          name="paidGigs"
                          value="No"
                          checked={
                            photographerForm.interestedInPaidGigs === "No"
                          }
                          onChange={(e) =>
                            setPhotographerForm({
                              ...photographerForm,
                              interestedInPaidGigs: e.target.value,
                            })
                          }
                          className="w-4 h-4 text-gray-900 bg-white border-gray-300 focus:ring-gray-900"
                        />
                        <span className="ml-2 text-gray-700">No</span>
                      </label>
                    </div>
                    {photographerErrors.interestedInPaidGigs && (
                      <p className="mt-1 text-sm text-red-500">
                        {photographerErrors.interestedInPaidGigs}
                      </p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="photographerPhone"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Phone Number{" "}
                      <span className="text-gray-400">(optional)</span>
                    </label>
                    <input
                      type="tel"
                      id="photographerPhone"
                      value={photographerForm.phoneNumber}
                      onChange={(e) =>
                        setPhotographerForm({
                          ...photographerForm,
                          phoneNumber: e.target.value.replace(/\D/g, ""),
                        })
                      }
                      maxLength={10}
                      className={`w-full px-4 py-3 bg-white border rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all ${photographerErrors.phoneNumber ? "border-red-500" : "border-gray-200"}`}
                      placeholder="Enter 10-digit phone number"
                    />
                    {photographerErrors.phoneNumber && (
                      <p className="mt-1 text-sm text-red-500">
                        {photographerErrors.phoneNumber}
                      </p>
                    )}
                  </div>
                  <button
                    type="submit"
                    disabled={isPhotographerSubmitting}
                    className="w-full px-8 py-4 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center"
                  >
                    {isPhotographerSubmitting ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Submitting...
                      </>
                    ) : (
                      "Submit"
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-2xl font-semibold text-white mb-2">Camrova</h3>
          <p className="text-gray-400">Every Moment Deserves a Lens.</p>
        </div>
      </footer>
    </div>
  );
}
