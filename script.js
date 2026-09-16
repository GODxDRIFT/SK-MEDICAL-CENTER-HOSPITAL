/* ==========================================================================
   S.K MULTI-SPECIALITY HOSPITAL 24×7 - JAVASCRIPT INTERACTIONS
   ========================================================================== */

// Database for Search and Data Filters
const HOSPITAL_DATABASE = {
  doctors: [
    { name: "Senior Consultant - General Medicine", spec: "General & Internal Medicine", hospital: "S.K Multi-Speciality Hospital, Vikas Nagar", exp: "15+ Years", rating: 4.8 },
    { name: "Consultant General & Laparoscopic Surgeon", spec: "General & Laparoscopic Surgery", hospital: "S.K Multi-Speciality Hospital, Vikas Nagar", exp: "14+ Years", rating: 4.9 },
    { name: "Consultant Orthopaedic Surgeon", spec: "Orthopaedics & Joint Care", hospital: "S.K Multi-Speciality Hospital, Vikas Nagar", exp: "12+ Years", rating: 4.8 },
    { name: "Consultant Gynaecologist & Obstetrician", spec: "Gynaecology & Obstetrics", hospital: "S.K Multi-Speciality Hospital, Vikas Nagar", exp: "16+ Years", rating: 4.9 },
    { name: "Senior Paediatrician & Child Specialist", spec: "Paediatrics & Child Care", hospital: "S.K Multi-Speciality Hospital, Vikas Nagar", exp: "10+ Years", rating: 4.8 },
    { name: "Duty Medical Officer (24x7 Emergency)", spec: "24x7 Emergency & Critical Care", hospital: "S.K Multi-Speciality Hospital, Vikas Nagar", exp: "24x7 Available", rating: 4.9 }
  ],
  specialities: [
    { name: "General & Internal Medicine", desc: "Fever, Diabetes, Hypertension, Infections, Health Checkups" },
    { name: "General & Laparoscopic Surgery", desc: "Appendix, Hernia, Gallbladder Stones, Day Care Surgeries" },
    { name: "Orthopaedics & Joint Care", desc: "Fracture Treatment, Plaster, Joint Pain, Arthritis, Trauma" },
    { name: "Gynaecology & Obstetrics", desc: "Maternal Care, Normal & C-Section Deliveries, PCOD" },
    { name: "Paediatrics & Neonatal Care", desc: "Newborn Care, Child Vaccination, Paediatric Emergencies" },
    { name: "24x7 Emergency & Trauma Care", desc: "Immediate Trauma Care, Oxygen Support, Critical ICU Triage" },
    { name: "Pathology & Diagnostic Lab", desc: "CBC, Blood Sugar, Lipid, LFT, KFT, Routine Tests & ECG" }
  ],
  services: [
    { name: "24x7 Emergency & Trauma Admission", loc: "Open 24 Hours Daily", desc: "Immediate critical response & patient triage" },
    { name: "Diagnostic Laboratory & ECG", loc: "Ground Floor Diagnostic Wing", desc: "Fast & accurate medical reports" },
    { name: "Inpatient Bed Admissions & Nursing", loc: "Special & General Wards", desc: "Attentive & friendly nursing care 24x7" },
    { name: "Outpatient Doctor Consultations", loc: "Morning & Evening OPD", desc: "Experienced multi-speciality physicians" }
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
  }, 6000);
}

function resetPromoAutoplay() {
  if (promoInterval) clearInterval(promoInterval);
  startPromoAutoplay();
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

  // 1. Specialities
  if (currentSearchCategory === 'all' || currentSearchCategory === 'speciality') {
    const matchedSpecs = HOSPITAL_DATABASE.specialities.filter(s => 
      !q || s.name.toLowerCase().includes(q) || s.desc.toLowerCase().includes(q)
    );
    matchedSpecs.forEach(s => {
      resultsHtml += `
        <div class="search-result-item" onclick="selectSearchResult('speciality', '${s.name}', '')">
          <div>
            <div class="res-main-text"><i class="fa-solid fa-stethoscope text-red"></i> ${s.name}</div>
            <div class="res-sub-text">${s.desc}</div>
          </div>
          <span class="res-type-badge">Speciality</span>
        </div>
      `;
    });
  }

  // 2. Doctors
  if (currentSearchCategory === 'all' || currentSearchCategory === 'doctor') {
    const matchedDocs = HOSPITAL_DATABASE.doctors.filter(d => 
      !q || d.name.toLowerCase().includes(q) || d.spec.toLowerCase().includes(q)
    );
    matchedDocs.forEach(d => {
      resultsHtml += `
        <div class="search-result-item" onclick="selectSearchResult('doctor', '${d.name}', '${d.spec}')">
          <div>
            <div class="res-main-text"><i class="fa-solid fa-user-doctor text-navy"></i> ${d.name}</div>
            <div class="res-sub-text">${d.spec} | S.K Multi-Speciality Hospital</div>
          </div>
          <span class="res-type-badge">Doctor</span>
        </div>
      `;
    });
  }

  // 3. 24x7 Services
  if (currentSearchCategory === 'all' || currentSearchCategory === 'service') {
    const matchedServ = HOSPITAL_DATABASE.services.filter(srv => 
      !q || srv.name.toLowerCase().includes(q) || srv.desc.toLowerCase().includes(q)
    );
    matchedServ.forEach(srv => {
      resultsHtml += `
        <div class="search-result-item" onclick="selectSearchResult('service', '${srv.name}', '')">
          <div>
            <div class="res-main-text"><i class="fa-solid fa-truck-medical text-red"></i> ${srv.name}</div>
            <div class="res-sub-text">${srv.desc}</div>
          </div>
          <span class="res-type-badge">24x7 Service</span>
        </div>
      `;
    });
  }

  if (resultsHtml === '') {
    resultsHtml = `<div style="padding: 16px; text-align:center; color:#64748b; font-size:0.85rem;">No matching services found for "${query}". Try searching "Medicine", "Orthopaedics", "Emergency", or "Surgery".</div>`;
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
  } else if (type === 'service') {
    if (name.includes('Emergency')) {
      openEmergencyModal();
    } else {
      openBookingModal();
    }
  }
}

