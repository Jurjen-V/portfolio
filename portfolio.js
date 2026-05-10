gsap.registerPlugin(ScrollTrigger);

const N      = 5;
const outer  = document.getElementById('hsOuter');
const stage  = document.getElementById('hsStage');
const track  = document.getElementById('hsTrack');
const cards  = [...document.querySelectorAll('.pc')];
const dots   = [...document.querySelectorAll('.pd')];
const hint   = document.getElementById('hsHint');
const counter= document.getElementById('hsCounter').querySelector('.cur-n');
const curDot = document.getElementById('curDot');

function buildScroll() {
  ScrollTrigger.getAll().forEach(s => s.kill());

  gsap.to(track, {
    x: () => -(track.scrollWidth - window.innerWidth),
    ease: 'none',
    scrollTrigger: {
      trigger: stage,
      start: 'top top',
      end: () => '+=' + (track.scrollWidth - window.innerWidth),
      pin: true,
      scrub: 1.5, // 1 is soepeler en responsiever dan 2.5
      invalidateOnRefresh: true, // Herbereken breedtes bij scherm rotatie/resize
      snap: {
        snapTo: 1 / (N - 1), // Snapt perfect naar de start van elke slide
        duration: { min: 0.5, max: 1.2 },
        delay: 0.6,
        ease: "expo.out"
      },
      onUpdate: self => {
        const raw = self.progress * (N - 1);
        const idx = Math.round(raw);
        
        dots.forEach((d, i) => d.classList.toggle('on', i === idx));
        if(counter) counter.textContent = String(idx + 1).padStart(2, '0');
        if(hint) hint.classList.toggle('gone', self.progress > 0.04);
      }
    }
  });
}

buildScroll();

window.addEventListener('resize',()=>{  buildScroll(); });

// ── card click ──
cards.forEach(card => {
  card.style.cursor = 'pointer';

  card.addEventListener('click', e => {
    if (e.target.closest('.pc-cta')) return;

    if (card.dataset.href) {
      window.open(card.dataset.href, '_blank');
    }
  });
});

// ── entrance: first card ──
gsap.from('.pc:first-child .pc-accent',{scaleX:0,transformOrigin:'left',duration:.7,delay:.3});
gsap.from('.pc:first-child .pc-client',{y:20,opacity:0,duration:.6,delay:.4});
gsap.from('.pc:first-child .pc-title',{y:50,opacity:0,duration:.9,ease:'power3.out',delay:.5});
gsap.from('.pc:first-child .pc-desc',{y:30,opacity:0,duration:.7,delay:.7});
gsap.from('.pc:first-child .pc-tags',{y:20,opacity:0,duration:.6,delay:.9});
gsap.from('.pc:first-child .pc-cta',{scale:.85,opacity:0,duration:.5,ease:'back.out(2)',delay:1.0});
const videos = document.querySelectorAll('.video');

videos.forEach(video => {
    // 1. Zorg dat de video op het laatste frame staat bij laden
    video.addEventListener('loadedmetadata', () => {
        video.currentTime = video.duration;
        video.pause();
    });

    // 2. Desktop: Hover functionaliteit
    // We gebruiken 'matchMedia' om te checken of de gebruiker een muis heeft
    const isDesktop = window.matchMedia("(hover: hover)").matches;

    if (isDesktop) {
        video.addEventListener('mouseenter', () => {
            video.currentTime = 0;
            video.play();
        });

        video.addEventListener('mouseleave', () => {
            video.pause();
            video.currentTime = video.duration;
        });
    }

    // 3. Mobiel & Desktop: Klik functionaliteit
    // Op desktop is dit een extra 'trigger', op mobiel is dit de hoofd-interactie
    video.addEventListener('click', (e) => {
        // Voorkom dat de klik ook andere acties (zoals een link openen) direct triggert
        e.stopPropagation();

        if (video.paused || video.ended) {
            video.currentTime = 0;
            video.play();
        } else {
            video.pause();
            video.currentTime = video.duration;
        }
    });
});