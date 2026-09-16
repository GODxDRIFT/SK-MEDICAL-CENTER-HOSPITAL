/* ==========================================================================
   SK MULTISPECIALITY HOSPITAL - JAVASCRIPT INTERACTIONS
   ========================================================================== */

// Sample Database for Search and Data Filters
const HOSPITAL_DATABASE = {
  doctors: [
    { name: "Dr. Ashok Seth", spec: "Cardiac Sciences / Cardiology", hospital: "Fortis Escorts Okhla", exp: "38+ Years", rating: 4.9 },
    { name: "Dr. Vinod Raina", spec: "Medical Oncology / Cancer Care", hospital: "Fortis Memorial Gurugram", exp: "40+ Years", rating: 4.9 },
    { name: "Dr. Subhash Chandra", spec: "Cardiac Sciences & Intervention", hospital: "Fortis Shalimar Bagh", exp: "34+ Years", rating: 4.8 },
    { name: "Dr. Vivek Vij", spec: "Liver Transplant & GI Surgery", hospital: "Fortis Escorts Okhla", exp: "25+ Years", rating: 4.9 },
    { name: "Dr. Sanjeev Gulati", spec: "Nephrology & Kidney Transplant", hospital: "Fortis Vasant Kunj", exp: "32+ Years", rating: 4.8 },
    { name: "Dr. Atul Mishra", spec: "Orthopaedics & Joint Surgery", hospital: "Fortis Hospital Noida", exp: "24+ Years", rating: 4.7 },
    { name: "Dr. Shuvanan Ray", spec: "Interventional Cardiology", hospital: "Fortis Hospital Kolkata", exp: "28+ Years", rating: 4.8 },
    { name: "Dr. Gourdas Choudhuri", spec: "Gastroenterology & Hepatology", hospital: "Fortis Memorial Gurugram", exp: "35+ Years", rating: 4.9 }
  ],
  specialities: [
    { name: "Cardiac Sciences & Heart Care", desc: "TAVI, Bypass CABG, Angioplasty, Valve Replacements" },
    { name: "Oncology & Cancer Institute", desc: "CAR-T Therapy, TrueBeam Radiation, Surgical Oncology" },
    { name: "Orthopaedics & Joint Replacement", desc: "Mako Robotic Knee & Hip Surgery, Arthroscopy" },
    { name: "Neuro Sciences & Spine Care", desc: "Deep Brain Stimulation, Stroke Care, Neuro-trauma" },
    { name: "Nephrology & Urology", desc: "Kidney Transplants, Dialysis, Robotic Uro-surgeries" },
    { name: "Gastroenterology & Liver Transplant", desc: "Living Donor Liver Transplants, Endoscopy" },
    { name: "Pulmonology & Respiratory Medicine", desc: "ECMO, Lung Failure Clinic, Sleep Apnea" },
    { name: "Paediatrics & Neonatology", desc: "Paediatric Cardiac Surgery, Level 3 NICU" }
  ],
  hospitals: [
    { name: "Fortis Escorts Heart Institute", loc: "Okhla, New Delhi", beds: "310+ Beds" },
    { name: "Fortis Memorial Research Institute", loc: "Gurugram, Haryana", beds: "1000+ Beds" },
    { name: "Fortis Hospital Shalimar Bagh", loc: "North Delhi", beds: "260+ Beds" },
    { name: "Fortis Hospital Vasant Kunj", loc: "South Delhi", beds: "200+ Beds" },
    { name: "Fortis Hospital Noida", loc: "Sector 62, Noida", beds: "200+ Beds" },
    { name: "Fortis Escorts Hospital Faridabad", loc: "Faridabad, Haryana", beds: "210+ Beds" }
  ],
  treatments: [
    { name: "TAVI (Transcatheter Aortic Valve)", spec: "Cardiology" },
    { name: "Mako Robotic Knee Replacement", spec: "Orthopaedics" },
    { name: "CAR-T Cell Cancer Immunotherapy", spec: "Oncology" },
    { name: "Deep Brain Stimulation (DBS)", spec: "Neurology" },
    { name: "Living Donor Liver Transplant", spec: "Hepatology" },
    { name: "Renal Angioplasty & Kidney Transplant", spec: "Nephrology" }
  ]
};

