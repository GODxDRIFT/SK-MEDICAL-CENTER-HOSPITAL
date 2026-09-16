/* ==========================================================================
   S.K MULTI-SPECIALITY HOSPITAL 24×7 - JAVASCRIPT INTERACTIONS
   ========================================================================== */

// Database for Search and Data Filters
const HOSPITAL_DATABASE = {
  doctors: [
    { name: "Dr. S. K. Sharma", spec: "General Medicine", role: "MD (Internal Medicine)", hospital: "S.K Multi-Speciality Hospital", exp: "18+ Years", opd: "09:00 AM - 01:00 PM & 05:00 PM - 09:00 PM", icon: "fa-user-doctor", link: "doctors.html?dept=medicine", tags: "fever dengue diabetes hypertension bp infection cough chest pain health checkup sugar physician doctor dr sharma internal medicine general" },
    { name: "Consultant General & Laparoscopic Surgeon", spec: "General Surgery", role: "MS (General Surgery), FMAS", hospital: "S.K Multi-Speciality Hospital", exp: "14+ Years", opd: "10:00 AM - 02:00 PM & On-Call 24x7", icon: "fa-scalpel", link: "doctors.html?dept=surgery", tags: "surgery laparoscopic appendix gallbladder stone hernia piles fissure hydrocele trauma surgeon operation keyhole laser" },
    { name: "Consultant Orthopaedic Surgeon", spec: "Orthopaedics", role: "MS (Ortho), DNB (Ortho)", hospital: "S.K Multi-Speciality Hospital", exp: "12+ Years", opd: "11:00 AM - 03:00 PM & 06:00 PM - 08:30 PM", icon: "fa-bone", link: "doctors.html?dept=ortho", tags: "ortho orthopaedics fracture plaster bone joint pain arthritis knee back pain accident spine trauma dislocation" },
    { name: "Consultant Gynaecologist & Obstetrician", spec: "Gynaecology", role: "MD, DGO (Obstetrics & Gynae)", hospital: "S.K Multi-Speciality Hospital", exp: "16+ Years", opd: "10:00 AM - 01:30 PM & 05:30 PM - 08:30 PM", icon: "fa-person-pregnant", link: "doctors.html?dept=gynae", tags: "gynae gynaecologist pregnancy normal delivery c-section pcod period female women maternity newborn antenatal lady doctor" },
    { name: "Senior Paediatrician & Child Specialist", spec: "Paediatrics", role: "MD (Paediatrics), DCH", hospital: "S.K Multi-Speciality Hospital", exp: "10+ Years", opd: "09:30 AM - 01:00 PM & 06:00 PM - 09:00 PM", icon: "fa-baby", link: "doctors.html?dept=paediatrics", tags: "child paediatric baby newborn infant vaccination child fever growth cold cough children kids bacha" },
    { name: "Duty Medical Officer (24x7 Emergency)", spec: "Emergency Care", role: "MBBS, Casualty Medical Officer", hospital: "S.K Multi-Speciality Hospital", exp: "24x7 Active", opd: "24 Hours Daily Walk-in & Casualty", icon: "fa-truck-medical", link: "doctors.html?dept=emergency", tags: "emergency 24x7 icu trauma accident chest pain breathing difficulty oxygen dmo casualty casualty walk-in" }
  ],
  specialities: [
    { name: "General & Internal Medicine", dept: "General Medicine", desc: "Treatment of viral fever, dengue, diabetes, hypertension, infectious diseases & preventive checks.", icon: "fa-stethoscope", link: "departments.html#dept-medicine", tags: "medicine viral fever dengue malaria diabetes thyroid bp asthama cough allergy" },
    { name: "General & Laparoscopic Surgery", dept: "General Surgery", desc: "Minimal access laser & keyhole surgery for appendix, gallstones, hernia, piles & cyst removal.", icon: "fa-scissors", link: "departments.html#dept-surgery", tags: "laparoscopy appendix gall bladder stone hernia piles fissure operation laser" },
    { name: "Orthopaedics & Joint Care", dept: "Orthopaedics", desc: "24-hour fracture plaster, joint pain management, accident trauma, arthritis & spine care.", icon: "fa-bone", link: "departments.html#dept-ortho", tags: "ortho fracture bone joint arthritis knee dislocation accident trauma plaster" },
    { name: "Gynaecology & Maternity", dept: "Gynaecology", desc: "Comprehensive maternity care, painless normal delivery, cesarean delivery, PCOD & women wellness.", icon: "fa-person-pregnant", link: "departments.html#dept-gynae", tags: "delivery pregnancy normal cesarean women maternity uterus pcod gynae" },
    { name: "Paediatrics & Neonatal Care", dept: "Paediatrics", desc: "Compassionate child healthcare, government & optional vaccinations, newborn phototherapy & care.", icon: "fa-baby", link: "departments.html#dept-paediatrics", tags: "child paediatric baby newborn vaccination infant child disease kids" },
    { name: "24x7 Intensive Care (ICU / HDU)", dept: "Emergency Care", desc: "Multipara monitors, ventilators, centralized oxygen line, defibrillators & bedside emergency care.", icon: "fa-heart-pulse", link: "facilities.html#icu", tags: "icu nicu ventilator critical oxygen cardiac stroke serious admission bed" },
    { name: "Pathology & Diagnostic Laboratory", dept: "General Medicine", desc: "Automated CBC, Lipid Profile, LFT, KFT, Thyroid, Blood Sugar, Urine & 12-Lead ECG testing.", icon: "fa-microscope", link: "facilities.html#lab", tags: "lab blood test cbc pathology ecg diagnostic lft kft sugar urine" },
    { name: "Insurance, Ayushman & TPA Desk", dept: "General Medicine", desc: "Cashless hospitalization assistance for major TPAs and guidance on Ayushman Bharat PM-JAY scheme.", icon: "fa-shield-halved", link: "insurance-packages.html", tags: "insurance ayushman pmjay cashless tpa claim star health mediclaim bill cghs" }
  ],
  blogs: [
    { name: "Understanding Viral Fever & Dengue Prevention", desc: "When to visit OPD vs 24x7 Emergency, platelet counts & hydration guide.", icon: "fa-virus-covid", link: "blog-fever-dengue-prevention.html", tags: "dengue viral fever platelet blood test cbc temperature monsoon cold flu infection" },
    { name: "Normal Delivery vs C-Section Maternity Guide", desc: "Trimester antenatal care, safe normal delivery preparation & nutrition.", icon: "fa-person-pregnant", link: "blog-normal-delivery-maternity-guide.html", tags: "normal delivery c-section pregnancy maternity baby birth labour nutrition antenatal" },
    { name: "Managing Knee Pain, Arthritis & Bone Health", desc: "Early signs, joint mobility exercises, calcium intake & orthopaedic care.", icon: "fa-bone", link: "blog-joint-pain-arthritis-ortho.html", tags: "knee pain arthritis ortho joint bone calcium stiffness fracture ligament" },
    { name: "Why Laparoscopic Surgery is Safer & Faster", desc: "Keyhole laser surgery for gallstones, appendix & hernia with fast healing.", icon: "fa-scalpel", link: "blog-laparoscopic-surgery-benefits.html", tags: "laparoscopic surgery keyhole laser gallstone appendix hernia minimal scar pain" },
    { name: "Ayushman Bharat PM-JAY & Cashless TPA Claims", desc: "Step-by-step documentation checklist and emergency cashless admission workflow.", icon: "fa-shield-halved", link: "blog-ayushman-pmjay-cashless-hospital.html", tags: "ayushman pmjay cashless insurance tpa claim star health mediclaim card" },
    { name: "Complete Child Vaccination Chart (0 to 5 Years)", desc: "Infant immunization schedule, essential newborn milestones & paediatric tips.", icon: "fa-syringe", link: "blog-child-vaccination-schedule.html", tags: "vaccination vaccine child baby infant immunization polio mmr hepatitis tetanus" }
  ],
  services: [
    { name: "24x7 Emergency & Trauma Casualty", actionType: "emergency", desc: "Immediate doctor & nursing response, oxygen cylinder backup, emergency drip & trauma care.", icon: "fa-truck-medical", link: "contact.html#emergency", tags: "emergency casualty trauma 24 hours ambulance oxygen accident urgent" },
    { name: "Inpatient Bed Admission (35+ Beds)", actionType: "booking", desc: "Deluxe, Semi-Private, General Wards & ICU beds with 24-hour nursing care & food service.", icon: "fa-bed-pulse", link: "facilities.html#rooms", tags: "beds admission ward room stay deluxe general private ipd admit" },
    { name: "Diagnostic Lab & Blood Testing", actionType: "portal", desc: "Fast sample collection with same-day printed & digital medical report generation.", icon: "fa-flask-vial", link: "facilities.html#lab", tags: "test blood test sample report pathology lab cbc" },
    { name: "24-Hour In-House Pharmacy", actionType: "booking", desc: "100% authentic medicines, surgical consumables, IV fluids and emergency injections.", icon: "fa-prescription-bottle-medical", link: "facilities.html#pharmacy", tags: "pharmacy medicine medical store dawai drip injection" }
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
  handleUrlSearchFilter();

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
// SEARCH & AUTOCOMPLETE ENGINE (Interactive, High-Contrast & Accurate)
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
    const text = pill.textContent.toLowerCase();
    pill.classList.toggle('active', 
      (category === 'all' && text === 'all') ||
      (category === 'doctor' && text.includes('doctor')) ||
      (category === 'speciality' && text.includes('specialit')) ||
      (category === 'service' && text.includes('service')) ||
      (category === 'blog' && text.includes('blog'))
    );
  });

  const query = document.getElementById('mainSearchInput')?.value || '';
  renderSearchResults(query.trim());
}

