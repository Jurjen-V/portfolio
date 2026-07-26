$(function () {
  var clicks = 1;
  PEXI.receiveMessage('200', function () {
    document.querySelector('.copytop').src = 'copytopR.png';
    document.querySelector('.copy').src = '';
  });
  PEXI.receiveMessage('300', function () {
    document.querySelector('.copytop').src = 'copytop.svg';
    document.querySelector('.copy').src = 'top_copy_1.svg';
  });
  PEXI.message('size');
  function hover() {
    var hoverTimeline = gsap.timeline({ paused: true })
      .to('.cta', 0.4, { scale: 1.2, ease: "power2.out", yoyo: true })
      ;
    var cta = gsap.timeline({ paused: true })
      .to('.arrow', 0.4, { x: 10, ease: "power2.out", yoyo: true })
      .to('.ctaCopy, .arrow', 0.4, { scale: 1.2, ease: "power2.out", yoyo: true }, "<")
      ;
    $(".cta").mouseenter(function () {
      cta.play();
    });
    $(".cta").mouseleave(function () {
      cta.reverse();
    });
    $("#stage").mouseenter(function () {
      PEXI.message('hoverIn')
    });
    $("#stage").mouseleave(function () {
      PEXI.message('hoverOut')
    });
    PEXI.receiveMessage('hoverIn', function () {
      hoverTimeline.play();
    });
    PEXI.receiveMessage('hoverOut', function () {
      hoverTimeline.reverse();
    });
  }
  tl = gsap.timeline({ delay: 0.4, onComplete: hover, paused: true })
    .set('.hiddenOnload', { opacity: 1 })
    .from('.joch, .strand, .copy , .copytop, .copyTopL', .5, { y: 200, opacity: 0, stagger: .1, ease: "power2.out" }, "<")
    .from('.cta', .5, { y: 200, opacity: 0, ease: "power2.out" }, "<")
    .to('.cta', .5, { scale: 1.2, ease: "power2.out", yoyo: true, repeat: 1 })
    ;
  puzzel = gsap.timeline({ paused: true })
    .from('.cursor', 0.6, { x: 40, y: 40, display: 'none', scale: 0.8, ease: "power2.out" }, "<")
    .to('.cursor', 0.4, { scale: .8, ease: "power1.inOut" }, "<1")
    .to('.cursor', 0.3, { scale: 1, ease: "power1.out" })
    .to('.row2 .M', 0.2, { rotation: "+=90", ease: "power2.out" }, "<")
    .to('.cursor', 0.4, { scale: .8, ease: "power1.inOut" }, "<1")
    .to('.cursor', 0.3, { scale: 1, ease: "power1.out" })
    .to('.row2 .M', 0.2, { rotation: "-=90", ease: "power2.inOut" }, "<")
    .to('.cursor', 0.6, {x:20, y:120, ease: "power2.in"}, "<.5")
    .to('.cursor', 0.4, { scale: .8, ease: "power1.inOut" }, "<1")
    .to('.cursor', 0.3, { scale: 1, ease: "power1.out" })
    .to('.row3 .R', 0.2, { rotation: "+=90", ease: "power2.out" }, "<")
    .to('.cursor', 0.4, { scale: .8, ease: "power1.inOut" }, "<1")
    .to('.cursor', 0.3, { scale: 1, ease: "power1.out" })
    .to('.row3 .R', 0.2, { rotation: "-=90", ease: "power2.inOut" }, "<")
    .to('.cursor', 0.6, { x: 20, y: 230, display: 'none', scale: 0.8, ease: "power2.in" }, "<.5")
    ;
  completed = gsap.timeline({ paused: true })
    .to('.copy, .copytop, .copyTopL', .5, { opacity:0, y:200, ease: "power2.out", onComplete:replace }, "<")
    .to('.copy, .copytop, .copyTopL', .5, { opacity:1, y:0, ease: "power2.out" })
    .to('.puzzel, .copy, .copytop, .copyTopL', 1, { scale: 1.1,stagger:.2, ease: "power2.out", yoyo: true, repeat: 1 }, "<")
    ;
    tl.play();
  function replace(){
    document.querySelector('.copytop').src = 'copytopR.png';
    document.querySelector('.copy').innerHTML = `Puzzel voltooid!<br> Je had ${clicks} stappen nodig `;
        document.querySelector('.copyTopL').innerHTML = `Puzzel voltooid!<br> Je had ${clicks} stappen nodig `;

  }
  const pieces = document.querySelectorAll(".piece");
  let inactivityTimeout;
  let tutorialTimeout;

  function reportInactivity() {
    PEXI.event(`Niet voltooid! Aantal clicks: ${clicks}`);
  }
  function startTutorial() {
    PEXI.event(`Tutorial gestart!`);
    puzzel.play();
  }
  var count;
  function resetInactivityTimer() {
    if (count != 1){
        document.querySelector('.cursor').style.display = 'none';
        puzzel.progress(puzzel.progress()); // forces render
        puzzel.kill();
        updateCurrentRotation();
      }
    count = 1;
    
    clearTimeout(inactivityTimeout);
    inactivityTimeout = setTimeout(reportInactivity, 10000);
  }
  function killInactivityTimer() {
    clearTimeout(inactivityTimeout);
  }
  tutorialTimeout = setTimeout(startTutorial, 3000);
  function resetTutorialTimer() {
    clearTimeout(tutorialTimeout);
  }
  function updateCurrentRotation() {
      const mEl = document.querySelector('.row2 .M');
      const rEl = document.querySelector('.row3 .R');

      if (mEl && rEl) {
        const mRotation = normalizeRotation(gsap.getProperty(mEl, 'rotation'));
        const rRotation = normalizeRotation(gsap.getProperty(rEl, 'rotation'));

        mEl.dataset.rotation = mRotation;
        mEl.style.transform = `rotate(${mRotation}deg)`;

        rEl.dataset.rotation = rRotation;
        rEl.style.transform = `rotate(${rRotation}deg)`;
      }
  }
  function normalizeRotation(degrees) {
   return ((degrees % 360) + 360) % 360;
  } 
  // Make all pieces rotatable
  pieces.forEach(piece => {
    piece.dataset.rotation = "0";

    piece.addEventListener("mousedown", (event) => {
      resetTutorialTimer();
      event.preventDefault(); // Prevent default right-click menu
      if (clicks === 1){
        pexi.event(`Spel gestart!`);
      }
      let current = parseInt(piece.dataset.rotation) || 0;

      if (event.button === 0) {
        // Left click → rotate clockwise
        clicks++;
        resetInactivityTimer();
        current += 90;
      } else if (event.button === 2) {
        // Right click → rotate counter-clockwise
        clicks++;
        resetInactivityTimer();
        current -= 90;
      } else {
        return; // Do nothing for other buttons
      }

      piece.dataset.rotation = current;
      piece.style.transform = `rotate(${current}deg)`;
      checkWin();
    });

    // Prevent right-click menu
    piece.addEventListener("contextmenu", (event) => event.preventDefault());
  });

  // Randomly rotate 5 pieces (wrong positions)
  const randomIndexes = new Set();
  while (randomIndexes.size < 5) {
    let index = Math.floor(Math.random() * pieces.length);
    randomIndexes.add(index);
  }
  [...randomIndexes].forEach(index => {
    const piece = pieces[index];
    const wrongAngle = [90, 180, 270][Math.floor(Math.random() * 3)];
    piece.dataset.rotation = wrongAngle;
    piece.style.transform = `rotate(${wrongAngle}deg)`;
  });

  // Function to check if all pieces are "correct" (rotation % 360 == 0)
  function checkWin() {
    const allCorrect = [...pieces].every(piece => {
      return parseInt(piece.dataset.rotation) % 360 === 0;
    });

    if (allCorrect) {
      killInactivityTimer();
      PEXI.event(`Puzzel voltooid! Aantal clicks: ${clicks}`);
      setTimeout(() => {
        document.querySelectorAll('.L, .M, .R').forEach(el => {
          el.style.border = "none";
        });
        completed.play();
      }, 200);
      pieces.forEach(piece => {
        piece.style.pointerEvents = "none"; // Prevent further interaction
        piece.style.cursor = "default";     // Optional: change cursor style
      });
    }
  }

});
PEXI.skinsReady(function () {
  PEXI.skinsWallpaper();
  PEXI.receiveMessage('scalingdone', function () {
    tl.play();
  });
})