// Global State
let currentPromoSlide = 0;
let promoInterval = null;
let currentSearchCategory = 'all';

// ==========================================================================
// INITIALIZATION
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
  initPromoCarousel();
  initSearchAutocomplete();
  initDefaultDate();

  // Close search dropdown on click outside
  document.addEventListener('click', (e) => {
    const searchWrapper = document.getElementById('heroSearchWrapper');
    const dropdown = document.getElementById('searchResultsDropdown');
    if (searchWrapper && !searchWrapper.contains(e.target)) {
      dropdown.classList.remove('active');
    }
  });
});

// Set default booking date to tomorrow
function initDefaultDate() {
  const dateInput = document.getElementById('modalDate');
  if (dateInput) {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const yyyy = tomorrow.getFullYear();
    const mm = String(tomorrow.getMonth() + 1).padStart(2, '0');
    const dd = String(tomorrow.getDate()).padStart(2, '0');
    dateInput.value = `${yyyy}-${mm}-${dd}`;
    dateInput.min = `${yyyy}-${mm}-${dd}`;
  }
}

// ==========================================================================
// PROMO CAROUSEL LOGIC
// ==========================================================================
function initPromoCarousel() {
  const track = document.getElementById('promoTrack');
  const dotsContainer = document.getElementById('promoDots');
  if (!track || !dotsContainer) return;

  const slides = track.querySelectorAll('.promo-slide');
  dotsContainer.innerHTML = '';

  slides.forEach((_, idx) => {
    const dot = document.createElement('div');
    dot.className = `c-dot ${idx === 0 ? 'active' : ''}`;
    dot.onclick = () => goToPromoSlide(idx);
    dotsContainer.appendChild(dot);
  });

  startPromoAutoplay();
}

function updatePromoCarousel() {
  const track = document.getElementById('promoTrack');
  const dots = document.querySelectorAll('#promoDots .c-dot');
  if (!track) return;

  const totalSlides = track.querySelectorAll('.promo-slide').length;
  if (currentPromoSlide >= totalSlides) currentPromoSlide = 0;
  if (currentPromoSlide < 0) currentPromoSlide = totalSlides - 1;

  track.style.transform = `translateX(-${currentPromoSlide * 100}%)`;

  dots.forEach((dot, idx) => {
    dot.classList.toggle('active', idx === currentPromoSlide);
  });
}

function nextSlide(trackId) {
  if (trackId === 'promoTrack') {
    currentPromoSlide++;
    updatePromoCarousel();
    resetPromoAutoplay();
  }
}

function prevSlide(trackId) {
  if (trackId === 'promoTrack') {
    currentPromoSlide--;
    updatePromoCarousel();
    resetPromoAutoplay();
  }
}

function goToPromoSlide(idx) {
  currentPromoSlide = idx;
  updatePromoCarousel();
  resetPromoAutoplay();
}

function startPromoAutoplay() {
  promoInterval = setInterval(() => {
    currentPromoSlide++;
    updatePromoCarousel();
  }, 5000);
}

function resetPromoAutoplay() {
  if (promoInterval) clearInterval(promoInterval);
  startPromoAutoplay();
}

// ==========================================================================
// HORIZONTAL CAROUSEL SCROLL HELPERS
// ==========================================================================
function scrollGridLeft(gridId) {
  const grid = document.getElementById(gridId);
  if (grid) {
    grid.scrollBy({ left: -340, behavior: 'smooth' });
  }
}

function scrollGridRight(gridId) {
  const grid = document.getElementById(gridId);
  if (grid) {
    grid.scrollBy({ left: 340, behavior: 'smooth' });
  }
}

// ==========================================================================
// SEARCH & AUTOCOMPLETE ENGINE
// ==========================================================================
function initSearchAutocomplete() {
  renderSearchResults('');
}

