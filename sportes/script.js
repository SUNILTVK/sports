(()=>{
  // Theme gradients to cycle every 7 seconds
  const themes = [
    {bg:['#000000','#00110a'], accents:['#00ff88','#00ffa0']},
    {bg:['#030006','#1a001a'], accents:['#ff3cac','#ff8ad1']},
    {bg:['#00111a','#001a2a'], accents:['#3ac2ff','#7fe0ff']},
    {bg:['#000000','#00101f'], accents:['#00ff88','#3ac2ff']}
  ];
  let themeIndex = 0;

  function applyTheme(i){
    const t = themes[i%themes.length];
    document.documentElement.style.setProperty('--accent', t.accents[0]);
    const g = `linear-gradient(135deg, ${t.bg[0]}, ${t.bg[1]})`;
    document.querySelector('body').style.background = g;
  }
  applyTheme(0);
  setInterval(()=>{ themeIndex++; applyTheme(themeIndex); },7000);

  // Loader
  window.addEventListener('load', ()=>{
    const l = document.getElementById('loader');
    if(l) setTimeout(()=>{ l.style.opacity=0; l.style.pointerEvents='none'; setTimeout(()=>l.remove(),600) },700);
    startClock();
    startTyping();
    startCounters();
    initMiniChart();
    initParticles();
  });

  // Typing animation
  const typeWords = ['AI-Powered Coaching','Real-time Fitness Insights','Precision Assessments','Personalized Training Plans'];
  function startTyping(){
    const el = document.getElementById('typewriter');
    if(!el) return;
    let i=0, j=0, forward=true;
    setInterval(()=>{
      const w = typeWords[i];
      el.textContent = w.slice(0,j) + (Date.now()%600<300?'|':'');
      if(forward) j++; else j--;
      if(j===w.length+1) { forward=false; setTimeout(()=>{},600) }
      if(j===0){ forward=true; i=(i+1)%typeWords.length }
    },80);
  }

  // Counters
  function startCounters(){
    document.querySelectorAll('.num').forEach(el=>{
      const target = +el.dataset.target||0; let c=0; const step=Math.max(1,Math.floor(target/120));
      const t = setInterval(()=>{ c+=step; if(c>=target){ el.textContent=target; clearInterval(t)} else el.textContent=c },18);
    });
  }

  // Clock
  function startClock(){
    const clk = document.getElementById('clock');
    if(!clk) return;
    setInterval(()=>{ const d=new Date(); clk.textContent=d.toLocaleTimeString(); },1000);
  }

  // Mini Chart
  function initMiniChart(){
    const ctx = document.getElementById('miniChart');
    if(!ctx) return;
    new Chart(ctx.getContext('2d'),{
      type:'doughnut',data:{labels:['A','B','C'],datasets:[{data:[48,30,22],backgroundColor:['#00ff88','#ff3cac','#3ac2ff'],borderWidth:0}]},options:{cutout:'65%',plugins:{legend:{display:false}}}
    });
  }

  // Mini particle system on canvas
  function initParticles(){
    const canvas = document.getElementById('bgCanvas');
    if(!canvas) return;const ctx=canvas.getContext('2d');let w,h,particles=[];
    function resize(){w=canvas.width=innerWidth;h=canvas.height=innerHeight;particles=[];for(let i=0;i<120;i++)particles.push({x:Math.random()*w,y:Math.random()*h,r:Math.random()*1.8+0.3,vx:(Math.random()-0.5)*0.3,vy:(Math.random()-0.5)*0.3})}
    window.addEventListener('resize',resize);resize();
    function frame(){ctx.clearRect(0,0,w,h);particles.forEach(p=>{p.x+=p.vx;p.y+=p.vy; if(p.x<0)p.x=w; if(p.x>w)p.x=0; if(p.y<0)p.y=h; if(p.y>h)p.y=0; ctx.beginPath();ctx.fillStyle='rgba(255,255,255,0.06)';ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fill();});requestAnimationFrame(frame)}
    frame();
  }

  // Music toggle
  const musicBtn=document.getElementById('musicToggle');if(musicBtn){
    const music=document.getElementById('bgMusic');let on=false;musicBtn.addEventListener('click',()=>{if(!music) return; on=!on; if(on){music.play(); musicBtn.style.boxShadow='0 0 20px var(--accent)'} else {music.pause(); musicBtn.style.boxShadow='none'}})}

  // Hamburger
  const ham=document.getElementById('hamburger'); if(ham){ham.addEventListener('click',()=>{const n=document.getElementById('nav'); if(n.style.display==='flex'){n.style.display='none'} else {n.style.display='flex'; n.style.flexDirection='column'; n.style.position='absolute'; n.style.right='20px'; n.style.top='56px'; n.style.background='rgba(0,0,0,0.5)'; n.style.padding='12px'; n.style.borderRadius='10px'}})}

})();
const preloader = document.getElementById('preloader');
const themeToggle = document.getElementById('themeToggle');
const scrollTopBtn = document.getElementById('scrollTop');
const typingTarget = document.querySelector('.typing-text');
const faqItems = document.querySelectorAll('.faq-item');
const testimonialSlides = document.querySelectorAll('.testimonial');
const testimonialDots = document.querySelectorAll('.dot');
const heroLinks = document.querySelectorAll('.nav-links a');
let currentTestimonial = 0;

