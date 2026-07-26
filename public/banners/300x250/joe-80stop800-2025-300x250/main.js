$( function () {

		const feed = "https://feeds.pexi.nl/api/feeds/ec68a70375b6e6c";

	const feedPlaying = "https://feeds.pexi.nl/api/feeds/635116c070763";
	const maxSongs = 5;

	function hover(){
		var hoverTimeline = gsap.timeline({paused:true})
			.to(".cta", {scale:1.1, duration:.6,ease: "back.inOut(3)"})
		;
		
		$("#stage").mouseenter( function() {hoverTimeline.play();});
		$("#stage").mouseleave( function() {hoverTimeline.reverse();});
	}

	// function to create song html elements
	const songs = document.getElementById('songs');
	function createSong(song, index){
		let position = song.position;
		// fallback for position when not available in feed
		if(!position){position = 800 - index};

		const newSong = document.createElement('div');
		newSong.classList.add('song');
		newSong.classList.add('song' + (index + 1));

		const newSongIndex = document.createElement('div');
		newSongIndex.classList.add('song-index');
		newSongIndex.textContent = position + ".";
		newSong.appendChild(newSongIndex);

		const newSongCopy = document.createElement('div');
		newSongCopy.classList.add('song-copy');

		const newSongArtist = document.createElement('div');
		newSongArtist.classList.add('song-artist');
		newSongArtist.textContent = song.artist.name;
		newSongCopy.appendChild(newSongArtist);

		const newSongTitle = document.createElement('div');
		newSongTitle.classList.add('song-title');
		newSongTitle.textContent = song.title;
		newSongCopy.appendChild(newSongTitle);

		newSong.appendChild(newSongCopy);
		songs.appendChild(newSong);
	}

	const introAnim1 = lottie.loadAnimation({
		container: intro1,
		renderer: 'svg',
		loop: false,
		autoplay: false, 
		path: 'data.json'
	})
	const introAnim2 = lottie.loadAnimation({
		container: intro2,
		renderer: 'svg',
		loop: false,
		autoplay: false, 
		path: 'data1.json'
	})
	const introAnim3 = lottie.loadAnimation({
		container: cirkel,
		renderer: 'svg',
		loop: false,
		autoplay: false, 
		path: 'Cirkel.json'
	})
	const introAnim4 = lottie.loadAnimation({
		container: cirkel1,
		renderer: 'svg',
		loop: false,
		autoplay: false, 
		path: 'Cirkel.json'
	})
	// function to get the list
	function getPositions(position){
		$.get(feed + `?from=${position - maxSongs}&to=${position}'&limit=${maxSongs}`,(e)=>{
			const tracks = e.tracks.reverse();
			if (tracks[0].position <= 8) {
				$('#stage').removeClass('songsAvailable')
				$('.nu_op_je_radio').remove();
				var tlSongs = gsap.timeline({delay: 0.8, onComplete:hover, paused:true})
					.to('.hiddenOnload',{opacity:1,duration:.3})
					.call(function(){introAnim1.play()}, null,"<")
    				.call(function(){introAnim2.play()}, null,"<")
					.call(function(){introAnim3.play()}, null,"<")
    				.call(function(){introAnim4.play()}, null,"<.3")
					.to('#intro1',.4,{scale: 1.4, y: 23, ease: Power1.easeInOut},"=-.3")
					.to('#intro2',.4,{scale: 1.4, y: 43, x:4, ease: Power1.easeInOut},"<")
					.to('.ring',.4,{width: "318.22px", height:"318.22px" ,top:"-190px",left:"118px", ease: Power1.easeInOut},"<")
					.to('.ring1',.4,{width: "381.06px", height:"381.06px" ,top:"89px",left:"-190px", ease: Power1.easeInOut},"<")
					.from('.cta',.4,{y: 50, opacity: 0, ease: Power1.easeOut},"=-.3")
					.to('.gradient',.4,{opacity: 0},"=-.3")
					.to('.cta',{scale:1.1, duration:.6,ease: "back.inOut(3)", yoyo: true, repeat: 1},"=+.5")
				;
			}else{
				$('.player').remove();
				tracks.forEach((track, i)=>{
					createSong(track, i);
				})
				var tlSongs = gsap.timeline({delay: 0.8, onComplete:hover, paused:true})
					.to('.hiddenOnload',{opacity:1,duration:.3})
					.call(function(){introAnim1.play()}, null,"<")
					.call(function(){introAnim2.play()}, null,"<")
					.call(function(){introAnim3.play()}, null,"<")
					.call(function(){introAnim4.play()}, null,"<.3")
					.staggerFrom('.nu_op_je_radio, .song',.4,{y: 50, opacity: 0, ease: Power1.easeOut},.1)
					.to('.song2, .song3, .song4, .song5', 2.5,{y: -100, ease: Power0.easeNone},"=+.5")
					.staggerTo('.song2, .song3, .song4',.3,{opacity: 0},.9,"=-2.5")
					.staggerTo('.nu_op_je_radio, .song',.4,{opacity: 0, ease: Power1.easeOut},.02,"=-.5")
					.to('#intro1',.4,{scale: 1.4, y: 23, ease: Power1.easeInOut},"=-.3")
					.to('#intro2',.4,{scale: 1.4, y: 43, x:4, ease: Power1.easeInOut},"<")
					.to('.ring',.4,{width: "318.22px", height:"318.22px" ,top:"-190px",left:"118px", ease: Power1.easeInOut},"<")
					.to('.ring1',.4,{width: "381.06px", height:"381.06px" ,top:"89px",left:"-190px", ease: Power1.easeInOut},"<")
					.from('.cta',.4,{y: 50, opacity: 0, ease: Power1.easeOut},"=-.3")
					.to('.gradient',.4,{opacity: 0},"=-.3")
					.to('.cta',{scale:1.1, duration:.6,ease: "back.inOut(3)", yoyo: true, repeat: 1},"=+.5")
				;

				}
				
					tlSongs.play()
				
		})
	}

	// feed to get current playing song and set it to position
	$.get(feedPlaying,(playing)=>{
		const songEditions = playing.played_tracks[0].active_editions;
		let number = 800;
		if (songEditions.length > 0) {
			songEditions.forEach(editions => {
				number = editions.position;
			})
		} 
		getPositions(number);
	})







		
});