function handleSearchInput(query) {
  const clearBtn = document.getElementById('clearSearchBtn');
  if (clearBtn) {
    clearBtn.style.display = query.length > 0 ? 'block' : 'none';
  }
  showSearchSuggestions();
  renderSearchResults(query.trim());
}

function clearSearch() {
  const input = document.getElementById('mainSearchInput');
  if (input) {
    input.value = '';
    handleSearchInput('');
    input.focus();
  }
}

function showSearchSuggestions() {
  const dropdown = document.getElementById('searchResultsDropdown');
  if (dropdown) dropdown.classList.add('active');
}

function focusMainSearch() {
  const searchInput = document.getElementById('mainSearchInput');
  if (searchInput) {
    searchInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
    searchInput.focus();
    showSearchSuggestions();
  }
}

function filterSearchCategory(category) {
  currentSearchCategory = category;
  const pills = document.querySelectorAll('.cat-pill');
  pills.forEach(pill => {
    pill.classList.toggle('active', pill.textContent.toLowerCase() === category || (category === 'all' && pill.textContent === 'All'));
  });

  const query = document.getElementById('mainSearchInput')?.value || '';
  renderSearchResults(query);
}

function renderSearchResults(query) {
  const listContainer = document.getElementById('searchResultsList');
  if (!listContainer) return;

  const q = query.toLowerCase();
  let resultsHtml = '';

  // 1. Doctors
  if (currentSearchCategory === 'all' || currentSearchCategory === 'doctor') {
    const matchedDocs = HOSPITAL_DATABASE.doctors.filter(d => 
      !q || d.name.toLowerCase().includes(q) || d.spec.toLowerCase().includes(q) || d.hospital.toLowerCase().includes(q)
    );
    matchedDocs.forEach(d => {
      resultsHtml += `
        <div class="search-result-item" onclick="selectSearchResult('doctor', '${d.name}', '${d.spec}')">
          <div>
            <div class="res-main-text"><i class="fa-solid fa-user-doctor text-green"></i> ${d.name}</div>
            <div class="res-sub-text">${d.spec} | ${d.hospital}</div>
          </div>
          <span class="res-type-badge">Doctor</span>
        </div>
      `;
    });
  }

  // 2. Specialities
  if (currentSearchCategory === 'all' || currentSearchCategory === 'speciality') {
    const matchedSpecs = HOSPITAL_DATABASE.specialities.filter(s => 
      !q || s.name.toLowerCase().includes(q) || s.desc.toLowerCase().includes(q)
    );
    matchedSpecs.forEach(s => {
      resultsHtml += `
        <div class="search-result-item" onclick="selectSearchResult('speciality', '${s.name}', '')">
          <div>
            <div class="res-main-text"><i class="fa-solid fa-stethoscope text-purple"></i> ${s.name}</div>
            <div class="res-sub-text">${s.desc}</div>
          </div>
          <span class="res-type-badge">Speciality</span>
        </div>
      `;
    });
  }

  // 3. Hospitals
  if (currentSearchCategory === 'all' || currentSearchCategory === 'hospital') {
    const matchedHosps = HOSPITAL_DATABASE.hospitals.filter(h => 
      !q || h.name.toLowerCase().includes(q) || h.loc.toLowerCase().includes(q)
    );
    matchedHosps.forEach(h => {
      resultsHtml += `
        <div class="search-result-item" onclick="selectSearchResult('hospital', '${h.name}', '${h.loc}')">
          <div>
            <div class="res-main-text"><i class="fa-solid fa-hospital text-cyan"></i> ${h.name}</div>
            <div class="res-sub-text">${h.loc} (${h.beds})</div>
          </div>
          <span class="res-type-badge">Hospital</span>
        </div>
      `;
    });
  }

  // 4. Treatments
  if (currentSearchCategory === 'all' || currentSearchCategory === 'treatment') {
    const matchedTreat = HOSPITAL_DATABASE.treatments.filter(t => 
      !q || t.name.toLowerCase().includes(q) || t.spec.toLowerCase().includes(q)
    );
    matchedTreat.forEach(t => {
      resultsHtml += `
        <div class="search-result-item" onclick="selectSearchResult('treatment', '${t.name}', '${t.spec}')">
          <div>
            <div class="res-main-text"><i class="fa-solid fa-heart-pulse text-peach"></i> ${t.name}</div>
            <div class="res-sub-text">Speciality: ${t.spec}</div>
          </div>
          <span class="res-type-badge">Procedure</span>
        </div>
      `;
    });
  }

  if (resultsHtml === '') {
    resultsHtml = `<div style="padding: 16px; text-align:center; color:#64748b; font-size:0.85rem;">No matching medical services found for "${query}". Try searching "Cardiology", "Robotic", or "Dr. Ashok Seth".</div>`;
  }

  listContainer.innerHTML = resultsHtml;
}