const words = typingTarget?.dataset.words?.split(',') || [];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function handlePreloader() {
  window.addEventListener('load', () => {
    preloader.classList.add('loaded');
    setTimeout(() => preloader.style.display = 'none', 600);
  });
}

function animateTyping() {
  if (!typingTarget || !words.length) return;
  const text = words[wordIndex];
  typingTarget.textContent = text.slice(0, charIndex);

  if (!isDeleting && charIndex < text.length) {
    charIndex += 1;
    setTimeout(animateTyping, 120);
  } else if (isDeleting && charIndex > 0) {
    charIndex -= 1;
    setTimeout(animateTyping, 45);
  } else {
    isDeleting = !isDeleting;
    if (!isDeleting) wordIndex = (wordIndex + 1) % words.length;
    setTimeout(animateTyping, isDeleting ? 800 : 1400);
  }
}

function updateTheme() {
  document.body.classList.toggle('light-mode');
  const isLight = document.body.classList.contains('light-mode');
  themeToggle.textContent = isLight ? '🌙' : '☀️';
  localStorage.setItem('naturGreenTheme', isLight ? 'light' : 'dark');
}

function loadTheme() {
  const savedTheme = localStorage.getItem('naturGreenTheme');
  if (savedTheme === 'light') {
    document.body.classList.add('light-mode');
    themeToggle.textContent = '🌙';
  } else {
    themeToggle.textContent = '☀️';
  }
}

function toggleFAQ(event) {
  const item = event.currentTarget.closest('.faq-item');
  if (!item) return;
  item.classList.toggle('active');
}

function showTestimonial(index) {
  testimonialSlides.forEach((slide, idx) => {
    slide.classList.toggle('active', idx === index);
  });
  testimonialDots.forEach((dot, idx) => {
    dot.classList.toggle('active', idx === index);
  });
}

function nextTestimonial() {
  currentTestimonial = (currentTestimonial + 1) % testimonialSlides.length;
  showTestimonial(currentTestimonial);
}

function handleScrollTop() {
  const showAt = 380;
  window.addEventListener('scroll', () => {
    if (window.scrollY > showAt) {
      scrollTopBtn.classList.add('visible');
    } else {
      scrollTopBtn.classList.remove('visible');
    }
  });
  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

function handleSmoothScroll() {
  heroLinks.forEach(link => {
    link.addEventListener('click', event => {
      const targetId = link.getAttribute('href');
      if (targetId.startsWith('#')) {
        event.preventDefault();
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });
}

function initTestimonials() {
  showTestimonial(currentTestimonial);
  testimonialDots.forEach((dot, idx) => {
    dot.addEventListener('click', () => {
      currentTestimonial = idx;
      showTestimonial(idx);
    });
  });
  setInterval(nextTestimonial, 6500);
}

function initAccordion() {
  faqItems.forEach(item => {
    const toggle = item.querySelector('.faq-toggle');
    if (toggle) {
      toggle.addEventListener('click', toggleFAQ);
    }
  });
}

function bindForms() {
  const serviceForm = document.getElementById('serviceForm');
  const contactForm = document.getElementById('contactForm');

  if (serviceForm) {
    serviceForm.addEventListener('submit', event => {
      event.preventDefault();
      alert('Service request submitted. Our team will contact you shortly.');
      serviceForm.reset();
    });
  }

  if (contactForm) {
    contactForm.addEventListener('submit', event => {
      event.preventDefault();
      alert('Thank you for reaching out. We will respond within 24 hours.');
      contactForm.reset();
    });
  }
}

function startAnimations() {
  animateTyping();
  initTestimonials();
  initAccordion();
  handleScrollTop();
  handleSmoothScroll();
  bindForms();
  handlePreloader();
}

loadTheme();
startAnimations();

themeToggle?.addEventListener('click', updateTheme);
