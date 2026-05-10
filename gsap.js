(function () {
  if (!window.gsap) return;

  const { gsap, ScrollTrigger } = window;
  gsap.registerPlugin(ScrollTrigger);
  gsap.registerPlugin(SplitText)

  // ==============================
  // Utils
  // ==============================

  const q = (sel) => document.querySelector(sel);
  const qAll = (sel) => document.querySelectorAll(sel);

  const debounce = (fn, delay = 200) => {
    let t;
    return (...args) => {
      clearTimeout(t);
      t = setTimeout(() => fn(...args), delay);
    };
  };

  // ==============================
  // HERO ANIMATION
  // ==============================

  function createHeroTimeline({ withNav = true } = {}) {
    const tl = gsap.timeline({
      defaults: { ease: "power3.out" }
    });

    tl.to('.hiddenOnLoad', { opacity: 1 });
    let heroH1 = SplitText.create(".hero h1", { type: "words, chars" });
    let heroP = SplitText.create(".hero p", { type: "words, chars" });
    let nav = SplitText.create(".navlinks", { type: "words, chars" });
    let home = SplitText.create("#home", { type: "words, chars" });

    if (withNav) {
      tl.from('.nav', { y: -100, duration: .5, ease: "expo.out", overflow:"hidden" }, "<")
      .from(home.words, {duration: 1, ease:"power2.out", scaleX: 2, x:100, transformOrigin:"left",  autoAlpha: 0,  stagger: 0.2,},"<.2")
      .from(nav.words, {duration: 1, ease:"power2.out", scaleX: 2, x:100, transformOrigin:"left",  autoAlpha: 0,  stagger: 0.2,},"<.5")

        ;
    } else {
      tl.set('.nav', { y: 0, width: '90%' })
        .set('.navbar', { justifyContent: 'space-between', width: '90%' })
        .set('.navlinks', { display: 'flex' })
        .set('.navlinks a', { y: 0, opacity: 1 });
    }

    // Hero content
    tl
      .fromTo(".hero-image",1, { opacity: 0, y: 100, scaleY:5, transformOrigin:"top" },{ opacity: 1, y: 0,scaleY:1, stagger: 0.2 , ease:"power2.out"},"<.2" )
      .from(heroH1.chars, {duration: .5, ease:"power2.out", scaleY: 10, y:50, transformOrigin:"top",  autoAlpha: 0,  stagger: 0.02,},"<.2")
      .from(heroP.words, {duration: .5, scaleY: 1, y:50, transformOrigin:"top",  autoAlpha: 0,  stagger: 0.02,},"<.2")
      .from("#heroHome .meta", {duration: .5, scaleY: 1, y:50, transformOrigin:"top",  autoAlpha: 0,  stagger: 0.02,},"<.2")
      .from("#heroHome .skills", {duration: .5, scaleY: 1, y:50, transformOrigin:"top",  autoAlpha: 0,  stagger: 0.02,},"<")
      // .fromTo( ".hero p, .hero .meta", { opacity: 0, scaleY:2, y: 400}, { opacity: 1, scaleY:1, y: 0, duration: 1, stagger: 0.2 , ease:"power2.out" }, "<1")
      // .to('.hero h1',.5,{scaleY:1 ,y:0, lineHeight:1, transformOrigin:'top', ease:"power2.out"},'<.05')
      .fromTo( ".hero .cta",{ opacity: 0, scale: 0.5 }, { opacity: 1, scale: 1, duration: 0.5,ease:"power2.out" },"<.2")
      .to(".hero .cta", { scale: 1.2, duration: 0.3, ease:"power2.out" })
      .to(".hero .cta", { scale: 1, duration: 0.3, ease:"power2.out"});
    return tl;
  }

  // ==============================
  // SCROLL ANIMATIONS
  // ==============================

  function animateSection(selector, trigger) {
    if (!q(selector)) return;
    if(selector === '.section3, .ch-werk-bottom') {
      gsap.from(selector, {scrollTrigger: {trigger,start: "top 45%",toggleActions: "play none none none" },y: 100,opacity: 0,duration: 0.7, ease: "power2.out"}); 
    } else {
      gsap.from(selector, {scrollTrigger: {trigger,start: "top 45%",toggleActions: "play none none none" },y: 100,opacity: 0, stagger: 0.5,duration: 0.7, ease: "power2.out"});  }
    }

  function initSections() {
    const sections = [
      { selector: '.section1', trigger: '#projecten' },
      { selector: '.section2', trigger: '#AI' },
      { selector: '.section3, .ch-werk-bottom', trigger: '#about' },
    ];
    sections.forEach(s => animateSection(s.selector, s.trigger));

    // ── PROJECT CARDS stagger entrance ──
    if(q('.proj-grid')) {
      gsap.from('.proj-card', {
        scrollTrigger: { trigger: '.proj-grid', start: 'top 75%' },
        y: 0,
        opacity: 0,
        duration: 1.5,
        stagger: { amount: 0.8, from: 'start' },
        ease: 'power3.out'
      });
    }

    // ── ABOUT section items ──
    if(q('#about')) {
      gsap.from('.timeline-group', {
        scrollTrigger: { trigger: '.timeline', start: 'top 85%' },
        x: -30,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: 'power2.out'
      });
    }

    // ── WERK.HTML hero ──
    if(q('.werk-hero')) {
      const werkTL = gsap.timeline({ defaults: { ease: 'power3.out' } });
      if(q('.werk-hero__label')) {
        let werkLabel = SplitText.create('.werk-hero__label', { type: 'chars' });
        werkTL
          .from('.werk-back', { y: -20, opacity: 0, duration: 0.4 })
          .from(werkLabel.chars, { y: 20, opacity: 0, stagger: 0.03, duration: 0.4 }, '<.1')
          .from('.werk-hero__title', { y: 60, opacity: 0, scaleY: 1.4, transformOrigin: 'top', duration: 0.7 }, '<.1')
          .from('.tag-row .tag', { scale: 0.8, opacity: 0, stagger: 0.07, duration: 0.4, ease: 'back.out(1.5)' }, '<.3');
      }
      gsap.from('.werk-panel', {
        scrollTrigger: { trigger: '.werk-gallery', start: 'top 80%' },
        y: 40, opacity: 0, duration: 0.6, stagger: 0.15, ease: 'power2.out'
      });
      gsap.from('.werk-panel .card', {
        scrollTrigger: { trigger: '#gallery', start: 'top 85%' },
        scale: 0.95, opacity: 0, duration: 0.5, stagger: 0.1, ease: 'power2.out'
      });
    }

    // ── PROJECT.HTML ──
    if(q('.proj-page-hero')) {
      const projTL = gsap.timeline({ defaults: { ease: 'power3.out' } });
      if(q('.proj-page-hero h1')) {
        let projH1 = SplitText.create('.proj-page-hero h1', { type: 'words,chars' });
        projTL
          .from('.back-link', { y: -20, opacity: 0, duration: 0.4 })
          .from(projH1.chars, { y: 60, scaleY: 1.5, transformOrigin: 'top', opacity: 0, stagger: 0.02, duration: 0.6 }, '<.1')
          .from('.proj-page-hero .meta-row .badge', { scale: 0.7, opacity: 0, stagger: 0.06, duration: 0.35, ease: 'back.out(2)' }, '<.3');
      }
      gsap.from('.hero-large', {
        scrollTrigger: { trigger: '.hero-large', start: 'top 85%' },
        y: 30, opacity: 0, duration: 0.6, ease: 'power2.out'
      });
      gsap.from('.case > div', {
        scrollTrigger: { trigger: '.case', start: 'top 80%' },
        x: -20, opacity: 0, duration: 0.5, stagger: 0.1, ease: 'power2.out'
      });
      gsap.from('.right-col .panel', {
        scrollTrigger: { trigger: '.right-col', start: 'top 80%' },
        y: 20, opacity: 0, duration: 0.5, stagger: 0.12, ease: 'power2.out'
      });
    }
  }

  // ==============================
  // BRANDS PARALLAX
  // ==============================

  function initBrands() {
    if (!q('.brands-track')) return;
    gsap.to('.brands-track', {xPercent: -18,ease: 'none', scrollTrigger: {trigger: '.brands', start: 'top bottom', end: 'bottom top',scrub: 0.7}});
  }

  // ==============================
  // METRICS COUNTER
  // ==============================

  function initMetrics() {
    qAll('.metric .v').forEach(el => {
      let target = Number(el.dataset.value);

      if (!target) {
        const match = el.textContent.match(/-?\d+/);
        target = match ? Number(match[0]) : 0;
      }

      const obj = { val: 0 };

      gsap.to(obj, { val: target,duration: 1.6,ease: 'power3.out',scrollTrigger: { trigger: el, start: 'top 85%'},
        onUpdate: () => {
          const suffix =
            el.dataset.suffix ||
            (/%$/.test(el.textContent) ? '%' : '');

          el.textContent = Math.round(obj.val) + (suffix || '');
        }
      });
    });
  }

  // ==============================
  // IMAGES REVEAL
  // ==============================

  function initImageReveal() {
    gsap.utils.toArray('.hero-img, .screenshot-lg, .diagram').forEach(img => {
      gsap.from(img, {scale: 1.04,opacity: 0,duration: 1.1,ease: 'power2.out', scrollTrigger: { trigger: img,start: 'top 80%'}});
    });
  }

  // ==============================
  // BADGES
  // ==============================

  function initBadges() {
    if (!q('.badge')) return;
    gsap.from('.badge', {scrollTrigger: { trigger: '.hero-large, .panel',start: 'top 90%'}, y: 10, opacity: 0, stagger: 0.06, duration: 0.6});
  }

  // ==============================
  // INIT
  // ==============================

  function initAnimations() {
    const isMobile = window.innerWidth <= 768;
    const isHomePage = !!q('#heroHome');

    if (isHomePage) {
      const heroTL = createHeroTimeline({ withNav: !isMobile });
      heroTL.eventCallback("onComplete", () => { ScrollTrigger.refresh(); });
      heroTL.play();
    } else {
      // Subpagina: gewoon zichtbaar maken + nav animeren
      gsap.to('.hiddenOnLoad', { opacity: 1, duration: 0.1 });
      gsap.from('.nav', { y: -80, duration: 0.5, ease: 'expo.out' });
    }

    initSections();
    initBrands();
    initMetrics();
    initImageReveal();
    initBadges();
  }

  // ==============================
  // EVENTS
  // ==============================

  document.addEventListener('DOMContentLoaded', initAnimations);

  window.addEventListener(
    'resize',
    debounce(() => {
      ScrollTrigger.refresh();
    }, 250)
  );


  // cta animatie
  function initLiquidCTA() {
  document.querySelectorAll('.cta, .pc-cta').forEach(btn => {
    const overlay = btn.querySelector('::before');

    btn.addEventListener('mouseenter', () => {
      gsap.to(btn, {
        '--x': '0%',
        duration: 0.4
      });

      gsap.to(btn.querySelector('span'), {
        x: 6,
        duration: 0.3
      });
      gsap.to(btn.querySelector('.arrow'), {
        y:-30,
        x:10,
        display:'inline-block',
        duration: 0.3
      })
      gsap.set(btn.querySelector('.arrow'), {
        y:30,
        x:-10,
        duration: 0.3,
        delay: 0.3
      })
      gsap.to(btn.querySelector('.arrow'), { 
        y:0,
        x:0,
        duration: 0.3,
        delay: 0.3
      })
      ;

      gsap.to(btn, {
        backgroundColor: '#fff',
        color: '#0b0d0a',
        duration: 0.3
      });
    });

    btn.addEventListener('mouseleave', () => {
      gsap.to(btn.querySelector('span'), {
        x: 0,
        duration: 0.3
      });
      gsap.to(btn.querySelector('.arrow'), {
        x:0,
        position:'relative',
        duration: 0.3
      });

      gsap.to(btn, {
        backgroundColor: '',
        color: '',
        duration: 0.3
      });
    });
  });
}
 initLiquidCTA()
})();