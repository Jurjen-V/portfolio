    document.getElementById('year').textContent = new Date().getFullYear();

    // Brands array aangepast naar jouw map (img/brands)
    (function renderBrands(){
      var brands = [
        {name:'AD', img:'logo1.webp'},
        {name:'Donald Duck', img:'logo6.webp'},
        {name:'HP', img:'logo5.webp'},
        {name:'Joe', img:'logo4.webp'},
        {name:'Kiosk', img:'logo3.webp'},
        {name:'LeuksteTickets', img:'logo2.webp'},
        {name:'NVB', img:'logo7.webp'},
        {name:'Qmusic', img:'logo8.webp'},
        {name:'RTL', img:'logo9.webp'},
        {name:'Tweakers', img:'logo10.webp'},
        {name:'Videoland', img:'logo11.webp'},
        {name:'Volkskrant', img:'logo12.webp'},
        {name:'Wildlands', img:'logo13.webp'}
      ];

      // Fisher‑Yates shuffle
      function shuffle(array){
        for(var i = array.length - 1; i > 0; i--){
          var j = Math.floor(Math.random() * (i + 1));
          var tmp = array[i]; array[i] = array[j]; array[j] = tmp;
        }
        return array;
      }

      var container = document.getElementById('brands');
      if(!container) return;

      brands = shuffle(brands);

      // track en items
      var track = document.createElement('div');
      track.className = 'brands-track';

      brands.forEach(function(b){
        var wrap = document.createElement('div');
        wrap.className = 'brand-item';
        var link = document.createElement('a');
        link.href = b.href || '#';
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        link.title = b.name;
        var img = document.createElement('img');
        img.src = 'img/brands/' + encodeURIComponent(b.img);
        img.loading = 'eager'; // vraag browser om meteen te laden
        // bewaar bestandsnaam zodat we later makkelijk uitzonderingen kunnen toepassen
        img.dataset.file = b.img;
        img.alt = b.name;
        link.appendChild(img);
        wrap.appendChild(link);
        track.appendChild(wrap);
      });

      // voeg vroeg toe zodat afbeeldingen kunnen laden in DOM
      container.appendChild(track);

      // --- laad en decodeer alle originele afbeeldingen, analyseer daarna en dupliceer pas ---
      var imgs = Array.from(track.querySelectorAll('img'));

      // helper: veilige decode (fallback naar load)
      function ensureDecoded(img){
        return new Promise(function(resolve){
          if(img.complete && img.naturalWidth > 0){
            // try decode if supported
            if(img.decode) {
              img.decode().then(resolve).catch(resolve);
            } else {
              resolve();
            }
          } else {
            img.addEventListener('load', function(){ 
              if(img.decode) { img.decode().then(resolve).catch(resolve); } else resolve();
            });
            img.addEventListener('error', resolve);
          }
        });
      }

      Promise.all(imgs.map(ensureDecoded)).then(function(){
        // beeldanalyse: bepaal welke logo's geen pill nodig hebben
        function averageLuminance(img){
          try{
            var w = 32, h = 32;
            var canvas = document.createElement('canvas');
            canvas.width = w; canvas.height = h;
            var ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, w, h);
            var data = ctx.getImageData(0,0,w,h).data;
            var sum = 0, cnt = 0;
            for(var i=0;i<data.length;i+=4){
              var a = data[i+3];
              if(a < 30) continue;
              var r = data[i], g = data[i+1], b = data[i+2];
              var lum = 0.2126*r + 0.7152*g + 0.0722*b;
              sum += lum; cnt++;
            }
            return cnt ? (sum / cnt) : 255;
          }catch(e){
            return 255;
          }
        }

        // -- uitzonderingen: pas hier de bestandsnamen aan die je NIET op een pill wilt zetten --
        var pillExclude = new Set(['rtl.webp','qmusic.png','wildlands.png']); // pas naar wens

        imgs.forEach(function(img){
          // skip excluded filenames
          if(img.dataset && pillExclude.has(img.dataset.file)) {
            img.closest('.brand-item').classList.add('no-pill');
            return;
          }
          var lum = averageLuminance(img);
          // threshold: lagere waarde = donkerder beeld. Als licht genoeg -> geen pill
          if(lum >= 95){
            var wrap = img.closest('.brand-item');
            if(wrap) wrap.classList.add('no-pill');
          }
        });

        // dupliceer content voor seamless loop (pas na analyse zodat pill/status al zichtbaar)
        track.innerHTML += track.innerHTML;

        // rest van automatische scroll / interaction initialisatie
        updateMetrics();
        startLoop();
      });

      // automatische scroll (RAF) + drag + wheel
      var isDown = false;
      var isInteracting = false;
      var startX = 0;
      var startScroll = 0;
      var singleWidth = track.scrollWidth / 2;
      var speedFactor = 0.04; // adjust voor snelheid
      var duration = Math.max(8, Math.round(singleWidth * speedFactor));
      var speed = singleWidth / duration; // px per second
      var last = performance.now();
      var wheelTimer = null;

      function updateMetrics(){
        singleWidth = track.scrollWidth / 2;
        duration = Math.max(8, Math.round(singleWidth * speedFactor));
        speed = singleWidth / duration;
      }

      function wrapScroll(){
        if(container.scrollLeft >= singleWidth) container.scrollLeft -= singleWidth;
        if(container.scrollLeft < 0) container.scrollLeft += singleWidth;
      }

      container.addEventListener('pointerdown', function(e){
        isDown = true;
        isInteracting = true;
        startX = e.clientX;
        startScroll = container.scrollLeft;
        container.setPointerCapture && container.setPointerCapture(e.pointerId);
        container.style.cursor = 'grabbing';
      });

      container.addEventListener('pointermove', function(e){
        if(!isDown) return;
        var dx = e.clientX - startX;
        container.scrollLeft = startScroll - dx;
        wrapScroll();
      });

      container.addEventListener('pointerup', function(e){
        isDown = false;
        container.releasePointerCapture && container.releasePointerCapture(e.pointerId);
        container.style.cursor = 'grab';
        clearTimeout(wheelTimer);
        wheelTimer = setTimeout(function(){ isInteracting = false; }, 700);
      });

      container.addEventListener('pointercancel', function(){
        isDown = false;
        container.style.cursor = 'grab';
        clearTimeout(wheelTimer);
        wheelTimer = setTimeout(function(){ isInteracting = false; }, 700);
      });

      container.addEventListener('wheel', function(e){
        if(Math.abs(e.deltaY) === 0 && Math.abs(e.deltaX) === 0) return;
        e.preventDefault();
        isInteracting = true;
        container.scrollLeft += e.deltaY || e.deltaX;
        wrapScroll();
        clearTimeout(wheelTimer);
        wheelTimer = setTimeout(function(){ isInteracting = false; }, 900);
      }, {passive:false});

      window.addEventListener('resize', updateMetrics);

      // wacht tot afbeeldingen geladen zijn om metrics te berekenen
      var imgsCheck = track.querySelectorAll('img');
      var loaded = 0;
      if(imgsCheck.length === 0){ updateMetrics(); startLoop(); }
      imgsCheck.forEach(function(i){
        if(i.complete) { loaded++; }
        else i.addEventListener('load', function(){ loaded++; if(loaded === imgsCheck.length) updateMetrics(); });
      });

      var rafLast = performance.now();
      function startLoop(){
        rafLast = performance.now();
        requestAnimationFrame(tick);
      }

      function tick(now){
        var dt = (now - rafLast) / 1000;
        rafLast = now;
        if(!isInteracting){
          container.scrollLeft += speed * dt;
          wrapScroll();
        }
        requestAnimationFrame(tick);
      }

      // kleine timeout zodat layout settle (metrics worden geüpdatet nadat we dupliceerden)
      const INIT_DELAY = 80;
      setTimeout(updateMetrics, INIT_DELAY);
    })();