function highlightSearchMatch(text, query) {
  if (!query || !text) return text;
  const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(`(${escaped})`, 'gi');
  return text.replace(regex, '<mark>$1</mark>');
}

function navigateSearchResult(link) {
  const dropdown = document.getElementById('searchResultsDropdown');
  if (dropdown) dropdown.classList.remove('active');
  window.location.href = link;
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
      const titleHighlighted = highlightSearchMatch(d.name, query);
      const subHighlighted = highlightSearchMatch(`${d.role} • ${d.spec} (${d.exp})`, query);
      resultsHtml += `
        <div class="search-result-item" onclick="navigateSearchResult('${d.link}')">
          <div class="search-item-info">
            <div class="search-item-icon icon-navy"><i class="fa-solid ${d.icon}"></i></div>
            <div class="search-item-text">
              <div class="res-main-text">${titleHighlighted}</div>
              <div class="res-sub-text">${subHighlighted}</div>
            </div>
          </div>
          <div class="search-item-action">
            <span class="res-type-badge">Doctor</span>
            <button class="search-quick-book-btn" onclick="event.stopPropagation(); openBookingModal('${d.spec}', '${d.name}');" title="Book appointment with ${d.name}"><i class="fa-regular fa-calendar-check"></i> Book</button>
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
      const titleHighlighted = highlightSearchMatch(s.name, query);
      const subHighlighted = highlightSearchMatch(s.desc, query);
      resultsHtml += `
        <div class="search-result-item" onclick="navigateSearchResult('${s.link}')">
          <div class="search-item-info">
            <div class="search-item-icon"><i class="fa-solid ${s.icon}"></i></div>
            <div class="search-item-text">
              <div class="res-main-text">${titleHighlighted}</div>
              <div class="res-sub-text">${subHighlighted}</div>
            </div>
          </div>
          <div class="search-item-action">
            <span class="res-type-badge">Speciality</span>
            <button class="search-quick-book-btn" onclick="event.stopPropagation(); openBookingModal('${s.dept}');"><i class="fa-solid fa-arrow-right"></i> View</button>
          </div>
        </div>
      `;
    });
  }

  // 3. Health Blogs & Articles
  if (currentSearchCategory === 'all' || currentSearchCategory === 'blog') {
    const matchedBlogs = HOSPITAL_DATABASE.blogs.filter(b => 
      !q || b.name.toLowerCase().includes(q) || b.desc.toLowerCase().includes(q) || b.tags.toLowerCase().includes(q)
    );
    matchedBlogs.forEach(b => {
      matchCount++;
      const titleHighlighted = highlightSearchMatch(b.name, query);
      const subHighlighted = highlightSearchMatch(b.desc, query);
      resultsHtml += `
        <div class="search-result-item" onclick="navigateSearchResult('${b.link}')">
          <div class="search-item-info">
            <div class="search-item-icon icon-purple"><i class="fa-solid ${b.icon}"></i></div>
            <div class="search-item-text">
              <div class="res-main-text">${titleHighlighted}</div>
              <div class="res-sub-text">${subHighlighted}</div>
            </div>
          </div>
          <div class="search-item-action">
            <span class="res-type-badge" style="background:#f3e8ff; color:#7e22ce;">Health Blog</span>
            <button class="search-quick-book-btn" style="background:#7c3aed;" onclick="event.stopPropagation(); navigateSearchResult('${b.link}');"><i class="fa-solid fa-book-open"></i> Read</button>
          </div>
        </div>
      `;
    });
  }

  // 4. 24x7 Services & Facilities
  if (currentSearchCategory === 'all' || currentSearchCategory === 'service') {
    const matchedServ = HOSPITAL_DATABASE.services.filter(srv => 
      !q || srv.name.toLowerCase().includes(q) || srv.desc.toLowerCase().includes(q) || srv.tags.toLowerCase().includes(q)
    );
    matchedServ.forEach(srv => {
      matchCount++;
      const isEm = srv.actionType === 'emergency';
      const titleHighlighted = highlightSearchMatch(srv.name, query);
      const subHighlighted = highlightSearchMatch(srv.desc, query);
      resultsHtml += `
        <div class="search-result-item" onclick="navigateSearchResult('${srv.link}')">
          <div class="search-item-info">
            <div class="search-item-icon ${isEm ? 'icon-red' : 'icon-amber'}"><i class="fa-solid ${srv.icon}"></i></div>
            <div class="search-item-text">
              <div class="res-main-text">${titleHighlighted}</div>
              <div class="res-sub-text">${subHighlighted}</div>
            </div>
          </div>
          <div class="search-item-action">
            <span class="res-type-badge">${isEm ? 'Emergency' : '24x7 Service'}</span>
            <button class="search-quick-book-btn" style="${isEm ? 'background:#e11d48;' : ''}" onclick="event.stopPropagation(); navigateSearchResult('${srv.link}');">
              <i class="fa-solid ${isEm ? 'fa-phone-volume' : 'fa-circle-chevron-right'}"></i> ${isEm ? '24x7' : 'View'}
            </button>
          </div>
        </div>
      `;
    });
  }

  if (matchCount === 0) {
    resultsHtml = `
      <div style="padding: 24px 16px; text-align:center; color:#64748b; font-size:0.88rem;">
        <i class="fa-solid fa-magnifying-glass" style="font-size:1.6rem; color:#94a3b8; margin-bottom:8px; display:block;"></i>
        No exact direct match for "<strong>${query}</strong>".<br>
        <div style="margin-top:12px; display:flex; gap:8px; justify-content:center; flex-wrap:wrap;">
          <a href="doctors.html" class="btn btn-sm btn-primary">
            <i class="fa-solid fa-user-doctor"></i> View All Doctors
          </a>
          <a href="departments.html" class="btn btn-sm btn-outline">
            <i class="fa-solid fa-stethoscope"></i> All Specialities
          </a>
        </div>
      </div>
    `;
  }

  listContainer.innerHTML = resultsHtml;
}

// Keydown Enter / Search Icon Trigger: Pure search navigation (NO POPUP)
function executeSearch() {
  const query = document.getElementById('mainSearchInput')?.value.trim() || '';
  const dropdown = document.getElementById('searchResultsDropdown');
  
  if (!query) {
    showToast('Please type a doctor, ailment or department to search', 'info');
    focusMainSearch();
    return;
  }

  const q = query.toLowerCase();

  // 1. Find matched doctor
  const matchedDoc = HOSPITAL_DATABASE.doctors.find(d => 
    d.name.toLowerCase().includes(q) || d.spec.toLowerCase().includes(q) || d.tags.toLowerCase().includes(q)
  );

  // 2. Find matched speciality
  const matchedSpec = HOSPITAL_DATABASE.specialities.find(s => 
    s.name.toLowerCase().includes(q) || s.dept.toLowerCase().includes(q) || s.tags.toLowerCase().includes(q)
  );

  // 3. Find matched blog
  const matchedBlog = HOSPITAL_DATABASE.blogs.find(b => 
    b.name.toLowerCase().includes(q) || b.tags.toLowerCase().includes(q)
  );

  // 4. Find matched service
  const matchedServ = HOSPITAL_DATABASE.services.find(srv => 
    srv.name.toLowerCase().includes(q) || srv.tags.toLowerCase().includes(q)
  );

  if (dropdown) dropdown.classList.remove('active');

  if (matchedDoc) {
    window.location.href = matchedDoc.link;
  } else if (matchedSpec) {
    window.location.href = matchedSpec.link;
  } else if (matchedBlog) {
    window.location.href = matchedBlog.link;
  } else if (matchedServ) {
    window.location.href = matchedServ.link;
  } else {
    window.location.href = `doctors.html?search=${encodeURIComponent(query)}`;
  }
}

// URL search filter on doctor / blog subpages
function handleUrlSearchFilter() {
  const params = new URLSearchParams(window.location.search);
  const deptParam = params.get('dept');
  const searchParam = params.get('search') || params.get('q');

  // If on doctors.html
  if (window.location.pathname.includes('doctors.html')) {
    if (deptParam) {
      const tab = document.querySelector(`.doc-tab-btn[onclick*="'${deptParam}'"]`);
      if (tab) filterDoctorCards(deptParam, tab);
    } else if (searchParam) {
      const q = searchParam.toLowerCase();
      let matchedTab = null;
      if (q.includes('med') || q.includes('fever') || q.includes('sugar') || q.includes('sharma') || q.includes('diabet')) matchedTab = 'medicine';
      else if (q.includes('surg') || q.includes('lapar') || q.includes('appendix') || q.includes('stone') || q.includes('hernia')) matchedTab = 'surgery';
      else if (q.includes('ortho') || q.includes('bone') || q.includes('fracture') || q.includes('joint') || q.includes('knee')) matchedTab = 'ortho';
      else if (q.includes('gyn') || q.includes('pregnan') || q.includes('deliver') || q.includes('matern') || q.includes('woman') || q.includes('women')) matchedTab = 'gynae';
      else if (q.includes('paed') || q.includes('child') || q.includes('baby') || q.includes('vaccin') || q.includes('kid')) matchedTab = 'paediatrics';
      else if (q.includes('emerg') || q.includes('icu') || q.includes('casualty') || q.includes('trauma')) matchedTab = 'emergency';

      if (matchedTab) {
        const tab = document.querySelector(`.doc-tab-btn[onclick*="'${matchedTab}'"]`);
        if (tab) filterDoctorCards(matchedTab, tab);
      }
    }
  }

  // If on blog.html
  if (window.location.pathname.includes('blog.html') && (searchParam || deptParam)) {
    const blogSearchInput = document.getElementById('blogSearchInput');
    const term = searchParam || deptParam;
    if (blogSearchInput && term) {
      blogSearchInput.value = term;
      if (typeof filterBlogCards === 'function') {
        filterBlogCards(term);
      }
    }
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

