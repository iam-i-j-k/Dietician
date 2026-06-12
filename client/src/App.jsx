import React, { useState } from 'react';

const faqs = [
  {
    question: "How are the programs delivered?",
    answer: "Only online option is available. Clients are managed fully online via WhatsApp and calls.",
  },
  {
    question: "What's the expected weight loss?",
    answer: "For the Metabolic Reset program, clients typically see 3–5 kg of fat loss per month with consistent adherence.",
  },
  {
    question: "Do I need to share my medical reports?",
    answer: "For the Metabolic Reset program, Yes - this is what makes the program effective. Your reports help us understand the root cause  and customise your planm, clients typically see 3–5 kg of fat loss per month with  consistent adherence.",
  },
  {
    question: "Can I join if I don't have a diagnosis yet?",
    answer: "Absolutely. Many clients come with symptoms but no formal diagnosis. We work with what you have and recommend the right tests.",
  },
  {
    question: "How do I reach you for support?",
    answer: "All clients get WhatsApp chat support throughout the program for questions, updates, and guidance.",
  },
];

const App = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

  // Add this state at the top of your App component, with the existing useState
  const [formData, setFormData] = useState({
    name: "", email: "", phone: "", age: "", weight: "", height: "",
    service: "", reason: "", message: "",
  });
  const [formStatus, setFormStatus] = useState(null); // null | "sending" | "success" | "error"

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    console.log("Submitting contact form", formData);
    if (!formData.name || !formData.email || !formData.phone) {
      console.warn("Contact form validation failed", {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
      });
      setFormStatus("error");
      return;
    }
    setFormStatus("sending");
    try {
      const res = await fetch("http://localhost:3001/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log("Contact form response", res.status, data);
      if (res.ok) {
        console.log("Contact form submitted successfully");
        setFormStatus("success");
        setFormData({ name: "", email: "", phone: "", age: "", weight: "", height: "", service: "", reason: "", message: "" });
      } else {
        console.error("Contact form server error", data);
        setFormStatus("error");
      }
    } catch (err) {
      console.error("Contact form submit failed", err);
      setFormStatus("error");
    }
  };

  return (
    <div id="home" className="font-gelasio text-gray-800 bg-[#fbf9f6] min-h-screen overflow-x-hidden">
      <nav className="flex items-center justify-between px-4 md:px-8 py-4 bg-white shadow-sm sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <img src="/icon.png" alt="Dt. Girija Icon" className="h-10 md:h-12" />
          <img src="/logo.png" alt="Dt. Girija Logo" className="h-10 md:h-12" />
        </div>
        <div className="hidden md:flex gap-6 text-sm font-medium">
          <a href="#home" className="hover:text-green-700">Home</a>
          <a href="#about" className="hover:text-green-700">About me</a>
          <a href="#programs" className="hover:text-green-700">Services</a>
          <a href="#testimonials" className="hover:text-green-700">Testimonials</a>
          <a href="#faq" className="hover:text-green-700">FAQ</a>
          <a href="#contact" className="hover:text-green-700">Contact</a>
        </div>
        <a href="#contact" className="bg-[#3a5a40] text-white px-4 md:px-6 py-2 rounded-full text-sm font-semibold hover:bg-[#2c4430] transition-colors">
          Book now
        </a>
      </nav>

      <section className="bg-[url('/bg.png')] px-4 md:px-8 py-10 md:py-16 flex flex-col md:flex-row items-center mx-auto gap-8 md:gap-12">
        <div className="w-full md:w-1/2 space-y-6 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            Heal from the root cause - <span className="text-[#4a7c59]">not just the symptom.</span>
          </h1>
          <p className="text-base md:text-lg text-gray-600">
            Science-backed, personalized nutrition therapy for metabolic, hormonal, and reproductive health. Home food. Real support. Real results.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <a href="#contact" className="bg-[#3a5a40] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#2c4430] transition-colors flex items-center justify-center gap-2">
              Book a Free Discovery Call
              <span>→</span>
            </a>
            <a href="#programs" className="border border-gray-400 text-gray-700 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors w-full sm:w-auto">
              View Programs
            </a>
          </div>
        </div>
        <div className="w-full md:w-1/2 mt-8 md:mt-0 relative">
          <img src="/hero.png" alt="Healthy food collage" className="rounded-2xl shadow-lg w-full object-cover" />
        </div>
      </section>

      <section id="about" className="px-4 md:px-8 py-10 md:py-16 bg-[url('/bg.png')] mx-auto flex flex-col md:flex-row gap-8 md:gap-12 items-center">
        <div className="w-full md:w-5/12">
          <div className="rounded-t-full pt-4 px-4">
            <img src="/girija.png" alt="Dt. Girija" className="w-full h-auto" />
          </div>
        </div>
        <div className="w-full md:w-7/12 space-y-6 text-center md:text-left">
          <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-wide">About Me</h2>
          <p className="text-gray-700 leading-relaxed text-sm md:text-base">
            Hi, I'm Dt. Girija, a certified dietitian with an MSc in Clinical Dietetics and specialised certification as an IIN Hormonal Health Coach. I am dedicated to helping you build a healthier, more balanced relationship with food through practical, personalised nutrition guidance.
          </p>
          <p className="text-gray-700 leading-relaxed text-sm md:text-base">
            My approach combines evidence-based dietetics with a deep understanding that every person's body, lifestyle, hormones, and health goals are unique. Together, we'll create a nutrition plan that supports your health, fits your routine, and is sustainable for the long term.
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-4">
            <div className="flex flex-col items-center text-center p-3 bg-white rounded-lg shadow-sm border border-gray-100">
              <span className="text-2xl mb-2">✔️</span>
              <span className="text-xs font-semibold">Qualified & Certified</span>
            </div>
            <div className="flex flex-col items-center text-center p-3 bg-white rounded-lg shadow-sm border border-gray-100">
              <span className="text-2xl font-bold text-[#3a5a40] mb-2">3+</span>
              <span className="text-xs font-semibold">years of experience</span>
            </div>
            <div className="flex flex-col items-center text-center p-3 bg-white rounded-lg shadow-sm border border-gray-100">
              <span className="text-2xl mb-2">🍎</span>
              <span className="text-xs font-semibold">Nutrition & Wellness</span>
            </div>
            <div className="flex flex-col items-center text-center p-3 bg-white rounded-lg shadow-sm border border-gray-100">
              <span className="text-2xl font-bold text-[#3a5a40] mb-2">IIN</span>
              <span className="text-xs font-semibold">Certified</span>
            </div>
          </div>

          <ul className="space-y-3 text-left inline-block md:block">
            <li className="flex items-center gap-3 text-sm text-gray-700"><span className="text-green-600">✓</span> Science-based nutrition counselling</li>
            <li className="flex items-center gap-3 text-sm text-gray-700"><span className="text-green-600">✓</span> Personalised, sustainable diet plans</li>
            <li className="flex items-center gap-3 text-sm text-gray-700"><span className="text-green-600">✓</span> Hormonal health-focused support</li>
            <li className="flex items-center gap-3 text-sm text-gray-700"><span className="text-green-600">✓</span> Practical lifestyle and wellness guidance</li>
            <li className="flex items-center gap-3 text-sm text-gray-700"><span className="text-green-600">✓</span> Compassionate, judgement-free care</li>
          </ul>
        </div>
      </section>

      <section className="px-4 md:px-8 py-10 md:py-16 text-center max-w-5xl mx-auto relative overflow-hidden md:overflow-visible">
        <h2 className="text-2xl md:text-3xl font-bold mb-2">Why choose this plan ?</h2>
        <p className="text-lg md:text-xl text-gray-600 mb-6 md:mb-8">This isn't a generic diet plan.</p>
        <p className="text-xs md:text-sm text-gray-500 mb-8 md:mb-10 px-4 md:px-0">Every client gets a personalised 3-month program built around their medical history, test reports, and root cause — not a one-size-fits-all chart.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-[#f4e6d3] p-4 md:p-6 rounded-lg font-medium shadow-sm flex items-center justify-center text-sm md:text-base">
            Diet charts revised every 15 days based on your progress
          </div>
          <div className="bg-[#f4e6d3] p-4 md:p-6 rounded-lg font-medium shadow-sm flex items-center justify-center text-sm md:text-base">
            WhatsApp support throughout — real guidance, not silence
          </div>
          <div className="bg-[#f4e6d3] p-4 md:p-6 rounded-lg font-medium shadow-sm flex items-center justify-center text-sm md:text-base">
            Root cause analysis before any plan is made
          </div>
          <div className="bg-[#f4e6d3] p-4 md:p-6 rounded-lg font-medium shadow-sm flex items-center justify-center text-sm md:text-base">
            Fortnightly review calls to track and recalibrate
          </div>
          <div className="bg-[#f4e6d3] p-4 md:p-6 rounded-lg font-medium shadow-sm flex items-center justify-center text-sm md:text-base md:col-span-2 lg:col-span-1 lg:col-start-1 lg:col-end-3 w-full md:w-1/2 mx-auto">
            Expected outcome: 3-5 kg of sustainable fat loss per month
          </div>
        </div>

        <div className="hidden md:flex absolute -right-40 -bottom-45 gap-5">
          <img className="absolute right-35 -bottom-3" src="/single-orange.png" alt="" /><img src="/single-orange.png" alt="" />
        </div>
      </section>

      <section className="px-4 md:px-8 py-10 md:py-16 bg-[#eef3f0]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl font-bold tracking-wide uppercase mb-2">Results and Impact</h2>
            <p className="text-lg md:text-xl text-gray-600 mb-4">Real Clients. Real Transformations</p>
            <p className="text-xs md:text-sm text-gray-500 max-w-2xl mx-auto px-4 md:px-0">Across 500+ clients, the outcomes speak for themselves — measurable fat loss, improved lab reports, restored energy, and habits that last well beyond the program.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <div className="bg-[#dbe7e1] p-4 md:p-6 rounded-xl flex flex-col sm:flex-row items-center sm:items-start gap-4 md:gap-6 shadow-sm border border-white/50 text-center sm:text-left">
              <div className="flex-1">
                <h3 className="text-lg md:text-xl font-bold mb-1">Sustainable fat loss</h3>
                <p className="text-xl md:text-2xl font-extrabold text-[#3a5a40] mb-2">3-5 kg per month</p>
                <p className="text-xs md:text-sm text-gray-700 leading-tight">through root-cause nutrition, not calorie restriction</p>
              </div>
              <div className="w-16 h-16 md:w-24 md:h-24 shrink-0 bg-white rounded-full flex items-center justify-center shadow-inner">
                <span className="text-2xl md:text-4xl">📉</span>
              </div>
            </div>

            <div className="bg-[#dbe7e1] p-4 md:p-6 rounded-xl flex flex-col sm:flex-row items-center sm:items-start gap-4 md:gap-6 shadow-sm border border-white/50 text-center sm:text-left">
              <div className="flex-1">
                <h3 className="text-lg md:text-xl font-bold mb-1">Better Lab Reports</h3>
                <p className="text-xs md:text-sm text-gray-700 leading-tight">Improved markers for blood sugar, thyroid, hormones, and liver health</p>
              </div>
              <div className="w-16 h-16 md:w-24 md:h-24 shrink-0 bg-white rounded-full flex items-center justify-center shadow-inner">
                <span className="text-2xl md:text-4xl">🔬</span>
              </div>
            </div>

            <div className="bg-[#fdf4e3] p-4 md:p-6 rounded-xl flex flex-col sm:flex-row items-center sm:items-start gap-4 md:gap-6 shadow-sm border border-white/50 text-center sm:text-left">
              <div className="flex-1">
                <h3 className="text-lg md:text-xl font-bold mb-1">Lasting Energy</h3>
                <p className="text-xs md:text-sm text-gray-700 leading-tight">Reduced fatigue and brain fog through targeted micronutrient planning</p>
              </div>
              <div className="w-16 h-16 md:w-24 md:h-24 shrink-0 bg-white rounded-full flex items-center justify-center shadow-inner">
                <span className="text-2xl md:text-4xl">⚡</span>
              </div>
            </div>

            <div className="bg-[#dbe7e1] p-4 md:p-6 rounded-xl flex flex-col sm:flex-row items-center sm:items-start gap-4 md:gap-6 shadow-sm border border-white/50 text-center sm:text-left">
              <div className="flex-1">
                <h3 className="text-lg md:text-xl font-bold mb-1">Sustainable Habits</h3>
                <p className="text-xs md:text-sm text-gray-700 leading-tight">Nutrition you can maintain long-term — no deprivation, no burnout</p>
              </div>
              <div className="w-16 h-16 md:w-24 md:h-24 shrink-0 bg-white rounded-full flex items-center justify-center shadow-inner">
                <span className="text-2xl md:text-4xl">🌱</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="programs" className="px-4 md:px-8 py-10 md:py-16 mx-auto text-center bg-[url('/bg.png')]">
        <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-wide mb-2">Our Programs</h2>
        <p className="text-lg md:text-xl text-gray-600 mb-6">Three Programs. One Goal: Your Health.</p>
        <p className="text-xs md:text-sm text-gray-500 mb-8 md:mb-12 max-w-3xl mx-auto px-4 md:px-0">
          Each program is a 3-month, fully personalised journey — built around your body, your condition, and your goals. Choose the one that speaks to where you are right now.
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
          <div className="bg-[#fce5c8] rounded-xl p-6 md:p-8 shadow-sm flex flex-col items-center h-56 md:h-64 border border-[#f5d5ac]">
            <h3 className="text-xl md:text-2xl font-bold text-center">Metabolic reset</h3>
            <ul className="flex-1 flex flex-col justify-center space-y-1 md:space-y-2 text-base md:text-lg text-gray-700 text-center mt-4">
              <li>Weight Loss</li>
              <li>Diabetes</li>
              <li>Thyroid</li>
              <li>Fatty Liver</li>
            </ul>
          </div>

          <div className="bg-[#fce5c8] rounded-xl p-6 md:p-8 shadow-sm flex flex-col items-center h-56 md:h-64 border border-[#f5d5ac]">
            <h3 className="text-xl md:text-2xl font-bold text-center">Hormonal balance</h3>
            <ul className="flex-1 flex flex-col justify-center space-y-1 md:space-y-2 text-base md:text-lg text-gray-700 text-center mt-4">
              <li>PCOS</li>
              <li>Fertility Nutrition</li>
            </ul>
          </div>

          <div className="bg-[#fce5c8] rounded-xl p-6 md:p-8 shadow-sm flex flex-col items-center h-56 md:h-64 border border-[#f5d5ac] sm:col-span-2 md:col-span-1 sm:w-1/2 md:w-full mx-auto">
            <h3 className="text-xl md:text-2xl font-bold text-center">Pregnancy Nutrition</h3>
            <ul className="flex-1 flex flex-col justify-center space-y-1 md:space-y-2 text-base md:text-lg text-gray-700 text-center mt-4">
              <li>Prenatal</li>
              <li>Postnatal Recovery</li>
            </ul>
          </div>
        </div>
      </section>

      <div className="mx-auto px-4 md:px-8 space-y-16 md:space-y-24 pb-12 md:pb-20 bg-[url('/bg.png')]">
        <section className="flex flex-col md:flex-row gap-8 md:gap-12 bg-[#fdfaf5] p-6 md:p-8 rounded-2xl md:rounded-3xl border border-gray-100 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 left-4 md:left-8 bg-[#e8cdb2] px-3 md:px-4 py-1 text-[10px] md:text-xs font-bold rounded-b-md z-30">Program 1</div>
          <img className="hidden md:block absolute top-0 right-0 z-10 w-1/2 opacity-50 md:opacity-100" src="/blade.png" alt="" />
          <img className="hidden md:block absolute top-15 right-0 z-10 w-1/2 opacity-50 md:opacity-100" src="/blade.png" alt="" />
          <div className="w-full md:w-1/2 mt-8 md:mt-6 z-20">
            <h2 className="text-2xl md:text-3xl font-bold mb-2">METABOLIC RESET</h2>
            <p className="text-xs md:text-sm text-gray-500 mb-4">Weight Loss • Diabetes & Pre-Diabetes • Thyroid • Fatty Liver</p>
            <p className="text-sm font-medium mb-6 md:mb-8">Reset your metabolism. Reverse the damage. Reclaim your energy.</p>
            
            <h3 className="text-lg md:text-xl font-bold mb-3">Who This Is For</h3>
            <p className="text-xs md:text-sm text-gray-700 leading-relaxed mb-6">
              If you've been struggling with unexplained weight gain, fatigue, high blood sugar, sluggish thyroid, or a fatty liver diagnosis — this program is designed for you. These conditions are deeply connected through insulin resistance and chronic inflammation, and that's exactly where we start.
            </p>
          </div>
          <div className="w-full md:w-1/2 bg-[#f4e6d3ec] p-6 md:p-8 rounded-xl md:rounded-2xl z-20">
            <h3 className="text-lg md:text-xl font-bold mb-4 md:mb-6">What We Focus On:</h3>
            <ul className="space-y-4 md:space-y-5">
              <li className="flex gap-3 md:gap-4 items-start">
                <span className="text-xl md:text-2xl mt-1 shrink-0">🔄</span>
                <div>
                  <p className="font-bold text-xs md:text-sm">Correcting insulin resistance</p>
                  <p className="text-[10px] md:text-xs text-gray-600">through food timing and composition</p>
                </div>
              </li>
              <li className="flex gap-3 md:gap-4 items-start">
                <span className="text-xl md:text-2xl mt-1 shrink-0">📉</span>
                <div>
                  <p className="font-bold text-xs md:text-sm">Reducing inflammation</p>
                  <p className="text-[10px] md:text-xs text-gray-600">with targeted anti-inflammatory nutrition</p>
                </div>
              </li>
              <li className="flex gap-3 md:gap-4 items-start">
                <span className="text-xl md:text-2xl mt-1 shrink-0">🛡️</span>
                <div>
                  <p className="font-bold text-xs md:text-sm">Supporting liver detoxification</p>
                  <p className="text-[10px] md:text-xs text-gray-600">and fat metabolism</p>
                </div>
              </li>
              <li className="flex gap-3 md:gap-4 items-start">
                <span className="text-xl md:text-2xl mt-1 shrink-0">⚡</span>
                <div>
                  <p className="font-bold text-xs md:text-sm">Optimizing thyroid function</p>
                  <p className="text-[10px] md:text-xs text-gray-600">through micronutrient-specific planning</p>
                </div>
              </li>
              <li className="flex gap-3 md:gap-4 items-start">
                <span className="text-xl md:text-2xl mt-1 shrink-0">⚖️</span>
                <div>
                  <p className="font-bold text-xs md:text-sm">Sustainable fat loss</p>
                  <p className="text-[10px] md:text-xs text-gray-600">3-5 kg per month</p>
                </div>
              </li>
            </ul>
          </div>
        </section>

        <section className="flex flex-col md:flex-row gap-8 md:gap-12 bg-[#fdfaf5] p-6 md:p-8 rounded-2xl md:rounded-3xl border border-gray-100 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 left-4 md:left-8 bg-[#e8cdb2] px-3 md:px-4 py-1 text-[10px] md:text-xs font-bold rounded-b-md z-30">Program 2</div>
          <img className="hidden md:block absolute top-0 z-10 w-1/3 right-20 opacity-50 md:opacity-100" src="/dna.png" alt="" />
          <div className="w-full md:w-1/2 mt-8 md:mt-6 z-20">
            <h2 className="text-2xl md:text-3xl font-bold mb-2">HORMONAL BALANCE</h2>
            <p className="text-xs md:text-sm text-gray-500 mb-4">PCOS • Fertility Nutrition</p>
            <p className="text-sm font-medium mb-6 md:mb-8">Regulate your hormones. Nourish your cycle. Support your fertility.</p>
            
            <h3 className="text-lg md:text-xl font-bold mb-3">Who This Is For</h3>
            <p className="text-xs md:text-sm text-gray-700 leading-relaxed mb-6">
              If you're dealing with PCOS — irregular cycles, weight challenges, acne, hair fall — or if you're trying to conceive and want your nutrition to actively support fertility, this program is built for you. Hormonal health is not just about your ovaries; it's about your gut, your stress, your blood sugar, and your plate.
            </p>
          </div>
          <div className="w-full md:w-1/2 relative z-20">
            <div className="p-6 md:p-8 rounded-xl md:rounded-2xl bg-[#f4e6d3ec]">
              <h3 className="text-lg md:text-xl font-bold mb-4 md:mb-6">What We Focus On:</h3>
              <ul className="space-y-4 md:space-y-5">
                <li className="flex gap-3 md:gap-4 items-start">
                  <span className="text-xl md:text-2xl mt-1 shrink-0">🌙</span>
                  <div>
                    <p className="font-bold text-xs md:text-sm">Cycle-syncing nutrition</p>
                    <p className="text-[10px] md:text-xs text-gray-600">eating in sync with your hormonal phases</p>
                  </div>
                </li>
                <li className="flex gap-3 md:gap-4 items-start">
                  <span className="text-xl md:text-2xl mt-1 shrink-0">⚖️</span>
                  <div>
                    <p className="font-bold text-xs md:text-sm">Androgen-balancing</p>
                    <p className="text-[10px] md:text-xs text-gray-600">meal planning for PCOS symptoms</p>
                  </div>
                </li>
                <li className="flex gap-3 md:gap-4 items-start">
                  <span className="text-xl md:text-2xl mt-1 shrink-0">🧠</span>
                  <div>
                    <p className="font-bold text-xs md:text-sm">Gut-hormone</p>
                    <p className="text-[10px] md:text-xs text-gray-600">connection therapy</p>
                  </div>
                </li>
                <li className="flex gap-3 md:gap-4 items-start">
                  <span className="text-xl md:text-2xl mt-1 shrink-0">💊</span>
                  <div>
                    <p className="font-bold text-xs md:text-sm">Fertility-focused</p>
                    <p className="text-[10px] md:text-xs text-gray-600">micronutrients (folate, zinc, iron, Vitamin D, omega3)</p>
                  </div>
                </li>
                <li className="flex gap-3 md:gap-4 items-start">
                  <span className="text-xl md:text-2xl mt-1 shrink-0">🥚</span>
                  <div>
                    <p className="font-bold text-xs md:text-sm">Supporting egg quality</p>
                    <p className="text-[10px] md:text-xs text-gray-600">and uterine health through nutrition</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section className="flex flex-col md:flex-row gap-8 md:gap-12 bg-[#fdfaf5] p-6 md:p-8 rounded-2xl md:rounded-3xl border border-gray-100 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 left-4 md:left-8 bg-[#e8cdb2] px-3 md:px-4 py-1 text-[10px] md:text-xs font-bold rounded-b-md z-30">Program 3</div>
          <img className="hidden md:block absolute top-10 right-0 z-10 w-1/2 opacity-50 md:opacity-100" src="/pregnancy.png" alt="" />
          <div className="w-full md:w-1/2 mt-8 md:mt-6 z-20">
            <h2 className="text-2xl md:text-3xl font-bold mb-2">PREGNANCY NUTRITION</h2>
            <p className="text-xs md:text-sm text-gray-500 mb-4">Prenatal Nutrition • Postnatal Recovery</p>
            <p className="text-sm font-medium mb-6 md:mb-8">Nourish yourself. Nourish your baby. Every trimester, done right</p>
            
            <h3 className="text-lg md:text-xl font-bold mb-3">Who This Is For</h3>
            <p className="text-xs md:text-sm text-gray-700 leading-relaxed mb-6">
              If you're pregnant or in the postpartum phase and want expert nutrition guidance tailored to where you are in your journey — this program is for you. What you eat during pregnancy directly affects your baby's development, your energy, your recovery, and your long-term health. You deserve more than generic advice.
            </p>
          </div>
          <div className="w-full md:w-1/2 bg-[#f4e6d3c9] z-20 p-6 md:p-8 rounded-xl md:rounded-2xl relative">
            <div>
              <h3 className="text-lg md:text-xl font-bold mb-4 md:mb-6">What We Focus On:</h3>
              <ul className="space-y-4 md:space-y-5">
                <li className="flex gap-3 md:gap-4 items-start">
                  <span className="text-xl md:text-2xl mt-1 shrink-0">📅</span>
                  <div>
                    <p className="font-bold text-xs md:text-sm">Trimester-wise meal planning</p>
                    <p className="text-[10px] md:text-xs text-gray-600">(1st, 2nd, 3rd trimester specific)</p>
                  </div>
                </li>
                <li className="flex gap-3 md:gap-4 items-start">
                  <span className="text-xl md:text-2xl mt-1 shrink-0">🤢</span>
                  <div>
                    <p className="font-bold text-xs md:text-sm">Managing nausea,</p>
                    <p className="text-[10px] md:text-xs text-gray-600">food aversions, and common pregnancy symptoms through diet</p>
                  </div>
                </li>
                <li className="flex gap-3 md:gap-4 items-start">
                  <span className="text-xl md:text-2xl mt-1 shrink-0">👶</span>
                  <div>
                    <p className="font-bold text-xs md:text-sm">Baby's brain, bone, and organ</p>
                    <p className="text-[10px] md:text-xs text-gray-600">development nutrition</p>
                  </div>
                </li>
                <li className="flex gap-3 md:gap-4 items-start">
                  <span className="text-xl md:text-2xl mt-1 shrink-0">🩸</span>
                  <div>
                    <p className="font-bold text-xs md:text-sm">Gestational diabetes and weight</p>
                    <p className="text-[10px] md:text-xs text-gray-600">management during pregnancy</p>
                  </div>
                </li>
                <li className="flex gap-3 md:gap-4 items-start">
                  <span className="text-xl md:text-2xl mt-1 shrink-0">💊</span>
                  <div>
                    <p className="font-bold text-xs md:text-sm">Iron, calcium, folate, DHA — getting</p>
                    <p className="text-[10px] md:text-xs text-gray-600">the right nutrients at the right time</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </div>

      <section className="bg-[url('/bg.png')] px-4 md:px-8 py-10 md:py-16 border-y border-gray-200">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-wide mb-2">How It Works</h2>
          <p className="text-lg md:text-xl text-gray-600 mb-10 md:mb-16">Your 3-Month Journey, Step by Step</p>
          <img src="/works.png" alt="5 Step Timeline Graphic: 1 Pre-Assessment Call, 2 Root Cause Analysis, 3 Your Personalised Plan, 4 Fortnightly Updates, 5 3-Month Outcome" className="w-full h-auto object-contain" />
        </div>
      </section>

      <section id="testimonials" className="bg-[url('/bg.png')] px-4 md:px-8 py-10 md:py-16">
        <div className="max-w-6xl mx-auto text-center mb-16 md:mb-12">
          <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-wide mb-2">Testimonials</h2>
          <p className="text-lg md:text-xl text-gray-600">Real results from real people who transformed their health</p>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-y-16 gap-x-8 mt-10 md:mt-0">
          <div className="bg-[#8b9c92] text-white p-6 md:p-8 rounded-2xl relative shadow-md">
            <div className="w-16 h-16 bg-[#bc716e] rounded-full flex items-center justify-center text-2xl font-bold absolute -top-8 left-1/2 transform -translate-x-1/2 border-4 border-[#fbf9f6]">R</div>
            <h4 className="text-center font-semibold mt-6 mb-4">Harita</h4>
            <p className="text-xs md:text-sm text-center italic mb-6">
              "Girija diet helped me to lead a healthy life, actually am a post kidney transplanted person with huge medicine usage on daily basis, and was overweight since many years. The care and support girija gave me was truly amazing, i lost 17kgs and maintaining the same (which is very important) Shen never put me on crash diet, inspire felt tummy full.
              <br/><br/>
              Thanks Girija. Keep spreading your positive waves for healthy lifestyle"
            </p>
            <div className="flex justify-center text-yellow-400 text-xl gap-1">★★★★★</div>
          </div>

          <div className="bg-[#8b9c92] text-white p-6 md:p-8 rounded-2xl relative shadow-md">
            <div className="w-16 h-16 bg-[#4c669f] rounded-full flex items-center justify-center text-2xl font-bold absolute -top-8 left-1/2 transform -translate-x-1/2 border-4 border-[#fbf9f6]">S</div>
            <h4 className="text-center font-semibold mt-6 mb-4">Sridevi</h4>
            <p className="text-xs md:text-sm text-center italic mb-6">
              "I am feeling very happy about health because of your diet. I have faced many challenges regarding health issues like bloating, constipation, hormonal imbalance, hair loss, gut issue, skin darkening, obesity and hyperthyroid too.
              <br/><br/>
              Now I am feeling so comfortable and confident, I have get ridden all my gut issues, hormonal imbalance, dark skin tone issues and fat loss with weight loss"
            </p>
            <div className="flex justify-center text-yellow-400 text-xl gap-1">★★★★★</div>
          </div>

          <div className="bg-[#8b9c92] text-white p-6 md:p-8 rounded-2xl relative shadow-md">
            <div className="w-16 h-16 bg-[#a8cc66] rounded-full flex items-center justify-center text-2xl font-bold absolute -top-8 left-1/2 transform -translate-x-1/2 border-4 border-[#fbf9f6]">M</div>
            <h4 className="text-center font-semibold mt-6 mb-4">Swathi</h4>
            <p className="text-xs md:text-sm text-center italic mb-6">
              "The personalized nutrition program transformed my health by addressing my thyroid issues, irregular periods, and weight, leading to remarkable improvements and immense joy for confident, energetic, and healthier. and I wholeheartedly recommend this program to anyone facing similar changes."
            </p>
            <div className="flex justify-center text-yellow-400 text-xl gap-1">★★★★★</div>
          </div>

          <div className="bg-[#8b9c92] text-white p-6 md:p-8 rounded-2xl relative shadow-md">
            <div className="w-16 h-16 bg-[#b24848] rounded-full flex items-center justify-center text-2xl font-bold absolute -top-8 left-1/2 transform -translate-x-1/2 border-4 border-[#fbf9f6]">T</div>
            <h4 className="text-center font-semibold mt-6 mb-4">Teja</h4>
            <p className="text-xs md:text-sm text-center italic mb-6">
              "The gut reset month has been a life-changing experience for me. My dietician girija garu was incredibly supportive patient and understanding throughout the entire journey. They explained everything clearly guided me at each step, and always encouraged me to stay consistent. within a few weeks, I felt such a difference – lighter, more energetic, and finally free from bloating and discomfort I struggled with for so long."
            </p>
            <div className="flex justify-center text-yellow-400 text-xl gap-1">★★★★★</div>
          </div>
        </div>
      </section>

      <section className="bg-[url('/bg.png')] px-4 md:px-8 py-10 md:py-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-wide text-center mb-8 md:mb-12">Results</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-6 md:mb-8">
            <div className="bg-white p-3 md:p-4 rounded-xl shadow border border-gray-100">
              <img src="/conception.png" alt="Lab report showing natural conception results" className="w-full h-auto rounded" />
            </div>
            <div className="relative">
              <img src="/transformation.png" alt="Amazing client Transformation" className="w-full h-auto rounded-xl shadow" />
              <div className="absolute bottom-4 md:bottom-6 left-0 right-0 text-center">
                <h3 className="text-white text-2xl md:text-3xl font-bold drop-shadow-md">Amazing client<br/>Transformation</h3>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <div className="bg-white p-3 md:p-4 rounded-xl shadow border border-gray-100 flex items-center justify-center">
              <img src="/health-labs.png" alt="Lipid Profile Before and After" className="w-full h-auto object-contain max-h-80 md:max-h-100" />
            </div>
            <div className="bg-white p-6 md:p-8 rounded-xl shadow border border-gray-100 text-center flex flex-col items-center justify-center">
              <img src="/10kgs.png" alt="Weight scale before" className="w-full h-auto rounded shadow" />
            </div>
          </div>
        </div>
      </section>

      <section id="faq" className="px-4 md:px-8 py-10 md:py-16 bg-[url('/bg.png')]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-wide text-center mb-2 md:mb-4">Frequently Asked Questions</h2>
          <p className="text-center text-gray-600 mb-8 md:mb-12">Everything you need to know about nutrition counseling</p>

          <div className="space-y-3 md:space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="border border-gray-200 rounded-lg bg-white overflow-hidden">
                <button
                  onClick={() => toggle(i)}
                  className="w-full px-4 md:px-6 py-3 md:py-4 flex justify-between items-center text-left hover:bg-gray-50 transition-colors"
                >
                  <h4 className="font-semibold text-xs md:text-sm pr-4">{faq.question}</h4>
                  <span
                    className="text-gray-500 transition-transform duration-300 text-base md:text-lg shrink-0"
                    style={{ transform: openIndex === i ? "rotate(180deg)" : "rotate(0deg)", display: "inline-block" }}
                  >
                    ▾
                  </span>
                </button>
                <div
                  className="overflow-hidden transition-all duration-300"
                  style={{ maxHeight: openIndex === i ? "300px" : "0px" }}
                >
                  <p className="px-4 md:px-6 py-3 md:py-4 text-xs md:text-sm text-gray-700 border-t border-gray-100">
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="px-4 md:px-8 py-10 md:py-16 bg-[url('/bg.png')]">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-2 md:mb-4">Let's Start Your Journey</h2>
          <p className="text-sm md:text-base text-gray-700 mb-8 md:mb-10">Ready to take the first step? Book a free consultation to discuss your goals</p>

          <div className="bg-[#D3CDD7] p-6 md:p-8 rounded-2xl text-left shadow-sm border border-[#d8cabb]">
            <h3 className="text-xl md:text-2xl font-bold mb-6 md:mb-8">Book a consultation</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-xs md:text-sm font-medium mb-1">Full name</label>
                <input
                  type="text" name="name" value={formData.name} onChange={handleChange}
                  placeholder="Name"
                  className="w-full px-3 md:px-4 py-2 bg-white rounded-md border-none shadow-sm focus:ring-2 focus:ring-[#4a7c59] outline-none text-sm md:text-base"
                />
              </div>
              <div>
                <label className="block text-xs md:text-sm font-medium mb-1">Email</label>
                <input
                  type="email" name="email" value={formData.email} onChange={handleChange}
                  placeholder="Email"
                  className="w-full px-3 md:px-4 py-2 bg-white rounded-md border-none shadow-sm focus:ring-2 focus:ring-[#4a7c59] outline-none text-sm md:text-base"
                />
              </div>
              <div>
                <label className="block text-xs md:text-sm font-medium mb-1">Phone no</label>
                <input
                  type="tel" name="phone" value={formData.phone} onChange={handleChange}
                  placeholder="Phone no"
                  className="w-full px-3 md:px-4 py-2 bg-white rounded-md border-none shadow-sm focus:ring-2 focus:ring-[#4a7c59] outline-none text-sm md:text-base"
                />
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs md:text-sm font-medium mb-1">Age</label>
                  <input
                    type="text" name="age" value={formData.age} onChange={handleChange}
                    placeholder="Age"
                    className="w-full px-3 md:px-4 py-2 bg-white rounded-md border-none shadow-sm focus:ring-2 focus:ring-[#4a7c59] outline-none text-sm md:text-base"
                  />
                </div>
                <div>
                  <label className="block text-xs md:text-sm font-medium mb-1">Weight</label>
                  <input
                    type="text" name="weight" value={formData.weight} onChange={handleChange}
                    placeholder="Weight (kg)"
                    className="w-full px-3 md:px-4 py-2 bg-white rounded-md border-none shadow-sm focus:ring-2 focus:ring-[#4a7c59] outline-none text-sm md:text-base"
                  />
                </div>
                <div className="col-span-2 md:col-span-1">
                  <label className="block text-xs md:text-sm font-medium mb-1">Height</label>
                  <input
                    type="text" name="height" value={formData.height} onChange={handleChange}
                    placeholder="Height (in)"
                    className="w-full px-3 md:px-4 py-2 bg-white rounded-md border-none shadow-sm focus:ring-2 focus:ring-[#4a7c59] outline-none text-sm md:text-base"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs md:text-sm font-medium mb-1">Service interested in</label>
                <select
                  name="service" value={formData.service} onChange={handleChange}
                  className="w-full px-3 md:px-4 py-2 bg-white rounded-md border-none shadow-sm focus:ring-2 focus:ring-[#4a7c59] outline-none text-gray-500 text-sm md:text-base"
                >
                  <option value="">Select a service</option>
                  <option value="Metabolic Reset">Metabolic Reset</option>
                  <option value="Hormonal Balance">Hormonal Balance</option>
                  <option value="Pregnancy Nutrition">Pregnancy Nutrition</option>
                </select>
              </div>
              <div>
                <label className="block text-xs md:text-sm font-medium mb-1">Reason for you to book this</label>
                <textarea
                  name="reason" value={formData.reason} onChange={handleChange}
                  rows="3" placeholder="Reason"
                  className="w-full px-3 md:px-4 py-2 bg-white rounded-md border-none shadow-sm focus:ring-2 focus:ring-[#4a7c59] outline-none resize-none text-sm md:text-base"
                />
              </div>
              <div>
                <label className="block text-xs md:text-sm font-medium mb-1">Message</label>
                <textarea
                  name="message" value={formData.message} onChange={handleChange}
                  rows="3" placeholder="Specify your health goals / conditions"
                  className="w-full px-3 md:px-4 py-2 bg-white rounded-md border-none shadow-sm focus:ring-2 focus:ring-[#4a7c59] outline-none resize-none text-sm md:text-base"
                />
              </div>

              {formStatus === "success" && (
                <p className="text-green-700 text-sm font-medium">✅ Message sent! We'll get back to you soon.</p>
              )}
              {formStatus === "error" && (
                <p className="text-red-600 text-sm font-medium">❌ Please fill in name, email, and phone — or try again.</p>
              )}

              <button
                type="button"
                onClick={handleSubmit}
                disabled={formStatus === "sending"}
                className="w-full bg-[#4a7c59] text-white py-3 rounded-md font-bold mt-4 hover:bg-[#3a5a40] transition-colors text-sm md:text-base disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {formStatus === "sending" ? "Sending..." : "Send message"}
              </button>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-[#8b9c92] text-white px-4 md:px-8 py-10 md:py-12">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-8 md:gap-12">
          <div className="w-full md:w-1/2 space-y-6 text-center md:text-left">
            <div className="flex gap-4 items-center justify-center md:justify-start">
              <img src="/icon.png" alt="Dt. Girija Logo" className="h-16 md:h-20 p-2 rounded" />
              <img src="/logo.png" alt="Dt. Girija Logo" className="h-16 md:h-20 p-2 rounded" />
            </div>
            <div>
              <p className="font-bold text-lg mb-1">Dt. Girija</p>
              <p className="text-lg md:text-xl">+91 96035 60345</p>
            </div>
            <div className="flex gap-4 justify-center md:justify-start">
              <div className="w-10 h-10 bg-linear-to-tr from-yellow-400 via-pink-500 to-purple-500 rounded-full flex items-center justify-center cursor-pointer">
                <a href="https://www.instagram.com/dietitian.girija" target="_blank" rel="noreferrer"><span className="text-white text-xl"><img src="/instagram.png" alt="Instagram" /></span></a>
              </div>
              <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center cursor-pointer">
                <a href="https://wa.me/919603560345" target="_blank" rel="noreferrer"><span className="text-white text-xl"><img src="/whatsapp.png" alt="WhatsApp" /></span></a>
              </div>
            </div>
          </div>
          
          <div className="w-full md:w-1/4 text-center md:text-left">
            <h4 className="font-bold text-lg mb-4">Quick links</h4>
            <ul className="space-y-2 md:space-y-3 text-sm">
              <li><a href="#home" className="hover:underline">Home</a></li>
              <li><a href="#about" className="hover:underline">About us</a></li>
              <li><a href="#programs" className="hover:underline">Services</a></li>
              <li><a href="#testimonials" className="hover:underline">Testimonials</a></li>
              <li><a href="#faq" className="hover:underline">FAQ</a></li>
              <li><a href="#contact" className="hover:underline">Book now</a></li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;