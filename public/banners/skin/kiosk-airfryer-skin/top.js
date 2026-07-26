var tl;
let stage = document.getElementById("stage")
function hover() {
  var hoverTimeline = gsap.timeline({ paused: true })
    .to('.bol div', { scale: 1.1, duration: 0.6, stagger: .02, ease: "sine.inOut" });
  ;

  $("#stage").mouseenter(function () { hoverTimeline.play(); PEXI.message("airfryer");});
  $("#stage").mouseleave(function () { hoverTimeline.reverse(); });
}
function hoverImages() {
  gsap.utils.toArray(".magazines img").forEach(img => {
    let tl = gsap.timeline({ paused: true })
      .to(img, { scale: 1.14, y: -14, duration: 0.4, ease: "sine.inOut" });

    $(img).mouseenter(() => tl.play());
    $(img).mouseleave(() => tl.reverse());
  });
}
// Maak een array met bestandsnamen
const images = ["mag_1.png", "mag_2.png", "mag_3.png", "mag_4.png", "mag_5.png", "mag_6.png", "mag_7.png", "mag_8.png", "mag_9.png"];

// Shuffle functie (Fisher-Yates)
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Selecteer de container
const container = document.querySelector(".magazines");

// Shuffle de afbeeldingen
const randomized = shuffle(images);

// Voeg de img-tags toe
randomized.forEach((src, index) => {
  const img = document.createElement("img");
  img.src = src;
  img.alt = `magazine ${index + 1}`;
  img.className = `mag${index + 1}`;
  container.appendChild(img);
});


tl = gsap.timeline({ delay: 0.4, onComplete: hover, hoverImages, paused: true })
  .set('.hiddenOnload', { opacity: 1 })
  .fromTo(".magazines img", { x: -300, y: 50, scale: 0.8, opacity: 0 }, { x: 0, y: 0, scale: 1, opacity: 1, duration: 0.8, ease: "power3.out", stagger: { each: 0.05, from: "end" } }, "<")
  .fromTo(".bol", { scale: 0, y: -20, opacity: 0 }, { scale: 1, y: 0, opacity: 1, duration: 0.6, ease: "back.out(1)" }, "<")
  .fromTo(".euro", { y: 12, scale: 0.7, opacity: 0 }, { y: 0, scale: 1, opacity: 1, duration: 0.5, ease: "back.out(2)" }, "<.5")
  .fromTo(".komma", { y: 14, scale: 0.7, opacity: 0 }, { y: 0, scale: 1, opacity: 1, duration: 0.4, ease: "back.out(2)" }, "<.20")
  .fromTo(".cent", { y: 14, scale: 0.7, opacity: 0 }, { y: 0, scale: 1, opacity: 1, duration: 0.4, ease: "back.out(2)" }, "<.28")
  .fromTo(".week", { x: 15, opacity: 0 }, { x: 0, opacity: 1, duration: 0.35, ease: "power3.out" }, "-=0.10")
  .fromTo(".jaar", { y: -12, opacity: 0 }, { y: 0, opacity: 1, duration: 0.35, ease: "power3.out" }, "-=0.25")
  .call(startWave, null, "<")
  .to(".euro", { scale: 1.06, duration: 0.3, ease: "sine.inOut", yoyo: true, repeat: 1 }, "<0.1")
  .to(".bol", { scale: 1.02, duration: 0.4, ease: "sine.inOut" }).to(".bol", { scale: 1, duration: 0.4, ease: "sine.inOut" })
  .to(".euro", { y: -2, duration: 0.25, ease: "sine.out" }, "<").to([".cent", ".komma"], { y: -1.5, duration: 0.25, ease: "sine.out" }, "<")
  .to([".euro", ".cent", ".komma"], { y: 0, duration: 0.25, ease: "sine.in" })
  
  ;
 tl.play();
function startWave() {
  const imgs = gsap.utils.toArray(".magazines img"); const up = 0.45, down = 0.25, amp = 14, shift = 0.16, overlapFix = 0.04;
  const tl = gsap.timeline({ repeat: 1, onComplete: hoverImages });
  imgs.forEach((img, i) => { tl.to(img, { scale: 1.14, y: -amp, duration: up, ease: "power2.out" }, i * shift); tl.to(img, { scale: 1, y: 0, duration: down, ease: "power2.in" }, i * shift + up - overlapFix); });
}

PEXI.skinsReady(function () {
  tl.play();
});