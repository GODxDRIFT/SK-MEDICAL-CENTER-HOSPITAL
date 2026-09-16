/* ==========================================================================
   S.K MULTI-SPECIALITY HOSPITAL 24×7 - JAVASCRIPT INTERACTIONS
   ========================================================================== */

// Database for Search and Data Filters
const HOSPITAL_DATABASE = {
  doctors: [
    { name: "Senior Consultant - General Medicine", spec: "General Medicine", role: "MD (Medicine)", hospital: "S.K Multi-Speciality Hospital", exp: "15+ Years", opd: "09:00 AM - 01:00 PM & 05:00 PM - 09:00 PM", icon: "fa-user-doctor", tags: "fever diabetes hypertension bp infection cough chest pain health checkup sugar physician doctor dr" },
    { name: "Consultant General & Laparoscopic Surgeon", spec: "General Surgery", role: "MS (General Surgery), FMAS", hospital: "S.K Multi-Speciality Hospital", exp: "14+ Years", opd: "10:00 AM - 02:00 PM & On-Call 24x7", icon: "fa-scalpel", tags: "surgery laparoscopic appendix gallbladder stone hernia piles fissure hydrocele trauma surgeon operation" },
    { name: "Consultant Orthopaedic Surgeon", spec: "Orthopaedics", role: "MS (Ortho), DNB (Ortho)", hospital: "S.K Multi-Speciality Hospital", exp: "12+ Years", opd: "11:00 AM - 03:00 PM & 06:00 PM - 08:30 PM", icon: "fa-bone", tags: "ortho orthopaedics fracture plaster bone joint pain arthritis knee back pain accident spine trauma" },
    { name: "Consultant Gynaecologist & Obstetrician", spec: "Gynaecology", role: "MD, DGO (Obstetrics & Gynae)", hospital: "S.K Multi-Speciality Hospital", exp: "16+ Years", opd: "10:00 AM - 01:30 PM & 05:30 PM - 08:30 PM", icon: "fa-person-pregnant", tags: "gynae gynaecologist pregnancy normal delivery c-section pcod period female women maternity newborn antenatal" },
    { name: "Senior Paediatrician & Child Specialist", spec: "Paediatrics", role: "MD (Paediatrics), DCH", hospital: "S.K Multi-Speciality Hospital", exp: "10+ Years", opd: "09:30 AM - 01:00 PM & 06:00 PM - 09:00 PM", icon: "fa-baby", tags: "child paediatric baby newborn infant vaccination child fever growth cold cough children kids" },
    { name: "Duty Medical Officer (24x7 Emergency)", spec: "Emergency Care", role: "MBBS, Casualty Medical Officer", hospital: "S.K Multi-Speciality Hospital", exp: "24x7 Ready", opd: "24 Hours Daily Walk-in & Casualty", icon: "fa-truck-medical", tags: "emergency 24x7 icu trauma accident chest pain breathing difficulty oxygen dmo casualty casualty walk-in" }
  ],
  specialities: [
    { name: "General & Internal Medicine", dept: "General Medicine", desc: "Treatment of viral fever, dengue, diabetes, hypertension, asthma, infectious diseases & preventive checks.", icon: "fa-stethoscope", tags: "medicine viral fever dengue malaria diabetes thyroid bp asthama cough allergy" },
    { name: "General & Laparoscopic Surgery", dept: "General Surgery", desc: "Modern laser & minimal access keyhole surgery for appendix, gallstones, hernia, piles & cyst removal.", icon: "fa-scissors", tags: "laparoscopy appendix gall bladder stone hernia piles fissure operation" },
    { name: "Orthopaedics & Trauma Care", dept: "Orthopaedics", desc: "24-hour fracture plaster, joint pain management, accident trauma, arthritis & spine care.", icon: "fa-bone", tags: "ortho fracture bone joint arthritis knee dislocation accident trauma" },
    { name: "Gynaecology & Obstetrics", dept: "Gynaecology", desc: "Comprehensive maternity care, painless normal delivery, cesarean delivery, PCOD & women wellness.", icon: "fa-person-pregnant", tags: "delivery pregnancy normal cesarean women maternity uterus pcod gynae" },
    { name: "Paediatrics & Neonatal Care", dept: "Paediatrics", desc: "Compassionate child healthcare, government & optional vaccinations, newborn phototherapy & care.", icon: "fa-baby", tags: "child paediatric baby newborn vaccination infant child disease" },
    { name: "24x7 Intensive Care (ICU / NICU)", dept: "Emergency Care", desc: "Multipara monitors, ventilators, centralized oxygen line, defibrillators & bedside emergency care.", icon: "fa-heart-pulse", tags: "icu nicu ventilator critical oxygen cardiac stroke serious admission bed" },
    { name: "Pathology & Diagnostic Laboratory", dept: "General Medicine", desc: "Automated CBC, Lipid Profile, LFT, KFT, Thyroid, Blood Sugar, Urine & 12-Lead ECG testing.", icon: "fa-microscope", tags: "lab blood test cbc pathology ecg diagnostic lft kft sugar urine" },
    { name: "Insurance, Ayushman & TPA Desk", dept: "General Medicine", desc: "Cashless hospitalization assistance for major TPAs and guidance on Ayushman Bharat PM-JAY scheme.", icon: "fa-shield-halved", tags: "insurance ayushman pmjay cashless tpa claim star health mediclaim bill" }
  ],
  services: [
    { name: "24x7 Emergency & Trauma Casualty", actionType: "emergency", desc: "Immediate doctor & nursing response, oxygen cylinder backup, emergency drip & trauma management.", icon: "fa-truck-medical", tags: "emergency casualty trauma 24 hours ambulance oxygen" },
    { name: "Inpatient Bed Admission (35+ Beds)", actionType: "booking", desc: "Deluxe, Semi-Private, General Wards & ICU beds with 24-hour nursing care & food service.", icon: "fa-bed-pulse", tags: "beds admission ward room stay deluxe general private ipd" },
    { name: "Diagnostic Lab & Blood Testing", actionType: "portal", desc: "Fast sample collection with same-day printed & digital medical report generation.", icon: "fa-flask-vial", tags: "test blood test sample report pathology lab" },
    { name: "24-Hour In-House Pharmacy", actionType: "booking", desc: "100% authentic medicines, surgical consumables, IV fluids and emergency injections in hospital premises.", icon: "fa-prescription-bottle-medical", tags: "pharmacy medicine medical store dawai drip injection" }
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
      if (dropdown) dropdown.classList.remove('active');
    }
  });
});

