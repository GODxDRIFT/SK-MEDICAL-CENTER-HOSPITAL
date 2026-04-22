import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  CheckCircle, 
  AlertCircle, 
  Calendar, 
  Clock, 
  User, 
  Smartphone, 
  Stethoscope,
  ChevronRight,
  ArrowLeft,
  Copy,
  Check
} from 'lucide-react';

interface BookingFormProps {
  initialDoctor?: string;
  onSuccess?: (bookingId: string) => void;
}

interface FormState {
  name: string;
  phone: string;
  reason: string;
  date: string;
  time: string;
  doctorId?: string;
}

interface Errors {
  [key: string]: string;
}

const REASONS = [
  "General OPD / Check-Up",
  "Child Health",
  "Women's Health",
  "Emergency (Fast Track)",
  "Minor Procedure",
  "Diagnostics / Lab Test"
];

export const BookingForm: React.FC<BookingFormProps> = ({ initialDoctor }) => {
  const [step, setStep] = useState<'form' | 'submitting' | 'success'>('form');
  const [formData, setFormData] = useState<FormState>({
    name: '',
    phone: '',
    reason: REASONS[0],
    date: '',
    time: '',
    doctorId: initialDoctor
  });
  const [errors, setErrors] = useState<Errors>({});
  const [bookingId, setBookingId] = useState('');
  const [copied, setCopied] = useState(false);

  const validate = () => {
    const newErrors: Errors = {};
    if (!formData.name.trim()) newErrors.name = 'Full name is required';
    if (formData.name.length < 3) newErrors.name = 'Name must be at least 3 characters';
    
    // Indian Phone Validation (simple)
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!formData.phone.trim()) newErrors.phone = 'Mobile number is required';
    else if (!phoneRegex.test(formData.phone)) newErrors.phone = 'Enter a valid 10-digit mobile number';
    
    if (!formData.date) newErrors.date = 'Please select a preferred date';
    if (!formData.time) newErrors.time = 'Please select a preferred time';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStep('submitting');
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const randomId = `SKM-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    setBookingId(randomId);
    setStep('success');
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(bookingId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (step === 'success') {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-12"
      >
        <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl shadow-emerald-500/10">
          <CheckCircle className="text-emerald-600 w-12 h-12" />
        </div>
        <h3 className="font-heading text-4xl font-black text-medical-primary mb-4 tracking-tighter">Booking Confirmed!</h3>
        <p className="text-gray-500 font-medium mb-10 max-w-sm mx-auto leading-relaxed">
          Your appointment request has been successfully generated. We will contact you at <strong>{formData.phone}</strong> shortly.
        </p>

        <div className="bg-white rounded-3xl p-8 border-2 border-dashed border-emerald-200 mb-10 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4">
             <button 
              onClick={handleCopy}
              className="p-2 hover:bg-emerald-50 rounded-lg transition-colors text-emerald-600"
              title="Copy ID"
             >
                {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
             </button>
          </div>
          <p className="text-[10px] font-black uppercase text-emerald-600 tracking-[0.2em] mb-2">Your Booking Reference</p>
          <p className="text-3xl font-black text-medical-primary tracking-widest">{bookingId}</p>
        </div>

        <div className="bg-medical-bg rounded-[32px] p-6 mb-10 text-left space-y-4 border border-blue-100">
           <div className="flex items-center gap-4">
              <Calendar className="w-5 h-5 text-medical-accent" />
              <div>
                <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Date</p>
                <p className="font-bold text-medical-primary">{new Date(formData.date).toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
              </div>
           </div>
           <div className="flex items-center gap-4">
              <Clock className="w-5 h-5 text-medical-accent" />
              <div>
                <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Preferred Time</p>
                <p className="font-bold text-medical-primary">{formData.time}</p>
              </div>
           </div>
        </div>

        <motion.button 
          whileHover={{ x: 5 }}
          onClick={() => { setStep('form'); setFormData({ ...formData, date: '', time: '' }); }}
          className="flex items-center gap-2 text-medical-accent font-black uppercase text-xs tracking-[0.2em] mx-auto hover:underline"
        >
          <ArrowLeft className="w-4 h-4" /> Book for another patient
        </motion.button>
      </motion.div>
    );
  }

  return (
    <div className="relative">
      <AnimatePresence>
        {step === 'submitting' && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 bg-white/80 backdrop-blur-sm rounded-[32px] flex flex-col items-center justify-center"
          >
            <div className="w-16 h-16 border-4 border-medical-accent border-t-transparent rounded-full animate-spin mb-6"></div>
            <p className="font-black text-medical-primary uppercase tracking-[0.2em] text-xs">Securing your slot...</p>
          </motion.div>
        )}
      </AnimatePresence>

      <h3 className="font-heading text-3xl font-black text-medical-primary mb-8 tracking-tighter">
        {initialDoctor ? 'Schedule Consultation' : 'Book an Appointment'}
      </h3>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest ml-1 flex items-center gap-2">
              <User className="w-3 h-3" /> Full Name
            </label>
            <div className={`relative group ${errors.name ? 'shake' : ''}`}>
              <input 
                type="text" 
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                placeholder="Ex. Rahul Kumar" 
                className={`w-full bg-white px-6 py-4 rounded-2xl border ${errors.name ? 'border-red-300 bg-red-50' : 'border-blue-100'} focus:border-medical-primary outline-none transition-all font-bold text-medical-primary placeholder:text-gray-300`} 
              />
              {errors.name && <p className="text-[10px] text-red-500 font-bold ml-1 mt-1 uppercase flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.name}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest ml-1 flex items-center gap-2">
              <Smartphone className="w-3 h-3" /> 10-Digit Mobile Number
            </label>
            <div className={`relative group ${errors.phone ? 'shake' : ''}`}>
              <input 
                type="tel" 
                value={formData.phone}
                onChange={(e) => {
                  const val = e.target.value.replace(/\D/g, '');
                  if (val.length <= 10) {
                    setFormData({...formData, phone: val});
                  }
                }}
                placeholder="98XXXXXXXX" 
                maxLength={10}
                className={`w-full bg-white px-6 py-4 rounded-2xl border ${errors.phone ? 'border-red-300 bg-red-50' : 'border-blue-100'} focus:border-medical-primary outline-none transition-all font-bold text-medical-primary placeholder:text-gray-300`} 
              />
              {errors.phone && <p className="text-[10px] text-red-500 font-bold ml-1 mt-1 uppercase flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.phone}</p>}
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest ml-1 flex items-center gap-2">
            <Stethoscope className="w-3 h-3" /> Reason for Consultation
          </label>
          <div className="relative group">
            <select 
              value={formData.reason}
              onChange={(e) => setFormData({...formData, reason: e.target.value})}
              className="w-full bg-white px-6 py-4 rounded-2xl border border-blue-100 focus:border-medical-primary outline-none transition-all font-bold text-medical-primary appearance-none cursor-pointer"
            >
              {REASONS.map(r => <option key={r}>{r}</option>)}
            </select>
            <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none">
              <ChevronRight className="w-5 h-5 text-medical-primary rotate-90" />
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest ml-1 flex items-center gap-2">
              <Calendar className="w-3 h-3" /> Preferred Date
            </label>
            <div className={`relative group ${errors.date ? 'shake' : ''}`}>
              <input 
                type="date" 
                min={new Date().toISOString().split('T')[0]}
                value={formData.date}
                onChange={(e) => setFormData({...formData, date: e.target.value})}
                className={`w-full bg-white px-6 py-4 rounded-2xl border ${errors.date ? 'border-red-300 bg-red-50' : 'border-blue-100'} focus:border-medical-primary outline-none transition-all font-bold text-medical-primary`} 
              />
              {errors.date && <p className="text-[10px] text-red-500 font-bold ml-1 mt-1 uppercase flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.date}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest ml-1 flex items-center gap-2">
              <Clock className="w-3 h-3" /> Preferred Time Slot
            </label>
            <div className={`relative group ${errors.time ? 'shake' : ''}`}>
              <select 
                value={formData.time}
                onChange={(e) => setFormData({...formData, time: e.target.value})}
                className={`w-full bg-white px-6 py-4 rounded-2xl border ${errors.time ? 'border-red-300 bg-red-50' : 'border-blue-100'} focus:border-medical-primary outline-none transition-all font-bold text-medical-primary appearance-none cursor-pointer`}
              >
                <option value="">Select Time Slot</option>
                <option>Early Morning (8 AM - 11 AM)</option>
                <option>Mid-Day (11 AM - 2 PM)</option>
                <option>Afternoon (2 PM - 5 PM)</option>
                <option>Evening (5 PM - 8 PM)</option>
                <option>Night (8 PM - 11 PM)</option>
              </select>
              <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none">
                <ChevronRight className="w-5 h-5 text-medical-primary rotate-90" />
              </div>
              {errors.time && <p className="text-[10px] text-red-500 font-bold ml-1 mt-1 uppercase flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.time}</p>}
            </div>
          </div>
        </div>

        <button 
          type="submit" 
          disabled={step === 'submitting'}
          className="w-full bg-medical-primary text-white font-black py-5 rounded-2xl text-sm uppercase tracking-[0.2em] shadow-2xl shadow-blue-900/20 hover:bg-blue-900 disabled:opacity-50 transition-all flex items-center justify-center gap-2 group"
        >
          Confirm Availability Request
          <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>

        <p className="text-[10px] text-gray-400 font-bold text-center uppercase tracking-[0.2em]">
          Priority check-ups for elderly & infants. Emergency cases skip queues.
        </p>
      </form>
    </div>
  );
};
