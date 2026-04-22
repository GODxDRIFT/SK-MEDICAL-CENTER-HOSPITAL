/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from 'motion/react';
import { 
  Phone, 
  MapPin, 
  Clock, 
  Star, 
  ShieldCheck, 
  Stethoscope, 
  Activity, 
  Ambulance, 
  HeartPulse, 
  ChevronRight, 
  Menu, 
  X,
  Instagram,
  Facebook,
  Twitter,
  ExternalLink,
  MessageSquare,
  Award,
  Users,
  Navigation,
  CheckCircle,
  Calendar,
  ChevronDown
} from 'lucide-react';
import { useState, useEffect, FormEvent } from 'react';
import React from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { DOCTORS } from './data';
import DoctorDetails from './components/DoctorDetails';
import { BookingForm } from './components/BookingForm';

// --- Components ---

const GlobalHeader = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/#about' },
    { name: 'Services', href: '/#services' },
    { name: 'FAQ', href: '/#faq' },
    { name: 'Facilities', href: '/#gallery' },
    { name: 'Contact', href: '/#contact' },
  ];

  return (
    <header className="fixed top-0 w-full z-50 transition-all duration-300">
      {/* Emergency SOS Banner */}
      <div className="bg-medical-warning text-white py-2 px-4 text-center text-xs md:text-sm font-bold flex items-center justify-center gap-2">
        <span className="animate-pulse">🚨</span>
        <span>Medical Emergency? Call Now: 077039 64716 — We Are Open 24x7</span>
      </div>

      {/* Top Strip */}
      <div className="hidden lg:block bg-white border-b border-gray-100 py-2 px-10">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-[11px] font-bold text-gray-500 uppercase tracking-widest">
          <div className="flex gap-8 items-center">
            <div className="flex items-center gap-2">
              <Phone className="w-3 h-3 text-medical-accent" />
              <span>077039 64716</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-3 h-3 text-medical-accent" />
              <span>B-45, Vikas Nagar, New Delhi - 110059</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-3 h-3 text-medical-accent" />
            <span>Open 24x7, All Days</span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className={`transition-all duration-300 ${isScrolled ? 'bg-white shadow-xl py-3' : 'bg-white/95 backdrop-blur-md py-5'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-medical-primary rounded-xl flex items-center justify-center shadow-lg">
              <HeartPulse className="text-white w-6 h-6" />
            </div>
            <div>
              <h1 className="text-lg md:text-xl font-heading font-black text-medical-primary tracking-tighter leading-none">SK MEDICAL CENTER</h1>
              <p className="text-[9px] font-bold text-medical-accent uppercase tracking-widest mt-0.5">& HOSPITAL</p>
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-10">
            <div className="flex items-center gap-8 text-[13px] font-bold text-gray-600">
              {navLinks.map((link) => (
                <Link key={link.name} to={link.href} className="hover:text-medical-accent transition-colors">
                  {link.name}
                </Link>
              ))}
            </div>
            <div className="flex gap-4">
              <a href="tel:07703964716" className="bg-medical-accent text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-orange-600 transition-colors text-sm">
                <Phone className="w-4 h-4" /> Call Now
              </a>
              <a href="https://wa.me/917703964716" target="_blank" className="bg-emerald-500 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-emerald-600 transition-colors text-sm">
                <MessageSquare className="w-4 h-4" /> WhatsApp
              </a>
            </div>
          </div>

          <button className="lg:hidden p-2 text-medical-primary" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-white border-t border-gray-100 overflow-hidden"
            >
              <div className="flex flex-col p-6 gap-4 font-bold text-gray-600">
                {navLinks.map((link) => (
                  <Link key={link.name} to={link.href} onClick={() => setIsMobileMenuOpen(false)} className="hover:text-medical-accent">{link.name}</Link>
                ))}
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <a href="tel:07703964716" className="bg-medical-accent text-white py-4 rounded-xl font-bold text-center flex items-center justify-center gap-2 text-xs">
                    <Phone className="w-4 h-4" /> Call Now
                  </a>
                  <a href="https://wa.me/917703964716" className="bg-emerald-500 text-white py-4 rounded-xl font-bold text-center flex items-center justify-center gap-2 text-xs text-[10px]">
                    <MessageSquare className="w-4 h-4" /> WhatsApp
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
};

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const Home = () => (
  <>
    <Hero />
    <QuickInfoStrip />
    <AboutSnippet />
    <ServicesSection />
    <WhyChooseUs />
    <GoogleReviews />
    
    {/* Modern Specialist Showcase */}
    <section id="doctors" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-medical-accent font-black uppercase tracking-[0.3em] text-xs mb-4">Elite Specialists</p>
          <h2 className="font-heading text-4xl md:text-5xl font-black text-medical-primary tracking-tighter">Meet Our Medical Team</h2>
          <p className="text-gray-500 font-medium mt-4">Qualified, experienced, and dedicated to your health.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {DOCTORS.map((dr, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -10 }}
              className="bg-white rounded-[40px] overflow-hidden shadow-sm hover:shadow-2xl transition-all p-4 border border-blue-50"
            >
              <Link to={`/doctor/${dr.id}`}>
                <div className="h-72 rounded-[32px] overflow-hidden relative group mb-6">
                  <img src={dr.img} alt={dr.name} className="w-full h-full object-cover grayscale-0 group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-medical-primary/40 to-transparent"></div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-medical-primary/40">
                    <span className="bg-white text-medical-primary font-black px-6 py-2 rounded-full text-xs uppercase tracking-widest shadow-xl">View Details</span>
                  </div>
                </div>
              </Link>
              <div className="px-4 pb-4 text-center">
                 <h4 className="font-heading font-black text-xl text-medical-primary mb-1">{dr.name}</h4>
                 <p className="text-xs font-bold text-medical-accent uppercase tracking-widest">{dr.role}</p>
                 <Link to={`/doctor/${dr.id}`} className="inline-block mt-4 text-[10px] font-black uppercase tracking-widest text-medical-primary hover:text-medical-accent transition-colors">
                   See Full Profile →
                 </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Facility Highlights */}
    <section id="gallery" className="py-24 bg-medical-bg overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-16 text-center">
         <p className="text-medical-accent font-black uppercase tracking-[0.3em] text-xs mb-4">Our Gallery</p>
         <h2 className="font-heading text-4xl md:text-5xl font-black text-medical-primary tracking-tighter">Clean, Equipped & Always Ready</h2>
         <p className="text-gray-500 font-medium mt-4">Take a look at our facilities, team, and environment before your first visit.</p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 px-6 max-w-7xl mx-auto">
        {[
          "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=800",
          "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800",
          "https://images.unsplash.com/photo-1538108149393-fdfd818d59ae?auto=format&fit=crop&q=80&w=800",
          "https://images.unsplash.com/photo-1581056771107-24ca5f033842?auto=format&fit=crop&q=80&w=800",
        ].map((img, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`rounded-[40px] overflow-hidden shadow-2xl relative group h-72 border-4 border-white`}
          >
            <img src={img} alt="Clinical Facility" className="w-full h-full object-cover min-h-[300px] hover:scale-105 transition-transform duration-700" />
          </motion.div>
        ))}
      </div>
    </section>

    <HealthTipsSection />
    <FAQSection />
    <MapSection />
    <AppointmentSection />
  </>
);

const AppContent = () => (
  <div className="font-sans text-medical-muted bg-white">
    <GlobalHeader />
    <ScrollToTop />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/doctor/:id" element={<DoctorDetails />} />
    </Routes>
    <Footer />
    
    {/* Floating Action Buttons */}
    <div className="fixed bottom-6 right-6 z-[60] flex flex-col gap-4 text-center">
      {/* WhatsApp Button */}
      <motion.a 
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        href="https://wa.me/917703964716?text=Hello%20I%20need%20an%20appointment%20at%20SK%20Medical%20Center" 
        target="_blank"
        className="bg-emerald-500 text-white w-14 h-14 rounded-full shadow-2xl flex items-center justify-center hover:bg-emerald-600 transition-all border-4 border-white"
      >
        <MessageSquare className="w-7 h-7" />
      </motion.a>

      {/* Mobile Call Button */}
      <motion.a 
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        href="tel:07703964716" 
        className="lg:hidden bg-medical-accent text-white w-14 h-14 rounded-full shadow-2xl flex items-center justify-center hover:bg-orange-600 transition-all border-4 border-white"
      >
        <Phone className="w-6 h-6" />
      </motion.a>
    </div>

    {/* Persistent Call Now for Mobile at bottom */}
    <div className="lg:hidden fixed bottom-0 left-0 w-full bg-white border-t border-gray-100 p-4 z-50 flex gap-4">
      <a href="tel:07703964716" className="flex-1 bg-medical-primary text-white py-4 rounded-xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2">
        <Phone className="w-4 h-4" /> Call Now
      </a>
      <a href="https://wa.me/917703964716" className="flex-1 bg-emerald-500 text-white py-4 rounded-xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2">
        <MessageSquare className="w-4 h-4" /> WhatsApp
      </a>
    </div>
  </div>
);

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

const Hero = () => {
  return (
    <section className="relative pt-44 pb-20 overflow-hidden bg-white">
      {/* Background Image Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=2000" 
          alt="Clinic Reception" 
          className="w-full h-full object-cover opacity-10 grayscale" 
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-transparent"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-16 items-center">
        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-medical-bg text-medical-primary px-5 py-2.5 rounded-full mb-8 font-bold text-xs uppercase tracking-widest border border-blue-100 shadow-sm">
            <Star className="w-4 h-4 text-emerald-500 fill-emerald-500" />
            <span>5.0 Rating on Google & Justdial</span>
          </div>

          <h1 className="font-heading text-5xl md:text-7xl font-black text-medical-primary leading-[1.1] mb-6 tracking-tighter">
            SK Medical Center <br /> & Hospital
            <span className="block text-medical-accent mt-4 text-3xl md:text-5xl font-bold">
              आपके इलाके का भरोसेमंद अस्पताल
            </span>
          </h1>

          <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-lg leading-relaxed font-medium">
            24x7 Emergency & OPD Care | Vikas Nagar, Uttam Nagar, New Delhi <br />
            <span className="text-sm font-bold text-medical-primary block mt-4">Experienced doctors. Caring staff. Affordable treatment. Just around the corner.</span>
          </p>

          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <a href="tel:07703964716" className="w-full sm:w-auto bg-medical-accent text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-orange-600 transition-all shadow-xl shadow-orange-500/20 flex items-center justify-center gap-2">
              <Phone className="w-5 h-5" /> Call Now
            </a>
            <a href="https://wa.me/917703964716" target="_blank" className="w-full sm:w-auto bg-white border-2 border-emerald-500 text-emerald-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-emerald-50 transition-all flex items-center justify-center gap-2">
              <MessageSquare className="w-5 h-5" /> WhatsApp Us
            </a>
            <a href="https://maps.app.goo.gl/NyDf6TN8xYjFCdMs7" target="_blank" className="w-full sm:w-auto bg-medical-primary text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-900 transition-all flex items-center justify-center gap-2">
              <MapPin className="w-5 h-5" /> Directions
            </a>
          </div>

          {/* Trust Strip below hero */}
          <div className="mt-12 pt-8 border-t border-gray-100 flex flex-wrap gap-x-10 gap-y-4">
            <div className="flex items-center gap-2 text-xs font-bold text-gray-500">
              <CheckCircle className="w-4 h-4 text-emerald-500" />
              <span>OPEN 24 HOURS, 7 DAYS</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-bold text-gray-500">
              <CheckCircle className="w-4 h-4 text-emerald-500" />
              <span>5★ RATED BY PATIENTS</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-bold text-gray-500">
              <CheckCircle className="w-4 h-4 text-emerald-500" />
              <span>EXPERIENCED DOCTORS</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-bold text-gray-500">
              <CheckCircle className="w-4 h-4 text-emerald-500" />
              <span>AFFORDABLE CARE</span>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }} 
          animate={{ opacity: 1, scale: 1 }} 
          transition={{ duration: 0.8, delay: 0.2 }}
          className="hidden lg:block relative"
        >
          <div className="relative rounded-[40px] overflow-hidden border-[12px] border-white shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1631217818243-853c5c7d6d32?auto=format&fit=crop&q=80&w=1200" 
              alt="Medical Care" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-medical-primary/40 to-transparent"></div>
          </div>
          {/* Floating elements from blueprint idea */}
          <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-3xl shadow-xl border border-gray-50 max-w-[200px]">
            <p className="text-[10px] font-black uppercase text-medical-accent mb-1">Serving Since</p>
            <p className="text-2xl font-black text-medical-primary leading-none">12+ Years</p>
            <p className="text-xs text-gray-400 mt-2 font-medium">Trusted Healthcare for Vikas Nagar families.</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const QuickInfoStrip = () => {
  const cards = [
    { title: 'Open 24x7', desc: 'Always available day & night. Walk in anytime.', icon: Clock },
    { title: 'Easy to Find', desc: 'B-45, Vikas Nagar, Mehta Enclave.', icon: MapPin, link: 'Get Directions' },
    { title: 'One Call Away', desc: 'Reach us instantly: 077039 64716', icon: Phone },
    { title: '5.0 Star Rated', desc: 'Trusted by hundreds in Vikas Nagar.', icon: Star, link: 'Read Reviews' },
  ];

  return (
    <section className="py-12 bg-medical-bg">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, i) => (
          <div key={i} className="bg-white p-8 rounded-3xl shadow-sm border border-blue-50 flex flex-col items-start gap-4 hover:shadow-md transition-all">
            <div className="w-12 h-12 bg-medical-bg rounded-2xl flex items-center justify-center text-medical-primary">
              <card.icon className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-heading font-bold text-medical-primary mb-1">{card.title}</h4>
              <p className="text-sm text-gray-500 font-medium leading-relaxed">{card.desc}</p>
              {card.link && <button className="text-xs font-black uppercase text-medical-accent mt-4 tracking-widest hover:underline">{card.link}</button>}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

const AboutSnippet = () => {
  return (
    <section id="about" className="py-24 bg-white overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center">
        <div className="relative">
           <img 
            src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=1200" 
            alt="Doctor Patient" 
            className="rounded-[48px] shadow-2xl relative z-10"
          />
          <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-medical-accent/10 rounded-full blur-3xl z-0"></div>
        </div>
        <div>
          <h2 className="font-heading text-4xl md:text-5xl font-black text-medical-primary mb-8 tracking-tighter leading-tight">
            Your Trusted Family Healthcare <br /> Partner in Vikas Nagar
          </h2>
          <div className="space-y-6 text-lg text-gray-600 font-medium leading-relaxed">
            <p>For years, SK Medical Center & Hospital has been the go-to healthcare facility for families in Vikas Nagar, Mehta Enclave, and surrounding area.</p>
            <p>We understand that health emergencies don't wait — which is why our clinic is open 24 hours a day, every single day of the year. Whether it's a sudden fever at 2 AM or an unexpected illness, we are here for you.</p>
            <p>Our mission is to provide quality healthcare that is accessible, affordable, and close to home.</p>
          </div>
          <div className="flex gap-6 mt-12">
            <button className="bg-medical-primary text-white px-8 py-4 rounded-xl font-bold hover:shadow-xl transition-all">Meet Our Doctors</button>
            <button className="bg-medical-bg text-medical-primary px-8 py-4 rounded-xl font-bold hover:bg-blue-100 transition-all">Learn More</button>
          </div>
        </div>
      </div>
    </section>
  );
};

const ServicesSection = () => {
  const services = [
    { title: 'General OPD', desc: 'Routine check-ups, fever, cough, BP, diabetes follow-up.', icon: Stethoscope },
    { title: '24x7 Emergency', desc: 'Immediate attention for accidents, chest pain, injuries.', icon: Ambulance, emergency: true },
    { title: 'Minor Procedures', desc: 'Dressings, suturing, injections, IV fluids, abscess drainage.', icon: ShieldCheck },
    { title: 'Child Health', desc: 'Expert care for children - from newborns to teenagers.', icon: HeartPulse },
    { title: 'Women\'s Health', desc: 'Gynecological consultations, antenatal care with privacy.', icon: Users },
    { title: 'Diagnostics & Lab', desc: 'Blood work, urine analysis, investigations on-site.', icon: Activity },
  ];

  return (
    <section id="services" className="py-24 bg-medical-bg">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <p className="text-medical-accent font-black uppercase tracking-[0.3em] text-xs mb-4 text-orange-500">Professional Care</p>
          <h2 className="font-heading text-4xl md:text-5xl font-black text-medical-primary mb-6 tracking-tighter">Our Medical Services</h2>
          <p className="text-gray-500 font-medium text-lg max-w-2xl mx-auto">Comprehensive care for your entire family — all under one roof.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, i) => (
            <div key={i} className={`group bg-white p-10 rounded-[40px] shadow-sm border border-blue-50 hover:shadow-2xl transition-all hover:-translate-y-2 flex flex-col h-full ${service.emergency ? 'border-orange-200 bg-orange-50/10' : ''}`}>
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform ${service.emergency ? 'bg-orange-100 text-orange-600' : 'bg-medical-bg text-medical-primary'}`}>
                <service.icon className="w-8 h-8" />
              </div>
              <h3 className="font-heading text-2xl font-black text-medical-primary mb-4">{service.title}</h3>
              <p className="text-gray-500 font-medium leading-relaxed mb-10 flex-grow">{service.desc}</p>
              <button className="flex items-center gap-2 text-medical-accent font-black uppercase text-xs tracking-widest group-hover:gap-4 transition-all">
                Learn More <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const WhyChooseUs = () => {
  const reasons = [
    { title: 'Always Open', desc: '24 hours, 365 days. No lock-out during emergencies.' },
    { title: 'Experienced Doctors', desc: 'Qualified physicians who have served this community for years.' },
    { title: 'Affordable Treatment', desc: 'Quality care that does not drain your pocket.' },
    { title: 'Clean & Safe', desc: 'Hygiene and infection control are our priority.' },
    { title: 'Convenient Location', desc: 'B-45, right near the Gurudwara in Vikas Nagar.' },
    { title: 'Quick Turnaround', desc: 'Minimal wait time. Efficient, attentive care.' },
  ];

  return (
    <section className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="font-heading text-4xl md:text-5xl font-black text-medical-primary mb-16 tracking-tighter text-center">Why Patients in Vikas Nagar Trust Us</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {reasons.map((reason, i) => (
            <div key={i} className="flex gap-6 items-start group">
              <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <CheckCircle className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <h4 className="font-heading text-xl font-bold text-medical-primary mb-2 group-hover:text-medical-accent transition-colors">{reason.title}</h4>
                <p className="text-gray-500 font-medium leading-relaxed">{reason.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const GoogleReviews = () => {
  const reviews = [
    { name: 'Patient from Vikas Nagar', msg: 'Nice facility and caring doctors. Very good experience overall.', rating: 5, source: 'Google Review' },
    { name: 'Patient from Uttam Nagar', msg: 'Good experience. The doctor was very attentive and the staff behaved very well.', rating: 5, source: 'Google Review' },
    { name: 'Regular Patient', msg: 'Bhadiya treatment. Bahut time se yahan aate hain. Doctor saab bahut ache hain.', rating: 5, source: 'Justdial Review' },
    { name: 'Patient', msg: 'Well behave staff. Good experience. Will recommend to everyone in the area.', rating: 5, source: 'Google Review' },
  ];

  return (
    <section className="py-24 bg-medical-bg overflow-hidden text-center">
      <div className="max-w-7xl mx-auto px-6">
        <p className="text-medical-accent font-black uppercase tracking-[0.3em] text-xs mb-4 italic">Testimonials</p>
        <h2 className="font-heading text-4xl md:text-5xl font-black text-medical-primary mb-4 tracking-tighter">What Our Patients Say</h2>
        <div className="flex items-center justify-center gap-1 text-orange-500 mb-16">
          {[...Array(5)].map((_, i) => <Star key={i} className="w-6 h-6 fill-current" />)}
          <span className="ml-3 font-bold text-medical-primary">5.0 on Google & Justdial</span>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviews.map((rev, i) => (
            <div key={i} className="bg-white p-8 rounded-[32px] shadow-sm border border-blue-50 text-left flex flex-col justify-between hover:shadow-xl transition-all h-full">
              <div>
                <div className="flex gap-1 text-orange-400 mb-6">
                  {[...Array(rev.rating)].map((_, j) => <Star key={j} className="w-4 h-4 fill-current" />)}
                </div>
                <p className="text-gray-600 font-medium italic mb-8">"{rev.msg}"</p>
              </div>
              <div>
                <p className="font-bold text-medical-primary text-sm">— {rev.name}</p>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1">{rev.source}</p>
              </div>
            </div>
          ))}
        </div>
        <button className="mt-16 text-medical-primary font-black uppercase text-xs tracking-widest hover:underline">See All Reviews on Google</button>
      </div>
    </section>
  );
};

const AppointmentSection = () => {
  return (
    <section id="contact" className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-start">
        <div>
          <h2 className="font-heading text-4xl md:text-5xl font-black text-medical-primary mb-8 tracking-tighter">Book an Appointment or Visit Us Directly</h2>
          <div className="space-y-8">
            <div className="flex gap-6 items-start">
              <div className="w-12 h-12 bg-medical-bg rounded-2xl flex items-center justify-center text-medical-primary flex-shrink-0">
                <Phone />
              </div>
              <div>
                <p className="text-xs font-black uppercase text-gray-400 tracking-widest mb-1">Call / Phone</p>
                <p className="text-2xl font-black text-medical-primary">077039 64716</p>
                <p className="text-sm text-gray-400 font-bold mt-1 uppercase tracking-widest">Tap to call on mobile</p>
              </div>
            </div>

            <div className="flex gap-6 items-start">
              <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 flex-shrink-0">
                <MessageSquare />
              </div>
              <div>
                <p className="text-xs font-black uppercase text-gray-400 tracking-widest mb-1">WhatsApp</p>
                <p className="text-2xl font-black text-emerald-600 font-sans">077039 64716</p>
                <a href="https://wa.me/917703964716" className="inline-block mt-4 bg-emerald-500 text-white px-6 py-2 rounded-lg font-bold text-sm">WhatsApp Now</a>
              </div>
            </div>

            <div className="flex gap-6 items-start">
              <div className="w-12 h-12 bg-medical-bg rounded-2xl flex items-center justify-center text-medical-primary flex-shrink-0">
                <MapPin />
              </div>
              <div>
                <p className="text-xs font-black uppercase text-gray-400 tracking-widest mb-1">Address</p>
                <p className="text-lg font-bold text-gray-700">B-45, Near Gurudwara, Vikas Nagar, Mehta Enclave, Uttam Nagar, New Delhi - 110059</p>
                <a href="https://maps.app.goo.gl/NyDf6TN8xYjFCdMs7" target="_blank" className="text-medical-accent font-bold mt-4 inline-block hover:underline">Open in Google Maps</a>
              </div>
            </div>

            <div className="flex gap-6 items-start">
              <div className="w-12 h-12 bg-medical-bg rounded-2xl flex items-center justify-center text-medical-primary flex-shrink-0">
                <Clock />
              </div>
              <div>
                <p className="text-xs font-black uppercase text-gray-400 tracking-widest mb-1">Hours</p>
                <p className="text-lg font-bold text-gray-700">Open 24 Hours, 7 Days a Week <br /> 365 Days a Year — Including All Holidays</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-medical-bg p-10 rounded-[48px] border border-blue-100 shadow-sm relative">
           <BookingForm />
        </div>
      </div>
    </section>
  );
};

const MapSection = () => {
  return (
    <section className="py-24 bg-gray-50 overflow-hidden text-center">
       <div className="max-w-7xl mx-auto px-6">
          <h2 className="font-heading text-4xl md:text-5xl font-black text-medical-primary mb-4 tracking-tighter">Find Us Easily</h2>
          <p className="text-gray-500 font-medium mb-12 italic">Near Gurudwara, Vikas Nagar</p>
          <div className="rounded-[48px] overflow-hidden shadow-2xl border-[12px] border-white h-[500px]">
            <iframe 
               src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14010.51888497645!2d77.03923053950195!3d28.6183863!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d0577a755919b%3A0xe5a3637e7df82570!2sSK%20Medical%20Center!5e0!3m2!1sen!2sin!4v1713784155000!5m2!1sen!2sin" 
               className="w-full h-full"
               loading="lazy">
            </iframe>
          </div>
          <div className="mt-12 bg-white p-10 rounded-[40px] shadow-sm max-w-3xl mx-auto text-left flex flex-col md:flex-row gap-10 items-center justify-between border border-blue-50">
             <div>
               <p className="font-bold text-medical-primary text-lg">B-45, Mehta Enclave, Near Gurudwara, <br /> Vikas Nagar, Uttam Nagar, New Delhi - 110059</p>
               <p className="text-sm text-gray-400 font-medium mt-4 leading-relaxed">Landmarks: Right near Gurudwara, accessible by DTC Bus, Auto-Rickshaw. Accessible from Uttam Nagar East/West Metro.</p>
             </div>
             <a href="https://maps.app.goo.gl/NyDf6TN8xYjFCdMs7" className="bg-medical-accent text-white px-8 py-4 rounded-xl font-bold whitespace-nowrap">Get Directions</a>
          </div>
       </div>
    </section>
  );
};

const HealthTipsSection = () => {
  const tips = [
    { title: "5 Warning Signs That Mean You Should See a Doctor Today", date: "April 20, 2024" },
    { title: "How to Manage Fever at Home — And When to Rush to the Doctor", date: "April 15, 2024" },
    { title: "Why Regular Health Check-Ups Are Important Even When You Feel Fine", date: "April 10, 2024" },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8 text-center md:text-left">
          <div>
            <p className="text-medical-accent font-black uppercase tracking-[0.3em] text-xs mb-4">Blog</p>
            <h2 className="font-heading text-4xl md:text-5xl font-black text-medical-primary mb-4 tracking-tighter">Health Tips for Your Family</h2>
          </div>
          <button className="text-medical-accent font-bold hover:underline">See All Health Tips</button>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
           {tips.map((tip, i) => (
             <div key={i} className="group cursor-pointer">
                <div className="aspect-video bg-medical-bg rounded-[32px] mb-6 overflow-hidden">
                   <img 
                    src={`https://picsum.photos/seed/${i + 70}/800/450`} 
                    alt={tip.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                  />
                </div>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 font-sans italic">{tip.date}</p>
                <h4 className="font-heading text-xl font-black text-medical-primary leading-tight group-hover:text-medical-accent transition-colors">{tip.title}</h4>
             </div>
           ))}
        </div>
      </div>
    </section>
  );
};

const FAQSection = () => {
  const faqs = [
    {
      question: "What are the clinic's operating hours?",
      answer: "SK Medical Center is open 24 hours a day, 7 days a week. We provide round-the-clock emergency care and general consultations to ensure you always have access to healthcare."
    },
    {
      question: "Where is SK Medical Center located?",
      answer: "We are located at B-45, Mehta Enclave, Near Gurudwara, Vikas Nagar, Uttam Nagar, New Delhi - 110059. Our clinic is easily accessible from the Gurudwara landmark."
    },
    {
      question: "How can I book an appointment?",
      answer: "You can book an appointment directly through our website's booking form, send us a message on WhatsApp at +91 77039 64716, or call us for immediate assistance."
    },
    {
      question: "Do you have ambulance services available?",
      answer: "Yes, we provide 24/7 ambulance services for emergencies. Please call 077039 64716 immediately if you require emergency transport."
    },
    {
      question: "Which medical specialties do you offer?",
      answer: "We offer a wide range of services including General OPD, Pediatrics (Child Health), Gynecological services (Women's Health), Minor Procedures, and Diagnostic Lab tests."
    },
    {
      question: "Are emergency services available at night?",
      answer: "Yes, our emergency department is fully functional 24x7, with medical staff available to handle urgent cases at any hour of the day or night."
    }
  ];

  const [openIndex, setOpenIndex] = React.useState<number | null>(0);

  return (
    <section id="faq" className="py-24 bg-white relative">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-medical-accent font-black uppercase tracking-[0.3em] text-xs mb-4">Support</p>
          <h2 className="font-heading text-4xl md:text-5xl font-black text-medical-primary tracking-tighter">Frequently Asked Questions</h2>
          <p className="text-gray-500 font-medium mt-4">Find quick answers to common queries about our services.</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div 
              key={i} 
              className={`border border-blue-50 rounded-3xl overflow-hidden transition-all duration-300 ${openIndex === i ? 'bg-medical-bg shadow-lg shadow-blue-900/5' : 'bg-white hover:border-blue-200'}`}
            >
              <button 
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full px-8 py-6 flex items-center justify-between text-left cursor-pointer"
              >
                <span className={`text-lg font-bold tracking-tight transition-colors ${openIndex === i ? 'text-medical-primary' : 'text-gray-700'}`}>
                  {faq.question}
                </span>
                <div className={`p-2 rounded-xl transition-all duration-300 ${openIndex === i ? 'bg-medical-primary text-white rotate-180' : 'bg-blue-50 text-medical-primary'}`}>
                  <ChevronDown className="w-5 h-5" />
                </div>
              </button>
              
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                  >
                    <div className="px-8 pb-8 text-gray-500 font-medium leading-relaxed border-t border-blue-100/50 pt-4 mx-8">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-medical-primary text-white pt-24 pb-12 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-6 relative z-10 grid lg:grid-cols-4 gap-16 mb-20 text-center lg:text-left">
        <div className="lg:col-span-1">
          <div className="flex items-center gap-3 justify-center lg:justify-start mb-8">
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center">
              <HeartPulse className="text-medical-primary w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-heading font-black tracking-tighter leading-none">SK MEDICAL CENTER</h1>
              <p className="text-[9px] font-bold text-medical-accent uppercase tracking-widest mt-0.5">& HOSPITAL</p>
            </div>
          </div>
          <p className="text-blue-100/70 font-medium leading-relaxed mb-10">
            Available 24 hours a day, 7 days a week for all your healthcare needs — from routine check-ups to emergency care.
          </p>
          <div className="flex gap-4 justify-center lg:justify-start">
             <a href="#" className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center hover:bg-white/20 transition-all"><Facebook /></a>
             <a href="#" className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center hover:bg-white/20 transition-all"><Instagram /></a>
             <a href="#" className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center hover:bg-white/20 transition-all"><MessageSquare /></a>
          </div>
        </div>

        <div>
          <h4 className="text-medical-accent font-black uppercase text-xs tracking-widest mb-8">Quick Links</h4>
          <ul className="space-y-4 text-blue-100/80 font-bold text-sm">
            <li><a href="#" className="hover:text-white">Home</a></li>
            <li><a href="#about" className="hover:text-white">About Us</a></li>
            <li><a href="#services" className="hover:text-white">Our Services</a></li>
            <li><a href="#faq" className="hover:text-white">FAQs</a></li>
            <li><a href="#gallery" className="hover:text-white">Facility Gallery</a></li>
            <li><a href="#contact" className="hover:text-white">Contact Us</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-medical-accent font-black uppercase text-xs tracking-widest mb-8">Services</h4>
          <ul className="space-y-3 text-blue-100/80 font-bold text-xs">
            <li>General OPD</li>
            <li>Emergency Care (24x7)</li>
            <li>Child Health (Pediatrics)</li>
            <li>Women's Health</li>
            <li>Minor Procedures</li>
            <li>Diagnostics & Lab Work</li>
          </ul>
        </div>

        <div className="bg-white/5 p-8 rounded-[40px] border border-white/5">
          <h4 className="text-medical-accent font-black uppercase text-xs tracking-widest mb-6">Contact Info</h4>
          <div className="space-y-6 text-sm">
            <div className="flex gap-4 items-start justify-center lg:justify-start">
               <Phone className="w-5 h-5 text-medical-accent flex-shrink-0" />
               <p className="font-bold">077039 64716</p>
            </div>
            <div className="flex gap-4 items-start justify-center lg:justify-start">
               <MapPin className="w-5 h-5 text-medical-accent flex-shrink-0" />
               <p className="font-bold leading-relaxed">B-45, Vikas Nagar, Uttam Nagar, New Delhi - 110059</p>
            </div>
            <div className="flex gap-4 items-start justify-center lg:justify-start">
               <Clock className="w-5 h-5 text-medical-accent flex-shrink-0" />
               <p className="font-bold leading-relaxed">Open 24 Hours, 7 Days a Week</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-blue-100/50 text-[10px] font-black tracking-widest uppercase">© 2025 SK Medical Center & Hospital. All Rights Reserved.</p>
        <div className="flex items-center gap-2">
           {[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 text-medical-accent fill-current" />)}
           <p className="text-[10px] font-bold text-blue-100/50 uppercase tracking-widest">5.0 RATED ON GOOGLE & JUSTDIAL</p>
        </div>
      </div>
    </footer>
  );
};