// Mobile Drawer Menu Toggle
function toggleMobileMenu() {
  const drawer = document.getElementById('mobileDrawer');
  let overlay = document.getElementById('mobileDrawerOverlay');
  
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.id = 'mobileDrawerOverlay';
    overlay.className = 'mobile-drawer-overlay';
    overlay.onclick = toggleMobileMenu;
    document.body.appendChild(overlay);
  }

  if (drawer) {
    drawer.classList.toggle('open');
    if (drawer.classList.contains('open')) {
      overlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    } else {
      overlay.classList.remove('active');
      document.body.style.overflow = '';
    }
  }
}

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
// SEARCH & AUTOCOMPLETE ENGINE (Interactive & Fast)
// ==========================================================================
function initSearchAutocomplete() {
  renderSearchResults('');
}

function handleSearchInput(query) {
  const clearBtn = document.getElementById('clearSearchBtn');
  if (clearBtn) {
    clearBtn.style.display = query.length > 0 ? 'flex' : 'none';
  }
  showSearchSuggestions();
  renderSearchResults(query.trim());
}

function clearSearch() {
  const input = document.getElementById('mainSearchInput');
  const clearBtn = document.getElementById('clearSearchBtn');
  if (input) {
    input.value = '';
    if (clearBtn) clearBtn.style.display = 'none';
    renderSearchResults('');
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

function quickSearchTag(tag) {
  const input = document.getElementById('mainSearchInput');
  if (input) {
    input.value = tag;
    handleSearchInput(tag);
    input.focus();
  }
}

function filterSearchCategory(category) {
  currentSearchCategory = category;
  const pills = document.querySelectorAll('.cat-pill');
  pills.forEach(pill => {
    pill.classList.toggle('active', pill.textContent.toLowerCase().includes(category) || (category === 'all' && pill.textContent === 'All'));
  });

  const query = document.getElementById('mainSearchInput')?.value || '';
  renderSearchResults(query.trim());
}

function renderSearchResults(query) {
  const listContainer = document.getElementById('searchResultsList');
  if (!listContainer) return;

  const q = query.toLowerCase();
  let resultsHtml = '';
  let matchCount = 0;

  // 1. Doctors
  if (currentSearchCategory === 'all' || currentSearchCategory === 'doctor') {
    const matchedDocs = HOSPITAL_DATABASE.doctors.filter(d => 
      !q || d.name.toLowerCase().includes(q) || d.spec.toLowerCase().includes(q) || d.tags.toLowerCase().includes(q)
    );
    matchedDocs.forEach(d => {
      matchCount++;
      resultsHtml += `
        <div class="search-result-item" onclick="selectSearchResult('doctor', '${d.name}', '${d.spec}')">
          <div class="search-item-info">
            <div class="search-item-icon icon-navy"><i class="fa-solid ${d.icon}"></i></div>
            <div class="search-item-text">
              <div class="res-main-text">${d.name}</div>
              <div class="res-sub-text">${d.role} • ${d.spec} (${d.exp})</div>
            </div>
          </div>
          <div class="search-item-action">
            <span class="res-type-badge">Doctor</span>
            <button class="search-quick-book-btn"><i class="fa-regular fa-calendar-check"></i> Book</button>
          </div>
        </div>
      `;
    });
  }

  // 2. Specialities
  if (currentSearchCategory === 'all' || currentSearchCategory === 'speciality') {
    const matchedSpecs = HOSPITAL_DATABASE.specialities.filter(s => 
      !q || s.name.toLowerCase().includes(q) || s.dept.toLowerCase().includes(q) || s.desc.toLowerCase().includes(q) || s.tags.toLowerCase().includes(q)
    );
    matchedSpecs.forEach(s => {
      matchCount++;
      resultsHtml += `
        <div class="search-result-item" onclick="selectSearchResult('speciality', '${s.dept}', '${s.name}')">
          <div class="search-item-info">
            <div class="search-item-icon"><i class="fa-solid ${s.icon}"></i></div>
            <div class="search-item-text">
              <div class="res-main-text">${s.name}</div>
              <div class="res-sub-text">${s.desc}</div>
            </div>
          </div>
          <div class="search-item-action">
            <span class="res-type-badge">Speciality</span>
            <button class="search-quick-book-btn"><i class="fa-solid fa-arrow-right"></i> Consult</button>
          </div>
        </div>
      `;
    });
  }

  // 3. 24x7 Services
  if (currentSearchCategory === 'all' || currentSearchCategory === 'service') {
    const matchedServ = HOSPITAL_DATABASE.services.filter(srv => 
      !q || srv.name.toLowerCase().includes(q) || srv.desc.toLowerCase().includes(q) || srv.tags.toLowerCase().includes(q)
    );
    matchedServ.forEach(srv => {
      matchCount++;
      const isEm = srv.actionType === 'emergency';
      resultsHtml += `
        <div class="search-result-item" onclick="selectSearchResult('${srv.actionType}', '${srv.name}', '')">
          <div class="search-item-info">
            <div class="search-item-icon ${isEm ? 'icon-red' : ''}"><i class="fa-solid ${srv.icon}"></i></div>
            <div class="search-item-text">
              <div class="res-main-text">${srv.name}</div>
              <div class="res-sub-text">${srv.desc}</div>
            </div>
          </div>
          <div class="search-item-action">
            <span class="res-type-badge">${isEm ? 'Emergency' : '24x7 Service'}</span>
            <button class="search-quick-book-btn" style="${isEm ? 'background:#e11d48;' : ''}">
              <i class="fa-solid ${isEm ? 'fa-phone-volume' : 'fa-circle-chevron-right'}"></i> ${isEm ? 'Emergency' : 'Access'}
            </button>
          </div>
        </div>
      `;
    });
  }

  if (matchCount === 0) {
    resultsHtml = `
      <div style="padding: 20px; text-align:center; color:#64748b; font-size:0.88rem;">
        <i class="fa-solid fa-magnifying-glass" style="font-size:1.4rem; color:#94a3b8; margin-bottom:8px; display:block;"></i>
        No exact service matched for "<strong>${query}</strong>".<br>
        <button class="btn btn-sm btn-primary" style="margin-top:10px;" onclick="openBookingModal('${query}')">
          <i class="fa-regular fa-calendar-check"></i> Book Doctor for "${query}"
        </button>
      </div>
    `;
  }

  listContainer.innerHTML = resultsHtml;
}

function selectSearchResult(type, name, sub) {
  const dropdown = document.getElementById('searchResultsDropdown');
  if (dropdown) dropdown.classList.remove('active');

  if (type === 'doctor') {
    openBookingModal(sub || '', name);
    showToast(`Selected Dr: ${name} (${sub})`, 'success');
  } else if (type === 'speciality') {
    openBookingModal(name);
    showToast(`Department Selected: ${name}`, 'success');
  } else if (type === 'emergency') {
    openEmergencyModal();
  } else if (type === 'portal') {
    openTestBookingModal();
  } else {
    openBookingModal(name);
  }
}

function executeSearch() {
  const query = document.getElementById('mainSearchInput')?.value.trim() || '';
  const dropdown = document.getElementById('searchResultsDropdown');
  
  if (!query) {
    showToast('Please type a doctor name, ailment or department to search', 'info');
    focusMainSearch();
    return;
  }

  // Find top matching doctor or speciality
  const q = query.toLowerCase();
  const matchedDoc = HOSPITAL_DATABASE.doctors.find(d => 
    d.name.toLowerCase().includes(q) || d.spec.toLowerCase().includes(q) || d.tags.toLowerCase().includes(q)
  );

  const matchedSpec = HOSPITAL_DATABASE.specialities.find(s => 
    s.name.toLowerCase().includes(q) || s.dept.toLowerCase().includes(q) || s.tags.toLowerCase().includes(q)
  );

  const matchedServ = HOSPITAL_DATABASE.services.find(srv => 
    srv.name.toLowerCase().includes(q) || srv.tags.toLowerCase().includes(q)
  );

  if (dropdown) dropdown.classList.remove('active');

  if (matchedDoc) {
    openBookingModal(matchedDoc.spec, matchedDoc.name);
    showToast(`Found Doctor: ${matchedDoc.name} (${matchedDoc.spec})`, 'success');
  } else if (matchedSpec) {
    openBookingModal(matchedSpec.dept);
    showToast(`Found Department: ${matchedSpec.name}`, 'success');
  } else if (matchedServ) {
    if (matchedServ.actionType === 'emergency') openEmergencyModal();
    else if (matchedServ.actionType === 'portal') openTestBookingModal();
    else openBookingModal();
    showToast(`Found Service: ${matchedServ.name}`, 'success');
  } else {
    openBookingModal(query);
    showToast(`Searching appointment for "${query}" at S.K Hospital...`, 'info');
  }
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

// Doctor & Speciality Auto-Filter Mapping
function filterDoctorsBySpeciality(specialityValue) {
  const docSelect = document.getElementById('modalDoctor');
  if (!docSelect || !specialityValue) return;

  const val = specialityValue.toLowerCase();
  for (let i = 0; i < docSelect.options.length; i++) {
    const optText = docSelect.options[i].text.toLowerCase();
    const optVal = docSelect.options[i].value.toLowerCase();
    
    if (val.includes('medicine') && (optText.includes('medicine') || optVal.includes('medicine'))) {
      docSelect.selectedIndex = i;
      break;
    } else if (val.includes('surgery') && (optText.includes('surgery') || optVal.includes('surgery') || optText.includes('surgeon'))) {
      docSelect.selectedIndex = i;
      break;
    } else if ((val.includes('ortho') || val.includes('joint') || val.includes('bone')) && (optText.includes('ortho') || optVal.includes('ortho'))) {
      docSelect.selectedIndex = i;
      break;
    } else if ((val.includes('gynae') || val.includes('women') || val.includes('maternity')) && (optText.includes('gynae') || optVal.includes('gynae'))) {
      docSelect.selectedIndex = i;
      break;
    } else if ((val.includes('paed') || val.includes('child') || val.includes('baby')) && (optText.includes('paed') || optVal.includes('paed'))) {
      docSelect.selectedIndex = i;
      break;
    } else if (val.includes('emergency') || val.includes('cardio') || val.includes('critical')) {
      if (optText.includes('emergency') || optVal.includes('emergency') || optText.includes('duty')) {
        docSelect.selectedIndex = i;
        break;
      }
    }
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

  // Handle doctor parameter passed as first argument
  if (speciality && (speciality.includes('Dr.') || speciality.includes('Doctor') || speciality.includes('Dr '))) {
    doctor = speciality;
    if (doctor.toLowerCase().includes('medicine')) speciality = 'General Medicine';
    else if (doctor.toLowerCase().includes('gynaecology') || doctor.toLowerCase().includes('gynae')) speciality = 'Gynaecology';
    else if (doctor.toLowerCase().includes('ortho')) speciality = 'Orthopaedics';
    else if (doctor.toLowerCase().includes('surgery') || doctor.toLowerCase().includes('surgeon')) speciality = 'General Surgery';
    else if (doctor.toLowerCase().includes('paed')) speciality = 'Paediatrics';
    else speciality = '';
  }

  if (speciality) {
    const specSelect = document.getElementById('modalSpeciality');
    if (specSelect) {
      for (let i = 0; i < specSelect.options.length; i++) {
        if (specSelect.options[i].text.toLowerCase().includes(speciality.toLowerCase()) || 
            specSelect.options[i].value.toLowerCase().includes(speciality.toLowerCase())) {
          specSelect.selectedIndex = i;
          filterDoctorsBySpeciality(specSelect.options[i].value);
          break;
        }
      }
    }
  }

  if (doctor) {
    const docSelect = document.getElementById('modalDoctor');
    if (docSelect) {
      for (let i = 0; i < docSelect.options.length; i++) {
        const optText = docSelect.options[i].text.toLowerCase();
        const d = doctor.toLowerCase();
        if ((d.includes('medicine') && optText.includes('medicine')) ||
            (d.includes('gynae') && optText.includes('gynae')) ||
            (d.includes('ortho') && optText.includes('ortho')) ||
            (d.includes('surgery') && optText.includes('surgeon')) ||
            (d.includes('paed') && optText.includes('paediatrician'))) {
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

// Contact Page Message Form Submission
function submitContactMessage(e) {
  e.preventDefault();
  const name = document.getElementById('contactName')?.value || 'Patient';
  const phone = document.getElementById('contactPhone')?.value || '';
  const message = document.getElementById('contactMessage')?.value || '';
  
  // Reset form
  const form = document.getElementById('mainContactForm');
  if (form) form.reset();

  showToast(`Thank you ${name}! Your inquiry has been received. Our team will contact you at ${phone}.`, 'success');
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

// ==========================================================================
// DOCTOR FILTER ON DOCTORS.HTML
// ==========================================================================
function filterDoctorCards(category, clickedBtn) {
  const tabs = document.querySelectorAll('.doc-tab-btn');
  tabs.forEach(t => t.classList.remove('active'));
  if (clickedBtn) clickedBtn.classList.add('active');

  const cards = document.querySelectorAll('.doctor-profile-card');
  cards.forEach(card => {
    const dept = card.getAttribute('data-dept');
    if (category === 'all' || dept === category) {
      card.style.display = 'flex';
    } else {
      card.style.display = 'none';
    }
  });
}