function selectSearchResult(type, name, sub) {
  const dropdown = document.getElementById('searchResultsDropdown');
  if (dropdown) dropdown.classList.remove('active');

  if (type === 'doctor') {
    openBookingModal('', name);
  } else if (type === 'speciality') {
    openBookingModal(name);
  } else if (type === 'hospital') {
    showToast(`Filtering hospital services for: ${name}`, 'success');
    scrollToSection('servicesHub');
  } else if (type === 'treatment') {
    openBookingModal(sub);
  }
}

function executeSearch() {
  const query = document.getElementById('mainSearchInput')?.value || '';
  if (!query) {
    showToast('Please type a doctor name, disease, or speciality', 'info');
    focusMainSearch();
    return;
  }
  showToast(`Searching for "${query}" across 28+ hospitals...`, 'success');
  openDoctorSearch(query);
}

// ==========================================================================
// MODAL CONTROLLERS & WORKFLOWS
// ==========================================================================

function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

// Open Booking Modal with Preselected options
function openBookingModal(speciality = '', doctor = '') {
  openModal('bookingModal');
  
  // Reset view to form
  const formStep = document.getElementById('bookingStep1');
  const successView = document.getElementById('bookingSuccessView');
  if (formStep) formStep.style.display = 'block';
  if (successView) successView.style.display = 'none';

  if (speciality) {
    const specSelect = document.getElementById('modalSpeciality');
    if (specSelect) {
      for (let i = 0; i < specSelect.options.length; i++) {
        if (specSelect.options[i].text.toLowerCase().includes(speciality.toLowerCase()) || 
            specSelect.options[i].value.toLowerCase().includes(speciality.toLowerCase())) {
          specSelect.selectedIndex = i;
          break;
        }
      }
    }
  }

  if (doctor) {
    const docSelect = document.getElementById('modalDoctor');
    if (docSelect) {
      for (let i = 0; i < docSelect.options.length; i++) {
        if (docSelect.options[i].text.toLowerCase().includes(doctor.toLowerCase())) {
          docSelect.selectedIndex = i;
          break;
        }
      }
    }
  }
}

function openEmergencyModal() {
  openModal('emergencyModal');
}

function openCallbackModal() {
  openModal('callbackModal');
}

function openHealthCheckModal() {
  openBookingModal('General Medicine');
  showToast('Select your preferred branch for comprehensive preventive health packages.', 'info');
}

function openTestBookingModal() {
  openModal('reportPortalModal');
  showToast('You can book diagnostic lab tests or download existing test reports here.', 'info');
}

function openReportPortalModal() {
  openModal('reportPortalModal');
}

function openDoctorSearch(query = '') {
  openBookingModal();
  if (query) {
    showToast(`Filtering specialist doctors for query: ${query}`, 'info');
  }
}

// Emergency Ambulance Simulator
function triggerAmbulanceSimulation() {
  const bar = document.getElementById('ambulanceStatusBar');
  const text = document.getElementById('ambulanceStatusText');
  if (!bar || !text) return;

  bar.style.display = 'flex';
  text.textContent = 'Acquiring high-precision GPS coordinates...';

  setTimeout(() => {
    text.textContent = 'GPS Found: 28.5355° N, 77.2783° E (Near Okhla, New Delhi)';
  }, 1200);

  setTimeout(() => {
    text.textContent = 'Dispatched ALS Ambulance #DL-01-EB-4491! ETA: 8 minutes. Emergency Doctor onboard.';
    showToast('🚨 Ambulance Dispatched! Emergency team is on the way.', 'success');
  }, 2800);
}