function executeSearch() {
  const query = document.getElementById('mainSearchInput')?.value || '';
  if (!query) {
    showToast('Please type a department or medical service', 'info');
    focusMainSearch();
    return;
  }
  showToast(`Searching for "${query}" at S.K Multi-Speciality Hospital...`, 'success');
  openBookingModal(query);
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
  showToast('Booking preventive health checkup package at S.K Hospital.', 'info');
}

function openTestBookingModal() {
  openModal('reportPortalModal');
  showToast('Access diagnostic lab records and blood test reports here.', 'info');
}

function openDoctorSearch(query = '') {
  openBookingModal();
  if (query) {
    showToast(`Filtering doctors for query: ${query}`, 'info');
  }
}

// Emergency Ambulance Simulator
function triggerAmbulanceSimulation() {
  const bar = document.getElementById('ambulanceStatusBar');
  const text = document.getElementById('ambulanceStatusText');
  if (!bar || !text) return;

  bar.style.display = 'flex';
  text.textContent = 'Connecting to S.K Hospital Emergency Triage Desk (077039 64716)...';

  setTimeout(() => {
    text.textContent = 'Area Tagged: Vikas Nagar / Hastsal / Uttam Nagar, West Delhi';
  }, 1200);

  setTimeout(() => {
    text.textContent = 'Emergency Team Alerted! Duty Medical Officer ready. Call 077039 64716 for live update.';
    showToast('🚨 Emergency Team Notified at S.K Multi-Speciality Hospital!', 'success');
  }, 2800);
}

// Medical Reports Lookup Simulator
function fetchSampleReports() {
  const uhidInput = document.getElementById('reportUHID');
  const val = uhidInput?.value.trim();
  if (!val) {
    showToast('Please enter your Mobile No. or Patient ID', 'error');
    return;
  }

  const resultsView = document.getElementById('reportsResultView');
  if (resultsView) {
    resultsView.style.display = 'block';
    showToast('Diagnostic lab report retrieved from S.K Hospital archive.', 'success');
  }
}

function downloadSampleReport(filename) {
  showToast(`Downloading verified lab report: ${filename}`, 'success');
  const element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(`--- S.K MULTI-SPECIALITY HOSPITAL 24X7 ---\nShiv Vihar Road, near Bikaner Sweets, Vikas Nagar, Uttam Nagar, Delhi – 110059\nPhone: 077039 64716\n-------------------------------------------------\nCONFIDENTIAL MEDICAL LAB REPORT\nPatient ID: SKH-1049\nStatus: Clinically Normal / Verified\nFacility: S.K Multi-Speciality Hospital Pathology Lab`));
  element.setAttribute('download', filename);
  element.style.display = 'none';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}

// Appointment Form Submission
function submitAppointment(e) {
  e.preventDefault();

  const hospital = "S.K Multi-Speciality Hospital (Shiv Vihar Road, Vikas Nagar)";
  const doctor = document.getElementById('modalDoctor')?.value || 'Senior Consultant';
  const date = document.getElementById('modalDate')?.value || '2026-09-17';
  const slot = document.getElementById('modalSlot')?.value || '11:00 AM - 01:00 PM';
  const patientName = document.getElementById('patientName')?.value || 'Patient';

  const randomRef = 'SKH-2026-' + Math.floor(1000 + Math.random() * 9000);

  // Update success ticket
  document.getElementById('confirmedAppId').textContent = randomRef;
  document.getElementById('confPatientName').textContent = patientName;
  document.getElementById('confDoctor').textContent = doctor;
  document.getElementById('confHospital').textContent = hospital;
  document.getElementById('confDateTime').textContent = `${date} at ${slot}`;

  // Swap view
  document.getElementById('bookingStep1').style.display = 'none';
  document.getElementById('bookingSuccessView').style.display = 'block';

  showToast(`🎉 Appointment booked for ${patientName}! Ref: ${randomRef}`, 'success');
}

function printAppointmentTicket() {
  window.print();
}

// Callback Form Submission
function submitCallback(e) {
  e.preventDefault();
  const name = document.getElementById('cbName')?.value;
  closeModal('callbackModal');
  showToast(`Thank you, ${name}! S.K Hospital staff will call you on 077039 64716 shortly.`, 'success');
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
  
  const q = query.toLowerCase();
  if (q.includes('timings') || q.includes('hour') || q.includes('emergency') || q.includes('24')) {
    toggleAccordion('acc-about');
  } else if (q.includes('where') || q.includes('location') || q.includes('address') || q.includes('road')) {
    toggleAccordion('acc-services');
  } else if (q.includes('book') || q.includes('appointment') || q.includes('doctor') || q.includes('phone')) {
    toggleAccordion('acc-compliance');
  } else {
    toggleAccordion('acc-outcomes');
  }

  showToast(`Found hospital details for: "${query}"`, 'success');
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

function filterSpeciality(specName) {
  openBookingModal(specName);
}

function scrollToSection(sectionId) {
  const el = document.getElementById(sectionId);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' });
  }
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
