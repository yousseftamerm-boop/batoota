/* =========================================================================
   BATOOTA — script.js
   Handles: starfield canvas, floating hearts, landing → experience
   transition, live relationship counter, typewriter love letter,
   scroll-reveal animations, gallery lightbox, ending fade sequence.
   ========================================================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ----------------------------------------------------------------------
     1. STARFIELD CANVAS — soft twinkling stars + slow drifting comets
     ---------------------------------------------------------------------- */
  const canvas = document.getElementById('stars');
  const ctx = canvas.getContext('2d');
  let stars = [];
  let width, height;

  function resizeCanvas(){
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    generateStars();
  }

  function generateStars(){
    const count = Math.min(180, Math.floor((width * height) / 9000));
    stars = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 1.4 + 0.3,
      baseAlpha: Math.random() * 0.5 + 0.3,
      twinkleSpeed: Math.random() * 0.02 + 0.005,
      phase: Math.random() * Math.PI * 2,
      hue: Math.random() > 0.5 ? '110,168,255' : '255,143,199' // blue or pink tint
    }));
  }

  let t = 0;
  function drawStars(){
    ctx.clearRect(0, 0, width, height);
    t += 1;
    for(const s of stars){
      const alpha = s.baseAlpha + Math.sin(t * s.twinkleSpeed + s.phase) * 0.28;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${s.hue},${Math.max(0, alpha)})`;
      ctx.fill();
    }
    requestAnimationFrame(drawStars);
  }

  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();
  drawStars();

  /* ----------------------------------------------------------------------
     2. FLOATING HEARTS — ambient hearts drifting upward, forever
     ---------------------------------------------------------------------- */
  const heartsContainer = document.getElementById('floating-hearts');
  const HEART_GLYPHS = ['❤', '💗', '💕'];

  function spawnHeart(){
    const heart = document.createElement('span');
    heart.className = 'floating-heart';
    heart.textContent = HEART_GLYPHS[Math.floor(Math.random() * HEART_GLYPHS.length)];
    const size = Math.random() * 1.3 + 0.7;
    const left = Math.random() * 100;
    const duration = Math.random() * 10 + 12;
    const drift = (Math.random() - 0.5) * 160;

    heart.style.left = `${left}%`;
    heart.style.fontSize = `${size}rem`;
    heart.style.animationDuration = `${duration}s`;
    heart.style.setProperty('--drift', `${drift}px`);

    heartsContainer.appendChild(heart);
    setTimeout(() => heart.remove(), duration * 1000 + 500);
  }

  // Seed a few immediately, then keep spawning gently
  for(let i = 0; i < 6; i++){ setTimeout(spawnHeart, i * 900); }
  setInterval(spawnHeart, 1800);

  /* ----------------------------------------------------------------------
     3. LANDING → EXPERIENCE TRANSITION
     ---------------------------------------------------------------------- */
  const landing = document.getElementById('landing');
  const experience = document.getElementById('experience');
  const openHeartBtn = document.getElementById('openHeartBtn');

  openHeartBtn.addEventListener('click', () => {
    landing.classList.add('leaving');
    experience.hidden = false;
    document.body.style.cursor = 'default';

    setTimeout(() => {
      landing.style.display = 'none';
      window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' });
      initScrollReveal();   // start observing once elements are visible/laid out
      startTypewriter();    // begin the love letter animation
    }, 1050);
  });

  /* ----------------------------------------------------------------------
     4. LIVE RELATIONSHIP COUNTER — since October 23
     NOTE: Adjust START_DATE's year below if needed — it's set to the most
     recent October 23 for a clean, ever-growing counter.
     ---------------------------------------------------------------------- */
  const START_DATE = new Date(2025, 9, 23, 0, 0, 0); // month is 0-indexed: 9 = October

  const el = {
    years: document.getElementById('t-years'),
    months: document.getElementById('t-months'),
    days: document.getElementById('t-days'),
    hours: document.getElementById('t-hours'),
    minutes: document.getElementById('t-minutes'),
    seconds: document.getElementById('t-seconds'),
  };

  function pad(n){ return String(n).padStart(2, '0'); }

  function updateCounter(){
    const now = new Date();

    let years = now.getFullYear() - START_DATE.getFullYear();
    let months = now.getMonth() - START_DATE.getMonth();
    let days = now.getDate() - START_DATE.getDate();
    let hours = now.getHours() - START_DATE.getHours();
    let minutes = now.getMinutes() - START_DATE.getMinutes();
    let seconds = now.getSeconds() - START_DATE.getSeconds();

    if(seconds < 0){ seconds += 60; minutes--; }
    if(minutes < 0){ minutes += 60; hours--; }
    if(hours < 0){ hours += 24; days--; }
    if(days < 0){
      const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
      days += prevMonth.getDate();
      months--;
    }
    if(months < 0){ months += 12; years--; }

    el.years.textContent = pad(years);
    el.months.textContent = pad(months);
    el.days.textContent = pad(days);
    el.hours.textContent = pad(hours);
    el.minutes.textContent = pad(minutes);
    el.seconds.textContent = pad(seconds);
  }

  updateCounter();
  setInterval(updateCounter, 1000);

  /* ----------------------------------------------------------------------
     5. TYPEWRITER LOVE LETTER
     ---------------------------------------------------------------------- */
  const LOVE_LETTER = `To my Batoota ❤️

I don't think a website or a few words could ever show how much you mean to me, but I wanted to make something that was just for you.

You are all I have, and you are all I've ever wanted. I love you more than words could ever describe. You are my everything, my everyone, and every single day I'm grateful that you're in my life.

Thank you for every smile you've given me, every laugh we've shared, and every moment you've made my life a little brighter. You make ordinary days feel special, and your happiness means more to me than you know.

There is something about your eyes that always leaves me speechless. I could look into them forever and still never get enough. Like I said before, if stars could envy something, I think they would envy your eyes. They are the most beautiful eyes I have ever seen, and every time they look at me, they make my heart feel at home.

No matter where life takes us, I hope we always keep making memories together, one day at a time. I'll always be here for you through every high and every low, because loving you is the easiest and most beautiful thing I've ever done.

Every time I look at you, I'm reminded how lucky I am to have someone as kind, beautiful, caring, and incredible as you.

I love you so, so, so much—more than words could ever describe. I don't think there will ever be enough words to explain how much you mean to me. You are my home, my safe place, my happiness, and the best thing that has ever happened to me.

I hope whenever you visit this page, it reminds you of one simple thing...

You are loved more than you'll ever know, today, tomorrow, and always.

I adore you, Batoty. ❤️

Forever yours,
Youssef ❤️`;

  const letterTextEl = document.getElementById('letter-text');
  const caretEl = document.getElementById('letter-caret');
  let typewriterStarted = false;

  function startTypewriter(){
    if(typewriterStarted) return;
    typewriterStarted = true;

    let i = 0;
    const speed = 16; // ms per character — fast enough not to feel tedious

    function type(){
      if(i <= LOVE_LETTER.length){
        letterTextEl.textContent = LOVE_LETTER.slice(0, i);
        i++;
        // vary the pace slightly around punctuation for a natural feel
        const lastChar = LOVE_LETTER[i - 1];
        const pause = (lastChar === '.' || lastChar === ',' || lastChar === '\n') ? speed * 6 : speed;
        setTimeout(type, pause);
      } else {
        caretEl.classList.add('hidden');
      }
    }
    type();
  }

  /* ----------------------------------------------------------------------
     6. SCROLL REVEAL — fade + rise elements into view once
     ---------------------------------------------------------------------- */
  function initScrollReveal(){
    const revealEls = document.querySelectorAll('[data-reveal]');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if(entry.isIntersecting){
          // slight stagger for elements revealed together
          setTimeout(() => entry.target.classList.add('in-view'), index * 60);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -8% 0px' });

    revealEls.forEach(elToObserve => observer.observe(elToObserve));

    // Kick off the ending fade sequence once the ending section is seen
    const endingFade1 = document.getElementById('ending-fade-1');
    if(endingFade1){
      const endingObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if(entry.isIntersecting){
            runEndingSequence();
            endingObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.5 });
      endingObserver.observe(endingFade1);
    }
  }

  /* ----------------------------------------------------------------------
     7. ENDING FADE SEQUENCE
     ---------------------------------------------------------------------- */
  function runEndingSequence(){
    const fade1 = document.getElementById('ending-fade-1');
    const fade2 = document.getElementById('ending-fade-2');

    setTimeout(() => {
      fade1.classList.add('hide');
      fade2.classList.add('show');
    }, 3600);
  }

  /* ----------------------------------------------------------------------
     8. GALLERY LIGHTBOX
     ---------------------------------------------------------------------- */
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxClose = document.getElementById('lightboxClose');
  const galleryImages = document.querySelectorAll('.gallery-item img');

  galleryImages.forEach(img => {
    img.addEventListener('click', () => {
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
      lightbox.classList.add('open');
      lightbox.setAttribute('aria-hidden', 'false');
    });
  });

  function closeLightbox(){
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden', 'true');
  }

  lightboxClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => {
    if(e.target === lightbox) closeLightbox();
  });
  document.addEventListener('keydown', (e) => {
    if(e.key === 'Escape') closeLightbox();
  });

});