// Medical Reports Lookup Simulator
function fetchSampleReports() {
  const uhidInput = document.getElementById('reportUHID');
  const val = uhidInput?.value.trim();
  if (!val) {
    showToast('Please enter your UHID or 10-digit mobile number', 'error');
    return;
  }

  const resultsView = document.getElementById('reportsResultView');
  if (resultsView) {
    resultsView.style.display = 'block';
    showToast('Medical records retrieved securely from cloud archive.', 'success');
  }
}

function downloadSampleReport(filename) {
  showToast(`Downloading verified medical report: ${filename}`, 'success');
  const element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(`--- SK MULTISPECIALITY HOSPITAL ---\nCONFIDENTIAL MEDICAL LAB REPORT\nPatient: Rajesh Sharma | UHID: FTH-89104\nDoctor: Dr. Ashok Seth\nStatus: Clinically Normal / Verified\nDate: 14 Sep 2026`));
  element.setAttribute('download', filename);
  element.style.display = 'none';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}

// Video Modal Player
function playVideoModal(videoUrl, title) {
  const modal = document.getElementById('videoModal');
  const iframe = document.getElementById('videoIframe');
  const titleEl = document.getElementById('videoModalTitle');

  if (titleEl) titleEl.textContent = title;
  if (iframe) iframe.src = videoUrl + "?autoplay=1";
  openModal('videoModal');
}

function closeVideoModal() {
  const iframe = document.getElementById('videoIframe');
  if (iframe) iframe.src = "";
  closeModal('videoModal');
}

// Case & Story Modals
function openCaseModal(caseId) {
  const cases = [
    { title: "Rare Skull Bone TB Complete Recovery", details: "A 34-year-old Delhi resident presented with recurring cranial infections for 2.5 years. Multidisciplinary surgical intervention at Fortis Shalimar Bagh eradicated the rare osseous tuberculosis lesion followed by cranial contour reconstruction." },
    { title: "Faridabad Dedicated Parkinson's Clinic Launch", details: "Offering high-frequency Subthalamic Nucleus Deep Brain Stimulation (DBS) and precision tremor neuro-rehab protocols under senior neurologist supervision." },
    { title: "Octogenarian Transcatheter Aortic Valve Replacement", details: "Critical calcified aortic stenosis treated via percutaneous transfemoral catheter approach without sternotomy." }
  ];
  const c = cases[caseId - 1] || cases[0];
  alert(`BREAKTHROUGH CASE: ${c.title}\n\n${c.details}`);
}

function openBlogModal(blogId) {
  const blogs = [
    "Kidney Health Guide: Stay hydrated, monitor annual creatinine/eGFR, and keep blood pressure below 120/80 mmHg.",
    "Liver Transplant Milestones: Innovations in living donor surgeries with minimal incision and rapid recovery.",
    "Hepatic Oncology Surgical Advances: Ultra-precise laparoscopic liver resections with intraoperative ultrasound.",
    "Cancer Immunotherapy: How checkpoint inhibitors stimulate natural killer T-cells to destroy tumor clusters."
  ];
  alert(`CLINICAL BLOG INSIGHT:\n\n${blogs[blogId - 1] || blogs[0]}`);
}

