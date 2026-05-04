// ...new file...
(function(){
  // guard
  if(!window.gsap) return;
  const { gsap, ScrollTrigger } = window;
  if(ScrollTrigger) gsap.registerPlugin(ScrollTrigger);
  
  var navtl = gsap.timeline({ paused:true, defaults: { ease: "power3.out" } })
      .to('.hiddenOnLoad', {opacity: 1})
      .from('.nav', {y:-100, duration:1, ease: "expo.out"}, "<")
      .set('.navbar',{justifyContent:'center'}, "<")
      .fromTo(".hero h1, .hero-image",{ opacity: 0, y: 100 },{ opacity: 1, y: 0, duration: .5 , stagger:.2, ease:"power1.out"}, "<")
      .fromTo(".hero p, .hero .meta",{ opacity: 0, y: 100 }, { opacity: 1, y: 0, duration:.5, stagger:.2 }, "<.5")
      .fromTo(".hero .cta", { opacity: 0, scale: 0.5 }, { opacity: 1, scale: 1, duration:.5, ease: "power2.out" }, "<.5")
      .from('.nav, .navbar',{width:'50%', duration:1, ease: "expo.out", justifyContent:'space-between'}, "<.2")
      .from('.navlinks', {display:'none'}, "<.1")
      .from('.navlinks a', {y:100, opacity: 0, stagger: 0.1, duration: 0.6, ease: 'power2.out'}, "<")
      .to(".hero .cta", {scale:1.3,ease:'power2.out'} )
      .to(".hero .cta", {scale:1, ease:'power2.out'}, );


  var heroTL = gsap.timeline({ paused:true })
      .to('.hiddenOnLoad', {opacity: 1})
      .set('.nav',{y:0, width:'90%'},"<")
      .set('.navbar',{justifyContent:'space-between', width:'90%'}, "<")
      .set('.navlinks a',{y:0, opacity:1},"<")
      .set('.navlinks',{display:'flex'}, "<")
      .fromTo(".hero h1, .hero-image",{ opacity: 0, y: 100 },{ opacity: 1, y: 0, duration: .5 , stagger:.2, ease:"power1.out"}, "<")
      .fromTo(".hero p, .hero .meta",{ opacity: 0, y: 100 }, { opacity: 1, y: 0, duration:.5, stagger:.2 }, "<.5")
      .fromTo(".hero .cta", { opacity: 0, scale: 0.5 }, { opacity: 1, scale: 1, duration:.5, ease: "power2.out" }, "<.5")
      .to(".hero .cta", {scale:1.3,ease:'power2.out'} )
      .to(".hero .cta", {scale:1, ease:'power2.out'}, );

  // Cards / work items
  if(document.querySelectorAll('.card').length){
    gsap.from('.section1 div, .section1 h2, .section1 p, .section1 h3', {
      scrollTrigger: { trigger: '#projecten', start: 'top 45%', toggleActions: 'play none none none' },
       y:100, opacity: 0, stagger: 0.1, duration: 0.7, ease: 'power2.out'
    });
     gsap.from('.section2 div, .section2 h2, .section2 p, .section2 h3', {
      scrollTrigger: { trigger: '#AI', start: 'top 45%', toggleActions: 'play none none none' },
       y:100, opacity: 0, stagger: 0.1, duration: 0.7, ease: 'power2.out'
    });
  }
  // Brands scroller parallax-ish on scroll
  if(document.querySelector('.brands-track')){
    gsap.to('.brands-track', {
      xPercent: -18,
      ease: 'none',
      scrollTrigger: { trigger: '.brands', start: 'top bottom', end: 'bottom top', scrub: 0.7 }
    });
  }

  // Metrics: animate numbers when visible
  document.querySelectorAll('.metric .v').forEach(el => {
    // try data-value, fallback to parsing digits from text
    let target = Number(el.dataset.value);
    if (!target) {
      const m = (el.textContent || '').match(/-?\d+(\.\d+)?/);
      target = m ? Number(m[0]) : 0;
    }
    const obj = { val: 0 };
    gsap.to(obj, {
      val: target,
      duration: 1.6,
      ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' },
      onUpdate: () => {
        // preserve percent or text suffix if present
        const suffix = (el.dataset.suffix) || (el.dataset.suffix === '' ? '' : (el.getAttribute('data-suffix') || (/%$/.test(el.textContent) ? '%' : '')));
        el.textContent = Math.round(obj.val) + (suffix || '');
      }
    });
  });

  // Project page micro-animations: badges, metrics, diagram
  if(document.querySelectorAll('.badge').length){
    gsap.from('.badge', {
      scrollTrigger: { trigger: '.hero-large, .panel', start: 'top 90%', toggleActions: 'play none none none' },
      y: 10, opacity: 0, stagger: 0.06, duration: 0.6, ease: 'power2.out'
    });
  }

  // subtle image reveal
  gsap.utils.toArray('.hero-img, .screenshot-lg, .diagram').forEach(img => {
    gsap.from(img, { scale: 1.04, opacity: 0, duration: 1.1, ease: 'power2.out', scrollTrigger: { trigger: img, start: 'top 80%', toggleActions: 'play none none none' } });
  });

  // Voeg een resize watcher toe om de navigatie aan te passen op basis van schermbreedte
  const handleResize = () => {
    const isMobile = window.innerWidth <= 768;

    if (isMobile) {
      heroTL.play();
    } else {
      navtl.play();
    }
  };

  // Roep de functie direct aan bij het laden van de pagina
  handleResize();

  // Voeg de eventlistener toe voor toekomstige wijzigingen
  window.addEventListener('resize', handleResize);

gsap.registerPlugin(TextPlugin); // Registreer de plugin

})();