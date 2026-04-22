import { 
  Phone, 
  MapPin, 
  Clock, 
  Star, 
  ArrowLeft,
  Calendar,
  MessageSquare,
  Award,
  BookOpen,
  GraduationCap,
  BriefcaseMedical,
  ShieldCheck
} from 'lucide-react';
import { motion } from 'motion/react';
import { useParams, Link } from 'react-router-dom';
import { DOCTORS } from '../data';
import { BookingForm } from './BookingForm';
import React from 'react';

export default function DoctorDetails() {
  const { id } = useParams();
  const doctor = DOCTORS.find(d => d.id === id);

  if (!doctor) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 text-center">
        <div>
          <h2 className="text-3xl font-black text-medical-primary mb-4">Doctor Not Found</h2>
          <p className="text-gray-500 mb-8">The specialist you are looking for is not available.</p>
          <Link to="/" className="bg-medical-primary text-white px-8 py-4 rounded-xl font-bold">Return Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen pb-24">
      {/* Hero Section */}
      <section className="relative pt-40 pb-20 bg-medical-primary overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img src={doctor.img} alt="" className="w-full h-full object-cover blur-2xl" />
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <Link to="/" className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-12 font-bold text-sm uppercase tracking-widest transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Team
          </Link>
          
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="flex flex-col md:flex-row gap-10 items-center md:items-start text-center md:text-left">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-64 h-64 md:w-80 md:h-80 rounded-[40px] overflow-hidden border-8 border-white/10 shadow-2xl shrink-0"
              >
                <img src={doctor.img} alt={doctor.name} className="w-full h-full object-cover" />
              </motion.div>
              
              <div className="flex-grow pt-4">
                <div className="inline-flex items-center gap-2 bg-white/10 text-white px-4 py-1.5 rounded-full mb-6 text-xs font-black uppercase tracking-widest border border-white/10">
                  <Star className="w-3 h-3 text-medical-accent fill-current" />
                  Senior Consultant
                </div>
                <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-tight mb-2">
                  {doctor.name}
                </h1>
                <p className="text-xl md:text-2xl font-bold text-medical-accent mb-6 italic">{doctor.role}</p>
                <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                  <div className="flex items-center gap-2 text-white/80 font-bold text-sm bg-white/5 px-4 py-2 rounded-xl">
                    <GraduationCap className="w-4 h-4 text-medical-accent" />
                    {doctor.degrees.join(', ')}
                  </div>
                  <div className="flex items-center gap-2 text-white/80 font-bold text-sm bg-white/5 px-4 py-2 rounded-xl">
                    <BriefcaseMedical className="w-4 h-4 text-medical-accent" />
                    {doctor.experience} Experience
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-[40px] p-8 md:p-10 shadow-2xl border border-blue-50">
              <div className="mb-8 flex gap-4">
                 <div className="flex-1 bg-medical-bg p-4 rounded-2xl border border-blue-50">
                   <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest leading-none mb-2">Hours</p>
                   <p className="text-xs font-bold text-medical-primary">{doctor.availability}</p>
                 </div>
                 <div className="flex-1 bg-medical-bg p-4 rounded-2xl border border-blue-50">
                   <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest leading-none mb-2">Next Slot</p>
                   <p className="text-xs font-bold text-emerald-600">Available Today</p>
                 </div>
              </div>
              <BookingForm initialDoctor={doctor.id} />
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-3 gap-16">
          <div className="lg:col-span-2 space-y-16">
            <div>
              <h2 className="text-3xl font-black text-medical-primary mb-8 tracking-tight flex items-center gap-4">
                <div className="w-10 h-10 bg-medical-bg rounded-xl flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-medical-accent" />
                </div>
                Professional Profile
              </h2>
              <div className="prose prose-lg text-gray-600 font-medium leading-relaxed max-w-none">
                <p className="mb-6">{doctor.bio}</p>
                <h4 className="text-xl font-bold text-medical-primary mb-4">Areas of Expertise</h4>
                <ul className="grid sm:grid-cols-2 gap-4 list-none p-0">
                  {doctor.specialties.map((spec, i) => (
                    <li key={i} className="flex items-center gap-3 bg-medical-bg/50 p-4 rounded-2xl border border-blue-50/50">
                      <ShieldCheck className="w-5 h-5 text-emerald-500 shrink-0" />
                      <span className="font-bold text-medical-primary">{spec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-black text-medical-primary mb-8 tracking-tight flex items-center gap-4">
                <div className="w-10 h-10 bg-medical-bg rounded-xl flex items-center justify-center">
                  <Award className="w-5 h-5 text-medical-accent" />
                </div>
                Accolades & Experience
              </h2>
              <div className="grid sm:grid-cols-2 gap-6">
                 {doctor.achievements.map((ach, i) => (
                   <div key={i} className="p-6 rounded-[32px] border border-gray-100 bg-white shadow-sm hover:shadow-md transition-all">
                     <p className="text-lg font-bold text-medical-primary mb-2 italic">"{ach.title}"</p>
                     <p className="text-sm text-gray-500 font-medium">{ach.description}</p>
                   </div>
                 ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-44 space-y-8">
              <div className="bg-medical-bg p-8 rounded-[40px] border border-blue-100">
                <h4 className="text-xl font-black text-medical-primary mb-6">Patient Reviews</h4>
                <div className="space-y-6">
                   {[
                     { name: "Rahul S.", text: "A very patient listener and highly skilled. The treatment was effective.", stars: 5 },
                     { name: "Anjali M.", text: "Best doctor in Vikas Nagar. Very friendly and explains everything clearly.", stars: 5 }
                   ].map((rev, i) => (
                     <div key={i} className="border-b border-blue-100 pb-6 last:border-0 last:pb-0">
                       <div className="flex gap-1 text-orange-500 mb-2">
                         {[...Array(rev.stars)].map((_, j) => <Star key={j} className="w-3 h-3 fill-current" />)}
                       </div>
                       <p className="text-sm text-gray-600 font-medium italic mb-2">"{rev.text}"</p>
                       <p className="text-[10px] font-black text-medical-primary uppercase tracking-widest">— {rev.name}</p>
                     </div>
                   ))}
                </div>
                <button className="w-full mt-8 text-medical-accent font-black uppercase text-[10px] tracking-widest hover:underline text-center">View More Google Reviews</button>
              </div>

              <div className="relative rounded-[40px] overflow-hidden group">
                <img src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=800" alt="Hospital interior" className="w-full h-64 object-cover" />
                <div className="absolute inset-0 bg-medical-primary/60 flex items-center justify-center p-8 text-center text-white">
                  <div>
                    <h4 className="font-black text-xl mb-2">Need Urgent Care?</h4>
                    <p className="text-xs font-bold mb-6 text-white/80">Our emergency team is available 24/7 for immediate attention.</p>
                    <a href="tel:07703964716" className="inline-block bg-medical-accent px-6 py-3 rounded-xl font-black text-xs uppercase tracking-widest">Call Helpline</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Urgent Care CTA */}
      <section className="bg-medical-primary relative overflow-hidden py-16 mx-6 rounded-[48px] mb-24">
        <div className="absolute inset-0 opacity-10">
          <img 
            src="https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=2000" 
            alt="Medical Emergency" 
            className="w-full h-full object-cover" 
          />
        </div>
        <div className="max-w-5xl mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 bg-red-500 text-white px-4 py-1.5 rounded-full mb-6 font-black text-[10px] uppercase tracking-widest animate-pulse">
              <span className="w-2 h-2 bg-white rounded-full"></span>
              Emergency Service Available 24/7
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tighter leading-tight">
              Need Urgent Care? <br />
              <span className="text-medical-accent">We are here for you 24/7.</span>
            </h2>
            <p className="text-blue-100 text-lg md:text-xl font-medium mb-10 max-w-2xl mx-auto">
              Our emergency team at SK Medical Center is ready to handle critical situations at any hour. Don't wait — call our direct helpline now.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <a 
                href="tel:07703964716" 
                className="w-full sm:w-auto bg-medical-accent text-white px-10 py-5 rounded-2xl font-black text-xl flex items-center justify-center gap-4 hover:bg-orange-600 transition-all shadow-2xl shadow-orange-500/20"
              >
                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                  <Phone className="w-6 h-6" />
                </div>
                077039 64716
              </a>
              <a 
                href="https://wa.me/917703964716" 
                target="_blank"
                className="w-full sm:w-auto bg-emerald-500 text-white px-10 py-5 rounded-2xl font-black text-xl flex items-center justify-center gap-4 hover:bg-emerald-600 transition-all shadow-2xl shadow-emerald-500/20"
              >
                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                  <MessageSquare className="w-6 h-6" />
                </div>
                WhatsApp Now
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