// Appointment Form Submission
function submitAppointment(e) {
  e.preventDefault();

  const hospital = document.getElementById('modalHospital')?.value || 'Fortis Escorts Okhla';
  const doctor = document.getElementById('modalDoctor')?.value || 'Dr. Ashok Seth';
  const date = document.getElementById('modalDate')?.value || '2026-09-17';
  const slot = document.getElementById('modalSlot')?.value || '10:00 AM - 11:30 AM';
  const patientName = document.getElementById('patientName')?.value || 'Rajesh Sharma';

  const randomRef = 'FTH-2026-' + Math.floor(1000 + Math.random() * 9000);

  // Update success ticket
  document.getElementById('confirmedAppId').textContent = randomRef;
  document.getElementById('confPatientName').textContent = patientName;
  document.getElementById('confDoctor').textContent = doctor;
  document.getElementById('confHospital').textContent = hospital;
  document.getElementById('confDateTime').textContent = `${date} at ${slot}`;

  // Swap view
  document.getElementById('bookingStep1').style.display = 'none';
  document.getElementById('bookingSuccessView').style.display = 'block';

  showToast(`🎉 Appointment booked for ${patientName}! Reference: ${randomRef}`, 'success');
}

function printAppointmentTicket() {
  window.print();
}

// Callback Form Submission
function submitCallback(e) {
  e.preventDefault();
  const name = document.getElementById('cbName')?.value;
  closeModal('callbackModal');
  showToast(`Thank you, ${name}! A medical counselor will call you within 15 minutes.`, 'success');
}

// ==========================================================================
// FAQ ACCORDIONS & SEARCH
// ==========================================================================
function toggleAccordion(accId) {
  const item = document.getElementById(accId);
  if (!item) return;

  const isActive = item.classList.contains('active');
  
  // Close other accordions
  document.querySelectorAll('.accordion-item').forEach(acc => {
    acc.classList.remove('active');
  });

  if (!isActive) {
    item.classList.add('active');
  }
}

function handleFaqSearch(e) {
  if (e.key === 'Enter') {
    submitFaqQuery();
  }
}

function submitFaqQuery() {
  const query = document.getElementById('faqInput')?.value.trim();
  if (!query) {
    showToast('Please type a question to get instant assistance.', 'info');
    return;
  }
  
  // Auto-expand relevant section or notify
  const q = query.toLowerCase();
  if (q.includes('about') || q.includes('hospital') || q.includes('bed')) {
    toggleAccordion('acc-about');
  } else if (q.includes('insurance') || q.includes('care') || q.includes('service') || q.includes('emergency')) {
    toggleAccordion('acc-services');
  } else if (q.includes('compliance') || q.includes('nabh') || q.includes('jci')) {
    toggleAccordion('acc-compliance');
  } else {
    toggleAccordion('acc-outcomes');
  }

  showToast(`Found clinical answers for: "${query}"`, 'success');
}

// ==========================================================================
// NAVIGATION & LOCATION UTILITIES
// ==========================================================================
function toggleMobileMenu() {
  const drawer = document.getElementById('mobileDrawer');
  if (drawer) {
    drawer.classList.toggle('open');
  }
}

function updateLocation(loc) {
  showToast(`📍 Showing doctors and facilities in: ${loc}`, 'info');
}

function filterByHospital(hospName) {
  showToast(`Viewing facilities for: ${hospName}`, 'info');
  scrollToSection('specialities');
}

function filterSpeciality(specName) {
  openBookingModal(specName);
}

function scrollToSection(sectionId) {
  const el = document.getElementById(sectionId);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' });
  }
}

function viewAllCases() {
  scrollToSection('breakthrough-cases');
  showToast('Viewing all 120+ clinical breakthrough milestones.', 'info');
}

function viewAllStories() {
  scrollToSection('patient-stories');
  showToast('Viewing international & domestic patient testimonials.', 'info');
}

function viewAllBlogs() {
  scrollToSection('blogs');
  showToast('Accessing 500+ doctor-written health publications.', 'info');
}

function viewAllVideos() {
  scrollToSection('videos');
  showToast('Browse our video library of surgical procedures & wellness talks.', 'info');
}

// ==========================================================================
// TOAST NOTIFICATIONS
// ==========================================================================
function showToast(message, type = 'info') {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast-msg ${type === 'success' ? 'success' : ''}`;
  
  const icon = type === 'success' ? 'fa-solid fa-circle-check' : 'fa-solid fa-bell';
  toast.innerHTML = `<i class="${icon}"></i> <span>${message}</span>`;
  
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}
